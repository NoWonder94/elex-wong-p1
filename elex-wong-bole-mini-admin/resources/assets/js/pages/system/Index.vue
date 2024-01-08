<template>
    <div class="page-container">
        <div class="page-container-inner">
            <div class="app-option-container">
                <h4 class="container-title">{{ $t('title.system.index') }}</h4>
                <div class="option-list">
                    <router-link tag="div" :to="{name: 'system.setting.auth'}" class="option-list-item">
                        <div class="icon icon-red">
                            <font-awesome-icon fixed-width icon="user-shield"></font-awesome-icon>
                        </div>
                        <div class="name">{{ $t('title.system.setting.auth.title') }}</div>
                    </router-link>
                    <router-link tag="div" :to="{name: 'system.log.signin'}" class="option-list-item">
                        <div class="icon icon-blue">
                            <font-awesome-icon fixed-width icon="file-alt"></font-awesome-icon>
                        </div>
                        <div class="name">{{ $t('title.system.log.signin') }}</div>
                    </router-link>
                    <router-link class="option-list-item" tag="div" :to="{name: 'system.setting.risk'}">
                        <div class="icon icon-red">
                            <font-awesome-icon fixed-width icon="user-shield"></font-awesome-icon>
                        </div>
                        <div class="name">{{ $t('title.system.setting.risk') }}</div>
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
