/* ==================================================
#Featured collection
#Featured promotions
#Slideshow
#Testimonials
#Gallery
#Video
#Cart
#Product
#Header
#Map
#Global accordions
#Global shortcodes

/*============================================================================
  Featured collection
==============================================================================*/

var featuredCollectionSection = {
  init: function(){
    $('.js-product-slider .products-slider').each(function (index, value) {
      var products_per_slide = $(this).data('products-per-slide');
      var products_limit = $(this).data('products-limit');
      var products_available = $(this).data('products-available');
      var cellAlign,
          draggable,
          prevNext,
          wrapAround,
          initialIndex;

      // function to check if browser is IE
      var isIE11 = !!navigator.userAgent.match(/Trident.*rv\:11\./);

      // Ensure product media libraries are present
      if (!isIE11) {
        window.Shopify.loadFeatures([
          {
            name: 'model-viewer',
            version: '0.8'
          },
          {
            name: 'shopify-xr',
            version: '1.0',
          },
          {
            name: 'model-viewer-ui',
            version: '1.0',
          }
        ], productMedia.setupMedia)
      }

      if (products_per_slide == "2" && products_available > products_per_slide && products_limit > products_per_slide || products_per_slide == "4" && products_available > products_per_slide && products_limit > products_per_slide || products_per_slide == "6" && products_available > products_per_slide && products_limit > products_per_slide){
        cellAlign = "left";
      } else {
        cellAlign = "center";
      }

      if (products_available > products_per_slide && products_limit > products_per_slide) {
        draggable = true;
        prevNext = true;
        wrapAround = true;
      } else {
        draggable = false;
        prevNext = false;
        wrapAround = false;
      }

      if (products_per_slide == "2" && products_available > products_per_slide || products_per_slide == "4" && products_available > products_per_slide || products_per_slide == "6" && products_available > products_per_slide){
        initialIndex = 0;
      } else if (products_per_slide == "3" && products_available) {
        initialIndex = 1;
      } else if (products_per_slide == "5" && products_available) {
        initialIndex = 2;
      } else if (products_per_slide == "7" && products_available) {
        initialIndex = 3;
      }

      if (Shopify.media_queries.medium.matches) {
        cellAlign = "center";
        draggable = true;
        prevNext = true;
        wrapAround = true;
        initialIndex = 1;

        $(this).parents('.even-num-slides').removeClass('even-num-slides');
      }

      $(this).flickity({
        "lazyLoad": 2,
        "imagesLoaded": true,
        "draggable": draggable,
        "prevNextButtons": prevNext,
        "wrapAround": wrapAround,
        "cellAlign": cellAlign,
        "pageDots": usePageDots,
        "contain": true,
        "freeScroll": true,
        "arrowShape": arrowSize,
        "initialIndex": initialIndex
      });

      $(this).addClass('slider-initialized');
    });
  },
  unload: function($target){
    var $slider = $target.find('.js-product-slider');
    if ($slider.hasClass('flickity-enabled')){
      $slider.flickity('destroy');
    }
  }
}

/*============================================================================
  Featured promotions
==============================================================================*/
var featuredPromotions = {
  init: function(){
    $('.feature-overlay').hover(function() {
      $(this).find('.feature-details').slideDown('100', function() {
        $(this).addClass('reveal-details');
      });
    }, function() {
      $(this).find('.feature-details').removeClass('reveal-details');
      $(this).find('.feature-details').slideUp('100');
    });

    $('.js-featured-promotions').each(function (index, value) {
      var $promos = $(this);
      var animationStyle = $(this).data('promo-animation');

      $promos.waypoint(function() {
        $(this.element).find('.feature-section').addClass("animated " + animationStyle);
      }, { offset: '80%' });
    });
  }
}

/*============================================================================
  Slideshow
==============================================================================*/

var slideshow = {
  init: function(){

    $('.js-homepage-slideshow').each(function (index, value){
      var $homepageSlider = $(this);
      var settings = {
        slideshowSpeed: $homepageSlider.data('slideshow-speed')*1000,
        slideshowTextAnimation: $homepageSlider.data('slideshow-text-animation'),
        adaptiveHeight: $homepageSlider.data('adaptive-height')
      }

      //initiate the slideshow
      if (!$homepageSlider.hasClass('flickity-enabled')){
        var arrowShow = $homepageSlider.find('.gallery-cell').length === 1 ? false : true;
        $homepageSlider.flickity({
          adaptiveHeight: settings.adaptiveHeight,
          wrapAround: true,
          cellAlign: 'left',
          imagesLoaded: true,
          prevNextButtons: arrowShow,
          draggable: arrowShow,
          pageDots: usePageDots,
          autoPlay: settings.slideshowSpeed,
          arrowShape: arrowSize
        });

        if (settings.slideshowTextAnimation != ''){
          var flkty = $homepageSlider.data('flickity');
          setTimeout(function() {
            $homepageSlider.find('.gallery-cell:nth-child(1) .caption-content').addClass('animated ' + settings.slideshowTextAnimation);
          }, 400);

          $homepageSlider.on( 'select.flickity', function() {
            if($homepageSlider.is(':visible')) {
              var currentSlide = flkty.selectedIndex + 1;
              setTimeout(function() {
                $homepageSlider.find('.caption-content').removeClass('animated ' + settings.slideshowTextAnimation);
                $homepageSlider.find('.gallery-cell:nth-child(' + currentSlide + ') .caption-content').addClass('animated ' + settings.slideshowTextAnimation);
              }, 400);
            }
          });
        }
      }

      if ($homepageSlider.find('.gallery-cell').length > 1) {
        $homepageSlider.addClass('multi-image');
      } else {
        $homepageSlider.addClass('single-image');
      }

    });
  },
  unload: function($target){

    var $slider = $target.find('.js-homepage-slideshow');
    $slider.flickity('destroy');

  }
}

/*============================================================================
  Testimonials
==============================================================================*/

var testimonial = {
  init: function(){

    $('.js-testimonial').each(function (index, value){
      var $testimonialSlider = $(this);
      var settings = {
        slideshowSpeed: $testimonialSlider.data('slideshow-speed')*1000,
        slideshowTextAnimation: $testimonialSlider.data('slideshow-text-animation'),
        adaptiveHeight: $testimonialSlider.data('adaptive-height')
      }

      if( $('.testimonial-image').length > 0){
        $('.testimonial-block').each(function(){
          if( $(this).find('.testimonial-image').length == 0){
            var theBlock = $(this).closest('.testimonial-block');
            $(theBlock).addClass('set-testimonial-height');
          }
        })
      }

      //initiate the slideshow
      if (!$testimonialSlider.hasClass('flickity-enabled')){
        var arrowShow = $testimonialSlider.find('.gallery-cell').length === 1 ? false : true;
        $testimonialSlider.flickity({
                        adaptiveHeight: settings.adaptiveHeight,
                        wrapAround: true,
                        cellAlign: 'left',
                        imagesLoaded: true,
                        prevNextButtons: arrowShow,
                        draggable: arrowShow,
                        pageDots: usePageDots,
                        autoPlay: settings.slideshowSpeed,
                        arrowShape: arrowSize
                      });

        if (settings.slideshowTextAnimation != ''){
          var flkty = $testimonialSlider.data('flickity');
          setTimeout(function() {
            $testimonialSlider.find('.gallery-cell:nth-child(1) .caption-content').addClass('animated ' + settings.slideshowTextAnimation);
          }, 400);

          $testimonialSlider.on( 'select.flickity', function() {
            if($testimonialSlider.is(':visible')) {
              var currentSlide = flkty.selectedIndex + 1;
              setTimeout(function() {
                $testimonialSlider.find('.caption-content').removeClass('animated ' + settings.slideshowTextAnimation);
                $testimonialSlider.find('.gallery-cell:nth-child(' + currentSlide + ') .caption-content').addClass('animated ' + settings.slideshowTextAnimation);
              }, 400);
            }
          });
        }
      }

      if ($testimonialSlider.find('.gallery-cell').length > 1) {
        $testimonialSlider.addClass('multi-image');
      } else {
        $testimonialSlider.addClass('single-image');
      }

    });
  },
  unload: function($target){
    var $slider = $target.find('.js-testimonial');

    $slider.flickity('destroy');

  }
}

/*============================================================================
  Gallery
==============================================================================*/

var gallery = {
  init: function(){

    $('.gallery-horizontal').find('.gallery-image-wrapper').each(function(){
        var wrapper = $(this);
        var images = $(this).find("img");
        var imgWidth,
            imgHeight;

        $("<img />").attr("src", $(images).attr("src")).on('load', function() {
          imgWidth = this.width;
          imgHeight = this.height;

          $(wrapper).css("flex-basis", imgWidth * 200 / imgHeight);
          $(wrapper).css("flex-grow", imgWidth * 200 / imgHeight);
          $(wrapper).find("i").css("padding-bottom", imgHeight / imgWidth * 100 + '%');
      });
    });

  if ($('[rel=gallery]').length) {
    $('[rel=gallery]').fancybox({
      baseClass: "gallery-section__lightbox",
      clickContent: "nextOrClose"
    })
  }

  }
}

