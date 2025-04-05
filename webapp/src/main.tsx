import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "./routes/router.tsx";
import { QueryContext } from "./contexts/query-context.tsx";

import "./index.css";
import "react-datepicker/dist/react-datepicker.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryContext>
      <Router />
    </QueryContext>
  </StrictMode>
);
