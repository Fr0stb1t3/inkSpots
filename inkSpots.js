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
var spotDefs = typeof spotDefs === 'undefined' ? 0 : spotDefs;
(function() {
    var testCounter= 0;
    console.log(spotDefs);
    var globalImageHolder={};//temporary storage
   
    function randomIntFromInterval(min,max,space)
    {
        var space = space || 0;
        return Math.floor(Math.random()*(max-min+1)+min) - space;
    }
    window.applyInkSpots = function(target) {
        applyCanvasBackground(target);
    }
    function applyCanvasBackground(target){
        var c = document.getElementById("testCanvs");
        c.setAttribute("width", "1300px");
        c.setAttribute("height", "1300px");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        drawObjectSet( ctx, spotDefs, 10,
        function(){
            var elements=document.querySelectorAll(target);
            for(j = 0 ;j< elements.length; j++){
                var dataURL;
                  c.crossOrigin = "Anonymous";
                try {
                     dataURL = c.toDataURL("image/png");
                }catch(err){
                    dataURL="";
                }
                var el = elements[j];
                var bPos = "background-position: 0px 0px;";
                var bRep = "background-repeat: no-repeat;";
                var bSize = "background-size: 100%;";
                el.setAttribute('style', 'background-image: url('+dataURL+');'+bPos+bRep+bSize)
                c.setAttribute('style','display:none');
            }
        });
    }
    function drawObjectSet(canvas , objects, amount, _callback){
        var taskCounter = amount;
        var completeCallbackTimer;
        if(objects instanceof Array ){
            taskCounter = amount*objects.length;
            completeCallbackTimer = setInterval(checkComplete, amount  * 25);
            for(var i = 0;i < objects.length;i++){
                objToCanvas( canvas,objects[i],amount,function(){taskCounter-=amount;} );
            }
        }else{
            completeCallbackTimer = setInterval(checkComplete, amount*25);
            objToCanvas( canvas,objects,amount,function(){taskCounter-=amount;} );
        }
        function checkComplete(){
            if(taskCounter > 0){//Left for debugging
            }else{
                 if (typeof _callback !== 'undefined') {
                     clearTimeout(completeCallbackTimer);
                    _callback();
                }
            }
        }
    }
    function objToCanvas( ctx, shapeObj, amount, _callback ){
        for(var i = 0;i < amount;i++){
            var h = randomIntFromInterval(.01,2);
            var w = h;
            var x = randomIntFromInterval(-200,500);
            var y = randomIntFromInterval(-200,500); 
            shapeObj(ctx , x, y, h, w, 'rgba(0,0,0,.5)');
        }
        if (typeof _callback !== 'undefined') {
            _callback();
        }
    }

    function msieversion() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
            return true;
        else
            return false;
    }
    function safariversion(){
        var ua = navigator.userAgent.toLowerCase(); 
         if (ua.indexOf('safari') != -1) { 
            if (ua.indexOf('chrome') > -1) {
              return false; // Chrome
            } else {
              return true; // Safari
            }
          }
    }


    if ( typeof jQuery !== 'undefined' ){
        jQuery.fn.inkSpots = function() {
            return this.each(function(i) {
                    var el =this;
                    var c = document.getElementById("testCanvs");
                    c.setAttribute("width", "1300px");
                    c.setAttribute("height", "1300px");
                    var ctx = c.getContext("2d");
                    
                    ctx.clearRect(0, 0, c.width, c.height);
                    drawObjectSet( ctx, spotDefs, 10,
                    function(){
                        var dataURL;
                          c.crossOrigin = "Anonymous";
                        try {
                             dataURL = c.toDataURL("image/png");
                        }catch(err){
                            dataURL="";
                        }
                        var bPos = "background-position: 0px 0px;";
                        var bRep = "background-repeat: no-repeat;";
                        var bSize = "background-size: 100%;";
                        el.setAttribute('style', 'background-image: url('+dataURL+');'+bPos+bRep+bSize)
                        
                        c.setAttribute('style','display:none');
                        
                    });
            })
        }
    };
})();