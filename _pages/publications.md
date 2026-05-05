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

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.toggle('active', b === btn); });
        applyFilter(btn.getAttribute('data-tag'));
      });
    });

    document.querySelectorAll('.publications .bib-tag').forEach(function (chip) {
      chip.addEventListener('click', function (e) {
        e.preventDefault();
        var tag = chip.getAttribute('data-tag');
        var target = bar.querySelector('.pub-tag-btn[data-tag="' + tag + '"]');
        if (target) target.click();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>
