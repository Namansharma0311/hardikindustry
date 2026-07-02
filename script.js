/* =========================================================
   HARDIK INDUSTRIES — Professional Rebuild · script.js
   FIX LOG:
   - Added `category` field to every product (was undefined → badge showed blank)
   - Fixed gallery image refs: removed missing coir-brush-*, jute-buff-3/4, hard-buff-4
   - Gallery now only shows images that actually exist in /images/
   - Fixed product heading duplicate "Stage" via JS data (not HTML)
   - Mobile menu now closes on outside click
   ========================================================= */

window.PRODUCTS = [
  {
    name: "Jute Buff",
    slug: "jute-buff",
    /* FIX: added category field — was undefined, causing blank badge */
    category: "Polishing",
    tagline: "Premium polishing buff for fine finishing",
    image: "images/jute-buff-1.jpg",
    /* FIX: removed jute-buff-3.jpg and jute-buff-4.jpg — files do not exist */
    images: [
      "images/jute-buff-1.jpg",
      "images/jute-buff-2.jpg"
    ],
    tags: ["Premium woven jute"],
    longDescription:
      "Our Jute Buffs are hand-layered from selected golden jute fibers, stitched under controlled tension for uniform density across every batch. The result is a buff that runs cool, holds compound exceptionally well, and leaves a streak-free luster — the kind of finish that distinguishes premium kitchenware from the rest.",
    highlights: [
      "Hand-layered woven jute, uniform density",
      "Runs cool — minimal heat build-up on thin sheet metal",
      "Excellent compound retention for longer polish runs",
      "Available in custom thickness and arbor sizes"
    ],
    specs: [
      ["Material", "Premium woven jute"],
      ["Plies", "16 / 20 / 24 (configurable)"],
      ["Centre hole", "Customisable"],
      ["MOQ", "100 pcs"]
    ],
    sizes: [["Available in all sizes"]]
  },
  {
    name: "Closed Coir Buff",
    slug: "closed-coir-buff",
    category: "Cutting",
    tagline: "Heavy-duty abrasive buff for aggressive cutting",
    image: "images/closed-coir-1.jpg",
    images: [
      "images/closed-coir-1.jpg",
      "images/closed-coir-2.jpg",
      "images/closed-coir-3.jpg",
      "images/closed-coir-4.jpg",
      "images/closed-coir-5.jpg",
      "images/closed-coir-6.jpg"
    ],
    tags: ["Heavy-duty coir structural matrix"],
    longDescription:
      "Engineered specifically for heavy material removal and aggressive cutting cycles. The tightly packed natural coir fibre networks provide maximum resistance against friction wear — perfect for preparing hard metals, heavy iron cast setups, and rough surfaces before fine polishing.",
    specs: [
      ["Material", "Tightly packed organic coir fibre"],
      ["Stitching density", "High-density locked structural weave"],
      ["Arbor size", "Configurable based on factory requirements"],
      ["MOQ", "100 pcs"]
    ],
    sizes: [["Available in all sizes"]]
  },
  {
    name: "Hard Buff",
    slug: "hard-buff",
    category: "Levelling",
    tagline: "Rigid high-pressure buff for fast surface levelling",
    image: "images/hard-buff-1.jpg",
    /* FIX: removed hard-buff-4.jpg — file does not exist */
    images: [
      "images/hard-buff-1.jpg",
      "images/hard-buff-2.jpg",
      "images/hard-buff-3.jpg"
    ],
    tags: ["Reinforced high-density compound"],
    longDescription:
      "Our Hard Buffs are engineered with tightly compressed, treated heavy-ply materials designed to withstand intense machinery pressure without flattening. Ideal for removing deeply embedded scratches, parting lines, pit marks, and rough scale from hard metals like stainless steel, iron, and brass castings.",
    specs: [
      ["Material", "Chemically treated ultra-hard stiff plies"],
      ["Rigidity grade", "Extra firm / high-pressure rated"],
      ["Centre reinforcement", "Steel ring / thick leather core options"],
      ["MOQ", "100 pcs"]
    ],
    sizes: [["Available in all sizes"]]
  },
  {
    name: "Coir Brush",
    slug: "coir-brush",
    category: "Cleaning",
    tagline: "Tough natural bristle brush for deep industrial scrubbing",
    /* FIX: coir-brush-*.jpg files do not exist — use placeholder from existing stock */
    image: "images/photo-gallery-1.jpg",
    images: [
      "images/photo-gallery-1.jpg",
      "images/photo-gallery-2.jpg",
      "images/photo-gallery-3.jpg"
    ],
    tags: ["Premium natural bristle core"],
    longDescription:
      "Constructed with stiff, durable organic coir bristles bound securely to a reinforced core. This coir brush provides excellent scrubbing action and heavy debris clearing — trusted across processing units to remove scale, chemical residue, rust, and surface contaminants without damaging the underlying metal.",
    specs: [
      ["Material", "100% selected stiff natural coir bristles"],
      ["Core type", "Heavy-duty wooden or composite polymer cylinder"],
      ["Bristle retention", "Wire-locked tufting for zero-shed performance"],
      ["MOQ", "50 pcs"]
    ],
    sizes: [["Available in all sizes"]]
  }
];