/*============================================================================
  Video
==============================================================================*/
var videoSection = {
  init: function() {

    // Set up plyr for newly embedded video
    var featuredVideos = $('[data-video-element]').get();

    var featuredVideoPlayers = Plyr.setup(featuredVideos, {
      controls: videoControls,
      fullscreen: {
        enabled: true,
        fallback: true,
        iosNative: true
      },
      storage: {
        enabled: false
      }
    });

    // Adds plyr video id to video wrapper
    $.each(featuredVideoPlayers, function(index, player) {
      var id = player.id;
      var $video;

      if (player.isHTML5) {
        $video = $(player.elements.wrapper).find('video');
        $video.attr('data-plyr-video-id', id);
      }

      // When a video is playing, pause any other instances
      player.on('play', function(event) {
        var instance = event.detail.plyr;
        $.each(featuredVideoPlayers, function(index, player) {
          if (instance.id != player.id) {
            player.pause();
          }
        })
      })

      // Moves players from video section into global array
      if (globalVideoPlayers) {
        globalVideoPlayers.push(player);
      }
    })

    $('[data-video-element]').each(function(index, video) {

      // Variables
      var $video = $(video);
      var $section = $video.parents('.shopify-section').attr('id', id);
      var $videoElement = $section.find($video);
      var $videoWrapper = $videoElement.parents('.video-wrapper');
      var $playButton = $videoWrapper.find('[data-play-button]');
      var $secondaryButton = $videoWrapper.find('[data-secondary-button]');
      var $videoText = $videoWrapper.find('[data-video-text]');
      var $videoTextContainer = $videoWrapper.find('[data-video-text-container]');
      var $image = $videoWrapper.find('.video-wrapper__image');
      var $posterImage = $videoWrapper.data('poster-image-uploaded');
      var aspectRatio = $videoWrapper.data('aspect-ratio');
      var id = $videoWrapper.data('video-src');
      var isAutoplay = $videoWrapper.data('autoplay');
      var isLoopingEnabled = $videoWrapper.data('autoloop');
      var isMuted = $videoWrapper.data('mute-video');

      $.each(featuredVideoPlayers, function(index, player) {
        var videoID;
        var playerID;

        if (player.isYouTube || player.isVimeo) {
          var videoID = $videoWrapper.attr('id');
          var playerID = $(player.elements.original).attr('id');
        } else if (player.isHTML5) {
          var videoID = $videoWrapper.find('[data-plyr-video-id]').data('plyr-video-id');
          var playerID = player.id;
          $videoElement = $section.find('.plyr--video');
        }

        if (playerID == videoID) {

          // Reset play button icon
          $videoWrapper.removeClass('play-button-icon--visible');

          // Autoplay
          if (isAutoplay) {
            // If on desktop or player is YouTube/Vimeo
            if (Shopify.media_queries.large.matches || player.isYouTube || player.isVimeo) {

              player.autoplay = true;

              // Hide image
              $image.hide();

              // Show video
              $videoElement.show();

              // If display text over video unchecked
              if ($videoTextContainer.hasClass('display-text-over-video--false')) {
                $videoText.hide();
              } else {
                $videoText.show();
              }

              // Keep play button hidden
              $playButton.hide();

              // HTML5 Mobile Video
            } else if (Shopify.media_queries.medium.matches && player.isHTML5) {

              // Hide image
              $image.hide();

              // Show video
              $videoElement.show();

              // Display button so that video can be played
              $playButton.show();

              player.on('play', function() {
                // Show video
                $videoElement.show();

                // Hide play button
                $playButton.hide();
              })
            }
          } else { // If Autoplay disabled
            // If poster image, show image wrapper otherwise hide it
            if ($posterImage) {
              $image.show();
              $videoElement.hide();
            } else {
              $videoElement.show();
            }
          }

          // Clicking image will play video
          $image.on('click', function() {
            // Hide image
            $(this).hide();

            // Show video
            $videoElement.show();

            player.play();
          })

          // Muted
          if (isMuted) {
            player.muted = true;
          }

          // Aspect Ratio
          if (aspectRatio) {
            player.ratio = aspectRatio;
          }

          // Looping
          if (isLoopingEnabled) {
            player.loop = true;
          }

          // Show Video Controls
          // - video controls get hidden using a css class: '.video-controls-enabled--false'

          // If button exists, hide text and poster
          if ($playButton) {
            $playButton.on('click', function() {

              // Play video
              player.play();
            })
          }

          player.on('statechange', event => {
            //Check if unstarted when state changed and play if so
            if(event.detail.code == '-1') {
              player.play();
            }
          });

          player.on('play', function() {

            // Hide image
            $image.hide();

            // Reset play button icon
            $videoWrapper.removeClass('play-button-icon--visible');

            // Show video
            $videoElement.show();

            // If display text over video unchecked
            if ($videoTextContainer.hasClass('display-text-over-video--false')) {
              $videoTextContainer.hide();
            } else {
              $videoTextContainer.show();
            }

            // Hide play button
            if ($playButton) {
              $playButton.hide();
            }

            // Hide secondary button
            if ($secondaryButton) {
              $secondaryButton.hide();
            }
          })

          // If video is paused, show play button icon
          player.on('pause', function() {
            if ($playButton.is(':hidden') || $playButton.length == 0) {
              $videoWrapper.addClass('play-button-icon--visible');
            }
          })

          // If page loads with video paused and no button showing, show icon
          if (!player.playing && $playButton.is(':hidden') || $playButton.length == 0) {
            $videoWrapper.addClass('play-button-icon--visible');
          }

          return false;
        }
      })
    })
  }
}

/*============================================================================
  Cart
==============================================================================*/
var cart = {
  init: function(){
    if ($('#cart_form .tos_agree').length) {
      //Terms of service on cart page
      $('body').on('click', "#cart_form input[type='submit']", function() {
        if ($(this).parents('form').find('.tos_agree').is(':checked')) {
          $(this).submit();
        } else {
          var warning = '<p class="warning animated bounceIn">' + Shopify.translation.agree_to_terms_warning + '</p>';
          if ($('p.warning').length == 0) {
            $(this).before(warning);
          }
          return false;
        }
      });
    }
  }
}

/*============================================================================
  Product
==============================================================================*/

