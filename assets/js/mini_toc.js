/* mini_toc.js — Auto-built floating right-side mini TOC with scroll-spy.
 *
 * Behaviour:
 *   - Runs on every page; bails out unless the page has 2+ section headings in the
 *     main content area, so it's invisible on short pages by default.
 *   - Bails out if al-folio's existing #toc-sidebar is present (don't duplicate).
 *   - Default appearance: a thin column of dots anchored to the right edge.
 *     Active section's dot is theme-coloured and slightly larger.
 *   - On hover (or keyboard focus), the rail expands and labels slide in to the
 *     left of each dot.
 *   - Smooth-scrolls to the section on click, accounting for the sticky navbar.
 *
 * Hidden under 992px viewports (the rail and labels would crowd the content).
 */
(function () {
  if (document.getElementById("toc-sidebar")) return;

  function pickRoot() {
    const candidates = ["#markdown-content", ".post .cv", ".post article", ".post .clearfix", ".post"];
    for (const sel of candidates) {
      const el = document.querySelector(sel);
      if (el) return el;
    }
    return null;
  }

  const root = pickRoot();
  if (!root) return;

  // Headings to spy on. We accept h2 / h3 / h4 inside the main content area, but
  // skip headings nested in cards / list items / preview blocks since those are
  // entry titles, not page sections.
  const NESTED_BLOCKS = [
    ".talk-card",
    ".home-post-card",
    ".work-row",
    ".blog-item",
    ".publications ol.bibliography",
    ".publications li",
    ".home-posts",
    ".cv-tl-item",
    ".cv-interest-group",
    ".profile",
    ".social",
  ].join(", ");

  let headings = Array.from(root.querySelectorAll("h2, h3, h4")).filter(
    (h) => !h.closest(NESTED_BLOCKS) && h.textContent.trim().length > 0
  );

  // The about layout puts each section header in a wrapper <a>. The kramdown
  // post layout has a "References" h2 we still want to include. Nothing to filter
  // for that case, but keep an eye out for "References" duplicates.
  if (headings.length < 2) return;

  function slugify(s) {
    return s
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  // Make sure every heading has an id we can anchor to.
  headings.forEach((h) => {
    if (!h.id) {
      let base = slugify(h.textContent || "section");
      if (!base) base = "section";
      let candidate = base;
      let n = 1;
      while (document.getElementById(candidate)) {
        n += 1;
        candidate = base + "-" + n;
      }
      h.id = candidate;
    }
    // Keep the heading visually clear of the sticky navbar when scrolled to via
    // the URL fragment.
    h.style.scrollMarginTop = "5rem";
  });

  // Build the TOC element.
  const aside = document.createElement("aside");
  aside.className = "mini-toc";
  aside.setAttribute("aria-label", "On this page");

  const list = document.createElement("ol");
  list.className = "mini-toc__list";

  headings.forEach((h) => {
    const li = document.createElement("li");
    li.className = "mini-toc__item mini-toc__item--" + h.tagName.toLowerCase();
    li.dataset.target = h.id;

    const a = document.createElement("a");
    a.href = "#" + h.id;

    const label = document.createElement("span");
    label.className = "mini-toc__label";
    label.textContent = h.textContent.trim();

    const dot = document.createElement("span");
    dot.className = "mini-toc__dot";
    dot.setAttribute("aria-hidden", "true");

    a.appendChild(label);
    a.appendChild(dot);
    li.appendChild(a);
    list.appendChild(li);
  });

  aside.appendChild(list);
  document.body.appendChild(aside);

  const items = Array.from(aside.querySelectorAll(".mini-toc__item"));

  function activate(id) {
    items.forEach((item) => {
      item.classList.toggle("is-active", item.dataset.target === id);
    });
  }

  // Scroll-spy: the active section is the last heading whose top has crossed an
  // activation line just below the navbar. Cheaper and more predictable than
  // IntersectionObserver for this use-case.
  function navbarOffset() {
    const navbar = document.getElementById("navbar");
    return (navbar ? navbar.offsetHeight : 56) + 24;
  }

  function syncActive() {
    const offset = navbarOffset();
    let active = headings[0];
    for (const h of headings) {
      if (h.getBoundingClientRect().top - offset <= 0) active = h;
      else break;
    }
    activate(active.id);
  }

  let raf = 0;
  function onScroll() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      syncActive();
    });
  }

  syncActive();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  // Smooth scroll on click — replicate browser anchor jump but with the
  // navbar-aware offset, and update the URL fragment without re-jumping.
  aside.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    const href = a.getAttribute("href") || "";
    if (!href.startsWith("#")) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.pageYOffset - navbarOffset();
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", href);
  });
})();
