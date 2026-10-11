(function () {
  // fallback hero image
  const heroImg = document.querySelector('img[data-hero="true"]');
  const fallback = document.getElementById('fallbackCard');
  if (!heroImg || !fallback) return;

  heroImg.addEventListener('error', () => {
    fallback.style.display = 'block';
  });
})();

(function () {
  const wrap = document.querySelector("[data-lang]");
  if (!wrap) return;

  const btn = wrap.querySelector("[data-lang-btn]");
  const menu = wrap.querySelector("[data-lang-menu]");

  function openMenu() {
    menu.classList.remove("hidden");
    btn.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    menu.classList.add("hidden");
    btn.setAttribute("aria-expanded", "false");
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.contains("hidden") ? openMenu() : closeMenu();
  });

  document.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();

// Games page filter (category + search)
// Games page filter (category + search)
(function () {
  const root = document.querySelector("[data-games-page]");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll(".games-tab"));
  const cards = Array.from(root.querySelectorAll(".games-card"));
  const searchInput = root.querySelector("#gamesSearch");

  const ACTIVE = ["!bg-limeEgg", "!text-black", "!hover:bg-limeEgg", "!hover:text-black"];
  const INACTIVE = ["bg-white/5", "text-white/80"];

  let activeCategory = "All";
  let query = "";

  // ✅ normalisasi aman (hindari spasi/case)
  const norm = (s) => (s || "").trim().toLowerCase();

  function setBtnState(btn, isActive) {
    btn.classList.remove(...ACTIVE);
    btn.classList.remove(...INACTIVE);

    if (isActive) {
      btn.classList.add(...ACTIVE);
      btn.setAttribute("aria-pressed", "true");
    } else {
      btn.classList.add(...INACTIVE);
      btn.setAttribute("aria-pressed", "false");
    }
  }

  function applyFilters() {
    const q = norm(query);
    const activeLower = norm(activeCategory);

    cards.forEach((card) => {
      const cat = norm(card.dataset.category);
      const title = norm(card.dataset.title);

      const matchCategory = activeLower === "all" || cat === activeLower;
      const matchSearch = !q || title.includes(q);

      card.style.display = matchCategory && matchSearch ? "" : "none";
    });
  }

  function setActiveTab(category) {
    // ✅ trim supaya "All " tidak kejadian
    activeCategory = (category || "All").trim();

    tabs.forEach((btn) => {
      const isActive = norm(btn.dataset.category) === norm(activeCategory);
      setBtnState(btn, isActive);
    });

    applyFilters();
  }

  // click handlers
  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      // ✅ baca dataset lalu trim
      setActiveTab((btn.dataset.category || "All").trim());
    });
  });

  // search handler
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      query = e.target.value || "";
      applyFilters();
    });
  }

  // INIT
  tabs.forEach((btn) => setBtnState(btn, false));

  const allTab = tabs.find((t) => norm(t.dataset.category) === "all");
  setActiveTab(allTab ? allTab.dataset.category : (tabs[0]?.dataset.category || "All"));
})();


// ===== About Owl (simple peek, infinite loop) =====
(function () {
  const $owl = $(".about-owl.owl-carousel");
  if (!$owl.length) return;

  $owl.owlCarousel({
    items: 1,
    loop: true,
    center: true,          // ✅ bikin card tengah (penting untuk tampilan screenshot)
    nav: false,
    dots: false,
    autoplay: false,

    margin: 18,
    stagePadding: 60,      // ✅ peek kiri/kanan
    smartSpeed: 650,

    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,

    responsive: {
      // mobile: peek kecil biar aman
      0: {
        items: 1,
        margin: 10,
        stagePadding: 50
      },
      // tablet: peek sedang
      768: {
        items: 1,
        margin: 18,
        stagePadding: 150
      },
      // desktop: peek besar seperti screenshot
      1024: {
        items: 1,
        margin: 20,
        stagePadding: 80
      },
      1280: {
        items: 1,
        margin: 10,
        stagePadding: 130
      }
    }
  });

  // optional: refresh saat semua gambar selesai load (biar hitungan lebar akurat)
  $(window).on("load", function () {
    $owl.trigger("refresh.owl.carousel");
  });
})();


