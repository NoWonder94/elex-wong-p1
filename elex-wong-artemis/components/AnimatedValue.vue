<template>
    <div class="number-text" v-html="html">
    </div>
</template>
<script>
export default {
    name: 'AnimatedValue',
    props: [
        'number',
        'title',
        'prefix',
        'postfix',
    ],
    data() {
        return {
            digits: [],
            html: '',
            isStop: false,
        }
    },
    mounted() {
        this.init(this.number);
    },
    methods: {
        init(number) {
            var digits = ('' + number).split('');
            let html = '';
            html += this.prefix ?? '';
            if (digits.length > 0) {
                for (var i = 0; i < digits.length; i++) {
                    html += '<p id="' + this.title + '-animated-number-' + i + '" style="margin-bottom:0; display:inline-block;">' + digits[i] + '</p>';
                }
            }
            html += this.postfix ?? '';
            this.html = html;
            if (digits.length > 0) {
                for (var i = 0; i < digits.length; i++) {
                    this.render(i, digits[i], 500 + (i * 100));
                }
            }
        },
        render(index, actualNumber, finishTime) {
            const that = this;
            var interval = setInterval(function () {
                $('#' + that.title + '-animated-number-' + index).html(Math.floor(Math.random() * (9 - 0) + 0));
                if (that.number >= 0) {
                    var t = setTimeout(function () {
                        $('#' + that.title + '-animated-number-' + index).html(actualNumber);
                        clearInterval(interval);
                    }, finishTime);
                }
            }, 1);
        },
    },
    watch: {
        'number': function () {
            this.init(this.number);
        },
    },
}
</script>
<style lang="scss">
@import 'assets/scss/base.scss';

.number-text {
    font-size: 18px !important;
}
</style>