/**
    InkSpots 0.0.3 (prototype version)
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
    "use strict";
   
    
    window.applyInkSpots = function(target,density) {
        var density = density || 10;
        var elements=document.querySelectorAll(target);
        for(var j = 0 ;j< elements.length; j++){
            var el = elements[j];
            _generateBackground(el,density);
        }   
    }
   
    function _generateBackground(el,density){
        var c = document.createElement('canvas');
        c.setAttribute("width", el.offsetWidth+"px");
        c.setAttribute("height", el.offsetHeight+"px");
        c.crossOrigin = "Anonymous";
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        drawObjectSet( ctx, spotDefs, density);
        var dataURL;
        try {
            dataURL = c.toDataURL("image/png");
        }catch(err){
            dataURL="";
        }
        dSetBackground(el, dataURL );
    }
    
    function drawObjectSet(ctx , objects, amount, _callback){
        var taskCounter = amount;
        var completeCallbackTimer;
        if(objects instanceof Array ){
            taskCounter = amount*objects.length;
            for(var i = 0;i < objects.length;i++){
                objToCanvas( ctx,objects[i],amount );
            }
        }else{
            objToCanvas( ctx,objects,amount );
        }
        if (typeof _callback !== 'undefined') {
             clearTimeout(completeCallbackTimer);
            _callback();
        }
    }
    function objToCanvas( ctx, shapeObj, amount, _callback ){
        var sizeWidth = ctx.canvas.width;//get Pseudo canvas dimensions
        var sizeHeight = ctx.canvas.height;
        
        for(var i = 0;i < amount;i++){
            var h = randomIntFromInterval(0.01,2);
            var w = h;
            var x = randomIntFromInterval(-(sizeWidth*1.2),sizeWidth*1.2);
            var y = randomIntFromInterval(-(sizeHeight*1.2),sizeHeight*1.2); 
            shapeObj(ctx , x, y, h, w, 'rgba(0,0,0,.5)');
        }
        if (typeof _callback !== 'undefined') {
            _callback();
        }
    }

    if ( typeof jQuery !== 'undefined' ){
        jQuery.fn.inkSpots = function(density) {
            var density = density || 10;
            return this.each(function(i) {
                var el =this;
                _generateBackground(el,density);
            })
        }
    };
    function dSetBackground(el, bUrl){
        var bPos = "background-position: 0px 0px;";
        var bRep = "background-repeat: no-repeat;";
        var bSize = "background-size: 100%;";
        el.setAttribute('style', 'background-image: url('+bUrl+');'+bPos+bRep+bSize);
    }
    
    function randomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
})();