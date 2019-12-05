(function () {
  // https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video
  // https://developers.google.com/web/updates/2016/04/intersectionobserver
  // https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
  function simpleImgLazyLoad(option) {
    if (!option.dom) {
      console.error('simpleImgLazyLoad: not set dom arg');
      return;
    }

    var dom = option.dom,
      lazyImages = [].slice.call(dom.querySelectorAll('img.lazy'));
    var active = false;

    if ('IntersectionObserver' in window) {
      observer();
    } else {
      // Possibly fall back to a more compatible method here
      console.warn('simpleImgLazyLoad: not support IntersectionObserver');
      failback();
    }

    function observer() {
      let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            let lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            if (lazyImage.dataset.srcset) {
              lazyImage.srcset = lazyImage.dataset.srcset;
            }
            lazyImage.classList.remove('lazy');
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });

      lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    }

    function fallback() {
      var lazyLoad = function() {
        if (active === false) {
          active = true;
          setTimeout(function() {
            lazyImages.forEach(function(lazyImage) {
              if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.srcset = lazyImage.dataset.srcset;
                lazyImage.classList.remove('lazy');

                lazyImages = lazyImages.filter(function(image) {
                  return image !== lazyImage;
                });

                if (lazyImages.length === 0) {
                  document.removeEventListener('scroll', lazyLoad);
                  window.removeEventListener('resize', lazyLoad);
                  window.removeEventListener('orientationchange', lazyLoad);
                }
              }
            });

            active = false;
          }, 200);
        }
      }

      document.addEventListener('scroll', lazyLoad);
      window.addEventListener('resize', lazyLoad);
      window.addEventListener('orientationchange', lazyLoad);
    }
  }
  window.simpleImgLazyLoad = simpleImgLazyLoad;
})();