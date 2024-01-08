import { sendSock } from "./socket";

let requestActLog = () => {
  sendSock(
    "cs_get_act_log",
    { act_type: 4, cur_has: 0 },
    null
  )
}
export default {
  requestActLog
}
