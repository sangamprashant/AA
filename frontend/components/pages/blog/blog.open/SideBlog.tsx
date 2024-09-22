"use client";
import { useAppContext } from '@/context/AppProvider'; // Ensure the path is correct
import Link from 'next/link';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SideBlog = () => {
    const { blogs, blogLoading, loadMoreBlogs, hasMoreBlog } = useAppContext();

    return (
        <div className='side-container-main mb-5 rounded-2 shadow'>
            <h3 className='theme-bg p-2 m-0'>Recent Blogs</h3>
            <div className='side-blog-container'>
                {blogLoading || blogs.length > 0 ? (
                    blogs.map((blog, index) => (
                        <div key={index} className='side-blog'>
                            <Link href={`/blog/${blog._id}`} className="d-flex gap-2 align-items-start">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    width={100}
                                    height="auto"
                                    className='object-fit-contain'
                                    loading='lazy'
                                />
                                <div>
                                    <h5 className='m-0'>{blog.title}</h5>
                                    <p className='m-0 text-muted description-trim'>{blog.description}</p>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className='text-muted'>No recent blogs available.</p>
                )}

                {blogLoading && <Skeleton count={3} height={100} style={{ marginBottom: 20 }} />}

                {hasMoreBlog && !blogLoading && (
                    <div className="text-end">
                        <button onClick={loadMoreBlogs} className="btn btn-sm theme-btn mt-3">
                            Load More Blogs
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SideBlog;
