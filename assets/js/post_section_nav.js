/* post_section_nav.js
 *
 * Sticky horizontal section navigator at the top of polished blog posts. Auto-
 * built from H2s found in #markdown-content (or .post-content). Highlights the
 * current section as the user scrolls, smooth-scrolls to anchors on click, and
 * keeps the active link in view inside the rail.
 *
 * Also adds a one-shot reveal-on-scroll fade-up to .figure-container blocks.
 * Bails out if the page has fewer than 2 H2s, or if the user prefers reduced
 * motion (for the reveal pass).
 */
(function () {
  var content = document.getElementById("markdown-content") || document.querySelector(".post-content");
  if (!content) return;

  var headings = Array.prototype.slice.call(content.querySelectorAll(":scope > h2"));
  if (headings.length === 0) {
    // Some posts wrap content in extra <div>s. Walk one level deeper as a fallback.
    headings = Array.prototype.slice.call(content.querySelectorAll(":scope > div > h2"));
  }

  function slugify(s) {
    return (s || "section").toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-") || "section";
  }

  function navbarHeight() {
    var nb = document.getElementById("navbar");
    return nb ? nb.offsetHeight : 56;
  }

  // ---- Section nav ----
  var nav = document.getElementById("post-section-nav");
  var inner = document.getElementById("post-section-nav-inner");

  if (nav && inner && headings.length >= 2) {
    headings.forEach(function (h) {
      if (!h.id) {
        var base = slugify(h.textContent);
        var id = base, n = 1;
        while (document.getElementById(id)) id = base + "-" + ++n;
        h.id = id;
      }
      // Anchor jumps should clear the sticky navbar AND the section bar itself.
      h.style.scrollMarginTop = "7rem";
    });

    headings.forEach(function (h) {
      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.className = "post-section-nav__link";
      a.textContent = h.getAttribute("data-nav") || (h.textContent || "").trim();
      inner.appendChild(a);
    });

    nav.removeAttribute("hidden");
    nav.style.display = "block";

    var links = Array.prototype.slice.call(inner.querySelectorAll(".post-section-nav__link"));

    function syncActive() {
      var threshold = navbarHeight() + nav.offsetHeight + 16;
      var active = 0;
      for (var i = 0; i < headings.length; i++) {
        if (headings[i].getBoundingClientRect().top - threshold <= 0) active = i;
        else break;
      }
      links.forEach(function (l, i) { l.classList.toggle("is-active", i === active); });

      // Keep the active link visible in the horizontally-scrolling rail.
      var activeLink = links[active];
      if (activeLink) {
        var bar = inner.getBoundingClientRect();
        var lr = activeLink.getBoundingClientRect();
        if (lr.left < bar.left + 16) inner.scrollLeft += lr.left - bar.left - 16;
        else if (lr.right > bar.right - 16) inner.scrollLeft += lr.right - bar.right + 16;
      }
    }

    var raf = 0;
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(function () { raf = 0; syncActive(); });
    }

    syncActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Smooth scroll on click.
    inner.addEventListener("click", function (e) {
      var a = e.target.closest("a.post-section-nav__link");
      if (!a) return;
      var href = a.getAttribute("href") || "";
      if (!href.startsWith("#")) return;
      var target = document.getElementById(href.slice(1));
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight() - nav.offsetHeight - 12;
      window.scrollTo({ top: top, behavior: "smooth" });
      history.replaceState(null, "", href);
    });
  }

  // ---- Reveal on scroll for figure containers ----
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var figures = content.querySelectorAll(".figure-container");
  if (figures.length === 0) return;
  figures.forEach(function (el) { el.classList.add("post-reveal"); });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -10% 0px" });
  figures.forEach(function (el) { io.observe(el); });
})();
