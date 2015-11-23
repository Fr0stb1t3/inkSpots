/**
    InkSpots 0.0.1 (prototype version)
    InkSpots generates random spotted background
    Copyright (c) 2015 Antoni Atanasov
    License: MIT 
    For more information check the Readme
    Project site: Coming Soon
    Github site:
**/
var window = window;
(function() {
   
    function applySpots(target){
        var elements=document.querySelectorAll(target);
        for(j = 0 ;j< elements.length; j++){
            el = elements[j];
            domSpot(el);
        }
    }
    function domSpot(el){
            var tW = el.offsetWidth - 100;
            var tH = el.offsetHeight - 100;
            var bUrl = 'background-image: url("images/spot1.svg")';
            var bPos = "background-position: 0px 0px";
            var bRep = "background-repeat: no-repeat";
            var bSize = "background-size: 100%";
            
            for(var i = 1;i < 20;i++){
                var k = i%3 + 1;
                bUrl += ' , url("images/spot'+k+'.svg") '
                bPos += ' , '+randomIntFromInterval(-200,tW)+"px "+randomIntFromInterval(-200,tH)+"px";
                bRep += ' ,  no-repeat'
                bSize += ' ,  '+randomIntFromInterval(1,200)+'%'
            }
            bUrl +=';'
            bPos +=';'
            bRep +=';'
            bSize +=';'
            el.setAttribute('style',bUrl+bPos+bRep+bSize);
    }
    function randomIntFromInterval(min,max,space)
    {
        var space = space || 0;
        return Math.floor(Math.random()*(max-min+1)+min) - space;
    }
    window.applyInkSpots = function(target) {
        applySpots(target);
    }
    if ( typeof jQuery !== 'undefined' ){
        jQuery.fn.inkSpots = function() {
            return this.each(function(i) {
               
                domSpot(this);
            })
        }
    };
})();