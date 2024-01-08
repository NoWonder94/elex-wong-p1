import { ERROR } from '../../common';
import { LANGUAGE } from '../../../../sharing.base/languages';

/** 设置语言 */
export interface connector_clientHandler_c_setLanguage_Req {
  /** 语言 */
  lang: LANGUAGE;
}

export interface connector_clientHandler_c_setLanguage_Res {
  error: ERROR;
  /**
   * 选项定制
   * @TJS-type message
   */
  data?: any;
}
