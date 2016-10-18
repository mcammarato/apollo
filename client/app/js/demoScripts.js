// Scripts here

$(document).ready(function(){

  // Carousel
  $('.carousel').slick({
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    accessibility: true,
    adaptiveHeight: true
  });

  // Dropdown Menu
  $('.menu').dropit();

  // Modal Popup
  //----- OPEN
   $('[data-popup-open]').on('click', function(e)  {
       var targeted_popup_class = $(this).attr('data-popup-open');
       $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
       if (e.target !== this) return;
       e.preventDefault();
   });

   //----- CLOSE
   $('[data-popup-close]').on('click', function(e)  {
       var targeted_popup_class = $(this).attr('data-popup-close');
       $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
       e.preventDefault();
   });

});
