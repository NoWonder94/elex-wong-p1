<template>
    <el-form-item class="el-form-item-small" v-if="[10001,10002].indexOf(gameId) > -1">
        <el-select :placeholder="$t('form.sceneId')" v-model="filterOption.scene_id" clearable @change="filterChange">
            <el-option :key="index" v-for="(item, index) in $t('form.mahjongScenes')" :label="item.label" :value="item.value"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item class="el-form-item-small" v-else-if="[10003].indexOf(gameId) > -1">
        <el-select :placeholder="$t('form.sceneId')" v-model="filterOption.scene_id" clearable @change="filterChange">
            <el-option :key="index" v-for="(item, index) in $t('form.niuniuScenes')" :label="item.label" :value="item.value"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item class="el-form-item-small" v-else-if="[10004].indexOf(gameId) > -1">
        <el-select :placeholder="$t('form.sceneId')" v-model="filterOption.scene_id" clearable @change="filterChange">
            <el-option :key="index" v-for="(item, index) in $t('form.sangongScenes')" :label="item.label" :value="item.value"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item class="el-form-item-small" v-else-if="[10005].indexOf(gameId) > -1">
        <el-select :placeholder="$t('form.sceneId')" v-model="filterOption.scene_id" clearable @change="filterChange">
            <el-option :key="index" v-for="(item, index) in $t('form.zjhScenes')" :label="item.label" :value="item.value"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item class="el-form-item-small" v-else-if="[10006].indexOf(gameId) > -1">
        <el-select :placeholder="$t('form.sceneId')" v-model="filterOption.scene_id" clearable @change="filterChange">
            <el-option :key="index" v-for="(item, index) in $t('form.dzmjScenes')" :label="item.label" :value="item.value"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item class="el-form-item-small" v-else-if="[10007].indexOf(gameId) > -1">
        <el-select :placeholder="$t('form.sceneId')" v-model="filterOption.scene_id" clearable @change="filterChange">
            <el-option :key="index" v-for="(item, index) in $t('form.slotScenes')" :label="item.label" :value="item.value"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item class="el-form-item-small" v-else-if="[10008].indexOf(gameId) > -1">
        <el-select :placeholder="$t('form.sceneId')" v-model="filterOption.scene_id" clearable @change="filterChange">
            <el-option :key="index" v-for="(item, index) in $t('form.rbwarScenes')" :label="item.label" :value="item.value"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item class="el-form-item-small" v-else-if="[10010].indexOf(gameId) > -1">
        <el-select :placeholder="$t('form.sceneId')" v-model="filterOption.scene_id" clearable @change="filterChange">
            <el-option :key="index" v-for="(item, index) in $t('form.baccaratScenes')" :label="item.label" :value="item.value"></el-option>
        </el-select>
    </el-form-item>
</template>

<script>
    export default {
        name: "GameScenesOption",
        model: {
            prop: 'scenesId',
            event: 'change'
        },
        props: {
            gameId: [String, Number],
            scenesId: [String, Number],
        },
        data() {
            return {
                filterOption: {
                    scene_id: '',
                },
            }
        },
        watch: {
            scenesId: function (n, o) {
                this.filterOption.scene_id = n;
            }
        },
        created: function () {
            this.filterOption.scene_id = this.scenesId;
        },
        methods: {
            filterChange() {
                this.$emit('change', this.filterOption.scene_id);
            },
        }
    }
</script>

<style scoped>

</style>