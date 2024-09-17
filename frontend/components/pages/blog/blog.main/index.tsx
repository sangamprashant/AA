import React from 'react';
import BlogHeader from '../bolg.header/BlogHeader';
import Section from '@/components/Reuse/Section';
import Footer from '@/components/Footer';
import Link from 'next/link';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const BlogMain = () => {
    // Array of blog data
    const blogs = [
        {
            id: 1,
            title: 'Blog Post Title 1 sdfg dfg dfgd fg dfgh er',
            summary: 'A quick summary of the blog content goes here. It\'s engaging and encourages users to read more.',
            image: '/chat.gif',
            link: '#'
        },
        {
            id: 2,
            title: 'Blog Post Title 2',
            summary: 'This is another engaging blog post summary that draws the reader in and offers insights.',
            image: '/chat.gif',
            link: '#'
        },
        {
            id: 2,
            title: 'Blog Post Title 2',
            summary: 'This is another engaging blog post summary that draws the reader in and offers insights.',
            image: '/chat.gif',
            link: '#'
        },
        {
            id: 2,
            title: 'Blog Post Title 2',
            summary: 'This is another engaging blog post summary that draws the reader in and offers insights.',
            image: '/chat.gif',
            link: '#'
        },
        {
            id: 2,
            title: 'Blog Post Title 2',
            summary: 'This is another engaging blog post summary that draws the reader in and offers insights.',
            image: '/chat.gif',
            link: '#'
        },
        {
            id: 2,
            title: 'Blog Post Title 2',
            summary: 'This is another engaging blog post summary that draws the reader in and offers insights.',
            image: '/chat.gif',
            link: '#'
        },
        // Add more blog posts as needed
    ];

    const importantLinks = [
        { id: 1, text: 'About Us', href: '/about-us' },
        { id: 2, text: 'Blog', href: '/blog' },
        { id: 3, text: 'Class', href: '/class' },
        { id: 4, text: 'Contact Us', href: '/contact-us' },
        { id: 7, text: 'JEE', href: '/jee' },
        { id: 8, text: 'NEET', href: '/neet' },
        { id: 9, text: 'Payment', href: '/pay' },
        { id: 10, text: 'Terms', href: '/terms' },
        { id: 5, text: 'Free Demo Class', href: '/free-demo-class' },
        { id: 6, text: 'Free Study Material', href: '/free-study-material' },
    ];


    return (
        <>
            <BlogHeader />
            <Section>
                <div className="row">
                    {/* Sidebar for Important Links */}
                    <div className="col-md-4 py-5 rounded">
                        <h2 className="theme-color mb-4">Important Links</h2>
                        <p>
                            Stay connected with our key resources and updates. Explore the latest blogs, guides, and announcements to stay ahead in your learning journey.
                        </p>
                        <ul className="list-unstyled mt-4">
                            {importantLinks.map(link => (
                                <li key={link.id}>
                                    <a href={link.href} className="text-decoration-none text-primary">{link.text}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Blog content */}
                    <div className="col-md-8 py-5">
                        <h2 className="mb-4">Latest Blogs</h2>
                        <div className="row">
                            {blogs.map(blog => (
                                <div className="col-md-4 mb-4" key={blog.id}>
                                    <div className="card shadow-sm border-0">
                                        <img src={blog.image} className="card-img-top"
                                            style={{
                                                aspectRatio: "1/1", objectFit: "cover"
                                            }}
                                            alt={blog.title}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-text" style={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                maxWidth: '100%'
                                            }}>{blog.title}</h5>
                                            <p className="card-text">{blog.summary}</p>
                                            <div className=' text-end mt-2'>
                                                <Link href={blog.link} className="btn theme-btn">Read More <NavigateNextIcon /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Section>
            <Footer />
        </>
    );
};

export default BlogMain;