// ===== FAQ Swap animation (NO SCALE, animate left/top/width/height) =====
(function () {
  const root = document.querySelector("[data-faq-swap]");
  if (!root) return;

  const big = root.querySelector('[data-faq-role="big"]');
  if (!big) return;

  let locked = false;

  function setBig(q, a) {
    big.setAttribute("data-q", q);
    big.setAttribute("data-a", a);
    big.querySelector("[data-faq-q]").textContent = q;
    big.querySelector("[data-faq-a]").textContent = a;
  }

  function setSmall(card, q, a) {
    card.setAttribute("data-q", q);
    card.setAttribute("data-a", a);
    const qEl = card.querySelector("[data-faq-q]");
    if (qEl) qEl.textContent = q;
  }

  function cloneAsFixed(el, rect) {
    const clone = el.cloneNode(true);
    clone.classList.add("faq-swap-clone");

    clone.style.left = rect.left + "px";
    clone.style.top = rect.top + "px";
    clone.style.width = rect.width + "px";
    clone.style.height = rect.height + "px";

    return clone;
  }

  root.addEventListener("click", async (e) => {
    const small = e.target.closest('[data-faq-role="small"]');
    if (!small || locked) return;
    locked = true;

    const sQ = small.getAttribute("data-q") || "";
    const sA = small.getAttribute("data-a") || "";
    const bQ = big.getAttribute("data-q") || "";
    const bA = big.getAttribute("data-a") || "";

    const bigRect = big.getBoundingClientRect();
    const smallRect = small.getBoundingClientRect();

    // clone big template but set its content to clicked small (so it looks correct during animation)
    const toBig = cloneAsFixed(big, smallRect);
    toBig.querySelector("[data-faq-q]").textContent = sQ;
    toBig.querySelector("[data-faq-a]").textContent = sA;
    const toBigIcon = toBig.querySelector(".bi");
    if (toBigIcon) { toBigIcon.classList.remove("bi-plus"); toBigIcon.classList.add("bi-dash"); }

    // clone small template but set its title to old big (so it looks correct during animation)
    const toSmall = cloneAsFixed(small, bigRect);
    toSmall.querySelector("[data-faq-q]").textContent = bQ;
    const toSmallIcon = toSmall.querySelector(".bi");
    if (toSmallIcon) { toSmallIcon.classList.remove("bi-dash"); toSmallIcon.classList.add("bi-plus"); }

    document.body.appendChild(toBig);
    document.body.appendChild(toSmall);

    // hide originals
    big.style.visibility = "hidden";
    small.style.visibility = "hidden";

    const duration = 420;
    const easing = "cubic-bezier(.2,.9,.2,1)";

    // animate toBig: from smallRect -> bigRect (no scale)
    const anim1 = toBig.animate(
      [
        { left: smallRect.left + "px", top: smallRect.top + "px", width: smallRect.width + "px", height: smallRect.height + "px", opacity: 1 },
        { left: bigRect.left + "px",   top: bigRect.top + "px",   width: bigRect.width + "px",   height: bigRect.height + "px",   opacity: 1 }
      ],
      { duration, easing, fill: "forwards" }
    );

    // animate toSmall: from bigRect -> smallRect (no scale)
    const anim2 = toSmall.animate(
      [
        { left: bigRect.left + "px",   top: bigRect.top + "px",   width: bigRect.width + "px",   height: bigRect.height + "px",   opacity: 1 },
        { left: smallRect.left + "px", top: smallRect.top + "px", width: smallRect.width + "px", height: smallRect.height + "px", opacity: 1 }
      ],
      { duration, easing, fill: "forwards" }
    );

    try {
      await Promise.all([anim1.finished, anim2.finished]);
    } catch (_) {}

    // swap real content
    setBig(sQ, sA);
    setSmall(small, bQ, bA);

    // show originals
    big.style.visibility = "";
    small.style.visibility = "";

    // cleanup
    toBig.remove();
    toSmall.remove();

    locked = false;
  });
})();


