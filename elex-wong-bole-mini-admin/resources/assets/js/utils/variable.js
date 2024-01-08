import Vue from 'vue';

Vue.prototype.GLOBAL = {
    pickerOptions: {
        shortcuts: [{
            text: Vue.prototype.$lang('datePickerOptions.today'),
            onClick(picker) {
                const end = new Date();
                const start = new Date(new Date().toLocaleDateString());
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: Vue.prototype.$lang('datePickerOptions.yesterday'),
            onClick(picker) {
                const end = new Date(new Date().toLocaleDateString());
                end.setTime(end.getTime() - 1000 * 1);
                const start = new Date(new Date().toLocaleDateString());
                start.setTime(start.getTime() - 1000 * 3600 * 24 * 1);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: Vue.prototype.$lang('datePickerOptions.lastWeek'),
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 1000 * 3600 * 24 * 7);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: Vue.prototype.$lang('datePickerOptions.lastMonth'),
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 1000 * 3600 * 24 * 30);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: Vue.prototype.$lang('datePickerOptions.lastThreeMonths'),
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 1000 * 3600 * 24 * 90);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: Vue.prototype.$lang('datePickerOptions.lastSixMonths'),
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 1000 * 3600 * 24 * 180);
                picker.$emit('pick', [start, end]);
            }
        }]
    },
    pickerOptionsLimit: {
        shortcuts: [{
            text: Vue.prototype.$lang('datePickerOptions.today'),
            onClick(picker) {
                const end = new Date();
                const start = new Date(new Date().toLocaleDateString());
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: Vue.prototype.$lang('datePickerOptions.yesterday'),
            onClick(picker) {
                const end = new Date(new Date().toLocaleDateString());
                end.setTime(end.getTime() - 1000 * 1);
                const start = new Date(new Date().toLocaleDateString());
                start.setTime(start.getTime() - 1000 * 3600 * 24 * 1);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: Vue.prototype.$lang('datePickerOptions.lastWeek'),
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 1000 * 3600 * 24 * 7);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: Vue.prototype.$lang('datePickerOptions.last30Days'),
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 1000 * 3600 * 24 * 30);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: Vue.prototype.$lang('datePickerOptions.warning'),
        }]
    },
};
