import App from "@/App";
import { DashboardPage } from "@/pages/dashboard";
import { LibraryBillsPage } from "@/pages/library-bills";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "bills",
        element: <LibraryBillsPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
