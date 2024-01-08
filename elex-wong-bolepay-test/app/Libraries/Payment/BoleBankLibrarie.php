<?php 
namespace App\Libraries\Payment;

use App\Models\System\Bank;
use App\Models\Agent\Order;
use Strings, Lang, Time;

/**
 * 银行卡支付
 */
class BoleBankLibrarie extends BaseLibrarie {

	protected function getBank() {
        return Bank::where('type', '<>', 'Sft')->where('mode', 'receive')->where('status', 1)->orderBy('pay_count', 'ASC')->first();
    }

    public function create(&$order) {
	    $min_time = 7200; //02:00
	    $max_time = 84600; //23:30
        $now_time = UTC_TIME - UTC_DAY;

	    if (!IS_DEV_MODE && ($now_time < $min_time || $now_time > $max_time)) {
            $this->throwException(['common.order.time_limie', '02:00 - 23:30']);
        }

        $bank = $this->getBank();
        if (!$bank) {
            $this->throwException('common.order.bank_error');
        }

        $order->bank_receive_id = $bank->id;
        $order->expire_time     = UTC_TIME + 1800;

        $result = [
            'bank_payee' => $bank->name,
            'bank_card'  => $bank->card,
            'bank_name'  => Lang::get('common.bank_names.' . $bank->type)
        ];

        switch ($bank->auto_type) {
            case 2://付款码

                $num = 0;
                do {
                    $pay_code = Strings::randString(6, 1);

                    //根据es库
                    $check = Order::where('bank_pay_code', $pay_code)
                        ->where('bank_receive_id', $bank->id)
                        ->where('status', 0)
                        ->count();

                    if ($check == 0) {
                        //根据数据库
                        $check = Order::where('bank_pay_code', $pay_code)
                            ->where('bank_receive_id', $bank->id)
                            ->where('status', 0)
                            ->disableQueryBigDB()
                            ->count();
                    }

                    if ($check > 0) {
                        $num++;
                        if ($num > 10) {
                            $this->throwException('common.order.generate_pay_code_error');
                        } else {
                            usleep(5);
                        }
                    }
                } while ($check > 0);

                $order->bank_pay_code = $pay_code;
                $result['pay_code'] = $pay_code;

                break;

            case 3://金额唯一

                $money = $order->money;
                $num = 0;
                do {
                    $rand_money = bcadd($money, mt_rand(1, 99) / 100, 2);

                    //根据es库
                    $check = Order::where('money', $rand_money)
                        ->where('bank_receive_id', $bank->id)
                        ->where('status', 0)
                        ->count();

                    if ($check == 0) {
                        //根据数据库
                        $check = Order::where('money', $rand_money)
                            ->where('bank_receive_id', $bank->id)
                            ->where('status', 0)
                            ->disableQueryBigDB()
                            ->count();
                    }

                    if ($check > 0) {
                        $num++;
                        if ($num > 10) {
                            $this->throwException('common.order.generate_money_error');
                        } else {
                            usleep(5);
                        }
                    } else {
                        $money = $rand_money;
                    }
                } while ($check > 0);

                $order->money = $money;

                break;

            default://其他

                break;
        }

        $order->data = $result;

        Bank::where('id', $bank->id)->increment('pay_count');

        return $result;
    }
}