import {
  Inject,
  Injectable,
  LoggerService as NestLoggerService,
  Scope,
} from "@nestjs/common";
import { DEFAULT_CONTEXT, LOGGER_MODULE_PROVIDER } from "./constants";
import { Logger, LoggerLevel } from "@tribeplatform/node-logger";

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService implements NestLoggerService {
  static _logger: Logger;

  constructor(
    @Inject(LOGGER_MODULE_PROVIDER)
    private readonly logger: Logger = LoggerService.createLogger(
      DEFAULT_CONTEXT
    )
  ) {}

  setContext(context: string) {
    this.logger.setContext(context);
  }

  static getLogger(): Logger {
    LoggerService._logger =
      LoggerService._logger || LoggerService.createLogger();
    return LoggerService._logger;
  }

  static createLogger(context: string = DEFAULT_CONTEXT) {
    return new Logger({
      level: (process.env.LOGGER_LEVEL as LoggerLevel) || "info",
      pretty: process.env.LOGGER_PRETTY_PRINT
        ? process.env.LOGGER_PRETTY_PRINT === "true"
        : process.env.NODE_ENV === "production"
        ? false
        : true,
      context,
    });
  }

  static debug(message: any, ...meta: any[]): void {
    this.getLogger().debug(message, ...meta);
  }

  static verbose(message: any, ...meta: any[]): void {
    this.getLogger().verbose(message, ...meta);
  }

  static log(message: any, ...meta: any[]): void {
    this.getLogger().log(message, ...meta);
  }

  static warn(message: any, ...meta: any[]): void {
    this.getLogger().warn(message, ...meta);
  }

  static error(message: any, ...meta: any[]): void {
    this.getLogger().error(message, ...meta);
  }

  verbose(message: any, ...meta: any[]): void {
    this.logger.verbose(message, ...meta);
  }

  debug(message: any, ...meta: any[]): void {
    this.logger.debug(message, ...meta);
  }

  log(message: any, ...meta: any[]): void {
    this.logger.log(message, ...meta);
  }

  warn(message: any, ...meta: any[]): void {
    this.logger.warn(message, ...meta);
  }

  error(message: any, ...meta: any[]): void {
    this.logger.error(message, ...meta);
  }
}
