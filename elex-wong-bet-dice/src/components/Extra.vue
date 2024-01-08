<template>
    <div class="chat-icon">
        <img src="../assets/img/telegram-icon.png" @click="nav('chats')">
    </div>
</template>
<script lang="ts">
    import { Vue } from "vue-class-component";

    export default class Extra extends Vue {
        nav(page:any) {
            if (page == 'chats') {
                window.open('https://t.me/crazydiceapp');
            } else {
                this.$router.push({path: '/' + page});
            }
        }
    }
</script>
<style src="@/assets/css/extra.css" scoped>
</style>