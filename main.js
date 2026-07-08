/* =========================================================
   ASCEND — shared front-end logic (no framework, no build step)
   ========================================================= */

const CURRENCY = "₹";
const CART_KEY = "ascend_cart_v1";

/* ---------- helpers ---------- */
function money(n){
  return CURRENCY + n.toLocaleString("en-IN");
}
function getProduct(id){
  return PRODUCTS.find(p => p.id === id);
}
function imgFallback(el){
  // If a hotlinked photo ever fails, swap in a brand-toned gradient
  // instead of a broken-image icon so the layout stays intact.
  el.onerror = null;
  el.style.background = IMG_FALLBACK_BG;
  el.style.objectFit = "cover";
  el.removeAttribute("src");
}
document.addEventListener("error", (e)=>{
  if(e.target.tagName === "IMG") imgFallback(e.target);
}, true);

/* ---------- cart engine (localStorage) ---------- */
const Cart = {
  read(){
    try{ return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch{ return []; }
  },
  write(items){
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    Cart.updateBadge();
  },
  add(productId, opts={}){
    const items = Cart.read();
    const size = opts.size || null;
    const color = opts.color || null;
    const qty = opts.qty || 1;
    const existing = items.find(i => i.id === productId && i.size === size && i.color === color);
    if(existing){ existing.qty += qty; }
    else{ items.push({ id: productId, size, color, qty }); }
    Cart.write(items);
    return items;
  },
  remove(index){
    const items = Cart.read();
    items.splice(index,1);
    Cart.write(items);
  },
  setQty(index, qty){
    const items = Cart.read();
    if(!items[index]) return;
    items[index].qty = Math.max(1, qty);
    Cart.write(items);
  },
  count(){
    return Cart.read().reduce((n,i)=> n + i.qty, 0);
  },
  subtotal(){
    return Cart.read().reduce((sum,i)=>{
      const p = getProduct(i.id);
      return sum + (p ? p.price * i.qty : 0);
    }, 0);
  },
  updateBadge(){
    document.querySelectorAll("[data-cart-count]").forEach(el=>{
      const n = Cart.count();
      el.textContent = n;
      el.style.display = n > 0 ? "flex" : "none";
    });
  }
};

/* ---------- nav: mount cart count + mobile toggle ---------- */
function mountNav(){
  Cart.updateBadge();
  const burger = document.querySelector(".nav-burger");
  const links = document.querySelector(".nav-links");
  if(burger && links){
    burger.addEventListener("click", ()=> links.classList.toggle("open"));
  }
  // highlight current page
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a=>{
    if(a.getAttribute("href") === path) a.classList.add("active");
  });
}

/* ---------- drop countdown (signature element) ---------- */
function mountCountdown(el){
  if(!el) return;
  // Countdown always targets "next Friday 9:00am" — a rolling drop cadence.
  function nextDrop(){
    const now = new Date();
    const d = new Date(now);
    const day = d.getDay();
    let diff = (5 - day + 7) % 7; // 5 = Friday
    if(diff === 0 && now.getHours() >= 9) diff = 7;
    d.setDate(d.getDate() + diff);
    d.setHours(9,0,0,0);
    return d;
  }
  const target = nextDrop();
  function tick(){
    const now = new Date();
    let t = target - now;
    if(t < 0) t = 0;
    const days = Math.floor(t / 86400000);
    const hours = Math.floor((t % 86400000) / 3600000);
    const mins = Math.floor((t % 3600000) / 60000);
    const secs = Math.floor((t % 60000) / 1000);
    el.querySelector('[data-d]').textContent = String(days).padStart(2,"0");
    el.querySelector('[data-h]').textContent = String(hours).padStart(2,"0");
    el.querySelector('[data-m]').textContent = String(mins).padStart(2,"0");
    el.querySelector('[data-s]').textContent = String(secs).padStart(2,"0");
  }
  tick();
  setInterval(tick, 1000);
}

/* ---------- scroll reveal ---------- */
function mountReveal(){
  const els = document.querySelectorAll(".fade-up");
  if(!("IntersectionObserver" in window)){
    els.forEach(el=> el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: .15 });
  els.forEach(el=> io.observe(el));
}

/* ---------- product card renderer ---------- */
function productCardHTML(p){
  const tagClass = p.tag === "SALE" ? "sale" : (p.tag === "NEW DROP" ? "new" : "");
  return `
  <article class="card fade-up">
    <div class="card-media">
      ${p.tag ? `<span class="card-tag ${tagClass}">${p.tag}</span>` : ""}
      <button class="card-wish" aria-label="Save to wishlist" data-wish="${p.id}">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
      </button>
      <a href="product.html?id=${p.id}">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
      </a>
      <div class="card-quick">
        <button class="btn btn-primary btn-block" data-quickadd="${p.id}">+ Quick Add</button>
      </div>
    </div>
    <div class="card-body">
      <span class="card-cat">${p.category}</span>
      <h3 class="card-name"><a href="product.html?id=${p.id}">${p.name}</a></h3>
      <div class="stars">★★★★★ <b>${p.rating}</b> (${p.reviews})</div>
      <div class="card-price">
        <span class="now">${money(p.price)}</span>
        ${p.compareAt ? `<span class="was">${money(p.compareAt)}</span>` : ""}
      </div>
    </div>
  </article>`;
}

function mountQuickAdd(root=document){
  root.querySelectorAll("[data-quickadd]").forEach(btn=>{
    btn.addEventListener("click", (e)=>{
      e.preventDefault();
      const id = btn.dataset.quickadd;
      const p = getProduct(id);
      Cart.add(id, { qty: 1 });
      showToast(p);
    });
  });
  root.querySelectorAll("[data-wish]").forEach(btn=>{
    btn.addEventListener("click", (e)=>{
      e.preventDefault();
      btn.classList.toggle("active");
    });
  });
}

/* ---------- toast ---------- */
function showToast(p){
  let toast = document.querySelector(".added-toast");
  if(!toast){
    toast = document.createElement("div");
    toast.className = "added-toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <img src="${p.img}" alt="">
    <div class="t-info">
      <b>Added to bag</b>
      <span>${p.name}</span>
    </div>`;
  requestAnimationFrame(()=> toast.classList.add("show"));
  clearTimeout(toast._t);
  toast._t = setTimeout(()=> toast.classList.remove("show"), 2600);
}

document.addEventListener("DOMContentLoaded", ()=>{
  mountNav();
  mountReveal();
});
