---
layout: page
permalink: /talks/
title: talks & activities
description: talks, posters, events, and other activities.
nav: true
nav_order: 5
---

{% assign all_presentations = site.data.talks | sort: "date" | reverse %}
{% assign talks_only = "" | split: "" %}
{% assign posters_only = "" | split: "" %}
{% for activity in all_presentations %}
  {% if activity.presentation_type == "talk" %}
    {% assign talks_only = talks_only | push: activity %}
  {% else %}
    {% assign posters_only = posters_only | push: activity %}
  {% endif %}
{% endfor %}

{% if talks_only.size > 0 %}
<div class="talks-section">
  <h3 class="talks-section-header">talks</h3>
  <div class="talks-grid">
    {% for activity in talks_only %}
      <article class="talk-card talk-card--talk">
        <header class="talk-card__head">
          <span class="talk-card__kind">talk</span>
          {% if activity.status == "accepted" %}<span class="talk-card__status" title="Accepted, upcoming"><i class="fa-solid fa-circle-check"></i> Accepted</span>{% endif %}
          <span class="talk-card__date"><i class="fa-regular fa-calendar"></i> {{ activity.date | date: "%b %Y" }}</span>
        </header>
        <h4 class="talk-card__venue">{{ activity.venue }}</h4>
        {% if activity.location %}<p class="talk-card__loc"><i class="fa-solid fa-location-dot"></i> {{ activity.location }}</p>{% endif %}
        {% if activity.description %}
          <p class="talk-card__desc">
            {% if activity.poster %}<a href="{{ activity.poster }}">{{ activity.description }}</a>{% elsif activity.slides %}<a href="{{ activity.slides }}">{{ activity.description }}</a>{% elsif activity.link %}<a href="{{ activity.link }}">{{ activity.description }}</a>{% else %}{{ activity.description }}{% endif %}
          </p>
        {% endif %}
        {% if activity.speaker %}<p class="talk-card__speaker"><i class="fa-regular fa-user"></i> presented by {{ activity.speaker }}</p>{% endif %}
        {% if activity.slides or activity.video or activity.link %}
          <footer class="talk-card__actions">
            {% if activity.link and activity.description %}<a class="talk-card__chip" href="{{ activity.link }}"><i class="fa-solid fa-arrow-up-right-from-square"></i> info</a>{% endif %}
            {% if activity.slides %}<a class="talk-card__chip talk-card__chip--asset" href="{{ activity.slides }}"><i class="fa-regular fa-file-powerpoint"></i> slides</a>{% endif %}
            {% if activity.video %}<a class="talk-card__chip" href="{{ activity.video }}"><i class="fa-solid fa-video"></i> video</a>{% endif %}
          </footer>
        {% endif %}
      </article>
    {% endfor %}
  </div>
</div>
{% endif %}

{% if posters_only.size > 0 %}
<div class="talks-section">
  <h3 class="talks-section-header">posters</h3>
  <div class="talks-grid">
    {% for activity in posters_only %}
      <article class="talk-card talk-card--poster">
        <header class="talk-card__head">
          <span class="talk-card__kind">poster</span>
          {% if activity.status == "accepted" %}<span class="talk-card__status" title="Accepted, upcoming"><i class="fa-solid fa-circle-check"></i> Accepted</span>{% endif %}
          <span class="talk-card__date"><i class="fa-regular fa-calendar"></i> {{ activity.date | date: "%b %Y" }}</span>
        </header>
        <h4 class="talk-card__venue">{{ activity.venue }}</h4>
        {% if activity.location %}<p class="talk-card__loc"><i class="fa-solid fa-location-dot"></i> {{ activity.location }}</p>{% endif %}
        {% if activity.description %}
          <p class="talk-card__desc">
            {% if activity.poster %}<a href="{{ activity.poster }}">{{ activity.description }}</a>{% elsif activity.slides %}<a href="{{ activity.slides }}">{{ activity.description }}</a>{% elsif activity.link %}<a href="{{ activity.link }}">{{ activity.description }}</a>{% else %}{{ activity.description }}{% endif %}
          </p>
        {% endif %}
        {% if activity.speaker %}<p class="talk-card__speaker"><i class="fa-regular fa-user"></i> presented by {{ activity.speaker }}</p>{% endif %}
        {% if activity.poster or activity.slides or activity.video or activity.link %}
          <footer class="talk-card__actions">
            {% if activity.link and activity.description %}<a class="talk-card__chip" href="{{ activity.link }}"><i class="fa-solid fa-arrow-up-right-from-square"></i> info</a>{% endif %}
            {% if activity.poster %}<a class="talk-card__chip talk-card__chip--asset" href="{{ activity.poster }}"><i class="fa-regular fa-image"></i> poster</a>{% endif %}
            {% if activity.slides %}<a class="talk-card__chip talk-card__chip--asset" href="{{ activity.slides }}"><i class="fa-regular fa-file-powerpoint"></i> slides</a>{% endif %}
            {% if activity.video %}<a class="talk-card__chip" href="{{ activity.video }}"><i class="fa-solid fa-video"></i> video</a>{% endif %}
          </footer>
        {% endif %}
      </article>
    {% endfor %}
  </div>
