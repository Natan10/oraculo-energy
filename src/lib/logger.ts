import { pino } from "pino";

const logger = pino({
  level: "debug",
  timestamp: pino.stdTimeFunctions.isoTime,
});

export { logger };
