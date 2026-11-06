// View toggles: a pill-shaped switch with a sliding thumb (`.seg-toggle`).
//
//   <div class="seg-toggle" role="group" aria-label="..." data-target="#box" data-label-target="#word">
//     <span class="seg-toggle__thumb" aria-hidden="true"></span>
//     <button type="button" class="seg-toggle__opt is-active" data-value="a" data-label="..." aria-pressed="true">A</button>
//     <button type="button" class="seg-toggle__opt" data-value="b" data-label="..." aria-pressed="false">B</button>
//   </div>
//
// Picking an option sets data-view="<value>" on the target, and CSS shows or hides content from
// that. With data-label-target, the element's text becomes the option's data-label (used for the
// "highlighted" / "all" word in the section headings). A <template data-view-lazy="<value>"> inside
// the target is rendered the first time that view is picked, so hidden content costs nothing until
// it is wanted. In a two-option toggle, clicking the selected option flips to the other one, so the
// whole pill works like a switch.
(function () {
  "use strict";

  function placeThumb(toggle, animate) {
    var thumb = toggle.querySelector(".seg-toggle__thumb");
    var active = toggle.querySelector(".seg-toggle__opt.is-active");
    if (!thumb || !active) return;
    if (!animate) thumb.style.transition = "none";
    thumb.style.width = active.offsetWidth + "px";
    thumb.style.transform = "translateX(" + active.offsetLeft + "px)";
    if (!animate) {
      void thumb.offsetWidth; // apply the jump before the transition comes back
      thumb.style.transition = "";
    }
  }

  function renderLazy(target, value) {
    target.querySelectorAll('template[data-view-lazy="' + value + '"]').forEach(function (tpl) {
      tpl.replaceWith(tpl.content.cloneNode(true));
    });
    // Publication badges in freshly rendered entries (no-ops when the embeds are not loaded).
    try {
      if (window._altmetric_embed_init) window._altmetric_embed_init();
      if (window.__dimensions_embed) window.__dimensions_embed.addBadges();
    } catch (e) {}
  }

  function select(toggle, value, animate) {
    var options = toggle.querySelectorAll(".seg-toggle__opt");
    var active = null;
    options.forEach(function (btn) {
      var on = btn.getAttribute("data-value") === value;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      if (on) active = btn;
    });
    if (!active) return;
    placeThumb(toggle, animate);

    var target = document.querySelector(toggle.getAttribute("data-target"));
    if (target) {
      renderLazy(target, value);
      target.setAttribute("data-view", value);
    }
    var labelSel = toggle.getAttribute("data-label-target");
    var label = labelSel && document.querySelector(labelSel);
    if (label && active.hasAttribute("data-label")) label.textContent = active.getAttribute("data-label");
  }

  function init(toggle) {
    var options = toggle.querySelectorAll(".seg-toggle__opt");
    options.forEach(function (btn, i) {
      btn.addEventListener("click", function () {
        var next = btn;
        if (btn.classList.contains("is-active") && options.length === 2) next = options[1 - i];
        select(toggle, next.getAttribute("data-value"), true);
      });
    });
    placeThumb(toggle, false);
    toggle.classList.add("is-ready");
    // Option widths change when web fonts arrive or the layout reflows.
    if ("ResizeObserver" in window) {
      new ResizeObserver(function () {
        placeThumb(toggle, false);
      }).observe(toggle);
    }
  }

  // Side-by-side animation pairs (`.anim-compare[data-sync]`, see the ICML blog post): the frames
  // share one clock (?sync=<name> on each iframe). On narrow screens the pair stacks, so there each
  // frame runs on its own and starts when the reader scrolls to it.
  function linkAnimations(box) {
    var name = box.getAttribute("data-sync");
    var reg = window.__loopSync || (window.__loopSync = {});
    var group = reg[name] || (reg[name] = { linked: true, elapsed: 0, paused: false, last: null, members: [] });
    var stacked = window.matchMedia("(max-width: 640px)");
    var update = function () {
      group.linked = !stacked.matches;
    };
    update();
    if (stacked.addEventListener) stacked.addEventListener("change", update);
    else if (stacked.addListener) stacked.addListener(update);
  }

  function start() {
    document.querySelectorAll(".seg-toggle").forEach(init);
    document.querySelectorAll(".anim-compare[data-sync]").forEach(linkAnimations);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
