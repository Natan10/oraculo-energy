import { runApplication } from "./application/infra/http/http-server.js";

const PORT = process.env.PORT || 3000;

await runApplication(+PORT);
