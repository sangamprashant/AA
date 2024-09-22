import { BlogPost } from '@/blogs'
import React from 'react'

interface BlogSsrProps {
    blog: BlogPost
}

const BlogSsr = ({ blog }: BlogSsrProps) => {
    return (
        <>
            <h3>{blog.title}</h3>
            <div className="horizontal-line mb-3" />
            <p>{blog.description}</p>
            <div className="d-flex justify-content-center">
                <img src={blog.image} alt={blog.title} style={{ width: "100%", height: "auto", maxWidth: "600px" }} loading='lazy' />
            </div>
            <div dangerouslySetInnerHTML={{ __html: blog?.content || "" }} />
        </>
    )
}

export default BlogSsr