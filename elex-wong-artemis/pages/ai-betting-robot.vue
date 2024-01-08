<template>
    <div class="ai_betting_robot">
        <HeaderTitle :icon="icon" :title="title" />
        <div class="ai_betting_robot_content">
            <div v-for="(data, index) in dataList" :key="index">
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
            title: this.$t('article.airobot_title'),
            icon: require("../assets/img/robot.png"),
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
                    title: this.$t('article.robot1_title'),
                    desc: this.$t('article.robot1'),
                },
            ];
        }
    },
    components: { InfomationCard }
}
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/ai_betting_robot.scss";
</style>
