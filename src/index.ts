import { runApplication } from "./application/infra/http-server.js";

const PORT = process.env.PORT || 3000;
runApplication(Number(PORT));
