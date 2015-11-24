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
        applyCanvasBackground("#targetCanvas");
    }
    function applyCanvasBackground(target){
       
        var c = document.getElementById("testCanvs");
        c.setAttribute("width", "1300px");
        c.setAttribute("height", "1300px");
        var ctx = c.getContext("2d");
        
        //drawImageSet(  ctx,'images/spot1.svg', 20);
        //drawImageSet(  ctx,'images/spot2.svg', 20);
       // drawImageSet(  ctx,'images/spot3.svg', 20);
        //drawImageSet(  ctx,'images/spot4.svg', 20);
        drawImageSet(  ctx,[
            'images/spot1.svg',
            'images/spot2.svg',
            'images/spot3.svg',
            'images/spot4.svg'
        ], 1,
        function(){
            var elements=document.querySelectorAll(target);
            for(j = 0 ;j< elements.length; j++){
                var dataURL = c.toDataURL("image/png");
                var el = elements[j];
                var bPos = "background-position: 0px 0px;";
                var bRep = "background-repeat: no-repeat;";
                var bSize = "background-size: 100%;";
                el.setAttribute('style', 'background-image: url('+dataURL+');'+bPos+bRep+bSize)
                //console.log(dataURL);
                c.setAttribute('style','display:none');
            }
        });
       
       
    }
    function drawImageSet(canvas , src, amount, _callback){
        var taskCounter = amount;
        var completeCallbackTimer;
        if(src instanceof Array ){
            taskCounter = amount*src.length;
            completeCallbackTimer = setInterval(checkComplete, amount  * 50);
            for(var i = 0;i < src.length;i++){
                drawImageOne( canvas,src[i],amount,function(){taskCounter--;} );
            }
        }else{
            completeCallbackTimer = setInterval(checkComplete, amount*100);
            for(var i = 0;i < amount;i++){
                drawImageOne( canvas,src,function(){taskCounter--;} );
            }
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
    function drawImageOne( canvas,src,amount, _callback ){
        var img = new Image;
        img.onload = function() {
            for(var i = 0;i < src.length;i++){
                var h = randomIntFromInterval(100,1000);
                var w = h;
                var x = randomIntFromInterval(-100,1300);
                var y = randomIntFromInterval(-100,1300); 
                canvas.drawImage(img, x ,y , w ,h);
            }
            if (typeof _callback !== 'undefined') {
                _callback();
                console.log('Image Loaded');
            }
        }
        img.src = src;
    }
    
    if ( typeof jQuery !== 'undefined' ){
        jQuery.fn.inkSpots = function() {
            return this.each(function(i) {
               
                domSpot(this);
            })
        }
    };
})();