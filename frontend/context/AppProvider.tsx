"use client";
import { BlogPost } from "@/blogs";
import { config } from "@/config";
import { FC, ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";

interface AuthContextType {
    paymentOpen: boolean;
    showPayment: () => void;
    closePayment: () => void;
    locked: boolean;
    handleLock: (v: boolean) => void;
    classesUnlocked: number[];
    setClassesUnlocked: (v: number[]) => void;
    blogs: BlogPost[];
    blogLoading: boolean;
    loadMoreBlogs: () => void;
    hasMoreBlog: boolean
}

const AppContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const AppProvider: FC<AuthProviderProps> = ({ children }) => {
    const [paymentOpen, setPaymentOpen] = useState(false);
    const [locked, setLocked] = useState(true);
    const [classesUnlocked, setClassesUnlocked] = useState<number[]>([]);
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [page, setPage] = useState(1);
    const [blogLoading, setBlogLoading] = useState(true);
    const [hasMoreBlog, setHasMoreBlog] = useState(true);
    const fetchingRef = useRef(false);


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

    const fetchBlogs = async (currentPage: number) => {
        if (fetchingRef.current || !hasMoreBlog) return;

        try {
            setBlogLoading(true);
            fetchingRef.current = true;

            const response = await fetch(`${config.SERVER}/blog?page=${currentPage}&limit=6`);
            const data = await response.json();

            if (data.success) {
                setBlogs((prevBlogs) => [...prevBlogs, ...data.blogs]);
                setHasMoreBlog(data.hasMore);
            }
        } catch (error) {
            console.error("Failed to fetch blogs:", error);
        } finally {
            setBlogLoading(false);
            fetchingRef.current = false;
        }
    };

    useEffect(() => {
        fetchBlogs(page);
    }, [page]);

    const loadMoreBlogs = () => {
        if (hasMoreBlog) {
            setPage((prevPage) => prevPage + 1);
        }
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
                blogs,
                blogLoading,
                loadMoreBlogs,
                hasMoreBlog,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};

export { AppContext, AppProvider };

