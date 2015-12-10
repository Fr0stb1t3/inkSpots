/**
    InkSpots 0.0.4 (prototype version)
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
    window.applyInkSpots = function(options) {
        //var start = +new Date();
        var target =options.target || '.inkSpots';
        var density =options.density || 10;
        var color =options.color; 
        
        var elements=document.querySelectorAll(target);
        for(var j = 0 ;j< elements.length; j++){
            var el = elements[j];
            _generateBackground(el,density,color);
        }   
        //var end =  +new Date();  // log end timestamp
        //var diff = end - start;
        //console.log('Set for'+target);
        //console.log(diff);
    }
   
    function _generateBackground(el, density,color){
        if(density>100){
            console.log('OPS.Max dencity is capped at 100.');
            density =100;
        }
        var c = document.createElement('canvas');
        c.setAttribute("width", el.offsetWidth+"px");
        c.setAttribute("height", el.offsetHeight+"px");
        c.crossOrigin = "Anonymous";
        var ctx = c.getContext("2d");
        //drawObjectSet( ctx, spotDefs, density <-- Redundant refactoring
        var taskCounter = density;
        var completeCallbackTimer;
        if(spotDefs instanceof Array ){
            taskCounter = density*spotDefs.length;
            for(var i = 0;i < spotDefs.length;i++){
                objToCanvas( ctx,spotDefs[i],density,color );
            }
        }else{
            objToCanvas( ctx,spotDefs,density,color );
        }
        
        var dataURL;
        try {
            dataURL = c.toDataURL("image/png");
        }catch(err){
            dataURL="";
        }
        dSetBackground(el, dataURL );
    }
 
    
    function objToCanvas( ctx, shapeObj, amount, color ){
        var sizeWidth = ctx.canvas.width;//get Pseudo canvas dimensions
        var sizeHeight = ctx.canvas.height;
        
        for(var i = 0;i < amount;i++){
            var h = randomIntFromInterval(0.01,2);
            var w = h;
            var x = randomIntFromInterval(-(sizeWidth*1.2),sizeWidth*1.2);
            var y = randomIntFromInterval(-(sizeHeight*1.2),sizeHeight*1.2); 
            var col = color || colorRandomizer();
            shapeObj(ctx , x, y, h, w, col);
        }
       
    }
    function colorRandomizer(){
         var randRed = Math.floor((Math.random() * 250) + 1);
         var randBlue = Math.floor((Math.random() * 250) + 1);
         var randGreen = Math.floor((Math.random() * 250) + 1);
         var randOpacity = Math.random(); 
         return  'rgba('+randRed+','+randGreen+','+randGreen+','+randOpacity+')';
    }
    if ( typeof jQuery !== 'undefined' ){
        jQuery.fn.inkSpots = function(options) {
          
            var color =options.color; 
            var density =options.density || 10;
            return this.each(function(i) {
                var start = +new Date();
                var el =this;
                _generateBackground(el,density,color);
                var end =  +new Date();  // log end timestamp
                var diff = end - start;
                console.log('Set for'+target);
                console.log(diff);
            });
            
        }
    }
    
    function dSetBackground(el, bUrl){
        var bPos = "background-position: 0px 0px;";
        var bRep = "background-repeat: no-repeat;";
        var bSize = "background-size: 100%;";
        el.setAttribute('style', 'background-image: url('+bUrl+');'+bPos+bRep+bSize);
    }
    
    function randomIntFromInterval(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }
      /* 
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
    }*/
})();