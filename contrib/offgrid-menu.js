var $hamburger = $('.js-hamburger');
var $navigation = $('#navigation');
$hamburger.click(function (e) {
  e.preventDefault();
  $hamburger.toggleClass('is-active');
  $navigation.toggleClass('is-active');
});
