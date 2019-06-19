//// svg inline
var mySVGsToInject = document.querySelectorAll('img.svg');
SVGInjector(mySVGsToInject);


//// lazy load
$(function () {
  $('img[data-src]').lazy({
    combined: true,
    delay: 5000
  });
});
