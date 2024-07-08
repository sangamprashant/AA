import { FC, ReactNode, createContext, useState } from "react";

interface AuthContextType {
  paymentOpen: boolean;
  showPayment: () => void;
  closePayment: () => void;
}

const AppContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AppProvider: FC<AuthProviderProps> = ({ children }) => {
  const [paymentOpen, setPaymentOpen] = useState(false);

  const showPayment = () => {
    setPaymentOpen(true);
  };

  const closePayment = () => {
    setPaymentOpen(false);
  };
  return (
    <AppContext.Provider value={{ paymentOpen, closePayment, showPayment }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
