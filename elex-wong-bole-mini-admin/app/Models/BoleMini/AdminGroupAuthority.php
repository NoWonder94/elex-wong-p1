<?php
	namespace App\Models\BoleMini;

	class AdminGroupAuthority extends Model {
		const TABLENAME = 'admin_group_authority';

		public function create(array $data = []) {
			return self::dbTable()
							->insertGetId($data);
		}
		
		public function update(int $id, array $data = []) {
			return self::dbTable()
							->where('id', $id)
							->update($data);
		}

		public function delete(int $id) {
			return self::dbTable()
							->where('id', $id)
							->delete();
		}

		public function deleteByGroupId(int $id) {
			return self::dbTable()
							->where('admin_group_id', $id)
							->delete();
		}
	}
?>