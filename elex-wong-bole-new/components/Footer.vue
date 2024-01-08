<template>
    <div class="footer">
        <div class="footer-part">
            <div class="footer-part-title">
                {{ $t('footer.part1.title') }}
            </div>
            <div class="footer-part-icon">
                <img src="../assets/img/icon_footer_1.png">
            </div>
            <div class="footer-part-description">
                {{ $t('footer.part1.description') }}
            </div>
        </div>
        <div class="footer-part">
            <div class="footer-part-title">
                {{ $t('footer.part2.title') }}
            </div>
            <div class="footer-part-icon">
                <img src="../assets/img/icon_footer_2.png">
            </div>
            <div class="footer-part-description">
                {{ $t('footer.part2.description') }}
            </div>
        </div>
        <div class="footer-part">
            <div class="footer-part-title">
                {{ $t('footer.part3.title') }}
            </div>
            <div class="footer-part-icon">
                <img src="../assets/img/icon_footer_3.png">
            </div>
            <div class="footer-part-description">
                {{ $t('footer.part3.description') }}
            </div>
        </div>
        <div class="footer-part">
            <div class="footer-part-title">
                {{ $t('footer.part4.title') }}
            </div>
            <div class="footer-part-media-list">
                <div class="footer-part-media" @click="openUrl($globalParams.url.youtube)">
                    <div class="footer-part-media-icon">
                        <img src="../assets/img/icon_youtube.png">
                    </div>
                    <div class="footer-part-media-name">
                        YouTube
                    </div>
                </div>
                <div class="footer-part-media" @click="openUrl($globalParams.url.telegram)">
                    <div class="footer-part-media-icon">
                        <img src="../assets/img/icon_telegram.png">
                    </div>
                    <div class="footer-part-media-name">
                        Telegram
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Footer',
        methods: {
            openUrl(url) {
                if (!url) {
                    return false;
                }
                
                window.open(url);
            },
        },
    }
</script>
<style lang="scss" type="text/css">
    @import '/assets/scss/web/footer.scss';
    @import '/assets/scss/mobile/footer.scss';
</style>