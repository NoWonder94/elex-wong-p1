<template>
    <div class="mainMachine">
        <img src="@/assets/img/slot_machine.png" class="machine_item"/>
        <div class="containerslot">
            <div class="cover1"></div>
            <div class="cover2"></div>
            <div id="casino1" class="slotMachine" >
                <div class="slot slot1"></div>
                <div class="slot slot2"></div>
                <div class="slot slot3"></div>
                <div class="slot slot4"></div>
                <div class="slot slot5"></div>
                <div class="slot slot6"></div>
            </div>

            <div id="casino2" class="slotMachine">
                <div class="slot slot1"></div>
                <div class="slot slot2"></div>
                <div class="slot slot3"></div>
                <div class="slot slot4"></div>
                <div class="slot slot5"></div>
                <div class="slot slot6"></div>
            </div>

            <div id="casino3" class="slotMachine">
                <div class="slot slot1"></div>
                <div class="slot slot2"></div>
                <div class="slot slot3"></div>
                <div class="slot slot4"></div>
                <div class="slot slot5"></div>
                <div class="slot slot6"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component"
import jQuery from 'jquery'

export default class Machine extends Vue{
    machine1:any;
    machine2:any;
    machine3:any;
    instance:any;
    roll1=-1;
    roll2=-1;
    roll3=-1;
    rolled=false;

    mounted(){
        var _this=this
        setTimeout(()=>{
            this.initslot();
            jQuery(window).resize(
                function(){
                    _this.machine1.resetValue();
                    _this.machine2.resetValue();
                    _this.machine3.resetValue();
                }
            );
        },100)
        
    }

    initslot(){
        this.roll1=2;
        this.roll2=3;
        this.roll3=4;
        this.machine1=new slotMachine(jQuery("#casino1"),{
            active:0,
            delay:500,
        });
        this.machine2=new slotMachine(jQuery("#casino2"),{
            active:1,
            delay:500
        });
        this.machine3=new slotMachine(jQuery("#casino3"),{
            active:2,
            delay:500
        });

        this.machine1.setRandomize(() =>{return this.roll1-1});
        this.machine2.setRandomize(() =>{return this.roll2-1});
        this.machine3.setRandomize(() =>{return this.roll3-1});
    }
    
    startRoll(){
        this.machine1.shuffle();
        this.machine2.shuffle();
        this.machine3.shuffle();
        this.rolled=true;
    }

    rollResult(data:any) {
        if(!this.rolled)
            return

        this.machine1.setRandomize(() =>{return data.roll1 - 1});
        this.machine1.stop();

        setTimeout(() => {
            this.machine2.setRandomize(() =>{return data.roll2 - 1});
            this.machine2.stop();
        }, 500);

        setTimeout(() => {
            this.machine3.setRandomize(() =>{return data.roll3 - 1});
            this.machine3.stop();
        }, 1000);
    }

    stopRoll() {
        if(!this.rolled)
            return

        this.machine1.stop();
        this.machine2.stop();
        this.machine3.stop();
    }
}

var settings={
    active: 0,
    delay: 200,
    auto:false,
    spins:5,
    complete:-1,
    stopHidden:true,
    direction:'up',
    FX_NO_TRANSITION:'slotMachineNoTransition',
    FX_FAST:'slotMachineBlurFast',
    FX_NORMAL : 'slotMachineBlurMedium',
    FX_SLOW : 'slotMachineBlurSlow',
    FX_TURTLE :'slotMachineBlurTurtle',
    FX_GRADIENT :'slotMachineGradient',
    FX_STOP :'slotMachineGradient'

};
class slotMachine{
    slot:any;
    settings:any;
    tiles:any;
    container:any;
    _minTop=0;
    _maxTop=0;
    fakeFirstTile:any;
    fakeLastTile:any;
    _timer:any;
    _spinsLeft=0;
    futureActive=-1;
    running=false;
    stopping=false;
    direction:any;
    _transition:any;
    _delay=-1;
    randomize:any;
    active=-1;
    _nextIndex=-1;

    constructor(slot:any,options:any){

        this.settings={...settings,...options};
        this.active=this.settings.active;
        this.slot=slot;
        this.tiles=this.slot.children();
        this.slot.css("overflow","hidden");
        this.container=this.tiles.wrapAll('<div class="slotMachineContainer"/>').parent();
        this.container.css('transition','1s ease-in-out');
        this.container.css('height','100%');
        this._maxTop=-jQuery('.slot').height()*7;
        this.initfakeTile();
        this._minTop=-this.fakeFirstTile.outerHeight();
        
        this.initDirection();
        this.resetPosition(-1);
        
        if(this.settings.auto!==false){ 
            if(this.settings.auto===true)
                this.shuffle(0,null);
            else    
                this.auto();
        }
        
    }

