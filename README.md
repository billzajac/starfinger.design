This is a hugo site for the portfolio of Selma Starfinger

- Started with the template: https://github.com/gurusabarish/hugo-profile
    - Forked it to fiddle

Hosting on cloudflare pages
- Set environment variable https://github.com/gohugoio/hugo/releases
	- HUGO_VERSION v0.111.3
- https://github.com/aidenwallis/cloudflare-pages-badges (TODO)

## Run

```
hugo --gc # to clear the cache
hugo server -D # to test
```

## Content details

* https://docs.google.com/document/d/1RaWjF9hehq0kMicY2ZY5vE_IGzRWlITqE9-aoiIetHI

## Gallery magic

Files

* content/portfolio.md
* layouts/partials/portfolio.html
* layouts/partials/image-gallery.html
* layouts/shortcodes/image-gallery.html (I'm not really using this one)
* static/lightbox.js
* assets/sass/lightbox.scss

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css"/>
<link rel="stylesheet" href="http://localhost:1313/sass/lightbox.min.d3f575d2ceb8547c985c5477a3e15dd637985e0fe9663881e160030c4aa484dc.css">
<script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js"></script>
<script defer src="/lightbox.js"></script>


The file content/portfolio.md has the galleries and the assets need to be added to /assets/portfolio
The portfolio is loaded from layouts/partials/portfolio.html
There is also javascript magic to create the gallery and how it works

<div style="padding:40% 0 0 0;position:relative;">
<iframe src="https://player.vimeo.com/video/{{ $id }}?h=1e51090569&amp;byline=0&amp;title=0&amp;badge=0&amp;autopause=0&amp;playsinline=0&amp;player_id=0&amp;app_id=122963" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" ></iframe>

<div class="thumb">
<iframe src="https://player.vimeo.com/video/{{ $id }}?byline=0&amp;title=0&amp;badge=0&amp;autopause=0&amp;playsinline=0&amp;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## TODO

### Add videos

* 2018 Eurovision Song Contest
    * https://www.youtube.com/watch?v=WkOFnIjGrkw&t=108s
    * https://www.eurovision-song-reviews.com/2018/03/nova-deca-sanja-ilic-balkanika-eurovision-serbia.html

* 2012 Eurovision Song Contest
    * https://youtu.be/RPCmD2Gqjtc?t=21
    * https://www.youtube.com/watch?v=81hIbZNoFU8&t=114s
    * https://www.youtube.com/watch?v=dMpqjedfRbE
* createurope: THE FASHION ACADEMY AWARD
    * https://www.youtube.com/watch?v=1geLEiuYvJg
* Models
    * https://player.vimeo.com/video/394775500
    * https://player.vimeo.com/video/394777023
* Berlin Fashion Week 2010
    * https://www.youtube.com/watch?v=a8Eq7hm7E14&t=106s

#### To be categorized

* https://youtu.be/cc7YxvgJQzg
* https://youtu.be/q2epvqPM1zw
* https://youtu.be/Codb9n9qWvE
* https://youtu.be/6uPNtNaaJHw
* https://youtu.be/yTV-4th5F0k

