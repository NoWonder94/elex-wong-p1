<?php
    namespace App\Application\Api\Controllers;
    use App\Application\Api\Services\MemberService;
    use Illuminate\Http\Request;
    use Lang;

    class MemberController extends BaseController { 
        public function getList(Request $request) {
            $result = MemberService::instance()->getList();

            return $this->success($result);
        }

        public function reg(Request $request) {
        	$this->validate($request, [
        		'email' => 'required|email|',
                'name' => 'required|string|between:6,16',
                'pwd' => 'required|string|between:6,16'
            ]);

        	$data = $request->all();

            $result = MemberService::instance()->reg($data['email'], $data['name'], $data['pwd'], $this->token['host']);

            return $this->success($result);
        }

        public function login(Request $request) {
        	$this->validate($request, [
        		'account' => 'required|string',
                'pwd' => 'required|string|between:6,16'
            ]);

            $data = $request->all();

            $user = MemberService::instance()->login($data['account'], $data['pwd']);
            $this->refreshToken($user);

            $result = [
                'email' => $user->customer_email,
                'name' => $user->customer_name
            ];

            return $this->success($result);
        }

        public function getInfo() {
            if ($this->user) {
                $result = [
                    'email' => $this->user->customer_email,
                    'name' => $this->user->customer_name
                ];

                $this->success($result);
            }

            $this->error(Lang::get('common.error_login'));
        }
    }
?>