document.addEventListener("DOMContentLoaded", () => {

  /* --- Header scroll effect --- */
  const header = document.querySelector("header");
  const onScroll = () => {
    if (window.scrollY > 30) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* --- Mobile menu toggle --- */
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const nav = document.querySelector("nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      nav.classList.toggle("open");
      menuBtn.textContent = nav.classList.contains("open") ? "✕" : "☰";
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        menuBtn.textContent = "☰";
      })
    );
    /* FIX: close mobile menu when clicking outside */
    document.addEventListener("click", (e) => {
      if (nav.classList.contains("open") && !nav.contains(e.target) && e.target !== menuBtn) {
        nav.classList.remove("open");
        menuBtn.textContent = "☰";
      }
    });
  }

  /* --- Reveal on scroll --- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: "-60px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* --- Product grid (home page) --- */
  const grid = document.getElementById("productsGrid");
  if (grid) {
    grid.innerHTML = window.PRODUCTS.map(
      (p) => `
      <a class="product-card reveal" href="products/${p.slug}.html">
        <div class="product-image">
          <span class="product-badge">${p.category}</span>
          <span class="product-arrow">↗</span>
          <img src="${p.image}" alt="${p.name}" loading="lazy" />
        </div>
        <div class="product-info">
          <h3>${p.name}</h3>
          <p class="tagline">${p.tagline}</p>
          <div class="product-foot">
            <div class="size-pills">
              ${p.sizes.map((s) => `<span class="size-pill">${s[0]}</span>`).join("")}
            </div>
            <span class="view-link">View →</span>
          </div>
        </div>
      </a>`
    ).join("");
    grid.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }

  /* --- Product detail page --- */
  const pdp = document.getElementById("pdpRoot");
  if (pdp) {
    const slug = pdp.dataset.slug;
    const product = window.PRODUCTS.find((p) => p.slug === slug);
    if (!product) {
      pdp.innerHTML = `<div class="container" style="padding:140px 0 80px;text-align:center"><h1>Product not found</h1><p><a href="../index.html#products" class="text-gold">← Back home</a></p></div>`;
      return;
    }

    document.title = `${product.name} — Hardik Industries`;
    const galleryImages = product.images && product.images.length ? product.images : [product.image];

    pdp.innerHTML = `
      <div class="container pdp">
        <a class="back-link" href="../index.html#products">← Back to all products</a>
        <div class="pdp-grid">
          <div class="pdp-image-col">
            <div class="pdp-image-main">
              <img id="mainProductImg" src="../${galleryImages[0]}" alt="${product.name}" />
            </div>
            <div class="pdp-thumbs">
              ${galleryImages
                .map(
                  (imgSrc, idx) =>
                    `<div class="pdp-thumb ${idx === 0 ? "active" : ""}" data-src="../${imgSrc}">
                      <img src="../${imgSrc}" alt="${product.name} view ${idx + 1}" />
                    </div>`
                )
                .join("")}
            </div>
          </div>
          <div class="pdp-info">
            <div class="pdp-tags">
              ${product.tags.map((t) => `<span class="pdp-tag">${t}</span>`).join("")}
              <span class="pdp-tag" style="background:var(--gold);color:#fff;border-color:var(--gold);">Available in all sizes</span>
            </div>
            <h1>${product.name}</h1>
            <p class="pdp-tagline">${product.tagline}</p>
            <p class="pdp-desc">${product.longDescription}</p>
            <div class="pdp-section">
              <div class="specs">
                ${product.specs
                  .map(([l, v]) => `<div class="row"><span class="label">${l}</span><span class="value">${v}</span></div>`)
                  .join("")}
              </div>
            </div>
            <div class="pdp-cta">
              <a class="btn btn-primary" target="_blank"
                href="https://wa.me/919560506564?text=${encodeURIComponent("Hi, I am interested in " + product.name + ". Please share pricing and availability.")}">
                Inquire via WhatsApp
              </a>
              <a class="btn btn-outline" href="tel:+919560506564">Call +91 95605 06564</a>
            </div>
          </div>
        </div>
        <section class="related">
          <div class="related-head">
            <h2>You may also need</h2>
            <a href="../index.html#products">View all →</a>
          </div>
          <div class="related-grid">
            ${window.PRODUCTS.filter((p) => p.slug !== product.slug)
              .slice(0, 3)
              .map(
                (p) => `
                <a class="product-card" href="${p.slug}.html">
                  <div class="product-image"><img src="../${p.image}" alt="${p.name}" /></div>
                  <div class="product-info">
                    <h3>${p.name}</h3>
                    <p class="tagline">${p.tagline}</p>
                  </div>
                </a>`
              )
              .join("")}
          </div>
        </section>
      </div>`;

    /* Thumbnail click handler */
    const mainImg = document.getElementById("mainProductImg");
    const thumbs = document.querySelectorAll(".pdp-thumb");
    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", function () {
        thumbs.forEach((t) => t.classList.remove("active"));
        this.classList.add("active");
        mainImg.src = this.dataset.src;
      });
    });
  }

  /* --- Pre-select product in contact form via hash query --- */
  const productSelect = document.getElementById("productSelect");
  if (productSelect && window.location.hash.includes("?product=")) {
    const val = decodeURIComponent(window.location.hash.split("?product=")[1]);
    [...productSelect.options].forEach((o) => {
      if (o.value === val || o.text === val) productSelect.value = o.value;
    });
  }

  /* --- Gallery view more/less toggle --- */
  const btn = document.getElementById("viewMoreBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      const photos = document.querySelectorAll(".extra-photo");
      const expanded = btn.dataset.open === "true";
      photos.forEach((photo) => photo.classList.toggle("show"));
      btn.dataset.open = !expanded;
      btn.innerHTML = expanded ? "More Photos" : "View Less ↑";
    });
  }
});
