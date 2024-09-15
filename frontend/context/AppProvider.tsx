"use client";
import { FC, ReactNode, createContext, useEffect, useState } from "react";

interface AuthContextType {
    paymentOpen: boolean;
    showPayment: () => void;
    closePayment: () => void;
    locked: boolean;
    handleLock: (v: boolean) => void;
    classesUnlocked: number[];
    setClassesUnlocked: (v: number[]) => void;
}

const AppContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const AppProvider: FC<AuthProviderProps> = ({ children }) => {
    const [paymentOpen, setPaymentOpen] = useState(false);
    const [locked, setLocked] = useState(true);
    const [classesUnlocked, setClassesUnlocked] = useState<number[]>([]);

    useEffect(() => {
        const classes = JSON.parse(localStorage.getItem("access-classes") || "[]");
        setClassesUnlocked(classes);
    }, []);

    const handleLock = async (v: boolean) => {
        setLocked(v);
    };

    const showPayment = () => {
        setPaymentOpen(true);
    };

    const closePayment = () => {
        setPaymentOpen(false);
    };

    return (
        <AppContext.Provider
            value={{
                locked,
                handleLock,
                paymentOpen,
                closePayment,
                showPayment,
                classesUnlocked,
                setClassesUnlocked,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
