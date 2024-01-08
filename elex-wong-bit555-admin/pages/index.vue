<template>
    <div class="index">
        index
        <!--
        <Loading :isLoading.sync="isLoading" />
        -->
    </div>
</template>
<script>
    export default {
        name: 'Index',
        middleware: [
            function({ redirect }) {
                redirect('/home/list');
            },
        ],
        data() {
            return {
                isLoading: true,
            }
        },
        mounted() {
            this.initialize();
        },
        methods: {
            initialize() {
                /*
                let params = {};
                this.$api.requestByPost('', params).then(result => {
                    if (result.status == true) {
                        this.$notiflix.Notify.success(result.msg ? result.msg : this.$t('message.success'), {
                            showOnlyTheLastOne: true,
                        });
                    } else {
                        this.$notiflix.Notify.failure(result.msg ? result.msg : this.$t('message.error'), {
                            showOnlyTheLastOne: true,
                        });
                    }

                    this.isLoading = false;
                }).catch(error => {
                    this.$notiflix.Notify.failure(this.$t('message.error'), {
                        showOnlyTheLastOne: true,
                    });
                });
                */
            }
        },
    }
</script>
<style lang="scss" type="text/css">
    @import "/assets/scss/pc/index.scss";
    @import "/assets/scss/mobile/index.scss";
</style>