</div>
{% endif %}

{% assign all_events = site.data.events | sort: "date" | reverse %}
{% if all_events.size > 0 %}
<div class="talks-section">
  <h3 class="talks-section-header">event participation</h3>
  <ul class="activity-list">
  {% for activity in all_events %}
    <li class="activity-row">
      <span class="activity-row__date">{{ activity.date | date: "%b %Y" }}</span>
      <span class="activity-row__main">
        {% if activity.link %}<a class="activity-row__venue" href="{{ activity.link }}">{{ activity.venue }}</a>{% else %}<span class="activity-row__venue">{{ activity.venue }}</span>{% endif %}
        {% if activity.location %}<span class="activity-row__loc">— {{ activity.location }}</span>{% endif %}
      </span>
    </li>
  {% endfor %}
  </ul>
</div>
{% endif %}

{% assign teaching_activities = site.data.teaching | sort: "date" | reverse %}
{% if teaching_activities.size > 0 %}
<div class="talks-section">
  <h3 class="talks-section-header">teaching</h3>
  <ul class="activity-list">
  {% for activity in teaching_activities %}
    <li class="activity-row">
      <span class="activity-row__date">{{ activity.semester }}</span>
      <span class="activity-row__main">
        <span class="activity-row__venue">{{ activity.course }}</span>{% if activity.type %} <span class="activity-row__loc">({{ activity.type }})</span>{% endif %}
        <span class="activity-row__sub">{{ activity.institution }}{% if activity.location %}, {{ activity.location }}{% endif %}{% if activity.seminar %} — in seminar “{{ activity.seminar }}”{% if activity.host %}, taught by {{ activity.host }}{% endif %}{% endif %}</span>
      </span>
    </li>
  {% endfor %}
  </ul>
</div>
{% endif %}

{% assign consulting_activities = site.data.consulting | sort: "date" | reverse %}
{% if consulting_activities.size > 0 %}
<div class="talks-section">
  <h3 class="talks-section-header">consulting</h3>
  <ul class="activity-list">
  {% for activity in consulting_activities %}
    <li class="activity-row">
      <span class="activity-row__date">{% if activity.start %}{{ activity.start | date: "%b %Y" }} – {% if activity.end %}{{ activity.end | date: "%b %Y" }}{% else %}present{% endif %}{% else %}{{ activity.date | date: "%b %Y" }}{% endif %}</span>
      <span class="activity-row__main">
        <span class="activity-row__venue">{{ activity.role }}</span>
        <span class="activity-row__sub">{% if activity.link %}<a href="{{ activity.link }}">{{ activity.organization }}</a>{% else %}{{ activity.organization }}{% endif %}{% if activity.institution %}, {{ activity.institution }}{% endif %}{% if activity.location %}, {{ activity.location }}{% endif %}{% if activity.description %} — {{ activity.description }}{% endif %}</span>
      </span>
    </li>
  {% endfor %}
  </ul>
</div>
{% endif %}

{% assign reviewing_activities = site.data.other | where: "type", "reviewing" | sort: "date" | reverse %}
{% if reviewing_activities.size > 0 %}
<div class="talks-section">
  <h3 class="talks-section-header">reviewing</h3>
  <div class="reviewing-pills">
    {% for activity in reviewing_activities %}{% if activity.link %}<a class="reviewing-pill" href="{{ activity.link }}">{{ activity.venue }}</a>{% else %}<span class="reviewing-pill">{{ activity.venue }}</span>{% endif %}{% endfor %}
  </div>
</div>
{% endif %}

{% assign media_activities = site.data.other | where: "type", "media" | sort: "date" | reverse %}
{% if media_activities.size > 0 %}
<div class="talks-section">
  <h3 class="talks-section-header">media & interviews</h3>
  <ul class="activity-list">
  {% for activity in media_activities %}
    <li class="activity-row">
      <span class="activity-row__date">{{ activity.date | date: "%b %Y" }}</span>
      <span class="activity-row__main">
        {% if activity.link %}<a class="activity-row__venue" href="{{ activity.link }}">{{ activity.venue }}</a>{% else %}<span class="activity-row__venue">{{ activity.venue }}</span>{% endif %}
      </span>
    </li>
  {% endfor %}
  </ul>
</div>
{% endif %}
