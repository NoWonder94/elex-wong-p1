<template>
    <div class="faq">
        <HeaderTitle :icon="icon" :title="title" />
        <div class="faq_content">
            <div  v-for="(data, index) in dataList" :key="index">
                <InfomationCard class="mb-2" :title="data.title" :desc="data.desc" />
            </div>
        </div>
    </div>
</template>

<script>
import InfomationCard from '../components/InfomationCard.vue';
    export default {
    data() {
        return {
            title: this.$t('article.faq_title'),
            icon: require("../assets/img/f&q.png"),
            dataList: [],
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            this.dataList = [
                {
                    title: this.$t('article.faq1_title'),
                    desc: this.$t('article.faq1'),
                },
                {
                    title: this.$t('article.faq2_title'),
                    desc: this.$t('article.faq2'),
                },
                {
                    title: this.$t('article.faq3_title'),
                    desc: this.$t('article.faq3'),
                },
                {
                    title: this.$t('article.faq4_title'),
                    desc: this.$t('article.faq4'),
                },
                {
                    title: this.$t('article.faq5_title'),
                    desc: this.$t('article.faq5'),
                },
            ];
        }
    },
    components: { InfomationCard }
}
</script>

<style lang="scss" type="text/css">
    @import "/assets/scss/faq.scss";
</style>
