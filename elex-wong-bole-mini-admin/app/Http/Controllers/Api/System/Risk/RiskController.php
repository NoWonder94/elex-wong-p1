<?php
	namespace App\Http\Controllers\Api\System\Risk;
	use App\Http\Controllers\Api\Controller;
	use App\Http\Requests\System\Risk\RiskRequest;
	use App\Services\App\RiskService;
	use App\Models\App\SettlementInfoModel;
	use Request;

	class RiskController extends Controller {
		public function getList(RiskRequest $request) {
			$orgId = $this->agent()->getOrgId();
			$page = intval($request->query('page', 1));
			$pageSize = intval($request->query('page_size', 10));
			$param = $request->all();
			$order = $request->query('order', 'win_percentage_desc');

			$riskService = new RiskService();
			list($collection, $count, $sumTotal) = $riskService->getList($orgId, $page, $pageSize, $param, $order);

			$data['count'] = [
				'total' => $count,
				'page' => $page,
				'page_size' => $pageSize
			];
			$data['data'] = $collection;
			$data['sum_total'] = $sumTotal;



			return $this->response->setResponseData($data)->getResponse();
		}

		public function getDetail(RiskRequest $request) {
			/*
			$this->validate($request, [
				'account_id' => 'required|string|min:1',
				'timestamp' => 'required|integer|min:10'
			]);
			*/
	        $accountId = $request->query('account_id');
	        //$timestamp = $request->query('report_id');
	        $orgId = $this->agent()->getOrgId();
			$page = intval($request->query('page', 1));
			$pageSize = intval($request->query('page_size', 10));
			$param = $request->all();

			$riskService = new RiskService();
			list($collection, $count) = $riskService->getDetail($orgId, $page, $pageSize,$param);


			$data['count'] = [
				'total' => $count,
				'page' => $page,
				'page_size' => $pageSize
			];
			$data['data'] = $collection;

			return $this->response->setResponseData($data)->getResponse();
		}
	}
?>