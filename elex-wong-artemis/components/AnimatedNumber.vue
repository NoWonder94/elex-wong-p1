<template>
    <div>
        {{displayNumber}}
    </div>
</template>

<script>
    export default {
        name: 'AnimatedNumber',
        props:{'number':{default:0}},
        data() {
            return {
                displayNumber:0,
                interval:false
            };
        },
        ready:function(){
            this.displayNumber = this.number ? this.number : 0;
        },
        watch:{

        number: function(){

            clearInterval(this.interval);

                if(this.number == this.displayNumber){
                    return;
                }

            this.interval = window.setInterval(function(){
                if (Math.floor(this.displayNumber) !== Math.floor(this.number)) {
                    var change = (this.number - this.displayNumber) / 5;
                    change = change >= 0 ? Math.ceil(change) : Math.floor(change);
                    this.displayNumber = this.displayNumber + change;
                } else {
                    this.displayNumber = this.number;
                    clearInterval(this.counter);
                }
            
            }.bind(this), 20);
        
            }}
    }
</script>

<style lang="scss" scoped>

</style>