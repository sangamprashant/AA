"use client"
import { FC, ReactNode, createContext, useEffect, useState } from "react";

// interface AccessUserProps {
//   email: string;
//   phone: string;
// }

interface AuthContextType {
    paymentOpen: boolean;
    showPayment: () => void;
    closePayment: () => void;
    locked: boolean;
    handleLock: () => void;
}

const AppContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const AppProvider: FC<AuthProviderProps> = ({ children }) => {
    const [paymentOpen, setPaymentOpen] = useState(false);
    const [locked, setLocked] = useState(true);
    // const [accessUser, setAccessUser] = useState<AccessUserProps | null>(null);

    useEffect(() => {
        handleLock();
    }, []);

    const handleLock = async () => {
        const initialData = await localStorage.getItem("access-content");
        if (initialData) {
            setLocked(false);
        } else {
            setLocked(true);
        }
    };

    const showPayment = () => {
        setPaymentOpen(true);
    };

    const closePayment = () => {
        setPaymentOpen(false);
    };
    return (
        <AppContext.Provider
            value={{ locked, handleLock, paymentOpen, closePayment, showPayment }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
