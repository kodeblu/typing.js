var typing = (function(){
    
    var typing = function(element,settings){
        return new start(element,settings);
    };

    typing.prototype = {
            isClass :function(coverArea){
            var regExClass = /\./,
                regExId = /\#/

            if(regExClass.test(coverArea)) 
            
                return true;

            if(regExId.test(coverArea))
            
                return false;

        },
        isArray : function(collection){
            var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1,
                length = collection.length;
            return typeof length == "number" && length >=0 && length < MAX_ARRAY_INDEX && typeof collection == "object"
            && collection[0] !== undefined;
            
        },
        stopIntervalTimers : function(interval){
            var i = 0;
            //for(i; i < this.intervalTimers.length; i++) clearInterval(this.intervalTimers[i])
            clearInterval(interval);
        },
        stopTimeOutAllTimers : function(){
            var i = 0;
            for(i; i < this.timeOutInterval.length; i++) clearTimeout(this.timeOutInterval[i])
        },
        build : function(){
                var parent = this.isArray(this.isAClassLike) ? this.isAClassLike[0] : this.isAClassLike,
                    createCursor = document.createElement("i");
                    this.createTypeArea = document.createElement("span")
                    createCursor.className = "cursor";
                    parent.appendChild(this.createTypeArea);
                    parent.appendChild(createCursor);
                    parent.className = parent.className+" area";
                    this.executor();
        },
        timeOut : function(execFun,time){
            
            return setTimeout(execFun.bind(this),time);
        },
        timeInterval : function(execFun,time){
            return setInterval(execFun.bind(this),time);
        },
        typeAction : function(){

                var startTyping = function(){
                        if(this.typingInterval !== undefined && this.pos === this.settings.words.length){
                            this.stopIntervalTimers(this.typingInterval);
                            this.backSpacingInterval = this.timeInterval(backSpacing,this.settings.speed)
                            return;
                        }
                        this.createTypeArea.innerHTML +=  this.settings.words[this.pos];
                        this.pos++;
                    
                    }


                var backSpacing = function(){
                    if(this.backSpacingInterval !== undefined && this.pos == 0){
                        this.stopIntervalTimers(this.backSpacingInterval);
                        this.typingInterval = this.timeInterval(startTyping,this.settings.speed);
                        return;
                    }
                    this.createTypeArea.innerHTML =  this.createTypeArea.innerHTML.slice(0,this.pos-1);
                    this.pos--;
                }
                
            this.typingInterval = this.timeInterval(startTyping,this.settings.speed);
            
        },

        executor : function(){
            
                this.begin = this.timeOut(this.typeAction,this.settings.delay);

        },
        prepare : function(isClassFunc,elem){
            var clean  = elem.replace(/[^a-z]/gi,'');
            this.isAClassLike = isClassFunc(elem) ?  document.getElementsByClassName(clean):document.getElementById(clean);
            console.log(this.isAClassLike);
            if(this.isAClassLike === undefined || this.isAClassLike === null || this.isAClassLike.length == 0) return void 0;
            this.build();
        }
        
    }
    var start = typing.prototype.start = function(element,settings){
        this.intervalTimers = [];
        this.timeOutInterval =  [];
        this.pos = 0;
        
        this.typeClear = this.pos +1;
        settings = settings || {};
        this.settings = {words:settings.words || "welcome to my version of typed.js please, create words key value pair in settings object",
                                    delay:settings.delay || 0,speed:settings.speed || 100};
        console.log(this.settings);
        
            var starting = this.prepare(this.isClass,element);
            
        }

        start.prototype = typing.prototype;

        window.t = typing;

    
    
})();
//t(".test",{words:"testing first stage of good and neat coding, hope this works; so exited and scared at the same time"})
//var typing = new typing();

  // typing.start('.test',{words:"okay, this is me testing my own library; so far no bug yet"});
    
