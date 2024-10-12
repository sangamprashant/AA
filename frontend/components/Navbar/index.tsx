"use client"
import { navbarImg } from "@/assets/links";
import { email, phone } from "@/strings";
import Image from "next/image";
import Link from "next/link";
import NextTopLoader from 'nextjs-toploader';
import { useState } from "react";

const Navbar = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavItemClick = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 992) {
                setIsNavCollapsed(true);
            }
        }
    };


    const handleToggleClick = () => {
        setIsNavCollapsed(!isNavCollapsed);
    };

    const navItemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <>
            <nav
                className="navbar navbar-expand-lg position-fixed w-100 sticky-top backdrop-nav no-print m-0"
                data-navbar-on-scroll="data-navbar-on-scroll"
            >
                <div className="container">
                    <Link className="navbar-brand" href="/">
                        <img
                            src={`${navbarImg["logo"]}?cache-control=max-age=31536000`}
                            height="60"
                            alt="logo"
                        />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        aria-controls="navbarSupportedContent"
                        aria-expanded={!isNavCollapsed}
                        aria-label="Toggle navigation"
                        onClick={handleToggleClick}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className={`collapse navbar-collapse mt-4 mt-lg-0 ${isNavCollapsed ? "" : "show"
                            }`}
                    >
                        <ul className="navbar-nav ms-auto gap-2 align-items-center justify-content-start">
                            <li
                                className="nav-item"
                                key="free demo"
                            >
                                <Link
                                    className="rainbow-text-nav"
                                    href="/free-demo-class"
                                    onClick={handleNavItemClick}
                                >
                                    <Image src={`${navbarImg["megaphone"]}?cache-control=max-age=31536000`} alt="" height={20} width={20} /> {" "}
                                    <b>Book A Free Demo Class</b>
                                </Link>
                            </li>
                            <li
                                className="nav-item"
                                key="about-us"
                            >
                                <Link
                                    className="nav-link"
                                    href="/free-study-material"
                                    onClick={handleNavItemClick}
                                >
                                    Free Study Materials
                                </Link>
                            </li>
                            <li
                                className="nav-item"
                                key="about-us"
                            >
                                <Link
                                    className="nav-link"
                                    href="/about-us"
                                    onClick={handleNavItemClick}
                                >
                                    About Us
                                </Link>
                            </li>
                            <li
                                className="nav-item"
                            >
                                <Link
                                    href="/contact-us"
                                    className="nav-link"
                                    onClick={handleNavItemClick}
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li
                                className="nav-item"
                            >
                                <Link
                                    href="/blog"
                                    className="nav-link"
                                    onClick={handleNavItemClick}
                                >
                                    Our Blogs
                                </Link>
                            </li>

                            <li
                                className="nav-item"
                                key="mobile number"
                            >
                                <Link
                                    className="nav-link btn theme-btn btn-sm"
                                    href={`tel:+91${phone}`}
                                    onClick={handleNavItemClick}
                                >
                                    +91 {phone}
                                </Link>
                            </li>
                            <li
                                className="nav-item"
                                key="Email"
                            >
                                <Link
                                    className="nav-link btn theme-btn btn-sm"
                                    href={`mailto:${email}`}
                                    onClick={handleNavItemClick}
                                >
                                    {email}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <NextTopLoader
                color="red"
                initialPosition={0.08}
                crawlSpeed={200}
                height={4}
                crawl={true}
                showSpinner={false}
                easing="ease"
                speed={100}
                shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                template='<div class="bar" role="bar"><div class="peg"></div></div> 
                     <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
                zIndex={1600}
                showAtBottom={false}
            />
        </>
    );
};

export default Navbar;
