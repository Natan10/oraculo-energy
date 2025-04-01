import express from "express";
import cors from "cors";

/* 
TODO: Config inicial ✅
TODO: Config Prisma
TODO: Config Docker

TODO: Business Rules
  - Ler Arquivos
  - Ler PDF
  - Extrair Info
  - Criar Classes

TODO: Refact do codigo
*/

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/hello", (_, res) => {
  return res.json({ message: "hello" });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
