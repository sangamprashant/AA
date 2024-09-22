
const ImportantLink = () => {
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
        <div className='side-container-main rounded-2 shadow'>
            <h3 className='theme-bg p-2 m-0'>Important Links</h3>
            <div className="side-blog-container p-2">
                <p className="m-0">
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
        </div>
    )
}

export default ImportantLink