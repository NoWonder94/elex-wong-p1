<template>
    <div class="strategy-condition">
        <form class="strategy-condition-form">
            <div class="strategy-condition-form-header">
                <span class="form-header-title">{{ $i18n.t('advancedStrategy') }}</span>
                <span class="form-header-button" @click="close">{{ $i18n.t('close') }}</span>
            </div>
            <div class="bar-container"></div>
            <div class="strategy-condition-OnDo">
                <div class="strategy-condition-OnDo-label">{{ $i18n.t('strategyName') }}</div>
                <div class="strategy-condition-Do-input">
                    <div class="input-with-icon">
                        <input type="text" v-model="strategyData.name"/>
                    </div>
                </div>
            </div>
            <div class="strategy-condition-form-condition" v-for="(condition, index) in strategyData.conditions" :key="index">
                <div class="strategy-condition-form-condition-label">
                    {{ $i18n.t('condition') }} {{ index + 1 }}
                </div>
                <div class="strategy-condition-input" v-if="selectConditionIndex != index">
                    <input type="text" :value="getShowLabel(condition)" readonly/>
                </div>
            <template v-else>
                <div class="strategy-condition-radio">
                    <label class="radio-button" v-for="(sc_data, sc_key) in systemData.conditions" :key="sc_key"> 
                        <span class="radio-button-label">{{ sc_data.label }}</span> 
                        <span class="radio__input">
                            <input type="radio" name="condition_type" :value="sc_key" :checked="sc_key == condition.type" @click="changeConditionType(sc_key)">
                            <span class="radio__control"></span>
                        </span>
                    </label>
                </div>
                <div id="betLayout" v-if="selectConditionKey == 'bet'">
                    <div class="strategy-condition-OnDo">
                        <div class="strategy-condition-OnDo-label">{{ $i18n.t('on') }}</div>
                        <div class="strategy-condition-On-input">
                            <div class="left-input">
                                <select class="left-input-select" v-model="condition.on_type">
                                    <option :value="on_type_key" :selected="condition.on_type == on_type_key" v-for="(on_type_label, on_type_key) in selectConditionData.on_types" :key="on_type_key">{{ on_type_label }}</option>
                                </select>
                            </div>
                            <div class="right-input">
                                <input type="text" v-model="condition.on_amount" />
                            </div>
                        </div>
                        <div class="strategy-condition-On-input">
                            <select class="strategy-condition-On-select" v-model="condition.on_term">
                                <option :value="on_term_key" :selected="condition.on_term == on_term_key" v-for="(on_term_label, on_term_key) in selectConditionData.on_terms" :key="on_term_key">{{ on_term_label }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div id="profitLayout" v-if="selectConditionKey == 'profit'">
                    <div class="strategy-condition-OnDo">
                        <div class="strategy-condition-OnDo-label">{{ $i18n.t('on') }}</div>
                        <div class="strategy-condition-On-input">
                            <div class="left-input">
                                <select class="left-input-select" v-model="condition.on_type">
                                    <option :value="on_type_key" :selected="condition.on_type == on_type_key" v-for="(on_type_label, on_type_key) in selectConditionData.on_types" :key="on_type_key">{{ on_type_label }}</option>
                                </select>
                            </div>
                            <div class="right-input">
                                <select class="left-input-select" v-model="condition.on_term">
                                    <option :value="on_term_key" :selected="condition.on_term == on_term_key" v-for="(on_term_label, on_term_key) in selectConditionData.on_terms" :key="on_term_key">{{ on_term_label }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="strategy-condition-On-input">
                            <input type="text" v-model="condition.on_amount" />
                        </div>
                    </div>
                </div>
                <div class="strategy-condition-OnDo">
                    <div class="strategy-condition-OnDo-label">{{ $i18n.t('do') }}</div>
                    <div class="strategy-condition-Do-input">
                        <select class="strategy-condition-Do-select" id="condition-Do" v-model="condition.do_action">
                            <option :value="action_key" :selected="condition.do_action == action_key" v-for="(action_data, action_key) in systemData.actions" :key="action_key">{{ action_data.label }}</option>
                        </select>
                    </div>
                    <div class="strategy-condition-Do-input" v-if="systemData.actions[condition.do_action].amount">
                        <div class="input-with-icon">
                            <input type="text" v-model="condition.do_amount"/>
                            <img class="percent-icon" src="../assets/img/percent.png" v-if="systemData.actions[condition.do_action].unit == '%'" />
                            <img class="percent-icon" src="../assets/img/solana.png" v-if="systemData.actions[condition.do_action].unit == 'SOL'" />
                        </div>
                    </div>
                    <div class="strategy-condition-Do-input" v-if="systemData.actions[condition.do_action].desc != ''">
                        {{ systemData.actions[condition.do_action].desc }}
                    </div>
                </div>
            </template> 
                <div class="strategy-condition-crud">
                    <i class="fa fa-pencil-square-o" @click="setSelectIndex(index)" v-if="selectConditionIndex != index"></i>
                    <i class="fa fa-check" v-if="selectConditionIndex == index" @click="setSelectIndex(-1)"></i>
                    <i class="fa fa-trash-o" @click="removeCondition(index)"></i>
                </div>
            </div>
            <div class="strategy-condition-end">
                <button type="button" class="strategy-condition-button" @click="addCondition">
                    {{ $i18n.t('addConditonBlock') }}
                </button>
                <p class="strategy-condition-hints">{{ $i18n.t('conditionTip') }}</p>
            </div>
        </form>
    </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';

@Options({
  props: {
    strategyAction: String,
    strategyId: String,
    strategyIndex: Number,
    strategyData: Object
  }
})
export default class StrategyConditionModal extends Vue {
    systemData:any = {
        'conditions':{
            'bet':{
                'label': 'Bet Condition', //投注条件
                'on_types':{
                    'every':'Every', //每
                    'everyStreakOf':'Every streak of', //每连续
                    'firstStreakOf':'First streak of', //第一次连续
                    'streakGreaterThan':'Streak greater than', //连续多过
                    'streakLowerThan':'Streak lower than', //连续少过
                },
                'on_terms':{
                    'win':'Wins', //赢
                    'lose':'Losses', //输
                    'bet':'Bets', //投注
                }
            },
            'profit':{
                'label': 'Profit Condition', //利润条件
                'on_types':{
                    'balance':'Balance', //余额
                    'loss':'Loss', //负
                    'profit':'Profit', //利润
                },
                'on_terms':{
                    'greaterThan':'Greater than', //大于
                    'greaterThanOrEqualTo':'Greater than or equal to', //较大或相等于
                    'lowerThan':'Lower than', //低于
                    'lowerThanOrEqualTo':'Lower than or equal to', //较低或相等于
                }
            }
        },
        'actions':{
            'increaseByPercentage':{
                'label':'Increase bet amount', //增加投注额
                'amount':true,
                'unit':'%',
                'desc':''
            },
            'decreaseByPercentage':{
                'label':'Decrease bet amount', //减少投注额
                'amount':true,
                'unit':'%',
                'desc':''
            },
            'increaseWinChanceBy':{
                'label':'Increase win chance', //增加获胜机率
                'amount':true,
                'unit':'%',
                'desc':'Win chance value will be increased by % of the current value. Example : increasing 30% win chance by 10% will result in a 33% win chance.'
            },
            'decreaseWinChanceBy':{
                'label':'Decrease win chance', //减少获胜机率
                'amount':true,
                'unit':'%',
                'desc':'Win chance value will be decreased by % of the current value. Example : decreasing 30% win chance by 10% will result in a 27% win chance.'
            },
            'addToAmount':{
                'label':'Add to bet amount', //添加至投注额
                'amount':true,
                'unit':'SOL',
                'desc':''
            },
            'subtractFromAmount':{
                'label':'Subtract from bet amount', //从投注额扣除
                'amount':true,
                'unit':'SOL',
                'desc':''
            },
            'addToWinChance':{
                'label':'Add to win chance', //添加至获胜机率
                'amount':true,
                'unit':'%',
                'desc':'If your Win chance is set to 5% after every win it will increase by 5%, so after 1 win, it will become 55% after a second win 60% etc.'
            },
            'subtractFromWinChance':{
                'label':'Subtract from win chance', //从获胜机率扣除
                'amount':true,
                'unit':'%',
                'desc':'If your Win chance is set to 5% after every loss it will decrease by 5%, so after 1 loss, it will become 45% after a second loss 40% etc.'
            },
            'setAmount':{
                'label':'Set bet amount', //设定投注额
                'amount':true,
                'unit':'SOL',
                'desc':''
            },
            'setWinChance':{
                'label':'Set win chance', //设定获胜机率
                'amount':true,
                'unit':'%',
                'desc':''
            },
            'switchOverUnder':{
                'label':'Switch over under', //转换掷大于或掷小于
                'amount':false,
                'unit':'',
                'desc':''
            },
            'resetAmount':{
                'label':'Reset bet amount', //重置投注额
                'amount':false,
                'unit':'',
                'desc':''
            },
            'resetWinChance':{
                'label':'Reset win chance', //重置获胜机率
                'amount':false,
                'unit':'',
                'desc':''
            },
            'stop':{
                'label':'Stop autobet', //停止自动下注
                'amount':false,
                'unit':'',
                'desc':''
            }
        }
    };
    selectConditionIndex = -1;
    selectConditionKey = '';
    selectConditionData!:any;
    selectActionData!:any;

    mounted() {
        this.selectConditionIndex = (this as any).strategyIndex;
        this.setSelectData();
    }

    setSelectData() {
        const this1 = (this as any);
        if (this.selectConditionIndex < 0) {
            this.selectActionData = {};
            this.selectConditionKey = '';
            this.selectConditionData = {};
        } else {
            const selectCondition = this1.strategyData.conditions[this.selectConditionIndex];
            this.selectActionData = this.systemData.actions[selectCondition.do_action];
            this.selectConditionKey = selectCondition.type;
            this.selectConditionData = this.systemData.conditions[this.selectConditionKey];
        }
    }

    setSelectIndex(index:number) {
        this.selectConditionIndex = index;
        this.setSelectData();
    }

    getShowLabel(condition:any) {
        const on_type = this.systemData.conditions[condition.type].on_types[condition.on_type];
        const on_term = this.systemData.conditions[condition.type].on_terms[condition.on_term];
        const do_action = this.systemData.actions[condition.do_action];
        let result = 'ON ' + on_type + ' ';
        if (condition.type == 'bet') {
            result += condition.on_amount + ' ' + on_term;
        } else {
            result += on_term + ' ' + condition.on_amount + 'SOL';
        }

        result += ' > ' + do_action.label;
        if (do_action.amount) {
            result += ' ' + condition.do_amount + do_action.unit
        }
        return result;
    }

    changeConditionType(type:string) {
        const this1 = (this as any);
        this.selectConditionKey = type;
        this.selectConditionData = this.systemData.conditions[type];
        this1.strategyData.conditions[this.selectConditionIndex].type = type;
    }

    addCondition() {
        (this as any).strategyData.conditions.push({
            'type':'bet',
            'on_type':'every',
            'on_term':'win',
            'on_amount':'0',
            'do_action':'increaseByPercentage',
            'do_amount':'0',
        });
        this.selectConditionIndex = (this as any).strategyData.conditions.length - 1;
        this.setSelectData();
    }

    removeCondition(index:number) {
        this.selectConditionIndex = -1;
        const this1 = (this as any);
        this1.strategyData.conditions.splice(index, 1);
    }

    close() {
        const this1 = (this as any);
        this.$emit('close', {
            'id': this1.strategyId,
            'action': this1.strategyAction,
            'data': this1.strategyData
        });
    }
}
</script>
<style src="@/assets/css/strategyCondition.css" scoped>
</style>