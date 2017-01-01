(function ($) {

    var PPSliderClass = function (el, opts) {
        var element = $(el);
        var options = opts;
        var isMouseDown = false;
       	var initialVal = parseInt(element[0].dataset.val);
       	if (!initialVal) {
       		initialVal = 1;
       	};
        if (!options.percentage) {
	        initialVal = ((initialVal*100)/options.maxValue);
        }else{
	        initialVal = initialVal;
        }
        var currentVal = initialVal;

        var container = $(el).parent();

        container.addClass('pp-slider');
        container.addClass('clearfix');

        container.append('<div class="pp-slider-scale"><div class="pp-slider-scale-fill"></div><div class="pp-slider-button"></div><div class="pp-slider-tooltip"></div></div>');
        
        if (typeof(options) != 'undefined' && typeof(options.hideTooltip) != 'undefined' && options.hideTooltip == true)
        {
          container.find('.pp-slider-tooltip').hide();
        }

        if (typeof(options.width) != 'undefined')
        {
          container.css('width',(options.width+'px'));
        }
        container.find('.pp-slider-scale').css('width',(container.width()-30)+'px');

          var upperBound = (container.find('.pp-slider-scale').width()-container.find('.pp-slider-button').width());
          initialVal = (initialVal/100)*upperBound;
          var newPos = initialVal;
          newPos = Math.max(options.minValue,newPos);
          newPos = Math.min(newPos,upperBound);
          currentVal = (newPos/upperBound)*100;

          container.find('.pp-slider-button').css("left", newPos);
          container.find('.pp-slider-scale-fill').css('width',newPos);
          container.find('.pp-slider-tooltip').html(Math.round(((currentVal/100)*options.maxValue))+options.units);
          container.find('.pp-slider-tooltip').css('left', newPos-6);

        var startSlide = function (e) {            
          
          isMouseDown = true;
          var pos = getMousePosition(e);
          startMouseX = pos.x;
          
          lastElemLeft = ($(this).offset().left - $(this).parent().offset().left);
          updatePosition(e);

          return false;
        };
        
        var getMousePosition = function (e) {
          //container.animate({ scrollTop: rowHeight }, options.scrollSpeed, 'linear', ScrollComplete());
          var posx = 0;
          var posy = 0;

          if (!e) var e = window.event;

          if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
          }
          else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop  + document.documentElement.scrollTop;
          }

          return { 'x': posx, 'y': posy };
        };

        var updatePosition = function (e) {
          var pos = getMousePosition(e);

          var spanX = (pos.x - startMouseX);

          var newPos = (lastElemLeft + spanX)
          var upperBound = (container.find('.pp-slider-scale').width()-container.find('.pp-slider-button').width());
          newPos = Math.max(options.minValue,newPos);
          newPos = Math.min(newPos,upperBound);
          currentVal = (newPos/upperBound)*100;

          // container.find('.pp-slider-button').css("transition", "0s left");
          // container.find('.pp-slider-scale-fill').css('transition',"0s width");
          // container.find('.pp-slider-tooltip').css('transition', "0s left");
          container.find('.pp-slider-button').css("left", newPos);
          container.find('.pp-slider-scale-fill').css('width',newPos);
          container.find('.pp-slider-tooltip').html(Math.round((currentVal/100)*options.maxValue)+options.units);
          container.find('.pp-slider-tooltip').css('left', newPos-6);
        };

        var moving = function (e) {
          if(isMouseDown){
            updatePosition(e);
            return false;
          }
        };

        var dropCallback = function (e) {
          isMouseDown = false;
          element.val(currentVal);
          if(typeof element.options != 'undefined' && typeof element.options.onChanged == 'function'){
            element.options.onChanged.call(this, null);
          }
          var elemValue = Math.round((currentVal/100)*options.maxValue);
          options.setValue(element[0], elemValue);

        };

        // var startSlideClick = function (e) {
        // 	e.stopPropagation();      
          
        //   // isMouseDown = true;
        //   var pos = getMousePosition(e);
        //   startMouseX = pos.x;
          
        //   lastElemLeft = ($(this).offset().left - $(this).parent().offset().left);
        //   updatePosition(e);

        //   return false;
        // };

        container.find('.pp-slider-button').bind('mousedown',startSlide);
        // container.find('.pp-slider-scale').bind('click',startSlideClick);

        $(document).mousemove(function(e) { moving(e); });
		$(document).mouseup(function(e){
		    if(isMouseDown){
	        	dropCallback(e);
		    }
		}); 
    };

    var PPredrawClass = function (el, opts) {
        var element = $(el);
        var options = opts;
       	var initialVal = 0;
        if (!options.percentage) {
	        initialVal = ((element[0].dataset.val*100)/options.maxValue);
        }else{
	        initialVal = element[0].dataset.val;
        }
        var currentVal = initialVal;
        var container = $(el).parent();

        
        if (typeof(options) != 'undefined' && typeof(options.hideTooltip) != 'undefined' && options.hideTooltip == true)
        {
          container.find('.pp-slider-tooltip').hide();
        }

        if (typeof(options.width) != 'undefined')
        {
          container.css('width',(options.width+'px'));
        }
        container.find('.pp-slider-scale').css('width',(container.width()-30)+'px');

          
          var upperBound = (container.find('.pp-slider-scale').width()-container.find('.pp-slider-button').width());
          initialVal = (initialVal/100)*upperBound;
          var newPos = initialVal;
          newPos = Math.max(0,newPos);
          newPos = Math.min(newPos,upperBound);
          currentVal = (newPos/upperBound)*100;

          // container.find('.pp-slider-button').css("transition", "0.3s left");
          // container.find('.pp-slider-scale-fill').css('transition',"0.3s width");
          // container.find('.pp-slider-tooltip').css('transition', "0.3s left");
          container.find('.pp-slider-button').css("left", newPos);
          container.find('.pp-slider-scale-fill').css('width',newPos);
          container.find('.pp-slider-tooltip').css('left', newPos-6);
          container.find('.pp-slider-tooltip').html(Math.round((currentVal/100)*options.maxValue)+options.units);

          var elemValue = Math.round((currentVal/100)*options.maxValue);
          options.setValue(element[0], elemValue);



    };

    /*******************************************************************************************************/

    $.fn.PPSlider = function (options) {
        var opts = $.extend({}, $.fn.PPSlider.defaults, options);

        return this.each(function () {
            new PPSliderClass($(this), opts);
        });
    }

    $.fn.PPredraw = function (options) {
    	var opts = $.extend({}, $.fn.PPSlider.defaults, options);

        return this.each(function () {
            new PPredrawClass($(this), opts);
        });
    }

    $.fn.PPSlider.defaults = {
        width: 150,
        maxValue: 60,
        minValue: 1,
        units: "s",
        percentage: false,
        setValue: function(elem, value){
        	console.log(value);
        }
    };



})(jQuery);


