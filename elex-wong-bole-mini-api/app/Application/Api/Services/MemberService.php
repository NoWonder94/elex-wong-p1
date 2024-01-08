<?php
	namespace App\Application\Api\Services;
	use App\Application\Api\Models\Member;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Support\Facades\DB;
    use App\Exceptions\Response\Service\ServiceException;
    use App\Exceptions\Response\Service\ServiceCode;
    use Lang, Request;

	class MemberService extends BaseService {
        private function encryptPwd($pwd) {
            return Hash::make($pwd);
        }

        private function updateLoginInfo($user = null) {
            Member::where('id', $user->id)->update(['date_login' => UTC_TIME]);
        }

        public function reg($email, $name, $pwd, $host) {
            $isEmailExist = Member::dbTable()
                            ->select()
                            ->where('customer_email', $email)
                            ->get()
                            ->toArray();

            if ($isEmailExist) {
                $this->error(Lang::get('common.error_user_email_exist'));
            }

            $isNameExist = Member::dbTable()
                            ->select()
                            ->where('customer_name', $name)
                            ->get()
                            ->toArray();

            if ($isNameExist) {
                $this->error(Lang::get('common.error_user_name_exist'));
            }

            $data = [
                'domain_name' => $host,
                'company_name' => '博乐',
                'currency_id' => 1,
                'customer_email' => $email,
                'customer_name' => $name,
                'customer_pwd' => $this->encryptPwd($pwd)
            ];

            try {
                DB::connection()->beginTransaction();

                $member = new Member();
                $member->create($data);

                DB::connection()->commit();
            } catch(\Exception $e) { 
                DB::connection()->rollback();
                throw $e;
            }
            
            return true;
        }

        public function login($account, $pwd) {
            $where = [];

            if (filter_var($account, FILTER_VALIDATE_EMAIL)) {
                $where[] = ['customer_email', $account];
            } else {
                $where[] = ['customer_name', $account];
            }

            $user = Member::dbTable()
                    ->select()
                    ->where($where)
                    ->first();

            if (!$user) {
                $this->error(Lang::get('common.error_user_not_exist'));
            }

            if (!Hash::check($pwd, $user->customer_pwd)) {
                $this->error(Lang::get('common.error_user_pwd_incorrect'));
            }

            $this->updateLoginInfo($user);

            return $user;
        }

        public function getInfo($userId) {
            //定义select!!!
            return Member::dbTable()->select()->where('id', $userId)->first();
        }

    	public function getList($page = 1, $pageSize = 20) {
    		$queryList = Member::select(
            				'id'
            			);
            $queryCount = clone $queryList;

            $list = $queryList->get()->toArray();
            $count = $queryCount->get()->count();

           	$result = [
           		'list' => $list,
           		'count' => $count
           	];

           	return $result;
    	}
	}
?>