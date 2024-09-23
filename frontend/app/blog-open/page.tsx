"use client";
import Footer from '@/components/Footer';
import { RendeBlogOpen } from '@/components/pages';
import { useEffect, useState } from 'react';

export default function Page() {
    const [id, setId] = useState<string>("")

    useEffect(() => {
        if (window !== undefined) {
            window.scrollTo(0, 0)
            const classIdFromParams = getClassIdFromParams();
            setId(classIdFromParams);
        }
    }, [])

    const getClassIdFromParams = () => {
        let code = "";
        if (typeof window !== 'undefined') {
            const queryParams = new URLSearchParams(window.location.search);
            code = queryParams.get("code") || "";
        }
        return code;
    };

    if (!id) return null

    return <>
        <RendeBlogOpen id={id.toString()} />
        <Footer />
    </>;
}