<?php 
namespace App\Application\System\Admin\Services;

use App\Models\System\PaymentPlatform;
use Illuminate\Database\Query\Expression;
use App\Utils\Calc;

class PaymentPlatformService extends EloquentService {
    public function lists($data = []) {
        $this->listFormatOrder = function(&$builder, &$data, &$attributes) {
            $builder->orderBy('sort', 'asc');
        };

        return parent::lists($data);
    }

    public function withdraw($withdrawMoney, $code = '') {
        $total_money = PaymentPlatform::sum('balance');
        $platforms = PaymentPlatform::select('code', 'name', 'balance')->where('balance', '>', 0)->orderBy('balance', 'DESC')->get();

        $list = [];

        if (count($platforms) > 0) {
            if (empty($code)) {
                $first_money    = $withdrawMoney;
                $first_platform = $platforms->shift();
                foreach ($platforms as $platform) {
                    $money = (int)Calc::mul($withdrawMoney, Calc::div($platform->balance, $total_money, 2), 0);
                    if ($money > 0) {
                        $first_money -= $money;
                    }
                    $platform = $platform->toArray();
                    $platform['money'] = $money;
                    $list[] = $platform;
                }
                $first_platform  = $first_platform->toArray();
                $first_platform['money'] = $first_money;
                array_unshift($list, $first_platform);
            } else {
                foreach ($platforms as $platform) {
                    $platform = $platform->toArray();
                    if ($platform['code'] == $code) {
                        $platform['money'] = $withdrawMoney;
                    } else {
                        $platform['money'] = 0;
                    }
                    $list[] = $platform;
                }
            }
        }
        return $list;
    }

    public function updateBalance($code, $money) {
        $platform = PaymentPlatform::where('code', $code)->first();
        if ($platform->balance < $money) {
            $this->throwException(['common.platform_insufficient', $platform->name, $platform->balance]);
        }
        $new_balance = Calc::sub($platform->balance, $money, 2);
        $result = PaymentPlatform::where('code', $code)->where('balance', '>=', $money)->update([
                                    'balance' => new Expression("balance - {$money}"),
                                    'total_withdraw' => new Expression("total_withdraw + {$money}")
                                ]);
        if ($result < 1) {
            $this->throwException('common.update_platform_money_error');
        }

        return $new_balance;
    }
	
	public function modifyBalance($code,$money){
		if($code != 'yl'){
			$this->throwException('此平台不能修改余额');
		}
		$platform = PaymentPlatform::where('code', $code)->first();
		if ($platform->balance < abs($money) && $money < 0) {
            $this->throwException('余额已不足');
        }
        $result = PaymentPlatform::where('code', $code)->update([
                                    'balance' => new Expression("balance + {$money}"),
                                    'total_money' => new Expression("total_money + {$money}")
                                ]);
        if ($result < 1) {
            $this->throwException('common.update_platform_money_error');
        }

        return true;
	}
}