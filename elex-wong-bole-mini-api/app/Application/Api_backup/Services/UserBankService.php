<?php 
namespace App\Application\Site\Api\Services;

use App\Models\Site\UserBank as BaseUserBank;
use App\Application\Site\Api\Models\UserBank;
use Lang;

class UserBankService extends BaseService {
    public function get($userId, $id) {
        return BaseUserBank::where('id', $id)
                           ->where('user_id', $userId)
                           ->first();
    }

    public function lists($userId) {
        return UserBank::where('user_id', $userId)
                       ->orderBy('id', 'DESC')
                       ->get();
    }

    public function create($user, $data) {
        $banks = Lang::get('root::common.banks_names');
        if (!isset($banks[$data['code']])) {
            $this->throwException('common.bank.code_error');
        }

        $bank = new UserBank;
        $bank->user_id      = $user->id;
        $bank->user_name    = $user->name;
        $bank->real_name    = $user->real_name;
        $bank->bank_name    = $banks[$data['code']];
        $bank->bank_code    = $data['code'];
        $bank->bank_account = $data['account'];
        $bank->bank_info    = isset($data['info']) ? $data['info'] : '';
        $bank->create_time  = UTC_TIME;
        $bank->save();

        return $bank;
    }

    public function delete(int $userId, int $id) {
        return UserBank::where('id', $id)
                       ->where('user_id', $userId)
                       ->delete();
    }
}