    resetValue(){
        this._maxTop=-jQuery('.slot').height()*7;
        this._minTop=-this.fakeFirstTile.outerHeight();
        this.initDirection();
        this.resetPosition(-1); 
        // console.log(this.direction);
    }

    initfakeTile(){
        this.fakeFirstTile=this.tiles.last().clone();
        this.fakeLastTile=this.tiles.first().clone();
        this.container.prepend(this.fakeFirstTile);
        this.container.append(this.fakeLastTile);
    }

    initDirection(){
        if(this.settings.direction==='down')
            this.direction={
                key:'down',
                initial:this.getTileOffest(this.active),
                first:this.getTileOffest(this.tiles.length),
                last:0,
                to:this._minTop,
                firstToLast:this.getTileOffest(this.tiles.length),
                lastToFirst:0
            }
        else
            this.direction={
                key:'up',
                initial:this.getTileOffest(this.active),
                first:0,
                last:this.getTileOffest(this.tiles.length),
                to:this._maxTop,
                firstToLast:this.getTileOffest(this.tiles.length),
                lastToFirst:0
            }
    }

    getTileOffest(index:number){
        var offset=0;

        for(var i=0;i<index;i++){
            offset+=this.tiles.eq(i).outerHeight();
        }

        return this._minTop-offset;
    }

    resetPosition(margin:number){
        this.container.toggleClass(this.settings.FX_NO_TRANSITION);
        this._animate(margin===-1?this.direction.initial:margin);
        this.container[0].offsetHeight;
        this.container.toggleClass(this.settings.FX_NO_TRANSITION);
    }

    _animate(margin:number){
        // console.log(margin);
        this.container.css('transform', 'matrix(1, 0, 0, 1, 0, ' + margin + ')');
    }

    shuffle(spins:any,onComplete:any){
        var _this = this;

        if(typeof spins==='function'){
            onComplete=spins;
        }
        this.running=true;
    
        if(!this.visible()&&this.settings.stopHidden===true)
            this.stop(onComplete);
        else{
            var delay = this.getDelayFromSpins(spins);
            this.delayfx(delay);
            this._animate(this.direction.to);
            this.raf(function () {
                if (!_this.stopping && _this.running) {
                    var left = spins - 1;

                    _this.resetPosition(_this.direction.first);
                    if (left <= 1) {
                        _this.stop(onComplete);
                    } else {
                        _this.shuffle(left,onComplete);
                    }
                }
            }, delay);
        }            
        return this.futureActive;   
    }

    stop(onStop:any){
        var _this2=this;
        if(!this.running||this.stopping)
            return this.futureActive;

        this.running=true;
        this.stopping=true;

        if(this.futureActive===-1)
            this.futureActive=this.custom();
        if(this._isGoingBackward())
            this.resetPosition(this.direction.firstToLast);
        else if(this._isGoingForward())
            this.resetPosition(this.direction.lastToFirst);
        
        this.active=this.futureActive;

        var delay= this.getDelayFromSpins(1);
        this.delayfx(delay);
        this._animationFX(this.settings.FX_STOP);
        this._animate(this.getTileOffest(this.active));
        this.raf(function(){
            _this2.stopping=false;
            _this2.running=false;
            _this2.futureActive=-1;
            if(typeof onStop==="function")
                onStop.apply(_this2,[_this2.active]);
        },delay);
        // console.log(this.active);
        return this.active;
    }

    visible(){
        var windows=jQuery(window);
        var above=this.slot.offset().top>(windows.scrollTop()+windows.height());
        var below=windows.scrollTop()>(this.slot.height()+this.slot.offset().top);

        return !above && !below;
    }
    
    custom(){
        var choosen= 0;
        if(typeof this.randomize==='function'){
            var index = this.randomize.call(this, this.active);
            if (index < 0 || index >= this.tiles.length) {
                index = 0;
            }
            choosen=index;
        }
        else
            choosen=this.random();
        return choosen;
    }

    setRandomize(rnd:number){
        this.randomize=rnd;

        if(typeof rnd ==='number'){
            this.randomize=function(){
                return rnd;
            }
        }
    }

    random(){
        return Math.floor(Math.random()*this.tiles.length);
    }

    _isGoingBackward(){
         return this.futureActive > this.active && this.active === 0 && this.futureActive === this.tiles.length - 1;
    }
    
