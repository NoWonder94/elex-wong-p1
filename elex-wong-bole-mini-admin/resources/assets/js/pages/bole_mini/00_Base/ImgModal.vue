<template>
	<div id="showImgLayout" class="show-img-layout" @click="close">
    	<div class="close-img" @click="close">
    		<img src="img/bole_mini/icon/button_close.png">
    	</div>
    	<div class="show-img">
    		<center>
    			<img id="showImg">
    		</center>
    	</div>
    </div>
</template>
<script>
	export default {
		name: 'ShowImg',
		props: ['visible', 'img'],
		methods: {
			initData() {
				var img = document.getElementById('showImg');
				img.src = this.img;
				img.style.display = 'block';
				var imgLayout = document.getElementById('showImgLayout');
				imgLayout.style.display = 'block';
    		},
    		close: function() {
                this.$emit('update:visible', false);
    			var img = document.getElementById('showImg');
				img.src = '';
				img.style.display = 'none';
    			var imgLayout = document.getElementById('showImgLayout');
				imgLayout.style.display = 'none';
    		},
		},
		watch: {
            visible: function(n, o) {
                n && this.initData();
            }
        },
	}
</script>
<style lang="scss" type="text/css">
	@import "../../../../scss/bole_mini/Base/ImgModal.scss";
</style>