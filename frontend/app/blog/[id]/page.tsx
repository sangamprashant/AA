"use client";
import Footer from '@/components/Footer';
import { RendeBlogOpen } from '@/components/pages';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        if (window !== undefined) {
            window.scrollTo(0, 0)
        }
    }, [])

    if (!id) return null

    return <>
        <RendeBlogOpen id={id.toString()} />
        <Footer />
    </>;
}