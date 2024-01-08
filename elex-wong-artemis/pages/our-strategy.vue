<template>
    <div class="our_strategy">
        <HeaderTitle :icon="icon" :title="title" />
        <div class="our_strategy_content">
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
            title: this.$t('article.strategy_title'),
            icon: require("../assets/img/microstrategy.png"),
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
                    title: this.$t('article.strategy1_title'),
                    desc: this.$t('article.strategy1'),
                },
                {
                    title: this.$t('article.strategy2_title'),
                    desc: this.$t('article.strategy2'),
                },
            ];
        }
    },
    components: { InfomationCard }
}
</script>

<style lang="scss" type="text/css">
    @import "/assets/scss/our_strategy.scss";
</style>
