import { ERROR } from '../../common';
import { PlayerStateInfo } from '../../../../sharing.base/constants/PlayerBaseConst';

export interface connector_clientHandler_c_getPlayerState_Req {
}

export interface connector_clientHandler_c_getPlayerState_Res_data extends PlayerStateInfo {
}

export interface connector_clientHandler_c_getPlayerState_Res {
  error: ERROR;
  data?: connector_clientHandler_c_getPlayerState_Res_data;
}
