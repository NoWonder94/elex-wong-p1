<template>
    <span v-if="[10001,10002].indexOf(gameId) > -1">
        <el-tag size="medium" v-if="scenesId==1001">{{ $t('form.mahjongScenes[0].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1002" type="success">{{ $t('form.mahjongScenes[1].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1003" type="warning">{{ $t('form.mahjongScenes[2].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1004" type="danger">{{ $t('form.mahjongScenes[3].label') }}</el-tag>
    </span>
    <span v-else-if="[10003].indexOf(gameId) > -1">
        <el-tag size="medium" v-if="scenesId==1001" type="danger">{{ $t('form.niuniuScenes[0].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1002" type="warning">{{ $t('form.niuniuScenes[1].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1003">{{ $t('form.niuniuScenes[2].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1004" type="success">{{ $t('form.niuniuScenes[3].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1005" type="warning">{{ $t('form.niuniuScenes[4].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1006" type="danger">{{ $t('form.niuniuScenes[5].label') }}</el-tag>
    </span>
    <span v-else-if="[10004].indexOf(gameId) > -1">
        <el-tag size="medium" v-if="scenesId==1001" type="danger">{{ $t('form.sangongScenes[0].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1002" type="warning">{{ $t('form.sangongScenes[1].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1003">{{ $t('form.sangongScenes[2].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1004" type="success">{{ $t('form.sangongScenes[3].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1005" type="danger">{{ $t('form.sangongScenes[4].label') }}</el-tag>
    </span>
    <span v-else-if="[10005].indexOf(gameId) > -1">
        <el-tag size="medium" v-if="scenesId==1001" type="warning">{{ $t('form.zjhScenes[0].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1002">{{ $t('form.zjhScenes[1].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1003" type="success">{{ $t('form.zjhScenes[2].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1004" type="danger">{{ $t('form.zjhScenes[3].label') }}</el-tag>
    </span>
    <span v-else-if="[10006].indexOf(gameId) > -1">
        <el-tag size="medium" v-if="scenesId==1001" type="warning">{{ $t('form.dzmjScenes[0].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1002">{{ $t('form.dzmjScenes[1].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1003" type="success">{{ $t('form.dzmjScenes[2].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1004" type="danger">{{ $t('form.dzmjScenes[3].label') }}</el-tag>
    </span>
    <span v-else-if="[10007].indexOf(gameId) > -1">
        <el-tag size="medium" v-if="scenesId==1001" type="danger">{{ $t('form.slotScenes[0].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1002" type="warning">{{ $t('form.slotScenes[1].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1003">{{ $t('form.slotScenes[2].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1004" type="success">{{ $t('form.slotScenes[3].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1005" type="danger">{{ $t('form.slotScenes[4].label') }}</el-tag>
    </span>
    <span v-else-if="[10008].indexOf(gameId) > -1">
        <el-tag size="medium" v-if="scenesId==1001">{{ $t('form.rbwarScenes[0].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1002" type="warning">{{ $t('form.rbwarScenes[1].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1003" type="danger">{{ $t('form.rbwarScenes[2].label') }}</el-tag>
    </span>
    <span v-else-if="[10010].indexOf(gameId) > -1">
        <el-tag size="medium" v-if="scenesId==1001" type="warning">{{ $t('form.baccaratScenes[0].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1002">{{ $t('form.baccaratScenes[1].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1003" type="success">{{ $t('form.baccaratScenes[2].label') }}</el-tag>
        <el-tag size="medium" v-else-if="scenesId==1004" type="danger">{{ $t('form.baccaratScenes[3].label') }}</el-tag>
    </span>
    <span v-else>
        <el-tag size="medium" type="info">{{ $t('form.defaultScenes[0].label') }}</el-tag>
    </span>
</template>

<script>
    export default {
        name: "GameScenes",
        props: {
            gameId: {
                type: [String, Number],
                default: 10000
            },
            scenesId: {
                type: [String, Number],
                default: 1000
            }
        }
    }
</script>

<style scoped>

</style>