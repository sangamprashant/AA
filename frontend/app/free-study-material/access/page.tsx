"use client";
import { Suspense, lazy } from 'react';
const ContentOpen = lazy(() => import('@/components//Home/Content/ContentOpen'));

const Page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ContentOpen />
        </Suspense>
    );
};

export default Page;
