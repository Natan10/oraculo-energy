import { ArrowBigUp, BatteryLow, Loader, Unplug } from "lucide-react";
import { useSearchParams } from "react-router";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";

import { Table } from "./components/table";
import { useGetUsers } from "./hooks/use-get-users";
import { useGetUserInformation } from "./hooks/use-get-user-information";
import { Separator } from "@/components/ui/separator";

import { Filters } from "./components/filters";
import { CustomMessage } from "@/components/message";
import { InfoContainer } from "./components/info-section-by-year";

export function LibraryBillsPage() {
  const [showButtonScrollUp, setShowButtonScrollUp] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { users, isLoading } = useGetUsers();

  const clientNumber = searchParams.get("cliente");
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const months = searchParams.getAll("month");

  const [startDebounce] = useDebounce(start, 1000);
  const [endDebounce] = useDebounce(end, 1000);
  const [monthDebounce] = useDebounce(months, 1000);

  const { userDataInformation, isLoading: isLoadingUserInfo } =
    useGetUserInformation({
      clientNumber,
      start: startDebounce,
      end: endDebounce,
      months: monthDebounce,
    });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const pageHeight = document.body.offsetHeight;

      if (scrollY > 300 && pageHeight > 1300) {
        setShowButtonScrollUp(true);
      } else {
        setShowButtonScrollUp(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative mt-8 pb-10">
      {isLoading && (
        <div className="flex items-center gap-3">
          <Unplug className="text-primary-green animate-pulse" size={20} />
          <p className="font-semibold">Carregando informações...</p>
        </div>
      )}

      {!isLoading && (
        <Table
          data={users || []}
          setClientNumber={(clientNumber) =>
            setSearchParams({ cliente: clientNumber })
          }
        />
      )}

      {/* User section */}
      {clientNumber && (
        <>
          <Separator className="my-6 h-1 w-full" />
          <div className="">
            <h1 className="text-2xl font-mono">
              Cliente <span className="font-bold">{clientNumber}</span>
            </h1>

            {/* filtros */}
            <div className="my-6">
              <Filters />
            </div>

            {!isLoadingUserInfo &&
              userDataInformation &&
              !Object.keys(userDataInformation).length && (
                <CustomMessage
                  title="Sem dados disponíveis para essa data. Selecione outro ano
                    para consultar mais dados."
                  icon={<BatteryLow className="text-red-500" size={18} />}
                />
              )}

            {isLoadingUserInfo && (
              <CustomMessage
                title="Aguarde enquanto carregamos às informações do cliente."
                icon={<Loader size={18} className="animate-spin" />}
              />
            )}

            {userDataInformation &&
              Object.keys(userDataInformation).length > 0 && (
                <div className="mt-3">
                  <p className="mb-1 text-sm font-semibold font-mono">
                    Informações referentes as faturas do cliente.
                  </p>
                  <InfoContainer value={userDataInformation} />
                </div>
              )}
          </div>
        </>
      )}

      {showButtonScrollUp && (
        <button
          onClick={scrollToTop}
          className="fixed right-5 bottom-10 cursor-pointer rounded-full bg-primary-green hover:bg-primary-green/90 flex items-center justify-center border-none p-1 md:p-2"
        >
          <ArrowBigUp color="white" size={18} />
        </button>
      )}
    </section>
  );
}
