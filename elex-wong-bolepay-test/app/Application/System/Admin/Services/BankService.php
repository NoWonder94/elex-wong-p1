<?php
namespace App\Application\System\Admin\Services;

use App\Application\System\Admin\Models\Bank;
use App\Models\System\Server;
use Helper;

class BankService extends \App\Services\System\BankService {

	public function getServers() {
		$use_ids = Bank::where('server_id', '>', 0)->pluck('server_id')->toArray();
		$list = Server::whereNotIn('id', $use_ids)->get();
		return $list;
	}

    public function getById($id) {
        return $this->getModel()->find($id);
    }

    public function lists($data = []) {
        $this->listFormatBuilder = function(&$builder, &$data, &$attributes) {
            $card = isset($data['card']) ? trim($data['card']) : '';
            if (!empty($card)) {
                $builder->where('card', $card);
            }

            $type = isset($data['bank']) ? trim($data['bank']) : '';
            if (!empty($type)) {
                $builder->where('bank', $type);
            }

            if (isset($data['mode'])) {
                $builder->where('mode', $data['mode']);
            } else {
                $builder->where('mode', 'receive');
            }

            $status = isset($data['status']) ? (int)$data['status'] : 0;
            if ($status > 0) {
                $builder->where('status', '=', $status - 1);
            }
        };
		
		$this->listFormatOrder = function(&$builder, &$data, &$attributes) {
            $builder->orderBy('server_id', 'DESC')->orderBy('status', 'DESC')->orderBy('id', 'DESC');
        };
		
        return parent::lists($data);
    }

    protected function resetCache() {
        parent::resetCache();
        AdminRoleService::instance()->setCache();
    }

    public function soft($id, $action, $serverId) {
        if (!in_array($action, ['refresh', 'close'])) {
            return;
        }

        $bank = Bank::find($id);
        if ($bank->status == 0) {
            return;
        }

		if (UTC_TIME - $bank->soft_time < 60) {
            $this->throwException(['common.bank.soft_time', 60 + $bank->soft_time - UTC_TIME]);
        }
		
		if ($serverId > 0) {
			if (Bank::where('server_id', $serverId)->count() > 0) {
				$this->throwException('common.bank.server_use_bank');
			}
			
			if ($action == 'refresh') {
				Bank::where('id', $id)->update(['server_id' => $serverId]);
				$this->setCache();
				$bank = Bank::find($id);
			}
		}
		
		if (!$bank->server) {
            return;
        }

        $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
        if ($socket === false) {
            $this->throwException(['common.bank.create_socket_error', socket_strerror(socket_last_error())]);
        }
		
        if (socket_connect($socket, $bank->server->public_ip, 39898) === false) {
            $this->throwException(['common.bank.connect_socket_error', socket_strerror(socket_last_error($socket))]);
        }
		
		$in = "{$action}|{$bank->id}|{$bank->server->code}\r\n";
		socket_write($socket, $in, strlen($in));
        $out = socket_read($socket, 1024, PHP_NORMAL_READ);
        socket_close($socket);
		
		$out = trim($out);
		if ($out != 'Ok') {
			$this->throwException(['common.bank.connect_socket_error', $out]);
		}
		
		if ($action == 'close') {
			$bank->server_id = null;
		}
		$bank->soft_time = UTC_TIME;
        $bank->save();
		
		if ($action == 'close') {
			$this->setCache();
		}
    }
}