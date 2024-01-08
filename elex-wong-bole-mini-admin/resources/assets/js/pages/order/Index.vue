<template>
    <div class="page-container">
        <div class="page-container-inner">
            <div class="app-option-container">
                <h4 class="container-title">{{ $t('title.order.coins') }}</h4>
                <div class="option-list">
                    <router-link tag="div" :to="{name: 'order.my'}" class="option-list-item">
                        <div class="icon icon-blue">
                            <font-awesome-icon fixed-width icon="clipboard"></font-awesome-icon>
                        </div>
                        <div class="name">{{ $t('title.order.my') }}</div>
                    </router-link>
                    <router-link tag="div" :to="{name: 'order.record'}" class="option-list-item">
                        <div class="icon icon-yellow">
                            <font-awesome-icon fixed-width icon="file-alt"></font-awesome-icon>
                        </div>
                        <div class="name">{{ $t('title.order.record') }}</div>
                    </router-link>
                </div>
            </div>
            <div class="app-option-container">
                <h4 class="container-title">{{ $t('title.order.index') }}</h4>
                <div class="option-list">
                    <router-link tag="div" :to="{name: 'order.agency'}" class="option-list-item">
                        <div class="icon icon-green">
                            <font-awesome-icon fixed-width icon="clipboard"></font-awesome-icon>
                        </div>
                        <div class="name">{{ $t('title.order.agency') }}</div>
                    </router-link>
                    <router-link tag="div" :to="{name: 'order.game'}" class="option-list-item">
                        <div class="icon icon-purple">
                            <font-awesome-icon fixed-width icon="clipboard-list"></font-awesome-icon>
                        </div>
                        <div class="name">{{ $t('title.order.game') }}</div>
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
