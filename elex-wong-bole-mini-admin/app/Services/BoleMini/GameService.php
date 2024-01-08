<?php
    namespace App\Services\BoleMini;
    use App\Models\BoleMini\Game;
    use Illuminate\Support\Facades\DB;
    use Cache;

    class GameService extends BaseService {
        public function getDetail($id) {
            $list = Game::dbTable()
                    ->select('chinese', 'english', 'korean')
                    ->where('id', $id)
                    ->get()
                    ->first();

            return $list;
        }

        public function createData(array $data = [], $fileChinese, $fileEnglish, $fileKorean) {
            try {
                DB::connection()->beginTransaction();

                $dbData['game_category_id'] = $data['game_category_id'];
                $dbData['icon'] = $this->saveImg($data['icon'], 'upload_game_icon_location');
                $dbData['img'] = $this->saveImg($data['img'], 'upload_game_img_location');
                $dbData['game_url'] = $data['game_url'];
                $dbData['online_date'] = $data['online_date'];
                $dbData['max_win'] = $data['max_win'];
                $dbData['screenshot'] = (isset($data['screenshot']) && !empty($data['screenshot'])) ? json_encode($data['screenshot']) : null;
                $dbData['chinese']['title'] = $data['chinese']['title'];
                $dbData['chinese']['language'] = !empty($data['chinese']['language']) ? $data['chinese']['language'] : null;
                $dbData['chinese']['summary'] = $data['chinese']['summary'];
                $dbData['chinese']['description'] = $data['chinese']['description'];
                $dbData['chinese']['file'] = $this->saveFile($fileChinese, 'upload_game_file_location');
                $dbData['english']['title'] = $data['english']['title'];
                $dbData['english']['language'] = !empty($data['english']['language']) ? $data['english']['language'] : null;
                $dbData['english']['summary'] = $data['english']['summary'];
                $dbData['english']['description'] = $data['english']['description'];
                $dbData['english']['file'] = $this->saveFile($fileEnglish, 'upload_game_file_location');
                $dbData['korean']['title'] = $data['korean']['title'];
                $dbData['korean']['language'] = !empty($data['korean']['language']) ? $data['korean']['language'] : null;
                $dbData['korean']['summary'] = $data['korean']['summary'];
                $dbData['korean']['description'] = $data['korean']['description'];
                $dbData['korean']['file'] = $this->saveFile($fileKorean, 'upload_game_file_location');
                $dbData['chinese'] = json_encode($dbData['chinese']);
                $dbData['english'] = json_encode($dbData['english']);
                $dbData['korean'] = json_encode($dbData['korean']);
                $dbData['sort'] = $data['sort'];
                $dbData['status'] = $data['status'];
                $dbData['date_create'] = time();
                $dbData['date_update'] = time();

                $game = new Game();
                $game->create($dbData);

                Cache::forget('cache_data_game');

                DB::connection()->commit();
            } catch(\Exception $e) { 
                DB::connection()->rollback();
                throw $e;
            }

            return true;
        }

        public function updateData(array $data = [], $fileChinese, $fileEnglish, $fileKorean) {
            try {
                DB::connection()->beginTransaction();

                $id = $data['id'];

                $game = Game::dbTable()
                        ->where('id', $id)
                        ->first();

                $dbData['game_category_id'] = $data['game_category_id'];
                $dbData['icon'] = (!empty($data['icon']) && preg_match('/^data:image\/(\w+);base64,/', $data['icon'])) ? $this->saveImg($data['icon'], 'upload_game_icon_location') : $game['icon'];
                $dbData['img'] = (!empty($data['img']) && preg_match('/^data:image\/(\w+);base64,/', $data['img'])) ? $this->saveImg($data['img'], 'upload_game_img_location') : $game['img'];
                $dbData['game_url'] = $data['game_url'];
                $dbData['online_date'] = $data['online_date'];
                $dbData['max_win'] = $data['max_win'];
                $dbData['screenshot'] = (isset($data['screenshot']) && !empty($data['screenshot'])) ? json_encode($data['screenshot']) : null;
                $dbData['chinese']['title'] = $data['chinese']['title'];
                $dbData['chinese']['language'] = !empty($data['chinese']['language']) ? $data['chinese']['language'] : null;
                $dbData['chinese']['summary'] = $data['chinese']['summary'];
                $dbData['chinese']['description'] = $data['chinese']['description'];
                $dbData['chinese']['file'] = !empty($fileChinese) ? $this->saveFile($fileChinese, 'upload_game_file_location') : json_decode($game['chinese'])->file;
                $dbData['english']['title'] = $data['english']['title'];
                $dbData['english']['language'] = !empty($data['english']['language']) ? $data['english']['language'] : null;
                $dbData['english']['summary'] = $data['english']['summary'];
                $dbData['english']['description'] = $data['english']['description'];
                $dbData['english']['file'] = !empty($fileEnglish) ? $this->saveFile($fileEnglish, 'upload_game_file_location') : json_decode($game['english'])->file;
                $dbData['korean']['title'] = $data['korean']['title'];
                $dbData['korean']['language'] = !empty($data['korean']['language']) ? $data['korean']['language'] : null;
                $dbData['korean']['summary'] = $data['korean']['summary'];
                $dbData['korean']['description'] = $data['korean']['description'];
                $dbData['korean']['file'] = !empty($fileKorean) ? $this->saveFile($fileKorean, 'upload_game_file_location') : json_decode($game['korean'])->file;
                $dbData['chinese'] = json_encode($dbData['chinese']);
                $dbData['english'] = json_encode($dbData['english']);
                $dbData['korean'] = json_encode($dbData['korean']);
                $dbData['sort'] = $data['sort'];
                $dbData['status'] = $data['status'];
                $dbData['date_update'] = time();

                $game = new Game();
                $game->update($id, $dbData);

                Cache::forget('cache_data_game');

                DB::connection()->commit();
            } catch(\Exception $e) { 
                DB::connection()->rollback();
                throw $e;
            }

            return true;
        }

        public function deleteData(int $id) {
            try {
                DB::connection()->beginTransaction();

                $game = new Game();
                $game->delete($id);

                Cache::forget('cache_data_game');

                DB::connection()->commit();
            } catch(\Exception $e) { 
                DB::connection()->rollback();
                throw $e;
            }

            return true;
        }
    }
?>