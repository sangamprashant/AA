import { createContext, ReactNode, useContext, useState } from "react";
import { DateFilter, DateRangeProps, Sort } from "../../types/leads";

interface LeadsProviderProps {
  children: ReactNode;
}

type RadioOptionsLeadsProps = "createdAt" | "updatedAt"

interface LeadsContextProps {
  sort: Sort;
  setSort: (val: Sort) => void;
  reload: boolean;
  handleReload: () => void;
  dateFilter: DateFilter;
  setDateFilter: (val: DateFilter) => void;
  customDateRange: DateRangeProps;
  setCustomDateRange: (val: DateRangeProps) => void;
  radioOptionsLeads: RadioOptionsLeadsProps;
  setRadioOptionsLeads: (val: RadioOptionsLeadsProps) => void
}

const LeadsContext = createContext<LeadsContextProps | undefined>(undefined);

const LeadsProvider = ({ children }: LeadsProviderProps) => {
  const [sort, setSort] = useState<Sort>("most-recent");
  const [dateFilter, setDateFilter] = useState<DateFilter>("today");
  const [customDateRange, setCustomDateRange] = useState<DateRangeProps>(null);
  const [reload, setReload] = useState<boolean>(false);
  const [radioOptionsLeads, setRadioOptionsLeads] = useState<RadioOptionsLeadsProps>("createdAt")

  const handleReload = () => {
    setReload((pre) => !pre);
  };

  return (
    <LeadsContext.Provider
      value={{
        sort,
        setSort,
        reload,
        handleReload,
        dateFilter,
        setDateFilter,
        customDateRange,
        setCustomDateRange,
        radioOptionsLeads,
        setRadioOptionsLeads
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
};

const useLeads = () => {
  const context = useContext(LeadsContext);
  if (context === undefined) {
    throw new Error("useLeads must be used within a LeadsProvider");
  }
  return context;
};

export { LeadsProvider, useLeads };
