# ASCEND — E-commerce Front End

A 4-page, no-build-step storefront: **Home · Shop · Product · Cart**.
Pure HTML/CSS/JS — open `index.html` in a browser, no server or npm install required
(though a local server avoids any file:// quirks — see below).

## Structure
```
ascend/
├── index.html        Home — video hero, drop countdown, categories, featured grid
├── shop.html          Full catalogue with category filter + sort
├── product.html        Product detail — gallery, size/colour, add to bag
├── cart.html            Bag — quantities, promo code, order summary
├── css/style.css        Design tokens + all styles
├── js/main.js            Cart engine (localStorage), rendering, countdown
└── data/products.js     Product catalogue (edit this to add/change products)
```

## Design
- **Palette:** near-black ink base (`#121317`) with cobalt blue and signal-orange
  accents, mono-spaced price/timer type for a "drop culture" streetwear feel.
- **Signature element:** the live Friday-drop countdown in the hero, plus a
  diagonal cut motif (`.cut-top/.cut-bottom`) echoing sneaker-box graphics.
- **Fonts:** Space Grotesk (display), Inter (body), JetBrains Mono (prices/labels),
  loaded from Google Fonts via `<link>` in each page's `<head>`.

## Media — real photos & video, hotlinked
All photography is pulled live from **Unsplash** (`images.unsplash.com`) and the
hero/lookbook videos are pulled from **Mixkit** (`assets.mixkit.co`) — both are
free-for-commercial-use, no-attribution-required libraries. Nothing is stored in
this folder, so the zip stays small, but it does mean **an internet connection is
required** to see images/video.

To swap any image: edit the `img` / `gallery` fields in `data/products.js`, or the
`<img src="...">` / `<source src="...">` values directly in the HTML files.
Every `<img>` has a JS fallback (`js/main.js` → `imgFallback`) that swaps in a
brand-toned gradient if a link ever breaks, so the layout never shows a broken
image icon.

**For production:** download the images/videos you end up keeping and serve them
from your own CDN or an `/assets` folder instead of hotlinking — it's faster and
won't break if the source site changes a URL.

## Cart
Cart state lives in `localStorage` under the key `ascend_cart_v1`, shared across
all four pages. `Cart.add()`, `Cart.remove()`, `Cart.setQty()` in `js/main.js` are
the only three functions you need to touch to wire this into a real backend.

## Checkout
The **Checkout** button on `cart.html` currently shows an alert — it's a front-end
demo. Wire it to a real payment provider (Razorpay is common for INR pricing,
Stripe for international) when you add a backend.

## Adding a product
Copy any object in `data/products.js`, give it a unique `id`, and it will
automatically appear in the shop grid, category filters, and be reachable at
`product.html?id=your-new-id`.
