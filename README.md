# simpleImgLazyLoad

##  Refer

* https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video
* https://developers.google.com/web/updates/2016/04/intersectionobserver
* https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver

if support `IntersectionObserver` and use it

fallback use scroll detect getBoundingClientRect

## Usage

### HTML

`img` tag need add

* class -> lazy

* data-src -> lazyload image

* data-srcset (option) -> lazyload hight resolution image

```HTML
<ul>
  <li>
    <img class="lazy" src="d4.png" data-src="image.png" data-srcset="image@2x.png 2x" alt="">
  </li>
  <li>
    <img class="lazy" src="d4.png" data-src="image.png" data-srcset="image@2x.png 2x" alt="">
  </li>
</ul>
```

### JavaScript

* dom - setting dom & it's child img has class `lazy` can lazyload

* fallback (option) - true / false

```JavaScript
simpleImgLazyLoad({
  dom: document.querySelector('ul')
});
```
