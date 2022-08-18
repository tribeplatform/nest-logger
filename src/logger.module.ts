import { Module, Scope } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Logger, LoggerLevel } from "@tribeplatform/node-logger";
import { LOGGER_MODULE_PROVIDER, DEFAULT_CONTEXT } from "./constants";
import { LoggerService } from "./logger.service";

@Module({
  imports: [ConfigModule],
  providers: [
    LoggerService,
    {
      provide: LOGGER_MODULE_PROVIDER,
      useFactory: (config: ConfigService) =>
        new Logger({
          level: (process.env.LOGGER_LEVEL as LoggerLevel) || "info",
          pretty: process.env.LOGGER_PRETTY_PRINT
            ? process.env.LOGGER_PRETTY_PRINT === "true"
            : process.env.NODE_ENV === "production"
            ? false
            : true,
          context: DEFAULT_CONTEXT,
        }),
      inject: [ConfigService],
      scope: Scope.DEFAULT,
    },
  ],
  exports: [LoggerService],
})
export class LoggerModule {}
