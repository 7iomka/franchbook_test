function hamburgerActions() {
  const $hamburgerContainer = $('.hamburger-container');
  if ($hamburgerContainer.length) {
    $hamburgerContainer.on('click', function () {
      $(this).toggleClass('hamburger-container--active');
    });
  }
}

domready(() => {
  exports.init = hamburgerActions;
});
