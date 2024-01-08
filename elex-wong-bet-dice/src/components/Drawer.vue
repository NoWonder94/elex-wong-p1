<template>
	<section v-if="enabled">
		<aside class="sidebar" :style="style" ref="element">
			<slot name="content"></slot>
		</aside>
		<div class="overlay" ref="overlay"></div>
	</section>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import{Prop} from "vue-property-decorator";

export default class Drawer extends Vue{
	@Prop() readonly direction!:String
	@Prop() readonly exist!:Boolean
	auto_speed:String='0.3s'
	manual_speed:String='0.03s'
	threshold:any= 20
	startTime:any
	startPos:any
	translate:any
	active:Boolean=true
	visible:Boolean=true

	get element():any{
		return this.$refs.element;
	}
	get overlay():any{
		return this.$refs.overlay;
	}
	get enabled():any{
		if(this.exist == true){
			return true;
		}
		return false;
	}
	get style():any{
		if(this.direction == 'right'){
			return 'transform:translate3d(100%,0,0);right:0;';
		}
			return 'transform:translate3d(-110%,0,0);left:0;';
	}

	mounted(){
		document.addEventListener('touchstart',(e) =>{this.handleStart(e)});
		document.addEventListener('touchmove',(e) =>{this.handleMove(e)});
		document.addEventListener('touchend',(e) =>{this.handleEnd(e)});
		document.addEventListener('touchcancel',(e) =>{this.handleEnd(e)});
		window.addEventListener('resize', () =>{this.setVisibality()}, true);
		this.overlay.addEventListener('transitionend',() =>{this.handleZindex()},false);			
		this.overlay.addEventListener('click',() =>{this.close()},false);
		this.setVisibality();
	}

	setVisibality(){
		if(this.element.offsetWidth == 0){
			this.visible=false;
		}else{
			this.visible=true;
		}
	}

	handleStart(e:any){
		this.startTime = new Date().getTime();
		this.startPos = e.targetTouches[0].pageX;
		this.element.style.transitionDuration = this.manual_speed;	
	}

	handleMove(e:any){
		let gesture = this.gesture(e);
		let valid = this.validate(this.direction,gesture);
		if(valid){
		let percent = this.percentage(this.direction,gesture);
			if(this.direction == 'left'){
					this.translate = (e.touches[0].pageX-this.element.offsetWidth);
					if(this.translate < 0){
						this.element.style.transform = 'translate3d('+ this.translate +'px,0,0)';
					}else{
						this.open();						
					}
			}else{
					this.translate = -(screen.width-this.element.offsetWidth-e.touches[0].pageX);
					if(this.translate > 0){
						this.element.style.transform = 'translate3d('+ this.translate +'px,0,0)';
					}else{
						this.open();						
					}
			}
			this.overlayOpacity(percent/100);
		}
	}

	handleEnd(e:any){
		let speed = this.speed(e);
		let gesture = this.gesture(e);
		let valid = this.validate(this.direction,gesture);

		if(valid){
			if(speed>0.6){
				if(!this.active){
					this.open();									
				}else{
					this.close();						
				}
			}else{
				if(this.element.offsetWidth/2>Math.abs(this.translate)){
					this.open();						
				}else{
					this.close();						

				}
			}			
		}

	}
	handleZindex(){
		let opacity = window.getComputedStyle(this.overlay).getPropertyValue('opacity');
		if(Number(opacity)<=0){
			this.overlay.style.zIndex = -999;			
		}
	}
	validate(direction:any,gesture:any){
		if(direction == 'left'){
			if((this.active && gesture == 'swiperight') || (!this.active && (gesture == 'swipeleft' || this.startPos>this.threshold))){
				return false;
			}
		}else{
			if((this.active && gesture == 'swipeleft') || (!this.active && (gesture == 'swiperight' || this.startPos<(screen.width-this.threshold)))){
				return false;
			}
		}
		if((document.querySelector('.sidebar.active') && !this.active) || !this.visible){
			return false;
		}
		return true;
	}
	overlayOpacity(opacity:any){
		this.overlay.style.opacity = opacity;
		if(opacity > 0){
			this.overlay.style.zIndex = 999;					
		}
	}
	gesture(e:any){
		let directions = [
			'swipeleft',
			'swiperight',
		];
		let currentPos = e.changedTouches[0].pageX;
		if((this.startPos-currentPos)<0){
			return directions[1];
		}else{
			return directions[0];
		}

	}

	open(){
		this.translate = 0;
		this.element.style.transform = 'translate3d('+this.translate+',0,0)';
		this.element.style.transitionDuration = this.auto_speed;
		this.overlayOpacity(1);
		this.lock(document.querySelector('html'));
		this.lock(document.querySelector('body'));
		this.element.classList.add('active');	
		this.overlay.style.display='block';
		this.active = true;	
	}
	close(){
		if(this.direction=='left'){
			this.translate = '-'+(this.element.offsetWidth+10)+'px';
		}else{
			this.translate = (this.element.offsetWidth+10)+'px';
		}
		this.element.style.transform = 'translate3d('+this.translate+',0,0)';	
		this.element.style.transitionDuration = this.auto_speed;	
		this.overlayOpacity(0);
		this.unlock(document.querySelector('html'));
		this.unlock(document.querySelector('body'));
		this.overlay.style.display='none';
		this.element.classList.remove('active');	
		this.active = false;

	}
	speed(e:any){
		let time = new Date().getTime() - this.startTime;
		let startP = Math.abs(this.startPos);
		let endP =  Math.abs(e.changedTouches[0].pageX);
		let distance = startP>endP? (startP-endP):(endP-startP);
		return distance/time;
	}
	percentage(direction:any,gesture:any){
		let percentage = 0;
		let test = [];
		if(direction == 'left'){
			test = ['swipeleft','swiperight']
		}else{
			test = ['swiperight','swipeleft']			
		}
		if(this.active && gesture == test[0]){
			percentage = 100-Math.round(Math.abs(this.translate)/this.element.offsetWidth*100);
		}
		if(!this.active && gesture == test[1]){
			percentage = Math.round(100-Math.abs(this.translate)/this.element.offsetWidth*100);
		}
			if(percentage>100){
				percentage = 100;
			}
			if(percentage<0){
				percentage = 0;
			}
			return percentage;
	}
	lock(element:any){
		element.style.overflow = 'hidden';
		element.style.touchAction = 'none';
	}
	unlock(element:any){
		element.style.removeProperty('overflow');
		element.style.removeProperty('touch-action');
	}
}	
</script>

<style scoped>
	div.overlay{
		position:fixed;
		z-index: -999;
		left: 0px;
		top:0px;
		background:rgba(11, 10, 12, 0.292);
		opacity: 0;
		width: 100%;
		height: 100%;
		transition: opacity 0.3s ease;
		display: none;
	}
	aside.sidebar{
		z-index: 9999;
		position: fixed;
		will-change: transform;
		height: 100%;
		top: 0px;
		transition:transform 0.3s ease;
		background:#fff;
		width: 250px;
		box-shadow:  5px 3px 20px #000000;
		overflow-y: auto;
		overflow-x: hidden;
		word-wrap: break-word;
		color:#666666;
	}
</style>