selectCallback = function(variant, selector) {
  var evt = document.createEvent("HTMLEvents");
  var $product = $('.product-' + selector.product.id);
  var $notify_form = $('.notify-form-' + selector.product.id);
  var $productForm = $('.product_form, .shopify-product-form', $product);
  var variantInventory = $productForm.data('variant-inventory');

  var $notifyFormInputs = $('.notify_form__inputs');

  var notifyEmail = Shopify.translation.notify_email;
  var notifyEmailValue = "";
  var notifySend = Shopify.translation.notify_email_send;

  var notifyUrl = $notifyFormInputs.data('url');

  // Manually trigger change event so
  // pure JS listeners can receive it
  evt.initEvent('change', false, true);
  selector.variantIdField.dispatchEvent(evt);

  if (variant) {
    if (variant.title != null) {
    // Escape variant titles
      var variantTitle = variant.title.replace(/"/g,'\&quot;');

      var notifyMessage = Shopify.translation.notify_message_first + variantTitle + Shopify.translation.notify_message_last + notifyUrl;
    }
  } else {
    var notifyMessage = Shopify.translation.notify_message_first + Shopify.translation.notify_message_last + notifyUrl;
  }

  if ($notifyFormInputs.hasClass('customer--true')) {
    var notifyCustomerEmail = "";
    var notifyEmailInput = '<input type="hidden" class="notify_email" name="contact[email]" id="contact[email]" value="'+ notifyCustomerEmail +'" />'
  } else {
    var notifyEmailInput = '<input required type="email" class="notify_email" name="contact[email]" id="contact[email]" placeholder="'+ notifyEmail +'" value="'+ notifyEmailValue +'" />';
  }
  var notifyFormHTML = notifyEmailInput+'<input type="hidden" name="challenge" value="false" /><input type="hidden" name="contact[body]" class="notify_form_message" data-body="'+ notifyMessage +'" value="'+ notifyMessage +'" /><input class="global-button global-button--primary" type="submit" value="'+ notifySend + '" style="margin-bottom:0px" />';

  //Image Variant feature
  if (variant && variant.featured_image && $product.is(":visible")) {
    var $sliders = $('.js-product-gallery, .js-gallery-modal', $product);
    $sliders.each(function() {
      var $slider = $(this);
      var $sliderInstance = Flickity.data(this);
      if ($slider.is(":visible") && $sliderInstance != undefined ) {
        var index = $('[data-image-id="' + variant.featured_media.id + '"]').data('index');
        $sliderInstance.select(index, false, true);
      }
    });
  }

  // Toggles images in product slider when inline quickshop and layout set to slider
  if (variant && variant.featured_image && $product.is(':visible')) {
    if (Shopify.theme_settings.product_form_style == 'dropdown' && Shopify.theme_settings.quick_shop_style == 'inline') {
      var $selectedVariants = $('.products-slider').find('select option:not(.selector-wrapper select option)').filter(':selected');
      $selectedVariants.each(function(){
        if ($(this).data('featured-image')) {
          var swatchImage = $(this).data('image');
          var $quickShopElement = $(this).parents('.thumbnail').find('.image__container img');

          $quickShopElement.attr('src', swatchImage);
          $quickShopElement.attr('srcset', swatchImage);
        }
      })
    }
  }

  if (variant) {
    if (variantInventory) {
      variantInventory.forEach(function(v){
        if (v.id === variant.id) {
          variant.inventory_quantity = v.inventory_quantity;
          variant.inventory_management = v.inventory_management;
          variant.inventory_policy = v.inventory_policy;
        }
      });
    }

    $('.sku span', $product).text(variant.sku);

    if (Shopify.theme_settings.product_form_style == 'swatches'){
      for (var i=0,length=variant.options.length; i<length; i++) {
        var radioButton = $productForm.find('.swatch[data-option-index="' + escape(i) + '"] :radio[value="' + variant.options[i].replace(/\"/g,'\\"') +'"]');
        if (radioButton.length) {
          radioButton.get(0).checked = true;
        }
      }
    } else {
      $(".notify_form_message", $product).attr("value", $(".notify_form_message", $product).data('body') + " - " + variantTitle);
    }
  }

  if (variant && variant.available == true) {
    if(variant.price < variant.compare_at_price){
      $('.was_price', $product).html('<span class="money">' + Shopify.formatMoney(variant.compare_at_price, $('body').data('money-format')) + '</span>');
      $('.savings', $product).html(Shopify.translation.savings_text + ' ' + parseInt(((variant.compare_at_price - variant.price) * 100) / variant.compare_at_price) + '% ( ' + '<span class="money">' + Shopify.formatMoney(variant.compare_at_price - variant.price, $('body').data('money-format')) + '</span>)');
      $('.current_price', $product).parent().addClass('sale');
    } else {
      $('.was_price', $product).html('');
      $('.savings', $product).html('');
      $('.current_price', $product).parent().removeClass('sale');
    }

    if (variant.inventory_management && variant.inventory_quantity > 0) {
      if (Shopify.theme_settings.display_inventory_left){
        if (variant.inventory_quantity == 1) {
          items_left_text = Shopify.translation.one_item_left;
        } else {
          items_left_text = Shopify.translation.items_left_text;
        }

        var inventoryThreshold = parseInt(Shopify.theme_settings.inventory_threshold);
        if (variant.inventory_quantity <= inventoryThreshold ) {
          $('.items_left', $product).html(variant.inventory_quantity + " " + items_left_text);
        } else {
          $('.items_left', $product).html("");
        }
      }
      if (Shopify.theme_settings.limit_quantity){
        if(variant.inventory_policy == "deny") {
          $('.quantity', $product).attr('max', variant.inventory_quantity);
        }
      }
    } else {
      $('.items_left', $product).text('');
      $('.quantity', $product).removeAttr('max');
    }

    $('.sold_out', $product).text('');
    if (variant.price > 0) {
      $('.current_price', $product).removeClass('sold_out').html('<span class="money">' + Shopify.formatMoney(variant.price, $('body').data('money-format')) + '</span>');
    } else {
      $('.current_price', $product).removeClass('sold_out').html(Shopify.theme_settings.free_text);
    }
    $('.add_to_cart', $product).removeClass('disabled').removeAttr('disabled').find('span').text($('.add_to_cart', $product).data('label'));
    $('.shopify-payment-button', $product).removeClass('disabled');
    $('.purchase-details__buttons', $product).removeClass('product-is-unavailable');
    $('.modal_price', $product).removeClass('variant-unavailable');
    $product.find($notify_form).hide();
    $product.find($notifyFormInputs).empty();
  } else {
    // When product is sold out
    var message = variant ? Shopify.theme_settings.sold_out_text : Shopify.translation.unavailable_text;

    if (variant){
      // Adds correct price
      if (variant.price > 0) {
        $('.current_price', $product).html('<span class="money">' + Shopify.formatMoney(variant.price, $('body').data('money-format')) + '</span>');
      } else {
        $('.current_price', $product).html(Shopify.theme_settings.free_text);
      }
      if (Shopify.theme_settings.display_sold_out_price){
        $('.current_price', $product).parents('.price__container--display-price-true').addClass('has-margin-right');
      }
      $('.modal_price', $product).removeClass('variant-unavailable');
    } else {
      // Add class to quickshop so we know variant is unavailable
      $('.modal_price', $product).addClass('variant-unavailable');
      $('.current_price', $product).html('');
      $('.was_price', $product).html('');
      $('.savings', $product).html('');
      $('.current_price', $product).parents('.price__container--display-price-true').removeClass('has-margin-right');
    }

    // If show price setting disabled, hide price, compare at price and savings
    if (!Shopify.theme_settings.display_sold_out_price){
      $('.current_price', $product).html('');
      $('.was_price', $product).html('');
      $('.savings', $product).html('');
    }

    $('.items_left', $product).text('');
    $('.quantity', $product).removeAttr('max');
    $('.sold_out', $product).text(message);
    $('.purchase-details__buttons', $product).addClass('product-is-unavailable');
    $('.add_to_cart', $product).addClass('disabled').attr('disabled', 'disabled').find('span').text(message);
    $('.shopify-payment-button').addClass('disabled');
    $notify_form.hide();
    $notifyFormInputs.empty();

    if (variant && !variant.available) {
      $notify_form.fadeIn();
      $notifyFormInputs.empty();
      $notifyFormInputs.append(notifyFormHTML);
    }
  }

  if (Currency.show_multiple_currencies) {
    currencyConverter.convertCurrencies();
  }
};

var productPage = {
  init: function(){

    // function to check if browser is IE
    var isIE11 = !!navigator.userAgent.match(/Trident.*rv\:11\./);

    // Ensure product media libraries are present
    if (!isIE11) {
      window.Shopify.loadFeatures([
        {
          name: 'model-viewer',
          version: '0.8'
        },
        {
          name: 'shopify-xr',
          version: '1.0',
        },
        {
          name: 'model-viewer-ui',
          version: '1.0',
        }
      ], productMedia.setupMedia)
    }

    if($('.js-full-width-product-images').length){
      imageFunctions.fullWidth('.shopify-section--product-template .product .description img', '.js-full-width-product-images');
    }

    // Call enable gallery function for product galleries
    $('[data-product-gallery]:not(.product-recommendations [data-product-gallery])').each(function(index, gallery) {
      var $productGallery = $(this);
      productPage.enableGallery($productGallery);
    });

    if (window.location.search === '?contact_posted=true') {
      $('.notify_form .contact-form').hide();
      $('.notify_form .contact-form').prev('.message').html(Shopify.translation.notify_success_text);
    }

    if (Shopify.theme_settings.product_form_style == 'swatches'){
      $('body').on('change', '.swatch :radio', function() {
        var optionIndex = $(this).closest('.swatch').attr('data-option-index');
        var optionValue = $(this).val();
        var parentForm = $(this).closest('.product_form form');


        if (parentForm.siblings('.notify_form').length){
          var notifyForm = parentForm.siblings('.notify_form');
        } else {
          var notifyForm = $('.js-notify-form');
        }

        var option1 = parentForm.find('.swatch_options input:checked').eq(0).val();
        var option2 = parentForm.find('.swatch_options input:checked').eq(1).val() || '';
        var option3 = parentForm.find('.swatch_options input:checked').eq(2).val() || '';

        if (option1 && option2 && option3){
          var notifyMessage = option1 + ' / ' + option2 + ' / ' + option3;
        } else if (option1 && option2){
          var notifyMessage = option1 + ' / ' + option2;
        } else {
          var notifyMessage = option1;
        }


        notifyForm.find(".notify_form_message").attr("value", notifyForm.find(".notify_form_message").data('body') + " - " + notifyMessage );

        $(this)
          .closest('form')
          .find('.single-option-selector')
          .eq(optionIndex)
          .val(optionValue)
          .trigger('change');
      });
    }

    $('.js-product-gallery a').fancybox({
      width: 800,
      height: 800,
      baseClass: "product-section__lightbox",
      clickContent: false,
      afterShow: function(instance, slide) {
        var zoom = instance.$trigger.first().parents('.js-product-gallery').data('zoom');
        if (zoom){
          $('.fancybox-image').last()
              .wrap('<span class="zoom-wrap" style="display:inline-block"></span>')
              .css('display', 'block')
              .parent()
              .zoom({
                touch: false,
                magnify: 1
          });
        }
      },
      afterClose: function(instance, slide) {
        var $instanceGallery = instance.$trigger.first().parents('.js-product-gallery');
        $instanceGallery.hide();
        setTimeout(function(){
          $instanceGallery.fadeIn(100);
          $('.js-product-gallery').find('.is-selected a').focus();
        }, 1);
      }
    })

    $('.js-product_section .product_form_options:not(.product-recommendations .js-product_section .product_form_options)').each(function () {
      // Enable selectCallback if the number of select elements is not equal to the options size data
      if ($(this).find('.selector-wrapper select').length != $(this).data('options-size')) {
        new Shopify.OptionSelectors($(this).data('select-id'), { product: $(this).data('product'), onVariantSelected: selectCallback, enableHistoryState: $(this).data('enable-state') });
      }
    });

    /*
    If the product recommendations section exists, run the loadProductRecommendations method
    The selectCallback within this method will only affect the products in the product recommendations section
    */
    if ($('.recommended-products-section').length) {
      productPage.loadProductRecommendations();
    }

    this.initializeQuantityBox();
  },
  enableGallery: function(selector) {

    // Variables
    var $productGallery = $(selector);
    var $slides = $productGallery.find('.gallery-cell');
    var $thumbnailProductGallery = $productGallery.closest('.js-product_section').find('.product_gallery_nav');
    var $thumbnails = $thumbnailProductGallery.find('.gallery-cell');
    var draggable = true;
    var prevNextButtons = true;
    var zoom = $productGallery.data('zoom');
    var productLightbox = $productGallery.data('product-lightbox');
    var thumbnailsEnabled = $productGallery.data('thumbnails-enabled');
    var thumbnailsSliderEnabled = $productGallery.data('thumbnails-slider-enabled');
    var thumbnailsPosition = $productGallery.data('thumbnails-position');
    var thumbnailsArrows = $productGallery.data('gallery-arrows-enabled');
    var slideshowAnimation = $productGallery.data('slideshow-animation');
    var slideshowSpeed = $productGallery.data('slideshow-speed');

    // If zoom enabled
    if (zoom === true) {
      if(is_touch_device() && Shopify.media_queries.medium.matches) {
        // Lightbox has a built-in zoom feature, so check if lightbox is disabled
        if (productLightbox === 'false') {
          document.addEventListener('lazybeforeunveil', imageFunctions.zoom);
          draggable = false;
        }
      } else {
        document.addEventListener('lazybeforeunveil', imageFunctions.zoom);
      }
    }

    $productGallery.on('ready.flickity', function() {

      $slides.each(function(index, slide) {

        //Determine media type
        var mediaType = $(slide).data('media-type') || $(slide).find('[data-media-type]').data('media-type');
        var videoID;

        switch(mediaType) {
          case 'external_video':

            videoID = $(slide).find('[data-plyr-video-id]').data('plyr-video-id');

            if(videoPlayers) {
              for (var i = 0; i < videoPlayers.length; i++) {
                if (videoPlayers[i].id == videoID || videoPlayers[i].media.id == videoID) {

                  if(!$(slide).hasClass('is-selected')) {
                    videoPlayers[i].keyboard = {
                      focused: false,
                      global: false
                    }
                  }
                }
              }
            }
            break;
          case 'video':

            videoID = $(slide).find('[data-plyr-video-id]').data('plyr-video-id');

            if(videoPlayers) {
              for (var i = 0; i < videoPlayers.length; i++) {
                if (videoPlayers[i].id == videoID || videoPlayers[i].media.id == videoID) {

                  if(!$(slide).hasClass('is-selected')) {
                    videoPlayers[i].keyboard = {
                      focused: false,
                      global: false
                    }
                  }
                }
              }
            }
            break;
          case 'model':
            if($(slide).hasClass('is-selected')) { //When active slide
              if(mediaType == 'model' && isScreenSizeLarge()) {
                $(slide).on('mouseenter', function() {
                  $productGallery.flickity('unbindDrag');
                })
                $(slide).on('mouseleave', function() {
                  $productGallery.flickity('bindDrag');
                })
              }
            }
            break;
          default:
            break;
        }
      });

      // Video looping
      var loopingEnabled = $productGallery.data('video-loop');

      $.each(videoPlayers, function(index, player) {
        player.loop = loopingEnabled;
      })
    });

    $productGallery.on('change.flickity', function() {

      $slides.each(function(index, slide) {

        // Determine media type of current slide
        var mediaType = $(slide).data('media-type') || $(slide).find('[data-media-type]').data('media-type');

        if($(slide).hasClass('is-selected')) { //When active slide

          switch(mediaType) {
            case 'model':

              /* On slide change, if active slide contains 3d model
              * If on desktop, on hover, unbind flickity, after hover bind flickity
              * On model play event, unbind flickity to ensure model can be interacted with
              * On model pause event, bind flickity so that slide can be swiped
              * Pause all model slides when hidden
              */

              if (isScreenSizeLarge()) {

                // On mouseenter event, unbind flickity
                $(slide).on('mouseenter', function() {
                  $productGallery.flickity('unbindDrag');
                });

                // On mouseleave event, bind flickity
                $(slide).on('mouseleave', function() {
                  $productGallery.flickity('bindDrag');
                });
              }

              // Listen for model pause/play events
              $(slide).find('model-viewer').on('shopify_model_viewer_ui_toggle_play', function(){
                $productGallery.flickity('unbindDrag');
              })

              $(slide).find('model-viewer').on('shopify_model_viewer_ui_toggle_pause', function(){
                $productGallery.flickity('bindDrag');
              })
              break;
            default:
              $productGallery.flickity('bindDrag');
              break;
          }
        } else { //When inactive slide

          switch(mediaType) {
            case 'external_video':
              //Youtube video pausing
              $.each(videoPlayers, function(index, player) {
                player.pause();
              });
              break;
            case 'video':
              //HTML5 video pausing
              $.each(videoPlayers, function(index, player) {
                player.pause();
              });
              break;
            case 'model':
              $.each(productMedia.models, function(index, model) {
                model.pause();
              })
          }
        }
      });

      //Restore 3d model icons
      productMedia.showModelIcon($productGallery);
    });

    $productGallery.flickity({
      wrapAround: true,
      adaptiveHeight: true,
      dragThreshold: 10,
      imagesLoaded: true,
      pageDots: false,
      prevNextButtons: $productGallery.data('media-count') > 1 || $slides.length > 1 ? true : false,
      autoPlay: slideshowSpeed * 1000,
      fade: slideshowAnimation === 'fade' ? true : false,
      watchCSS: false,
      arrowShape: arrowSize
    });

    // Adjust arrows height if controls are hidden/shown
    $.each(videoPlayers, function(index, player) {
      // When controls are hidden, height should be auto
      player.on('controlshidden', function(event) {
        $productGallery.find('.flickity-prev-next-button').css('height', 'auto');
      })
      // When controls are shown, height should account for controls bar
      player.on('controlsshown', function(event) {
        $productGallery.find('.flickity-prev-next-button').css('height', 'calc(100% - 64px)');
      })
    })

    // Checks for videos and plays them if they are the featured media
    // Autoplay logic only happens on desktop, autoplay set to off for mobile
    var $sliderArrows = $productGallery.find('.flickity-prev-next-button');

    if (($sliderArrows || $thumbnails) && isScreenSizeLarge()) {
      $sliderArrows.on('click', function() {

        var pId = $productGallery.data('product-id');

        $productGallery.on( 'settle.flickity', function( event, index ) {
          // Find out media type of featured media slide
          var $selectedSlide = $productGallery.find('.gallery-cell.is-selected');
          var mediaType = $selectedSlide.data('media-type') || $selectedSlide.find('[data-media-type]').data('media-type');

          // Run video autoplay logic if featured media is a video
          if (mediaType == 'video' || mediaType == 'external_video') {
            checkForVideos();
          }

          // Autoplay model if featured media is a model
          if (mediaType == 'model') {
            // If model container has class is-selected then play the model
            var sortedModels = [];
            $.each(productMedia.models, function(index, model) {
              if($(model.container).closest('.gallery-cell').data('product-id') == pId) {
                sortedModels.push(model)
              }
            })

            $.each(sortedModels, function(index, model) {
              var $slide = $(model.container).closest('.gallery-cell');
              if($slide.hasClass('is-selected')) {
                model.play();
              }
            })
          }
          $productGallery.off('settle.flickity');
        });

        return false;
      })

      $thumbnails.on('click', function(event) {
        var index = $( event.currentTarget ).index();
        var pId = $productGallery.data('product-id');
        $productGallery.flickity( 'select', index );

        $productGallery.on( 'settle.flickity', function( event, index ) {
          // Find out media type of featured media slide
          var $selectedSlide = $productGallery.find('.gallery-cell.is-selected');
          var mediaType = $selectedSlide.data('media-type') || $selectedSlide.find('[data-media-type]').data('media-type');

          // Run video autoplay logic if featured media is a video
          if (mediaType == 'video' || mediaType == 'external_video') {
            checkForVideos();
          }

          // Autoplay model if featured media is a model
          if (mediaType == 'model') {
            // If model container has class is-selected then play the model
            var sortedModels = [];
            $.each(productMedia.models, function(index, model) {
              if($(model.container).closest('.gallery-cell').data('product-id') == pId) {
                sortedModels.push(model)
              }
            })

            $.each(sortedModels, function(index, model) {
              var $slide = $(model.container).closest('.gallery-cell');
              if($slide.hasClass('is-selected')) {
                model.play();
              }
            })
          }
          $productGallery.off('settle.flickity');
        });
        return false;
      })

      $thumbnails.keypress(function(event) {
        var index = $( event.currentTarget ).index();
        var pId = $productGallery.data('product-id');
        if(event.which == 13) {

          $productGallery.flickity( 'select', index );

          var $selectedSlide = $productGallery.find('.gallery-cell.is-selected');

          $productGallery.on( 'settle.flickity', function( event, index ) {
            $selectedSlide.find('[data-youtube-video]').attr('tabindex', '0');
            $selectedSlide.find('model-viewer, .plyr, a').focus();

            $productGallery.off('settle.flickity');
          });

          // Find out media type of featured media slide
          var mediaType = $selectedSlide.data('media-type') || $selectedSlide.find('[data-media-type]').data('media-type');

          // Run video autoplay logic if featured media is a video
          if (mediaType == 'video' || mediaType == 'external_video') {
            checkForVideos();
          }

          // Autoplay model if featured media is a model
          if (mediaType == 'model') {
            // If model container has class is-selected then play the model
            var sortedModels = [];
            $.each(productMedia.models, function(index, model) {
              if($(model.container).closest('.gallery-cell').data('product-id') == pId) {
                sortedModels.push(model)
              }
            })

            $.each(sortedModels, function(index, model) {
              var $slide = $(model.container).closest('.gallery-cell');
              if($slide.hasClass('is-selected')) {
                model.play();
              }
            })
          }

          return false;
        }
      })
    }

    function checkForVideos() {
      $slides.each(function(index, slide) {
        // Variables
        var $slide = $(slide);
        var mediaType = $slide.data('media-type') || $slide.find('[data-media-type]').data('media-type');
        var videoID = $slide.find('video').data('plyr-video-id');
        var $iframeVideo = $slide.find('iframe');
        var iframeID = $iframeVideo.attr('id');

        if ($slide.hasClass('is-selected')) {
          if (mediaType == 'video') {
            videoID = $slide.find('video').data('plyr-video-id');
            if (videoID) {
              autoplayVideo(videoID, $slide);
            }
          } else if (mediaType == 'external_video' && iframeID) {
            autoplayYoutubeVideo(iframeID, $slide);
          }
        }
      })
    }

    function autoplayVideo(videoID, $slide) {
      // Compare id to player object and only play that video
      $.each(videoPlayers, function(index, player){

        if (player.media.dataset.plyrVideoId == videoID) {
          player.play();

          // On fullscreen toggle, focus back on the slide itself
          player.on('exitfullscreen', function(){
            $slide.closest('.product-gallery').find('.product-gallery__thumbnails').focus();
          })
        }
      })
    }

    function autoplayYoutubeVideo(iframeID, $slide) {
      // compare id to player object and only play that video
      $.each(videoPlayers, function(index, player){

        if (player.playing) {
          player.pause();
        }

        if (player.media.id == iframeID) {
          player.play();

          // On fullscreen toggle, focus back on the slide itself
          player.on('exitfullscreen', function(){
            $slide.closest('.product-gallery').find('.product-gallery__thumbnails').focus();
          })
        }
      })
    }

    // Thumbnail gallery logic begins
    if (thumbnailsEnabled == true && thumbnailsSliderEnabled == true && $slides.length > 1) {
      // If desktop determine which slider we build
      if (Shopify.media_queries.large.matches) {
        // If thumbnail position is left/right then vertical slider gets enabled
        if (thumbnailsPosition == 'left' || thumbnailsPosition == 'right') {
          $thumbnailProductGallery.css('max-height', $productGallery.closest('.product-gallery').outerHeight());
          $thumbnailProductGallery.addClass('vertical-slider-enabled');

          $thumbnails.on('click', function(event) {
            var index = $(event.currentTarget).index();
            $productGallery.flickity('select', index);
          });

          var navCellHeight = $thumbnails.height();
          var navHeight = $thumbnailProductGallery.height();

          $productGallery.on( 'select.flickity', function() {
            // set selected nav cell
            var flkty = $productGallery.data('flickity');
            $thumbnailProductGallery.find('.is-nav-selected').removeClass('is-nav-selected');
            var $selected = $thumbnails.eq( flkty.selectedIndex ).addClass('is-nav-selected');

            // scroll nav
            var scrollY = $selected.position().top + $thumbnailProductGallery.scrollTop() - ( navHeight + navCellHeight ) / 2;
            $thumbnailProductGallery.animate({
              scrollTop: scrollY
            });
          });
        } else {
            $thumbnailProductGallery.flickity({
              cellAlign: 'center',
              contain: true,
              groupCells: '80%',
              imagesLoaded: true,
              pageDots: false,
              prevNextButtons: $thumbnails.length > 5 ? thumbnailsArrows : false,
              asNavFor: $productGallery[0],
              arrowShape: arrowSize
            });

            $thumbnailProductGallery.on('settle.flickity', function() {
              $thumbnailProductGallery.flickity('resize');
            });

            $(window).on('load', function() {
              $thumbnailProductGallery.flickity('resize');
            });

            // Once thumbnail is focused, move carousel to that cell
            $.each($thumbnails, function(index, thumbnail) {
              var $thumbnail = $(thumbnail);
              if ($thumbnail.hasClass('is-selected')) {
                $thumbnail.on('focus', function() {
                  $thumbnailProductGallery.flickity('selectCell', index);
                })
              }
            })
        }
      } else {
        // If not on desktop, create standard thumbnail slider
        $thumbnailProductGallery.flickity({
          cellAlign: 'center',
          contain: true,
          groupCells: '80%',
          imagesLoaded: true,
          pageDots: false,
          prevNextButtons: $thumbnails.length > 5 ? thumbnailsArrows : false,
          asNavFor: $productGallery[0],
          arrowShape: arrowSize
        });
      }
    } else if (thumbnailsEnabled == true ) {
      // If thumbnail slider is disabled, ensure thumbnails can still navigate product images
      $thumbnailProductGallery.find('.product-gallery__thumbnail').on('click', function(){
        var index = $(this).index();
        $productGallery.flickity( 'selectCell', index );
      })
    }

    $(window).on('load', function() {
      $productGallery.flickity().flickity('resize');
    });

    $productGallery.on('settle.flickity', function() {
      $productGallery.flickity().flickity('resize');
    });
  },
  loadProductRecommendations: function() {

    // NE compatibility
    // In NE, we will have a dynamic section ID that will need to be grabbed from the DOM like the other variables
    // var sectionID = $productRecommendationsContainer.data('section-id');
    // NE compatibility

    var $productRecommendations = $('.product-recommendations');
    var $productRecommendationsSection = $('.recommended-products-section');
    var $productRecommendationsContainer = $('[data-product-recommendations-container]');
    var $productRecommendationsDetailsBlock = $('.product-recommendations--details-block');
    var productID = $productRecommendations.data('product-id');
    var limit = $productRecommendations.data('limit');
    var recommendationsURL = $productRecommendations.data('recommendations-url');
    var sectionEnabled = $productRecommendationsSection.find($productRecommendations).data('enabled');
    var $recommendedProductSlider = $('.js-recommended-products-slider');

    // Check if section is enabled
    if (!sectionEnabled) {
      // If product.details template check if recommended products block has been added
      if ($('.shopify-section--product-details-template').length > 0) {
        if ($productRecommendationsDetailsBlock.length === 0) {
          return;
        }
      }

      // Hide the block
      $productRecommendationsContainer.hide();
      $productRecommendationsContainer.empty();
      return;
    } else {
      // Section setting is enabled
      // Meta related or dynamic collection?
      var metaCollection;
      if ($productRecommendations.hasClass('meta-related-recommended-collection')) {
        metaCollection = true;
      } else {
        metaCollection = false;
      }

      if (metaCollection) {
        $productRecommendationsContainer.empty();
        $productRecommendations.clone().appendTo($productRecommendationsContainer);
        $productRecommendationsContainer.show();
        $productRecommendationsSection.find($productRecommendations).hide();

        // Initialize product slider if it exists on page
        if ($recommendedProductSlider.length) {
          productPage.recommendedProductsSlider();
        } else {
          // Call enable gallery function for product galleries
          $('[data-product-recommendations-container] [data-product-gallery]').each(function(index, gallery) {
            var $productGallery = $(this);
            productPage.enableGallery($productGallery);
          });
        }

        // Re-link inline quickshop
        if (Shopify.theme_settings.quick_shop_style == 'inline') {
          $('[data-product-recommendations-container] .js-product_section .product_form_options').each(function () {
            new Shopify.OptionSelectors($(this).data("select-id"), { product: $(this).data("product"), onVariantSelected: selectCallback, enableHistoryState: $(this).data("enable-state") });
          });
        }

      } else {
        loadDynamicProducts();
      }
    }

    function loadDynamicProducts() {
      // NE compatibility
      // In NE, this request url will need to be updated to reflect the dynamic section ID, 'section_id=' + sectionID
      //Ends NE compatibility

      // Build request URL
      var requestUrl = recommendationsURL + "?section_id=product-recommendations&limit=" + limit + "&product_id=" + productID;

      // Make ajax call to request information for Shopify's recommended products
      $.ajax({
        type: 'GET',
        url: requestUrl,
        success: function(data) {

          if (!sectionEnabled) {
            $productRecommendationsContainer.empty();
            return;
          }

          var $recommendedProductsElement = $(data).find('.product-recommendations').html();

          // Insert product list into the product recommendations container
          $productRecommendationsContainer.html($recommendedProductsElement);

          // Hide product recommendations section
          $productRecommendationsSection.hide();

          // Initialize product slider if it exists on page
          if ($recommendedProductSlider.length) {
            productPage.recommendedProductsSlider();
          } else {
            // Call enable gallery function for product galleries
            $('[data-product-recommendations-container] [data-product-gallery]').each(function(index, gallery) {
              var $productGallery = $(this);
              productPage.enableGallery($productGallery);
            });
          }

          // Re-link swatches on inline quick-shop
          if (sectionEnabled) {
            $('[data-product-recommendations-container] .js-product_section .product_form_options').each(function () {
              new Shopify.OptionSelectors($(this).data("select-id"), { product: $(this).data("product"), onVariantSelected: selectCallback, enableHistoryState: $(this).data("enable-state") });
            });
          } else {
            $productRecommendations.find('.js-product_section .product_form_options').each(function () {
              new Shopify.OptionSelectors($(this).data("select-id"), { product: $(this).data("product"), onVariantSelected: selectCallback, enableHistoryState: $(this).data("enable-state") });
            });
          }

          // Quickshop initialization
          quickShop.init();

          // Initialize product slider if it exists on page
          if ($recommendedProductSlider.length) {
            productPage.recommendedProductsSlider();
          }

          // Converting the currencies
          if (Currency.show_multiple_currencies) {
            currencyConverter.convertCurrencies();
          }

          // Initialize shopify payment buttons
          if (Shopify.PaymentButton) {
            Shopify.PaymentButton.init();
          }

          videoFeature.setupRecommendedVideoPlayer();

          if (Shopify.theme_settings.collection_secondary_image) {
            imageFunctions.showSecondaryImage();
          }

          hideNoScript();

        }
      });
    }

  },
  productSwatches: function(){
    //Swatches linked with selected options
    if (Shopify.theme_settings.product_form_style == 'swatches'){
      if ($('.js-product_section').length){
        var $productForms = $('.js-product_section').find('.product_form');
        $productForms.addClass('is-visible');

        //Loop through each product and set the initial option value state

        $productForms.each(function(){
          var JSONData = $(this).data('product');
          var productID = $(this).data('product-id');
          var productSection = '.product-' + productID + ' .js-product_section';
          var swatchOptions = $(this).find('.swatch_options .swatch');
          if (swatchOptions.length > 1){
            Shopify.linkOptionSelectors(JSONData, productSection);
          }
        });
      }

      //Add click event when there is more than one product on the page (eg. Collection in Detail)
      if ($('.js-product_section').length > 1){
        $('body').on('click', '.swatch-element', function(){
          var swatchValue = $(this).data('value').toString();

          $(this)
          .siblings('input[value="'+ swatchValue.replace(/\"/g,'\\"') +'"]')
          .prop("checked", true)
          .trigger("change");

          var JSONData = $(this).parents('.product_form').data('product');
          var productID = $(this).parents('.product_form').data('product-id');
          var productSection = '.product-' + productID + ' .js-product_section';
          var swatchOptions = $(this).parents('.product_form').find('.swatch_options .swatch');

          if (swatchOptions.length > 1){
            Shopify.linkOptionSelectors(JSONData, productSection);
          }
        })
      }
    }
  },
  recommendedProductsSlider: function(){
    $('.js-recommended-products-slider .products-slider').each(function (index, value) {
      var products_per_slide = $(this).data('products-per-slide');
      var products_limit = $(this).data('products-limit');
      var products_available = $(this).data('products-available');
      var cellAlign,
          draggable,
          prevNext,
          wrapAround,
          initialIndex;

      if (products_per_slide == "2" && products_available > products_per_slide && products_limit > products_per_slide || products_per_slide == "4" && products_available > products_per_slide && products_limit > products_per_slide || products_per_slide == "6" && products_available > products_per_slide && products_limit > products_per_slide){
        cellAlign = "left";
      } else {
        cellAlign = "center";
      }

      if (products_available > products_per_slide && products_limit > products_per_slide) {
        draggable = true;
        prevNext = true;
        wrapAround = true;
      } else {
        draggable = false;
        prevNext = false;
        wrapAround = false;
      }

      if (products_per_slide == "2" && products_available > products_per_slide || products_per_slide == "4" && products_available > products_per_slide || products_per_slide == "6" && products_available > products_per_slide){
        initialIndex = 0;
      } else if (products_per_slide == "3" && products_available) {
        initialIndex = 1;
      } else if (products_per_slide == "5" && products_available) {
        initialIndex = 2;
      } else if (products_per_slide == "7" && products_available) {
        initialIndex = 3;
      }

      if (Shopify.media_queries.medium.matches) {
        cellAlign = "center";
        draggable = true;
        prevNext = true;
        wrapAround = true;
        initialIndex = 1;

        $(this).parents('.even-num-slides').removeClass('even-num-slides');
      }

      $(this).flickity({
        "lazyLoad": 2,
        "imagesLoaded": true,
        "draggable": draggable,
        "cellAlign": cellAlign,
        "prevNextButtons": prevNext,
        "wrapAround": wrapAround,
        "pageDots": usePageDots,
        "contain": true,
        "freeScroll": true,
        "arrowShape": arrowSize,
        "initialIndex": initialIndex
      });
    });
  },
  initializeQuantityBox: function(){

    $('body').on('click', '.js-change-quantity', function() {
        var $this = $(this),
            $input = $(this).siblings('input'),
            val = parseInt($input.val()),
            valMax = 100000000000000000000000000000,
            valMin = $input.attr('min') || 0;

        if ($input.attr('max') != null){
          valMax = $input.attr('max');
        }

        if(isNaN(val) || val < valMin) {
            $input.val(valMin);
            return false;
        } else if (val > valMax) {
            $input.val(valMax);
            return false;
        }

        if($this.data('func') == 'plus') {
            if(val < valMax) $input.val(val + 1);
        } else {
            if(val > valMin) $input.val(val - 1);
            if($this.parents(".cart_item").length) {
              if (val - 1 == 0) {
                $this.closest('.cart_item').addClass('animated fadeOutUp')
              }
            }
        }
        $input.trigger('change');

    });
  },
  unload: function($target){
    var $slider = $target.find('.products-slider');
    $slider.flickity('destroy');
    $('body').off('click', '.js-change-quantity');
  }
}

/*============================================================================
  Header
==============================================================================*/

var header = {
  init: function(){

    var closeDropdown = function() {
      $('body').removeClass('is-active');
      $('.dropdown_link').removeClass('active_link');
      $('.dropdown_container').hide();
      $('.mobile_nav').find('div').removeClass('open');
    };

    var closeMiniCart = function() {
      $('body').removeClass('is-active').removeClass('blocked-scroll');
      $('.dropdown_link').toggleClass('active_link');
      $('.cart-container').removeClass('active_link');
    };

    var openMiniCart = function($cart_container) {
      $('body').addClass('blocked-scroll');
      $('.mobile_nav div').removeClass('open');
      $('.dropdown_link').removeClass('active_link');
      $cart_container.addClass('active_link');
    };

    var closeAllSubSubmenus = function() {
      $('.vertical-menu_sub-submenu').removeClass('is-visible');
      $('.vertical-menu_sub-submenu').prev('a').attr('data-click-count', 0);
    }

    var closeAllSubmenus = function() {
      $('.vertical-menu_submenu').removeClass('is-visible');
      $('.vertical-menu_submenu').prev('a').attr('data-click-count', 0);
      $('.mega-menu-parent').attr('data-click-count', 0);
      closeAllSubSubmenus();
    }

    // Store link items with data attribute of 'data-show-dropdown-on-click' in a variable
    var $openDropdownOnClick = $('.main-nav__wrapper').find('[data-show-dropdown-on-click]');

    //Vertical menu enabled
    if ($('.dropdown_link--vertical').length){
      $('.dropdown_link--vertical, .mega-menu-parent').attr('data-click-count', 0);

      if ($openDropdownOnClick.length == 0) {
        $('.dropdown_link--vertical, .vertical-menu_submenu').on('mouseover', function(e) {
          var $dropdown = $(this).parents('.main-nav').find('[data-dropdown="' + $(this).data('dropdown-rel') + '"]');

          $('.dropdown_container').hide();
          $('.active_link').removeClass('active_link');
          if(!$(this).hasClass('active_link')) {
            $('.dropdown_container').hide();
            $(this).children('a').addClass('active_link');
            $('.is-absolute').parent().addClass('feature_image');
          }
        });
      }

      //Enable touch on parent link if user is on a touch device and desktop menu is visible, OR if 'open dropdown on click' setting is enabled
      if (is_touch_device() || $openDropdownOnClick.length >= 1){
        $('body').on('touchstart click', '.vertical-menu .sublink a, .vertical-menu_submenu .sublink a', function(e) {

          var clicked;
          var verticalMenu = $(this);
          var $dropdownVertical = $(verticalMenu).next('.vertical-menu_submenu');
          var $dropdownVerticalSubMenu = $(verticalMenu).next('.vertical-menu_sub-submenu');

          var showMenu = function() {
            $dropdownVertical.removeClass('hidden');
            $dropdownVerticalSubMenu.removeClass('hidden');
            $dropdownVertical.addClass('is-visible');
            $dropdownVerticalSubMenu.addClass('is-visible')
          }

          if(e.type == "touchstart") {
            clicked = true;
            if($(this).attr('data-click-count') < 1) {
              openDropdown(verticalMenu, e.target);
              e.preventDefault();
              e.stopPropagation();
            }
          }
          else if(e.type == "click" && !clicked) {
            if($(this).attr('data-click-count') < 1) {
              openDropdown(verticalMenu, e.target);
              e.preventDefault();
              e.stopPropagation();
            }
          }
          else {
            clicked = false;
          }

          function openDropdown(verticalMenu, target) {

            var $dropdownMegaMenu = $(verticalMenu).parents('.main-nav').find('[data-dropdown="' + $(this).data('dropdown-rel') + '"]');

            var clickCount = $(verticalMenu).attr('data-click-count');

            $('.dropdown_link--vertical').not(verticalMenu).attr('data-click-count', 0);
            $('.mega-menu-parent').attr('data-click-count', 0);
            $('.dropdown_link--vertical').attr('data-no-instant', true);
            $('.dropdown_container').hide();

            $dropdownMegaMenu.show();
            // Conditional to not close the parent dropdown when selecting various sub menus in the same parent
            if ($(target).parents('.vertical-menu_submenu').hasClass('is-visible')) {
              closeAllSubSubmenus();
              $('.is-absolute').parent().addClass('feature_image');
            } else {
              closeAllSubmenus();
              $('.is-absolute').parent().addClass('feature_image');
            }

            showMenu();

            //capture touch event or click event
            clickCount++;
            $(verticalMenu).attr('data-click-count', clickCount);

            if (clickCount < 2){
              e.preventDefault();
              e.stopPropagation();
              return false;
            }

          }
          // Close dropdown if click anywhere outside dropdown menu
          $('html').on('click', function(event) {
            if (!$(event.target).closest('.dropdown_container').length && !$(event.target).hasClass('url-deadlink')) {
              closeAllSubmenus();
              $('.is-absolute').parent().addClass('feature_image');
            }
          });
        });
      }
    }

    if ($('.promo-banner').length){
      var promo_banner = Cookies.get('promo-banner');

      if (promo_banner != 'dismiss') {
        $('body').addClass('promo-banner--show');
        $('.promo-banner').on('click', '.promo-banner__close', function(){
          $('body').removeClass('promo-banner--show');
          Cookies.set('promo-banner', 'dismiss', { expires: 30, path: '', domain: '', sameSite: 'None', secure: true });
        });
      }
    }

    //offscreen check for menu
    $('.vertical-menu_submenu, .vertical-menu_sub-submenu').each(function() {
      if($(this).is(':off-right')) {
        $(this).addClass('vertical-menu--align-right');
      }
    });

    //Click anywhere outside of dropdown to close
    $('html').on('click', function(event) {
      if (!$(event.target).closest('.cart-container').length && $('.cart_content').is(':visible')) {

        closeMiniCart();
      }

      if (!$(event.target).closest('.dropdown_container').length && $('.dropdown').is(':visible') && !$(event.target).hasClass('url-deadlink') && !$(event.target).hasClass('mega-menu-parent')) {
        $('.is-absolute').parent().addClass('feature_image');
        $('body').removeClass('is-active');
        closeDropdown();
        if ($openDropdownOnClick.length) {
          $('.dropdown_link').attr('data-click-count', 0);
        }
      }

    });

    //Only apply on larger screen sizes
    if (Shopify.media_queries.large.matches) {
      if ($('.header').hasClass('header-fixed--true')){

        //offset scroll position
        $('body').on('click', '.banner a[href^="#"]', function(e) {
            e.preventDefault();
            var anchorLink = $(this).attr('href');
            var headerHeight = $('.main-nav__wrapper.sticky_nav').outerHeight();
            $('html, body').animate({
              scrollTop: $(anchorLink).offset().top - headerHeight
            }, 2000);
        });

        if (!$('.main-nav__wrapper').hasClass('sticky_nav')) {
          var sticky_nav = new Headhesive('.main-nav__wrapper', {
            offset: 700,
            throttle: 300,
            classes: {
              clone: 'sticky_nav',
              stick: 'sticky_nav--stick',
              unstick: 'sticky_nav--unstick'
            },
            onInit: function() {
              $('.sticky_nav .secondary_logo').css('display', 'none');
              $('.sticky_nav .primary_logo').css('display', 'block');
              $('.sticky_nav .icon-search').css('display', 'block');
              $('.sticky_nav .search__form').css('display', 'none');
              $('.sticky_nav .search-link').css('display', 'block');
              $('.sticky_nav .main-nav').append($(".header .cart-container").clone());
            },
            onStick: function() {
              var maxHeight = 0;
              var $targetHeightElement = $('.sticky_nav .main-nav');

              $targetHeightElement.each(function() {
                maxHeight = maxHeight > $(this).outerHeight() ? maxHeight : $(this).outerHeight();
              });

              $('.sticky_nav .mini_cart').css('height', maxHeight);
              $('.sticky_nav .cart_content').css('top', maxHeight);
            },
            onUnstick: function() {
              $('.cart-container').removeClass('active_link');
            }
          });
        }
      } else {
        $('.header-fixed--true').removeClass('header-fixed--true');
        if ($('.main-nav__wrapper').length > 1) {
          $('.main-nav__wrapper').first().remove();
        }
      }

      if ($('img.primary_logo:visible')){
        $('.logo img', $(".feature_image .header")).attr('src', $('.logo img').data('src-home'));
      } else {
        $('.logo img').attr('src', $('.logo img').data('src'));
      }
    //Mobile menu
    } else {
      if ($('#header').hasClass('mobile_nav-fixed--true')){
        $('body').addClass('mobile_nav-fixed--true');

        //offset scroll position
        $('body').on('click', '.banner a[href^="#"]', function(e) {
            e.preventDefault();
            var anchorLink = $(this).attr('href');
            var headerHeight = $('#header').outerHeight();
            $('html, body').animate({
              scrollTop: $(anchorLink).offset().top - headerHeight
            }, 2000);
        });
      } else {
        $('body').addClass('mobile_nav-fixed--false');
      }
    }

    //avoid cart_content duplicating for mobile screen sizes
    if($('#header .cart_content').length < 1) {
      $('#header .cart-container').append($('.header .cart_content').clone());
    }

    if ( is_touch_device() && Shopify.media_queries.medium.matches || Shopify.media_queries.medium.matches ) {

      $('.dropdown_link').attr('data-no-instant', true);

      $('body').on('click', '.dropdown_link, .vertical--dropdown', function(e) {
        $('.nav a').removeClass('active_link');

        if ($('#header').is(':visible')) {
          var $dropdown = $(this).parents("#header").find('[data-dropdown="' + $(this).data("dropdown-rel") + '"]')

            if(!$(this).hasClass('mini_cart')) {
              $('.cart-container').removeClass('active_link');
            }

        } else {

          if($(this).hasClass("icon-search")) {
            window.location = $(this).attr("href");
            return false;
          }

          var $dropdown = $(this).parents('.main-nav').find('[data-dropdown="' + $(this).data('dropdown-rel') + '"]')
        }

        if ($dropdown.is(':visible') || $dropdown.attr('class') === undefined) {
          $dropdown.hide();
          $('body').removeClass('is-active');
        } else {
          $('.dropdown_container').hide();
          if(!$(this).hasClass('cart-container')) {
            $('.is-absolute').parent().removeClass('feature_image');
          }
          $dropdown.show();
          $('body').addClass('is-active');
          $('.mobile_nav').find('div').removeClass('open');
        }

        if ($dropdown.is(':visible')) {
          e.stopPropagation();
          return false;
        }
      });

      $('body').on("click", '.mobile_nav', function() {
        $(this).find('div').toggleClass('open');
      });

      //Toggle mini-cart with menu icon
      if(Shopify.theme_settings.cart_action != 'redirect_cart') {
        $(".mini_cart").on("click", function(e) {
          var $cart_container = $(this).parent();
          if($cart_container.hasClass('active_link')) {
            closeMiniCart();
            $('body').removeClass('blocked-scroll');
          } else {
            openMiniCart($cart_container);
            $('body').addClass('blocked-scroll');
          }
          if (is_touch_device() || Shopify.media_queries.medium.matches) {
            e.preventDefault();
          }
        });
      }


      $('.cart_content__continue-shopping').on('click', function(e){
        closeMiniCart();
      })

    } else {
      var $openDropdownOnClick = $('.main-nav__wrapper').find('[data-show-dropdown-on-click]');
      //Enable touch on parent link if on touch device and desktop menu is visible
      if($openDropdownOnClick.length || is_touch_device()){
        $('.dropdown_link').attr('data-click-count', 0);

        $('.dropdown_link').on('click', function(e) {

          var $dropdown = $(this).parents('.main-nav').find('[data-dropdown="' + $(this).data('dropdown-rel') + '"]');

          var clickCount = $(this).attr('data-click-count');
          closeAllSubmenus();
          closeDropdown();

          $('.dropdown_link').not(this).attr('data-click-count', 0);
          $('.dropdown_link').attr('data-no-instant', true);

          $('.active_link').removeClass('active_link');

          if(!$(this).hasClass('active_link')) {
            $dropdown.show();

            if($(this).hasClass('mini_cart')) {
              if(!$('body').hasClass('cart')) {
                $(this).parent('.cart-container').addClass('active_link');
              }
            } else {
              $(this).addClass('active_link');
              $('.is-absolute').parent().removeClass('feature_image');
            }
          }

          //capture touch event
          if (e.type == 'click'){
            clickCount++;
            $(this).attr('data-click-count', clickCount);

            if (clickCount < 2){
              e.preventDefault();
              e.stopPropagation();
              return false;
            }
          }
        });
      }

      if ($openDropdownOnClick.length == 0) {
        $(".nav a, .logo a").not(".cart_content a").on("mouseenter", function() {
          if(!$(this).hasClass("active_link")) {
            $('.dropdown_container').hide();
            $('.active_link').removeClass('active_link');
            $('.is-absolute').parent().addClass('feature_image');
          }
        });

        $('.main-nav, .top-bar, .cart-container').on("mouseleave", function() {
          $('.dropdown_container').hide();
          $('.active_link').removeClass('active_link');
          $('.is-absolute').parent().addClass('feature_image');
          $('body').removeClass('is-active');
        });


        $('.dropdown_link').on('mouseover', function(e) {
          $('.dropdown_container').hide();

          var $dropdown = $(this).parents('.main-nav').find('[data-dropdown="' + $(this).data('dropdown-rel') + '"]');

          $('.active_link').removeClass('active_link');

          if(!$(this).hasClass('active_link')) {
            $dropdown.show();

            if($(this).hasClass('mini_cart')) {
              if(!$('body').hasClass('cart')) {
                $(this).parent('.cart-container').addClass('active_link');
              }
            } else {
              $(this).addClass('active_link');
              $('.is-absolute').parent().removeClass('feature_image');
            }
          }

        });
      }


    }

  },
  removeDataAttributes: function(target){
    if($(target).length){
      var i,
          $target = $(target),
          attrName,
          dataAttrsToDelete = [],
          dataAttrs = $target.get(0).attributes,
          dataAttrsLen = dataAttrs.length;

      for (i=0; i<dataAttrsLen; i++) {
        if ( 'data-' === dataAttrs[i].name.substring(0,5) ) {
          dataAttrsToDelete.push(dataAttrs[i].name);
        }
      }
      $.each( dataAttrsToDelete, function( index, attrName ) {
        $target.removeAttr( attrName );
      })
    }
  },
  loadMegaMenu: function(){

    //Remove old mega-menus so that theme-editor works properly
    $('.sticky_nav .mega-menu').remove();
    $('.header .mega-menu').remove();

    //Clone the mega menu from section into sticky_nav
    $('.mega-menu-container .mega-menu')
      .clone()
      .appendTo('.sticky_nav .main-nav');
    //Remove theme-editor data-attributes
    header.removeDataAttributes('.sticky_nav .mega-menu.dropdown_container .dropdown_column');

    //Loop through mega-menus to add arrow to parent
    $('.mega-menu-container .mega-menu').each(function(index){
      var megaMenuValue = $(this).data("dropdown");
      $('[data-dropdown-rel="' + megaMenuValue + '"]')
        .find('span')
        .remove();

      $('[data-dropdown-rel="' + megaMenuValue + '"]')
        .not('.icon-search')
        .append(' <span class="icon-down-arrow"></span>')
        .addClass('mega-menu-parent')
        .addClass('dropdown_link')
        .removeClass('top_link');

      $('[data-dropdown="' + megaMenuValue + '"]').each(function(index){
        if (!$(this).hasClass('mega-menu')) {
          $(this).remove();
        }
      });

      $(this).clone().appendTo('.header .main-nav');
    });

    //Remove default mega menus if vertical menus are selected
    if ($('.dropdown_link--vertical').length){
      $('.dropdown_link--vertical.mega-menu-parent + .vertical-menu_submenu').remove();
      $('.dropdown_link--vertical:not(.mega-menu-parent)').each(function(index){
        var megaMenuValue = $(this).data('dropdown-rel');
        $('[data-dropdown="' + megaMenuValue + '"]').remove();
      })
    }
    var $openDropdownOnClick = $('.main-nav__wrapper').find('[data-show-dropdown-on-click]');

    if ($openDropdownOnClick.length) {
      $('.mega-menu-parent').on('click', function(e) {

        if(!$(this).hasClass('active_link')) {
          $('.dropdown_container').hide();
          $(this).parents('.main-nav').find('[data-dropdown="' + $(this).data('dropdown-rel') + '"]').toggle();

          $(this).addClass('active_link');
          $('.is-absolute').parent().removeClass('feature_image');
        }
      });
    }

    //Remove theme-editor data-attributes
    header.removeDataAttributes('.header .mega-menu.dropdown_container .dropdown_column');

    if (is_touch_device() || Shopify.media_queries.medium.matches) {
      $('.dropdown_link').attr('data-no-instant', true);
    }

    header.loadMobileMegaMenu();
  },
  loadMobileMegaMenu: function() {

    //Loop through mega menus and add to mobile menu
    $('.mega-menu-container .mobile-mega-menu').each(function(index){
      $('[data-mobile-dropdown-rel="' + $(this).data("mobile-dropdown") + '"]').find('span').remove();
      $('[data-mobile-dropdown-rel="' + $(this).data("mobile-dropdown") + '"] > a').append(' <span class="right icon-down-arrow"></span>').attr('data-no-instant', 'true');
      $('[data-mobile-dropdown-rel="' + $(this).data("mobile-dropdown") + '"]').addClass('mobile-mega-menu-parent sublink');
      $('[data-mobile-dropdown-rel="' + $(this).data("mobile-dropdown") + '"]').append(this);
      $('[data-mobile-dropdown-rel="' + $(this).data("mobile-dropdown") + '"] > ul').each(function(index){
        if (!$(this).hasClass('mobile-mega-menu')) {
          $(this).remove();
        }
      });
    });
  },
  unloadMegaMenu: function(){
    $('.header .mega-menu').remove();
    $('.mega-menu-container .mega-menu').each(function(index){
      var menuParent = $(this).data('dropdown');
      $('.mega-menu-parent[data-dropdown-rel="' + $(this).data("dropdown") + '"]').find('.icon-down-arrow').remove();
    });
  },
  unload: function() {
    $('body').off('click', '.mobile_nav');
    $('body').off('click', '.dropdown_link');
    $('html').off('click');
    $('.mini_cart').off('click');
    $('.cart_content__continue-shopping').off('click');
    $('body').off('click', '.banner a[href^="#"]');
    $('.main-nav__wrapper.sticky_nav').remove();
  }
}

/*============================================================================
  Map
==============================================================================*/
var mapFunction = {
  init: function() {

    if($('.lazymap').length > 0){
      lazyframe('.lazymap');
    }

    if ($('.maps').hasClass('js-api-map')) {
      var mapsToLoad = [];
      //Create map settings array
      $('.map').each(function(i, obj) {
        mapsToLoad.push(this);
        mapsToLoad[i].sectionid = $(this).data('id');
        mapsToLoad[i].address = $(this).data('address');
        mapsToLoad[i].directions = $(this).data('directions-address');
        mapsToLoad[i].zoom = $(this).data('zoom');
        mapsToLoad[i].mapstyle = $(this).data('style');
        mapsToLoad[i].showpin = $(this).data('pin');
        mapsToLoad[i].apikey = $(this).data('api-key');
      });
      $.each(mapsToLoad, function(i, instance) {
        //Enable caching to avoid duplicate google maps files
        $.ajaxSetup({ cache: true });
        //Load maps script and find location coordinates
        $.getScript(
          'https://maps.googleapis.com/maps/api/js?key=' + mapsToLoad[i].apikey
        ).then(function() {
          mapFunction.findLocation(mapsToLoad[i]);
          $.ajaxSetup({ cache: false });
        });
      });
    }
  },
  findLocation: function(mapArray) {
    var geoLat;
    var geoLng;
    var geocoder = new google.maps.Geocoder();
    //Find and set coordinates
    geocoder.geocode({ address: mapArray.address }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        geoLat = results[0].geometry.location.lat();
        geoLng = results[0].geometry.location.lng();
        //Create map
        mapFunction.initMap(geoLat, geoLng, mapArray);
      } else {
        console.log('Error:' + status);
      }
    });
  },
  initMap: function(lat, lng, mapArray) {
    var location = { lat: lat, lng: lng };
    var styleJson = [];
    //Set style JSON
    if(mapArray.mapstyle=='aubergine'){
      styleJson=[{elementType:'geometry',stylers:[{color:'#1d2c4d'}]},{elementType:'labels.text.fill',stylers:[{color:'#8ec3b9'}]},{elementType:'labels.text.stroke',stylers:[{color:'#1a3646'}]},{featureType:'administrative.country',elementType:'geometry.stroke',stylers:[{color:'#4b6878'}]},{featureType:'administrative.land_parcel',elementType:'labels.text.fill',stylers:[{color:'#64779e'}]},{featureType:'administrative.province',elementType:'geometry.stroke',stylers:[{color:'#4b6878'}]},{featureType:'landscape.man_made',elementType:'geometry.stroke',stylers:[{color:'#334e87'}]},{featureType:'landscape.natural',elementType:'geometry',stylers:[{color:'#023e58'}]},{featureType:'poi',elementType:'geometry',stylers:[{color:'#283d6a'}]},{featureType:'poi',elementType:'labels.text.fill',stylers:[{color:'#6f9ba5'}]},{featureType:'poi',elementType:'labels.text.stroke',stylers:[{color:'#1d2c4d'}]},{featureType:'poi.park',elementType:'geometry.fill',stylers:[{color:'#023e58'}]},{featureType:'poi.park',elementType:'labels.text.fill',stylers:[{color:'#3C7680'}]},{featureType:'road',elementType:'geometry',stylers:[{color:'#304a7d'}]},{featureType:'road',elementType:'labels.text.fill',stylers:[{color:'#98a5be'}]},{featureType:'road',elementType:'labels.text.stroke',stylers:[{color:'#1d2c4d'}]},{featureType:'road.highway',elementType:'geometry',stylers:[{color:'#2c6675'}]},{featureType:'road.highway',elementType:'geometry.stroke',stylers:[{color:'#255763'}]},{featureType:'road.highway',elementType:'labels.text.fill',stylers:[{color:'#b0d5ce'}]},{featureType:'road.highway',elementType:'labels.text.stroke',stylers:[{color:'#023e58'}]},{featureType:'transit',elementType:'labels.text.fill',stylers:[{color:'#98a5be'}]},{featureType:'transit',elementType:'labels.text.stroke',stylers:[{color:'#1d2c4d'}]},{featureType:'transit.line',elementType:'geometry.fill',stylers:[{color:'#283d6a'}]},{featureType:'transit.station',elementType:'geometry',stylers:[{color:'#3a4762'}]},{featureType:'water',elementType:'geometry',stylers:[{color:'#0e1626'}]},{featureType:'water',elementType:'labels.text.fill',stylers:[{color:'#4e6d70'}]}]
    }else if(mapArray.mapstyle=='retro'){
      styleJson=[{elementType:'geometry',stylers:[{color:'#ebe3cd'}]},{elementType:'labels.text.fill',stylers:[{color:'#523735'}]},{elementType:'labels.text.stroke',stylers:[{color:'#f5f1e6'}]},{featureType:'administrative',elementType:'geometry.stroke',stylers:[{color:'#c9b2a6'}]},{featureType:'administrative.land_parcel',elementType:'geometry.stroke',stylers:[{color:'#dcd2be'}]},{featureType:'administrative.land_parcel',elementType:'labels.text.fill',stylers:[{color:'#ae9e90'}]},{featureType:'landscape.natural',elementType:'geometry',stylers:[{color:'#dfd2ae'}]},{featureType:'poi',elementType:'geometry',stylers:[{color:'#dfd2ae'}]},{featureType:'poi',elementType:'labels.text.fill',stylers:[{color:'#93817c'}]},{featureType:'poi.park',elementType:'geometry.fill',stylers:[{color:'#a5b076'}]},{featureType:'poi.park',elementType:'labels.text.fill',stylers:[{color:'#447530'}]},{featureType:'road',elementType:'geometry',stylers:[{color:'#f5f1e6'}]},{featureType:'road.arterial',elementType:'geometry',stylers:[{color:'#fdfcf8'}]},{featureType:'road.highway',elementType:'geometry',stylers:[{color:'#f8c967'}]},{featureType:'road.highway',elementType:'geometry.stroke',stylers:[{color:'#e9bc62'}]},{featureType:'road.highway.controlled_access',elementType:'geometry',stylers:[{color:'#e98d58'}]},{featureType:'road.highway.controlled_access',elementType:'geometry.stroke',stylers:[{color:'#db8555'}]},{featureType:'road.local',elementType:'labels.text.fill',stylers:[{color:'#806b63'}]},{featureType:'transit.line',elementType:'geometry',stylers:[{color:'#dfd2ae'}]},{featureType:'transit.line',elementType:'labels.text.fill',stylers:[{color:'#8f7d77'}]},{featureType:'transit.line',elementType:'labels.text.stroke',stylers:[{color:'#ebe3cd'}]},{featureType:'transit.station',elementType:'geometry',stylers:[{color:'#dfd2ae'}]},{featureType:'water',elementType:'geometry.fill',stylers:[{color:'#b9d3c2'}]},{featureType:'water',elementType:'labels.text.fill',stylers:[{color:'#92998d'}]}]
    }else if(mapArray.mapstyle=='silver'){
      styleJson=[{elementType:'geometry',stylers:[{color:'#f5f5f5'}]},{elementType:'labels.icon',stylers:[{visibility:'off'}]},{elementType:'labels.text.fill',stylers:[{color:'#616161'}]},{elementType:'labels.text.stroke',stylers:[{color:'#f5f5f5'}]},{featureType:'administrative.land_parcel',elementType:'labels.text.fill',stylers:[{color:'#bdbdbd'}]},{featureType:'poi',elementType:'geometry',stylers:[{color:'#eeeeee'}]},{featureType:'poi',elementType:'labels.text.fill',stylers:[{color:'#757575'}]},{featureType:'poi.park',elementType:'geometry',stylers:[{color:'#e5e5e5'}]},{featureType:'poi.park',elementType:'labels.text.fill',stylers:[{color:'#9e9e9e'}]},{featureType:'road',elementType:'geometry',stylers:[{color:'#ffffff'}]},{featureType:'road.arterial',elementType:'labels.text.fill',stylers:[{color:'#757575'}]},{featureType:'road.highway',elementType:'geometry',stylers:[{color:'#dadada'}]},{featureType:'road.highway',elementType:'labels.text.fill',stylers:[{color:'#616161'}]},{featureType:'road.local',elementType:'labels.text.fill',stylers:[{color:'#9e9e9e'}]},{featureType:'transit.line',elementType:'geometry',stylers:[{color:'#e5e5e5'}]},{featureType:'transit.station',elementType:'geometry',stylers:[{color:'#eeeeee'}]},{featureType:'water',elementType:'geometry',stylers:[{color:'#c9c9c9'}]},{featureType:'water',elementType:'labels.text.fill',stylers:[{color:'#9e9e9e'}]}]
    }else if(mapArray.mapstyle=='night'){
      styleJson=[{elementType:'geometry',stylers:[{color:'#242f3e'}]},{elementType:'labels.text.fill',stylers:[{color:'#746855'}]},{elementType:'labels.text.stroke',stylers:[{color:'#242f3e'}]},{featureType:'administrative.locality',elementType:'labels.text.fill',stylers:[{color:'#d59563'}]},{featureType:'poi',elementType:'labels.text.fill',stylers:[{color:'#d59563'}]},{featureType:'poi.park',elementType:'geometry',stylers:[{color:'#263c3f'}]},{featureType:'poi.park',elementType:'labels.text.fill',stylers:[{color:'#6b9a76'}]},{featureType:'road',elementType:'geometry',stylers:[{color:'#38414e'}]},{featureType:'road',elementType:'geometry.stroke',stylers:[{color:'#212a37'}]},{featureType:'road',elementType:'labels.text.fill',stylers:[{color:'#9ca5b3'}]},{featureType:'road.highway',elementType:'geometry',stylers:[{color:'#746855'}]},{featureType:'road.highway',elementType:'geometry.stroke',stylers:[{color:'#1f2835'}]},{featureType:'road.highway',elementType:'labels.text.fill',stylers:[{color:'#f3d19c'}]},{featureType:'transit',elementType:'geometry',stylers:[{color:'#2f3948'}]},{featureType:'transit.station',elementType:'labels.text.fill',stylers:[{color:'#d59563'}]},{featureType:'water',elementType:'geometry',stylers:[{color:'#17263c'}]},{featureType:'water',elementType:'labels.text.fill',stylers:[{color:'#515c6d'}]},{featureType:'water',elementType:'labels.text.stroke',stylers:[{color:'#17263c'}]}]}else{styleJson=[]}
    //Create google maps link
    $('.js-map-link').attr(
      'href',
      'https://www.google.com/maps/place/' +
        mapArray.directions +
        '/@' +
        lat +
        ',' +
        lng
    );
    //Set map options
    var mapOptions = {
      zoom: mapArray.zoom,
      center: location,
      styles: styleJson,
      disableDefaultUI: false
    };
    //Create map
    var map = new google.maps.Map(
      document.getElementById(mapArray.sectionid),
      mapOptions
    );
    //Show pin
    if (mapArray.showpin == true) {
      var marker = new google.maps.Marker({
        position: location,
        map: map
      });
    }
  }
};

/*============================================================================
  Global accordions
==============================================================================*/
var globalAccordions = {
  init: function(){
    var flg = 0;
    var $faqHeading = $('.faqAccordion > dt > button, .accordion > dt > a');
    $('.faqAccordion > dd, .accordion > dd').attr('aria-hidden',true);
    $faqHeading.attr('aria-expanded',false);
    $faqHeading.on('click activate',function(){
      if( flg ) return false;
      flg = 1;
      var state = $(this).attr('aria-expanded') === 'false' ? true : false;
      $(this).attr('aria-expanded',state);
      $(this).parent().next().slideToggle(function(){
        flg = 0;
      });
        $(this).parent().next().attr('aria-hidden',!state);
      return false;
    });
    $faqHeading.on('keydown',function(event){
      var keyCode = event.keyCode || e.which;
      if (keyCode === 13){
        $(this).trigger('activate');
      }
    });
  }
};

/*============================================================================
  Global shortcodes
==============================================================================*/
class ProductCTA extends HTMLElement {
  static get shortcode() {
    return 'product-cta';
  }

  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    this.attachShadow({ mode: 'open' }); // sets and returns 'this.shadowRoot'
    this.events = [];

    const forAttr = this.getAttribute('for');
    const variants = forAttr ? document.querySelector(`#${forAttr} [data-variants]`) : null;
    const variantId = this.getAttribute('variantid');
    const appendto = document.querySelector(this.getAttribute('appendto'));

    if (!variants || !variantId) {
      this._setVisible(false);
      return;
    }

    if (appendto) {
      appendto.appendChild(this);
    }

    // Remove element from DOM and insert new element into position
    this._registerEvent({ el: variants, event: 'change', listener: e => this._onVariantChange(e, variantId) });
    this._setVisible(variants.value === this.variantId);
  }

  connectedCallback() {
    const href = this.getAttribute('href') || '#';
    const target = this.getAttribute('target');
    const style = document.createElement('style');
    const a = document.createElement('a');
    const slot = document.createElement('slot');

    style.innerHTML = `
      a {
        color: inherit;
        cursor; inherit;
        text-decoration: inherit;
      }
    `;

    a.href = href;
    a.target = target;
    a.appendChild(slot);

    if (target === '_blank') {
      const icon = document.createElement('span');
      icon.classList.add('button-icon');
      icon.setAttribute('aria-label', '(New window)');
      icon.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.81792 2.29812L5.68732 5.42884L6.57121 6.3127L9.70198 3.18183L9.70227 5.51933L10.9523 5.51917L10.9518 1.67302L10.9517 1.0481L10.3268 1.0481L6.48062 1.04815L6.48064 2.29815L8.81792 2.29812ZM1.67297 1.04817H1.04797V1.67317V10.327V10.952H1.67297H10.3268H10.9518V10.327V8.13026H9.70175V9.70195H2.29797V2.29817H3.83642V1.04817H1.67297Z" fill="currentColor"/></svg>';

      // attach the created elements to the shadow DOM
      a.appendChild(icon);
    }

    this.shadowRoot.append(style, a);
  }

  disconnectedCallback() {
    this.events.forEach(({ el, event, listener }) => el.removeEventListener(event, listener));
    this.shadowRoot.innerHTML = '';
    this._setVisible(true);
  }

  _registerEvent({ el, event, listener }) {
    this.events.push({ el, event, listener });

    el.addEventListener(event, listener);

    return { el, event, listener };
  }

  _setVisible(visible) {
    this.toggleAttribute('hidden', !visible);
  }

  _onVariantChange(e, variantId) {
    this._setVisible(e.currentTarget.value === variantId);
  }
}

customElements.define(ProductCTA.shortcode, ProductCTA);
