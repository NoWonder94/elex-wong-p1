<template>
    <div class="page-container">
        <div class="page-container-inner">
            <div class="app-option-container">
                <h4 class="container-title">{{ $t('title.chart.index-coins') }}</h4>
                <div class="option-list">
                    <router-link tag="div" :to="{name: 'chart.coins.play'}" class="option-list-item">
                        <div class="icon icon-red">
                            <font-awesome-icon fixed-width icon="users"></font-awesome-icon>
                        </div>
                        <div class="name">{{ $t('title.chart.coins.play') }}</div>
                    </router-link>
                    <router-link tag="div" :to="{name: 'chart.coins.multi'}" class="option-list-item">
                        <div class="icon icon-red">
                            <font-awesome-icon fixed-width icon="coins"></font-awesome-icon>
                        </div>
                        <div class="name">{{ $t('title.chart.coins.multi') }}</div>
                    </router-link>
                    <router-link tag="div" :to="{name: 'chart.coins.slot'}" class="option-list-item">
                        <div class="icon icon-red">
                            <font-awesome-icon fixed-width icon="star-of-david"></font-awesome-icon>
                        </div>
                        <div class="name">{{ $t('title.chart.coins.slot') }}</div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>

<style scoped>

</style>
