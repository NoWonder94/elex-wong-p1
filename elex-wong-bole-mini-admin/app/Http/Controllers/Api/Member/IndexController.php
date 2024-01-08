<?php
    namespace App\Http\Controllers\Api\Member;
    use App\Http\Controllers\Api\Controller;
    use App\Services\BoleMini\MemberService;
    use App\Models\BoleMini\Member;
    use App\Models\BoleMini\Currency;
    use Illuminate\Http\Request;
    use Cache;

    class IndexController extends Controller {
        public function getList() {
            $cacheData = Cache::get('cache_data_member');

            if ($cacheData) {
                return $this->response->setResponseData($cacheData)->getResponse();
            }

            $queryList = Member::dbTable()
                                    ->orderBy('id', 'desc');
            $queryCount = clone $queryList;

            $list = $queryList->get()->toArray();
            $totalCount = $queryCount->count();

            $currencyList = Currency::dbTable()
                                        ->orderBy('id', 'asc')
                                        ->get()
                                        ->toArray();

            $result = [
                'list' => $list,
                'totalCount' => $totalCount,
                'currencyList' => $currencyList
            ];

            Cache::forever('cache_data_member', $result);

            return $this->response->setResponseData($result)->getResponse();
        }

        public function createData(Request $request) {
            $this->validate($request, [
                'domain_name' => 'required|string|min:1',
                'company_name' => 'required|string|min:1',
                'currency_id' => 'required|integer|min:1'
            ]);

            $memberService = new MemberService();
            $result = $memberService->createData($request->all());

            return $this->response->setResponseData($result)->getResponse();
        }

        public function updateData(Request $request) {
            $this->validate($request, [
                'id' => 'required|integer|min:1',
                'company_name' => 'required|string|min:1',
                'currency_id' => 'required|integer|min:1'
            ]);

            $memberService = new MemberService();
            $result = $memberService->updateData($request->all());

            return $this->response->setResponseData($result)->getResponse();
        }

        public function deleteData(Request $request) {
            $this->validate($request, [
                'id' => 'required|integer|min:1'
            ]);

            $memberService = new MemberService();
            $result = $memberService->deleteData($request->post('id'));

            return $this->response->setResponseData($result)->getResponse();
        }

        public function selectFieldsByList() {
            return [
                'id',
                'domain_name',
                'company_name',
                'currency_id',
                'customer_name',
                'customer_email',
                'customer_skype',
                'customer_telegram',
                'customer_weixin',
                'customer_qq',
                'finance_name',
                'finance_email',
                'finance_skype',
                'finance_telegram',
                'finance_weixin',
                'finance_qq'
            ];
        }
    }
?>