/* post_section_nav.js
 *
 * Three behaviours wired up site-wide for blog posts that use layout: post:
 *
 *  1. Auto-wrap the body into alternating sections. After the markdown is
 *     rendered, walk #markdown-content and group everything between H2s into
 *     a <section class="post-section [post-section--alt]"> wrapper. Even-index
 *     sections get the alt class so the SCSS can paint a full-width band of
 *     the alt background colour underneath them. Content before the first H2
 *     is left as-is so the post can have a free-form lede.
 *
 *  2. Build a sticky horizontal section nav from the same H2s, with a
 *     scroll-spy that highlights the current section as the user scrolls and
 *     auto-scrolls the rail to keep the active link in view.
 *
 *  3. Reveal-on-scroll on every child of the body. Each direct child of
 *     #markdown-content (and each direct child of every .post-section) gets a
 *     .post-reveal class and an IntersectionObserver flips them to .is-visible
 *     as they enter the viewport. Skipped if the user prefers reduced motion.
 *
 *  Bails out gracefully on pages that don't have #markdown-content / the nav
 *  mount points, so it's safe to load site-wide.
 */
(function () {
  var content = document.getElementById("markdown-content") || document.querySelector(".post-content");
  if (!content) return;

  function slugify(s) {
    return (s || "section")
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") || "section";
  }

  function navbarHeight() {
    var nb = document.getElementById("navbar");
    return nb ? nb.offsetHeight : 56;
  }

  // ---- 1. Capture H2s up front (before we move them around). ----
  var headings = Array.prototype.slice.call(content.querySelectorAll(":scope > h2"));

  // Ensure stable IDs and a navbar-aware scroll offset on every H2 we'll spy on.
  headings.forEach(function (h) {
    if (!h.id) {
      var base = slugify(h.textContent);
      var id = base, n = 1;
      while (document.getElementById(id)) id = base + "-" + ++n;
      h.id = id;
    }
    h.style.scrollMarginTop = "7rem";
  });

  // ---- 2. Auto-wrap content into alternating sections. ----
  if (headings.length >= 2) {
    headings.forEach(function (h, idx) {
      var section = document.createElement("section");
      section.className = "post-section" + (idx % 2 === 1 ? " post-section--alt" : "");
      h.parentNode.insertBefore(section, h);
      var node = h;
      var stop = headings[idx + 1] || null;
      while (node && node !== stop) {
        var next = node.nextSibling;
        section.appendChild(node);
        node = next;
      }
    });
  }

  // ---- 3. Build the sticky section nav. ----
  var nav = document.getElementById("post-section-nav");
  var inner = document.getElementById("post-section-nav-inner");

  if (nav && inner && headings.length >= 2) {
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

  // ---- 4. Reveal-on-scroll for every body element. ----
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // Collect direct children of #markdown-content AND direct children of each
  // section we just wrapped. Skip the section wrappers themselves (we animate
  // their contents instead) and skip empty/whitespace text nodes.
  var revealTargets = [];
  Array.prototype.forEach.call(content.children, function (child) {
    if (child.classList && child.classList.contains("post-section")) {
      Array.prototype.forEach.call(child.children, function (gc) { revealTargets.push(gc); });
    } else {
      revealTargets.push(child);
    }
  });

  revealTargets.forEach(function (el) { el.classList.add("post-reveal"); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: "0px 0px -8% 0px" });

  revealTargets.forEach(function (el) { io.observe(el); });
})();
