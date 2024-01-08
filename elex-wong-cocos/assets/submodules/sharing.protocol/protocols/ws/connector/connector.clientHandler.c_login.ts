import { ERROR } from '../../common';
import { connector_clientHandler_c_getPlayerState_Res_data } from './connector.clientHandler.c_getPlayerState';

export interface connector_clientHandler_c_login_Req {
  /** 会话 */
  token: string;
}

export interface connector_clientHandler_c_login_Res_data {
  /**
   * 服务器版本
   */
  version: string;
  /**
   *玩家状态
   */
  player_state: connector_clientHandler_c_getPlayerState_Res_data;
}

export interface connector_clientHandler_c_login_Res {
  error: ERROR;
  data?: connector_clientHandler_c_login_Res_data;
}
