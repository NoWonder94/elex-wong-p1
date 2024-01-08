import log4js from "log4js";
import { adminService } from "./admin/service";

// https://www.npmjs.com/package/log4js
log4js.configure({
  appenders: {
    stdout: { type: 'stdout' },
    emails: {
      type: 'file',
      filename: adminService.isAdminProcess() ? 'logs/emails-admin.log' : 'logs/emails.log',
      compress: true
    }
  },
  categories: {
    default: {
      appenders: [
        'stdout',
        'emails'
      ],
      level: 'debug'
    }
  }
});

export const logger = log4js.getLogger('emails');
