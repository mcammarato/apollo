$(document).ready(function(){

  /* Modal */

  var modal = document.getElementById('modal-box');
  var modalLink = document.getElementsByClassName('modal-link');
  var close = document.getElementsByClassName('close')[0];

  $(modalLink).click(function(e){

    // Mobile
    if ($(window).width() < 640 && $(this).children().is('img')) {
      return;
    }

    // Desktop
    e.preventDefault();


    // header
    var headerAttr = $(this).attr('data-header');
    if (headerAttr != null) {
      $('.modal-header').html(headerAttr);
      $('#modal-box .modal-header').show();
    }
    else {
      $('#modal-box .modal-header').hide()
    }

    // Fill body with content inside of link
    if ($(this).hasClass('modal-link')) {
      var body = $(this).eq(0).clone();
      $('.modal-main').html(body);
    }

    /*  External modal is not firing because it shares .modal-link and never hits .modal-external */

    // Fill body with seperate div
    else if ($(this).hasClass('modal-external')) {
      var modalExternalBody = $('.modal-external-body');
      $('.modal-main').html(modalExternalBody);
      $('.modal-external-body').show()
    }

    else {
      return false;
    }

    /*

    // If Image
    if ($(this).children().is('img')) {
      var body = $(this).eq(0).clone();
      $('.modal-main').html(body);
    }

    // If Subscribe Block
    else if ($(this).hasClass('subscribe-link')) {
      $('.subscribe').show();
      var subscribeBody = $('.subscribe');
      $('.modal-main').html(subscribeBody);
    }

    // If Generic
    else if ($(this).hasClass('generic-link')) {
      $('.regular-modal').show()
      var regularModalBody = $('.regular-modal');
      $('.modal-main').html(regularModalBody);
    }

    */

    // footer
    var footerAttr = $(this).attr('data-footer');
    if (footerAttr != null) {
      $('.modal-footer').html(footerAttr);
      $('#modal-box .modal-footer').show();
    }
    else {
      $('#modal-box .modal-footer').hide();
    }



    modal.style.display = 'block';
  // Click
});

// Close
$(close).click(function(){
  modal.style.display = 'none';
});

// Click out
window.onclick = function(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

// Bind Modal and mad Click
$('.mag-trig').click(function(e) {
  if ($(window).width() < 640) {
    return;
  }
  e.preventDefault();
  var magTrig = $(this).attr('data-id');
  $('.modal-link[data-id=' + magTrig + ']').click();

});

// Doc Ready
});
