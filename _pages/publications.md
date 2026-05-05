---
layout: page
permalink: /publications/
title: publications
description: List of all my publications. You can filter by tag.
nav: true
nav_order: 2
---

{% include pub_tag_filter.liquid %}

<div class="publications">

{% bibliography %}

</div>

<script>
(function () {
  function init() {
    var bar = document.getElementById('pub-tag-filter');
    if (!bar) return;
    var buttons = bar.querySelectorAll('.pub-tag-btn');
    var items = document.querySelectorAll('.publications ol.bibliography > li');
    var headers = document.querySelectorAll('.publications ol.bibliography > h2.bibliography');
    var emptyState = document.getElementById('pub-empty-state');

    function applyFilter(tag) {
      var visibleCount = 0;
      items.forEach(function (li) {
        if (tag === 'all') {
          li.style.display = '';
          visibleCount++;
          return;
        }
        var box = li.querySelector('.bib-tags');
        var entryTags = box ? box.getAttribute('data-tags').split(',').map(function (s) { return s.trim(); }) : [];
        var match = entryTags.indexOf(tag) !== -1;
        li.style.display = match ? '' : 'none';
        if (match) visibleCount++;
      });
      headers.forEach(function (h2) {
        var sib = h2.nextElementSibling;
        var anyVisible = false;
        while (sib && !(sib.tagName === 'H2' && sib.classList.contains('bibliography'))) {
          if (sib.tagName === 'LI' && sib.style.display !== 'none') { anyVisible = true; break; }
          sib = sib.nextElementSibling;
        }
        h2.style.display = anyVisible ? '' : 'none';
      });
      if (emptyState) emptyState.hidden = visibleCount > 0;
    }

    function activate(tag) {
      var match = bar.querySelector('.pub-tag-btn[data-tag="' + tag + '"]');
      if (!match) return false;
      buttons.forEach(function (b) { b.classList.toggle('active', b === match); });
      applyFilter(tag);
      return true;
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tag = btn.getAttribute('data-tag');
        activate(tag);
        // Reflect filter in the URL so it's shareable / back-button friendly.
        var url = new URL(window.location.href);
        if (tag === 'all') url.searchParams.delete('tag'); else url.searchParams.set('tag', tag);
        history.replaceState(null, '', url);
      });
    });

    document.querySelectorAll('.publications .bib-tag').forEach(function (chip) {
      chip.addEventListener('click', function (e) {
        // Stay on the page when clicked from /publications/ — the global
        // bar handles state. From the homepage the chip's href takes the
        // user here with ?tag=… already set, so the load-time block below
        // applies it.
        e.preventDefault();
        var tag = chip.getAttribute('data-tag');
        if (activate(tag)) {
          var url = new URL(window.location.href);
          url.searchParams.set('tag', tag);
          history.replaceState(null, '', url);
        }
      });
    });

    // Apply ?tag=… from the URL on first load.
    var initialTag = new URLSearchParams(window.location.search).get('tag');
    if (initialTag) activate(initialTag);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>
