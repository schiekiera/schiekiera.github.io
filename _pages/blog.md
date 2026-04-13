---
layout: default
title: blog
permalink: /blog/
nav: true
nav_order: 3
---

<div class="post blog-index">
  <header class="blog-hero">
    <h1 class="blog-title">{{ site.blog_name }}</h1>
    {% if site.blog_description %}
      <p class="blog-subtitle">{{ site.blog_description }}</p>
    {% endif %}
  </header>

{% assign featured_posts = site.posts | where: "featured", true %}
{% if featured_posts.size > 0 %}

<section class="featured-section">
<h2 class="section-heading">Featured</h2>
<div class="featured-grid">
{% for post in featured_posts %}
<a class="featured-card" href="{{ post.url | relative_url }}">
{% if post.thumbnail %}
<div class="featured-thumb">
<img src="{{ post.thumbnail | relative_url }}" alt="{{ post.title }}">
</div>
{% endif %}
<div class="featured-body">
<h3 class="featured-title">{{ post.title }}</h3>
{% if post.description %}
<p class="featured-description">{{ post.description | strip_html | truncate: 180 }}</p>
{% endif %}
<p class="featured-meta">
<i class="fa-solid fa-calendar fa-sm"></i>
{{ post.date | date: '%B %-d, %Y' }}
</p>
</div>
</a>
{% endfor %}
</div>
</section>
{% endif %}

{% assign series_posts = site.posts | where_exp: "item", "item.series_title" %}
{% if series_posts.size > 0 %}

<section class="series-section">
<h2 class="section-heading">Post Series</h2>
<div class="series-grid">
{% for post in series_posts %}
<a href="{{ post.url | relative_url }}" class="series-card">
<div class="series-card-title">{{ post.series_title }}</div>
{% if post.series_description %}
<div class="series-card-description">{{ post.series_description }}</div>
{% endif %}
</a>
{% endfor %}
</div>
</section>
{% endif %}

  <section class="recent-section">
    <h2 class="section-heading">Recent Posts</h2>
    {% assign visible_posts = site.posts | where_exp: "item", "item.hidden != true" %}
    <ul class="post-cards">
      {% for post in visible_posts %}
        {% if post.external_source == blank %}
          {% assign words = post.content | number_of_words %}
        {% else %}
          {% assign words = post.feed_content | strip_html | number_of_words %}
        {% endif %}
        {% assign read_time = words | divided_by: 180 | plus: 1 %}
        <li class="post-card">
          <a class="post-card-link" href="{{ post.url | relative_url }}">
            {% if post.thumbnail %}
              <div class="post-card-thumb">
                <img src="{{ post.thumbnail | relative_url }}" alt="{{ post.title }}">
              </div>
            {% endif %}
            <div class="post-card-body">
              <h3 class="post-card-title">{{ post.title }}</h3>
              {% if post.description %}
                <p class="post-card-description">{{ post.description | strip_html | truncate: 260 }}</p>
              {% endif %}
              <div class="post-card-meta">
                <span><i class="fa-solid fa-calendar fa-sm"></i> {{ post.date | date: '%B %-d, %Y' }}</span>
                <span><i class="fa-regular fa-clock fa-sm"></i> {{ read_time }} min read</span>
              </div>
              {% if post.tags and post.tags.size > 0 %}
                <div class="post-card-tags">
                  {% for tag in post.tags %}
                    <span class="post-card-tag"><i class="fa-solid fa-hashtag fa-xs"></i>{{ tag }}</span>
                  {% endfor %}
                </div>
              {% endif %}
            </div>
          </a>
        </li>
      {% endfor %}
    </ul>
  </section>
</div>
