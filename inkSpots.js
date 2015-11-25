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
    var testCounter= 0;
    var globalImageHolder={};//temporary storage
    /*
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
    }*/
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
        
        drawImageSet( ctx,[
            'http://localhost/inkSpots/images/spot1.svg',
            'http://localhost/inkSpots/images/spot2.svg',
            'http://localhost/inkSpots/images/spot4.svg',
            'http://localhost/inkSpots/images/spot3.svg'
        ], 20,
        function(){
            var elements=document.querySelectorAll(target);
            for(j = 0 ;j< elements.length; j++){
                var dataURL;
                  c.crossOrigin = "Anonymous";
                try {
                     dataURL = c.toDataURL("image/png");
                }catch(err){
                    //console.log(err);
                    dataURL="";
                }
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
            completeCallbackTimer = setInterval(checkComplete, amount  * 25);
            for(var i = 0;i < src.length;i++){
                loadImageToCanvas( canvas,src[i],amount,function(){taskCounter-=amount;} );
            }
        }else{
            completeCallbackTimer = setInterval(checkComplete, amount*25);
            loadImageToCanvas( canvas,src,amount,function(){taskCounter-=amount;} );
        }
        
        function checkComplete(){
            if(taskCounter > 0){//Left for debugging
            //console.log('NotComplete'+taskCounter);
            }else{
                 if (typeof _callback !== 'undefined') {
                     clearTimeout(completeCallbackTimer);
                    _callback();
                }
            }
        }
    }
    function loadImageToCanvas( canvas,src,amount, _callback ){
        
        if (typeof globalImageHolder[src] === 'undefined') {
            var img = new Image;
            globalImageHolder[src] = img;
            img.crossOrigin = "Anonymous";
            img.onload = function() {  
                testCounter++;
                multipleRandomImages(canvas,img,amount);
                
                if (typeof _callback !== 'undefined') {
                    _callback();
                }
            }
            if(msieversion()){
                //console.log('ie');
                img.src = src;
            }else{
                img.src = src;
            }
          
        }else{
            var img = globalImageHolder[src];
            testCounter++;
            img.crossOrigin = 'Anonymous';
            multipleRandomImages(canvas,img,amount);
           
            if (typeof _callback !== 'undefined') {
                _callback();
            }
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
              return false // Chrome
            } else {
              return true // Safari
            }
          }
    }

    function multipleRandomImages(ctx,img,amount){
         
        if( msieversion() || safariversion() ){ //msieversion()
            fetchXML(img.src,function(newSVGDoc){ //Temporary workaround via canvg
                for(var i = 0;i < amount;i++){
                    var h = randomIntFromInterval(100,1000);
                    var w = h;
                    var x = randomIntFromInterval(-100,1300);
                    var y = randomIntFromInterval(-100,1300); 
                    ctx.drawSvg(newSVGDoc, x ,y , w ,h);
                } 
            }); 
        }else{
            for(var i = 0;i < amount;i++){
                var h = randomIntFromInterval(100,1000);
                var w = h;
                var x = randomIntFromInterval(-100,1300);
                var y = randomIntFromInterval(-100,1300); 
                ctx.drawImage(img, x ,y , w ,h);
            }
        }
    }
    function clone(obj) {
        if(obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
            return obj;

        var temp = obj.constructor(); // changed

        for(var key in obj) {
            if(Object.prototype.hasOwnProperty.call(obj, key)) {
                obj['isActiveClone'] = null;
                temp[key] = clone(obj[key]);
                delete obj['isActiveClone'];
            }
        }    

        return temp;
    }
    function fetchXML  (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function (evt) {
            if (xhr.readyState === 4) {
                callback(xhr.responseXML);
            }
        };
        xhr.send(null);
    };
    if ( typeof jQuery !== 'undefined' ){
        jQuery.fn.inkSpots = function() {
            return this.each(function(i) {
                    var el =this;
                    var c = document.getElementById("testCanvs");
                    c.setAttribute("width", "1300px");
                    c.setAttribute("height", "1300px");
                    var ctx = c.getContext("2d");
                    
                    ctx.clearRect(0, 0, c.width, c.height);
                    
                    drawImageSet( ctx,[
                        'http://localhost/inkSpots/images/spot1.svg',
                        'http://localhost/inkSpots/images/spot2.svg',
                        'http://localhost/inkSpots/images/spot4.svg',
                        'http://localhost/inkSpots/images/spot3.svg'
                    ], 20,
                    function(){
                        var dataURL;
                          c.crossOrigin = "Anonymous";
                        try {
                             dataURL = c.toDataURL("image/png");
                        }catch(err){
                            //console.log(err);
                            dataURL="";
                        }
                        var bPos = "background-position: 0px 0px;";
                        var bRep = "background-repeat: no-repeat;";
                        var bSize = "background-size: 100%;";
                        el.setAttribute('style', 'background-image: url('+dataURL+');'+bPos+bRep+bSize)
                        //console.log(dataURL);
                        c.setAttribute('style','display:none');
                        
                    });
            })
        }
    };
})();