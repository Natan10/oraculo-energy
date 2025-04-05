import clsx from "clsx";
import { ChartNoAxesColumnIncreasing, FileText, Zap } from "lucide-react";
import { NavLink, Outlet } from "react-router";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <main className="min-h-svh h-full">
      <header className="border-b shadow-md">
        <nav className="h-[80px] px-4 md:px-0 w-full mx-auto container flex justify-between items-center ">
          <div className=" flex justify-between items-center">
            <div className="flex items-end gap-1 group">
              <h1 className="font-bold text-primary-black text-xl">
                OraculoEnergy
              </h1>
              <Zap color="#ffca3a" className="animate-pulse transition-all" />
            </div>
          </div>

          <ul className="flex gap-6">
            <li>
              <NavLink to="/dashboard">
                {({ isActive }) => (
                  <div className="flex items-center gap-1">
                    <span
                      className={clsx(
                        "text-sm font-medium flex items-center gap-1"
                      )}
                    >
                      Dashboard
                    </span>
                    <ChartNoAxesColumnIncreasing
                      size={16}
                      color={isActive ? "#02c39a" : "#000"}
                    />
                  </div>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/bills">
                {({ isActive }) => (
                  <div className="flex items-center gap-1">
                    <span
                      className={clsx(
                        "text-sm font-medium flex items-center gap-1"
                      )}
                    >
                      Tasks
                    </span>
                    <FileText size={16} color={isActive ? "#02c39a" : "#000"} />
                  </div>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <section className="container mx-auto px-4 md:px-0">
        <Outlet />
        <Toaster />
      </section>
    </main>
  );
}

export default App;
