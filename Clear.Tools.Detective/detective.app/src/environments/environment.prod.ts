import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  API_URL: 'http://localhost:3000',
  production: true,
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR
};
