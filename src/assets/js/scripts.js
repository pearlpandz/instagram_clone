$(document).ready(function() {
 
  var $window = $(window);
  function setCSS() {
    // var windowHeight = $(window).innerHeight();
    var windowHeight = $(window).height();
    var windowWidth = $(window).width(); 
    var boxHeight = ($(window).height() - 40 ); 
    var boxHeight = ($(window).height() - 40 );
    var sideBtHeight = $(".top-logo").outerHeight(true);
    var sideBtmHeight = ( boxHeight - sideBtHeight );
    


    var homeBtm = $(".btm-btns").outerHeight(true);
    var homeTop = ( boxHeight - homeBtm );

    var proTop = $(".pro-top").outerHeight(true);
    var proBtm = ( boxHeight - proTop );

    $('.full-outer').css('height', windowHeight);
    
    $('.full-outer').css('width', windowWidth); 
    $('.full-outer').css('padding', 20); 
    $('.full-outer').css('padding-left', 40); 
    $('.full-outer').css('padding-right', 40); 
    $('.box-outer').css('height', boxHeight); 
    $('.center-box').css('height', boxHeight);

     
    var popupImg = $(".pop-img").height();
        var popupImgOuter = $(".popup-image-outer").outerHeight(true);
        var commentProfile = $(".comment-profile").outerHeight(true);
        var profileFoot = $(".profile-foot").outerHeight(true);
        var commentFoot = ( commentProfile + profileFoot );
        var commentList = ( popupImgOuter - commentFoot );

        $('.comment-like').css('height', popupImgOuter);
        $('.comment-wrap').css('height', commentList);
   
    $('#photo-popup').on('shown.bs.modal', function (e) {
        var popupImg = $(".pop-img").height();
        var popupImgOuter = $(".popup-image-outer").outerHeight(true);
        var commentProfile = $(".comment-profile").outerHeight(true);
        var profileFoot = $(".profile-foot").outerHeight(true);
        var commentFoot = ( commentProfile + profileFoot );
        var commentList = ( popupImgOuter - commentFoot );

        $('.comment-like').css('height', popupImgOuter);
        $('.comment-wrap').css('height', commentList);
    });

  };
  setCSS();  
  $(window).resize(function() {
    setCSS();
  });



});

//fileinput js
$.uploadPreview({
    input_field: "#image-upload",   // Default: .image-upload
    preview_box: "#image-preview",  // Default: .image-preview
    label_field: "#image-label",    // Default: .image-label
    label_default: "Choose File",   // Default: Choose File
    label_selected: "Change File",  // Default: Change File
    no_label: false                 // Default: false
  });



$(".suggest-toggle").click(function(){
        $("#suggest-people").fadeToggle('slow');

        //suggest-slider
$('.suggest-people').slick({
  dots: true,
  infinite: false,
  speed: 1300,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});
});