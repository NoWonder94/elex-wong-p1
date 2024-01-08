<template>
    <div class="upload-img">
        <vue-upload-image
            :url="url"
            :max-files="1"
            name="files[]"
            :resize_enabled="true"
            :resize_max_width="2400"
            :button_html="buttonHtml"
            :button_class="'button is-primary'"
            @upload-image-attempt="uploadImageAttempt"
            @upload-image-success="uploadImageSuccess"
            @upload-image-failure="uploadImageFailure"
            @upload-image-loaded="uploadImageLoaded"
            @upload-image-submit="uploadImageSubmit"
            @upload-image-clicked="uploadImageClicked"
            @upload-image-removed="uploadImageRemoved"
        >
        </vue-upload-image>
        <div class="uploaded-img" v-if="img">
            <img :src="newImg != '' ? newImg : img">
        </div>
        <Loading :isLoading.sync="isLoading" />
    </div>
</template>

<script>
    export default {
        name: 'VueUploadImg',
        props: ['formImg'],
        data() {
            return {
                url: '',
                buttonHtml: this.$t('button.upload_img'),
                img: '',
                newImg: '',
                isLoading: false,
            }
        },
        methods: {
            uploadImageAttempt() {
                console.log('uploadImageAttempt');
            },
            uploadImageSuccess() {
                console.log('uploadImageSuccess');
            },
            uploadImageFailure() {
                console.log('uploadImageFailure');
            },
            uploadImageSubmit() {
                console.log('uploadImageSubmit');
            },
            uploadImageClicked() {
                console.log('uploadImageClicked');
            },
            uploadImageRemoved() {
                console.log('uploadImageRemoved');
            },
            uploadImageLoaded(val) {
                this.convertToImgBase64(val.file);
            },
            convertToImgBase64(file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.newImg = e.target.result;
                    this.uploadImg(e.target.result);
                };
                reader.readAsDataURL(file);
            },
            uploadImg(file) {
                let form = {
                    type: 'img',
                    resource: file,
                };
                this.isLoading = true;
                this.$api.requestByPost('Resource/upload', form).then(result => {
                    if(result.status == true) {
                        console.log(result.status)
                        this.$emit('update:formImg', result.data.resource);
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
            },
        },
        watch: {
            formImg: function() {
                this.img = this.formImg;
            }
        },
    }
</script>

<style lang="scss" type="text/css">
    @import "/assets/scss/pc/uploadImg.scss";
    @import "/assets/scss/mobile/uploadImg.scss";
</style>
