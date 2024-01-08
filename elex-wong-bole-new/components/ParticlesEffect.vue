<template>
	<Particles
		id="tsparticles"
		styles="position:absolute !important;"
        :options="{
    		fpsLimit: 60,
    		particles: {
	      		move: {
			        bounce: false,
			        direction: 'none',
			        enable: true,
			        outModes: 'out',
			        random: false,
			        speed: 2,
			        straight: false
		      	},
		      	number: {
		      		density: {
		      			enable: true,
		      			area: 800
		      		},
			      	value: 80
			      },
		      	opacity: {
		        	value: 0.5
		      	},
		      	shape: {
		        	type: 'circle'
		      	},
		      	size: {
		        	value: {
		        		min: 1,
		        		max: 5
		        	}
		      	}
		    },
		    fullScreen: {
		    	enable: false,
		    }
  		}"
    />
</template>
<script>
	export default {
		name: 'ParticlesEffect',
	}
</script>
<style lang="scss" type="text/css">
	@import "/assets/scss/web/particlesEffect.scss";
	@import "/assets/scss/mobile/particlesEffect.scss";
</style>