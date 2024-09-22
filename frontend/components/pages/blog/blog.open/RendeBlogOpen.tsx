"use client";
import React, { useEffect, useState } from 'react';
import { config } from "@/config";
import { BlogPost } from '@/blogs';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Section from '@/components/Reuse/Section';
import BlogSsr from './BlogSsr';
import ImportantLink from '../ImportantLink';
import SideBlog from './SideBlog';

interface RendeBlogOpenProps {
    id: string;
}

const RendeBlogOpen = ({ id }: RendeBlogOpenProps) => {
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`${config.SERVER}/blog/${id}`);
                const data = await response.json();

                if (data.success) {
                    setBlog(data.blog);
                } else {
                    setError("Blog not found.");
                }
            } catch (err) {
                setError("Failed to fetch blog.");
                console.error("Error fetching blog:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    return (
        <Section>
            <div className="row m-0 pt-4">
                <div className="col-md-8">
                    {loading ? (
                        <div>
                            <Skeleton height={40} width="100%" style={{ marginBottom: 20 }} />
                            <Skeleton height={200} style={{ marginBottom: 20 }} />
                            <Skeleton count={3} style={{ marginBottom: 20 }} />
                        </div>
                    ) : (
                        <>
                            {blog ? (
                                <BlogSsr blog={blog} />
                            ) : (
                                <div className="no-content-skeleton">
                                    <Skeleton height={40} width="100%" style={{ marginBottom: 10 }} />
                                    <Skeleton height={150} style={{ marginBottom: 10 }} />
                                    <Skeleton count={2} style={{ marginBottom: 10 }} />
                                    <p style={{ textAlign: 'center', color: '#666' }}>
                                        {error || "No blog content available."}
                                    </p>
                                    <Skeleton count={2} style={{ marginBottom: 10 }} />
                                </div>
                            )}
                        </>
                    )}
                </div>
                <div className="col-md-4">
                    <SideBlog />
                    <ImportantLink />
                </div>
            </div>
        </Section>
    );
};

export default RendeBlogOpen;
