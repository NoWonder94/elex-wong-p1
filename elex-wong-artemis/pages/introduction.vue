<template>
    <div class="intro">
        <HeaderTitle :icon="icon" :title="title" />
        <div class="intro_content">
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
            title: this.$t('article.introduction_title'),
            icon: require("../assets/img/Artemis_icon.png"),
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
                    title: this.$t('article.intro1_title'),
                    desc: this.$t('article.intro1'),
                },
                {
                    title: this.$t('article.intro2_title'),
                    desc: this.$t('article.intro2'),
                },
                {
                    title: this.$t('article.intro3_title'),
                    desc: this.$t('article.intro3'),
                }
            ];
        }
    },
    components: { InfomationCard }
}
</script>

<style lang="scss" type="text/css">
    @import "/assets/scss/introduction.scss";
</style>
