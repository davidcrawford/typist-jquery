(function( $ ) {
  $('head').append('\
    <style>\
    .typist-container {\
      overflow: hidden;\
      font-family: monospace;\
      background-color: #333;\
      color: #DDD;\
      padding-left: 4px;\
    }\
    .typist-container p {\
      margin: 0 0 3px;\
    }\
    .typist-container p.prompt {\
      margin: 5px 0;\
    }\
    </style>');

  var MAX_SCROLL = 999999999;
  var defaults = {
    width: 400,
    height: 300
  };
  var $el, typeDelay = 80;


  var blinkTimer;
  var startBlink = function(next) {
    blinkTimer = setInterval(function() {
      $('.cursor').toggle();
    }, 500);
    next && next();
  };

  var stopBlink = function(next) {
    clearInterval(blinkTimer);
    next && next();
  };

  var addLine = function() {
    $('.cursor').remove();
    var p = $('<p>&nbsp;</p>');
    $el.append(p);
    $el.scrollTop(MAX_SCROLL);
    return p;
  };

  var methods = {
    
    init: function(config) {
      config = $.extend(defaults, config);

      $el = this;

      $el.addClass('typist-container')
        .width(config.width)
        .height(config.height);

      startBlink();

      return $el;
    },
    prompt: function() {
      return $el.queue(function(next) {
        $('.cursor').remove();
        addLine()
          .addClass('prompt')
          .html('$ <span class="cursor">|</span>');
        $el.scrollTop(MAX_SCROLL);
        next();
      });
    },
    type: function(text) {
      $el.queue(stopBlink);
      var typeChar = function(index) {
        $el.queue(function(next) {
          $('.cursor').before(text[index]);
          $el.scrollTop(MAX_SCROLL);
          next();
        })
        .delay(typeDelay);
      };
      for (var i = 0; i < text.length; i++) {
        typeChar(i);
      }
      return $el.queue(startBlink);  
    },
    echo: function(text) {
      var $p;
      var typeChar = function(index) {
        $el.queue(function(next) {
          if (index === 0) {
            $p = addLine();
          }

          $p.append(text[index]);
          $el.scrollTop(MAX_SCROLL);
          next();
        })
        .delay(typeDelay);
      };
      for (var i = 0; i < text.length; i++) {
        typeChar(i);
      }
      return $el;
    },
    wait: function(millis) {
      return $el.delay(millis);
    },
    speed: function(speed) {
      if (speed === 'fast') {
        typeDelay = 20;
      }
      else if (speed === 'slow') {
        typeDelay = 120;
      }
      return $el;
    }
  };

  $.fn.typist = function(method) {
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }    
  };


})( jQuery );



