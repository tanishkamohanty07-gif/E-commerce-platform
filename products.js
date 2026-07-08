// ASCEND — product catalog
// Images are hotlinked directly from Unsplash's CDN (images.unsplash.com).
// Each <img> has an onerror fallback (see js/main.js -> imgFallback) in case
// a specific photo ID ever changes, so the layout never breaks.

const PRODUCTS = [
  {
    id: "asc-001",
    name: "Vantage 02 — Volt",
    category: "footwear",
    price: 11499,
    compareAt: 13999,
    tag: "NEW DROP",
    rating: 4.8,
    reviews: 214,
    colors: ["#14161A", "#2F5BFF", "#F4F2EC"],
    sizes: [6, 7, 8, 9, 10, 11],
    stock: 6,
    img: "https://images.unsplash.com/photo-1669671943625-e20799ee5f42?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1669671943625-e20799ee5f42?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1200&auto=format&fit=crop"
    ],
    desc: "Engineered mesh upper, dual-density foam stack and a reflective cage lace lock. Built for the street, tuned for the drop."
  },
  {
    id: "asc-002",
    name: "Court Runner — Ivory",
    category: "footwear",
    price: 8999,
    compareAt: null,
    tag: "BESTSELLER",
    rating: 4.6,
    reviews: 389,
    colors: ["#F4F2EC", "#9195A0", "#14161A"],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    stock: 14,
    img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=1200&auto=format&fit=crop"
    ],
    desc: "A clean court silhouette in premium full-grain leather. Minimal branding, maximum versatility."
  },
  {
    id: "asc-003",
    name: "Flux Trainer — Signal",
    category: "footwear",
    price: 9799,
    compareAt: 10999,
    tag: "SALE",
    rating: 4.5,
    reviews: 132,
    colors: ["#FF4D1C", "#14161A"],
    sizes: [7, 8, 9, 10, 11],
    stock: 3,
    img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop"
    ],
    desc: "High-rebound compound sole with a signal-orange overlay. Low stock — this colourway won't be restocked."
  },
  {
    id: "asc-004",
    name: "Fleet Hoodie — Charcoal",
    category: "apparel",
    price: 4499,
    compareAt: null,
    tag: null,
    rating: 4.7,
    reviews: 96,
    colors: ["#14161A", "#9195A0"],
    sizes: ["S", "M", "L", "XL"],
    stock: 21,
    img: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop"
    ],
    desc: "Heavyweight 420gsm brushed fleece, dropped shoulder cut, kangaroo pocket with hidden zip."
  },
  {
    id: "asc-005",
    name: "Rail Jacket — Cobalt",
    category: "apparel",
    price: 7299,
    compareAt: 8499,
    tag: "SALE",
    rating: 4.4,
    reviews: 58,
    colors: ["#2F5BFF", "#14161A"],
    sizes: ["S", "M", "L", "XL"],
    stock: 9,
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop"
    ],
    desc: "Water-resistant shell with taped seams and a packable hood. Cut long for layering."
  },
  {
    id: "asc-006",
    name: "Meridian Sunglasses",
    category: "accessories",
    price: 3299,
    compareAt: null,
    tag: "NEW DROP",
    rating: 4.9,
    reviews: 41,
    colors: ["#14161A", "#9195A0"],
    sizes: null,
    stock: 17,
    img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop"
    ],
    desc: "Polarised lenses, stainless hinges, acetate frame. Comes with a hard case and cloth."
  },
  {
    id: "asc-007",
    name: "Ledger Field Watch",
    category: "accessories",
    price: 12999,
    compareAt: null,
    tag: "BESTSELLER",
    rating: 4.8,
    reviews: 77,
    colors: ["#14161A"],
    sizes: null,
    stock: 5,
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1200&auto=format&fit=crop"
    ],
    desc: "Sapphire crystal, 100m water resistance, quick-release NATO strap. Five-year movement warranty."
  },
  {
    id: "asc-008",
    name: "Transit Crossbody",
    category: "accessories",
    price: 5499,
    compareAt: 6299,
    tag: "SALE",
    rating: 4.6,
    reviews: 63,
    colors: ["#14161A", "#F4F2EC"],
    sizes: null,
    stock: 12,
    img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop"
    ],
    desc: "Water-repellent recycled canvas with a full-grain leather base. Fits a 10-inch tablet."
  }
];

// Fallback gradient used by js/main.js when an image fails to load.
const IMG_FALLBACK_BG =
  "linear-gradient(135deg,#1b1d23,#2F5BFF33)";