    _isGoingForward(){
        return this.futureActive <= this.active && this.active === this.tiles.length - 1 && this.futureActive === 0;
    }

    getDelayFromSpins(spins:number){
        var delay = this.settings.delay;
        this._transition = 'linear';

        switch (spins) {
            case 1:
                delay /= 0.5;
                this._transition = 'ease-out';
                this._animationFX (this.settings.FX_TURTLE);
                break;
            case 2:
                delay /= 0.75;
                this._animationFX (this.settings.FX_SLOW);
                break;
            case 3:
                delay /= 1;
                this._animationFX (this.settings.FX_NORMAL);
                break;
            case 4:
                delay /= 1.25;
                this._animationFX (this.settings.FX_NORMAL);
                break;
            default:
                delay /= 1.5;
                this._animationFX (this.settings.FX_FAST);
        }

        return delay;
    }

    _animationFX(type:any){
        var delay = this.settings.delay / 4;
        var elements = this.slot.add(this.tiles).add(this.fakeFirstTile).add(this.fakeLastTile);
        
        this.raf((() => {
            this._fxClass(type);

            if (type === this.settings.FX_STOP) {
                elements.removeClass(this.settings.FX_GRADIENT);
            } else {
                elements.addClass(this.settings.FX_GRADIENT);
            }
        }).bind(this), delay);
    }

    _fxClass(type:any){   
        var classes = [this.settings.FX_FAST, this.settings.FX_NORMAL,this.settings.FX_SLOW, this.settings.FX_TURTLE].join(' ');

        this.tiles.add(this.fakeFirstTile).add(this.fakeLastTile).removeClass(classes).addClass(type);

    }

    raf(cb:any,timeout:number){
        // || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
        var _raf=window.requestAnimationFrame,
            startTime = new Date().getTime(),
            _rafHandler = function _rafHandler() {
            var drawStart = new Date().getTime(),
                diff = drawStart - startTime;

            if (diff < timeout) {
                _raf(_rafHandler);
            } else if (typeof cb === 'function') {
                cb();
            }
        };

        _raf(_rafHandler);
    }

    delayfx(delay:number){
        delay=delay/1000;
        this._delay=delay;
        this._changeTransition();
    }

    transitionfx(transition:string){
        transition=transition||'ease-in-out';
        this._transition=transition;
        this._changeTransition();
    }

    _changeTransition(){
        var delay=this._delay||this.settings.delay;
        var transition=this._transition||this.settings.transition;
        this.container.css('transition',delay+'s '+transition);
    }

    auto(){
        if(!this.running){
            var _this3=this;
            this._timer=new Timer(()=>{
                if(typeof this.settings.randomize!=='function'){
                    this.settings.randomize=function(){
                        this.nextIndex();
                    };
                }
                if(!this.visible()&&this.settings.stopHidden===true){
                    this.raf(this._timer.reset().bind(this._timer),500);
                } 
                else{
                    this.shuffle(this.settings.spins,this._timer.reset.bind(_this3._timer));
                }
            },this.settings.auto);
        }
    }

    cancelAuto(){
    
    }

    nextIndex(){
        var nextIndex=this.active+1;
        this._nextIndex=nextIndex<this.tiles.length?nextIndex:0;
    }
    
    // hi(){ 
    //     console.log(this.direction.key);
    //     console.log(this.custom());

    // }
}

class Timer{
    cb:any;
    initialDelay:any;
    delay:any;
    deferred:any;
    startTime:any;
    timer:any;
    running=false;

    constructor(cb:any,delay:any){

        this.cb=cb;
        this.initialDelay=delay;
        this.delay=delay;
        this.deferred=jQuery.Deferred();
        this.startTime=0;
        this.timer=0;
        this.resume();
        return this;
    }

    _start(){
        this.timer=setTimeout((()=>{
            this.cb.call(this);
        }).bind(this),this.delay)
    }

    cancel(){
        this.running=false;
        clearTimeout(this.timer);
    }

    pause(){
        if(this.running){
            this.delay-=new Date().getTime()-this.startTime;
            this.cancel();
        }
    }

    resume(){
        if(!this.running){
            this.running=true;
            this.startTime=new Date().getTime();
            this._start();
        }
    }
    reset(){
        this.cancel();
        this.delay=this.initialDelay;
        this._start();
    }
    add(extraDelay:any){
        this.pause();
        this.delay+=extraDelay;
        this.resume();

    }
}
</script>

<style src="@/assets/css/machine.css" scoped>

</style>