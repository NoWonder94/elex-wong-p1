<?php
	namespace App\Models\BoleMini;

	class Game extends Model {
		const TABLENAME = 'game';

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
	}
?>