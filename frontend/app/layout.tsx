import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppProvider } from "@/context/AppProvider";
import { Navbar } from "@/components";
import "antd/dist/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./globals.css";
import FloatButtonComponent from "@/components/Reuse/FloatButton";
import { faLink } from "@fortawesome/free-solid-svg-icons";

// Add icons to the library
library.add(faLink);
library.add(fas);

// Load local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Updated metadata
export const metadata: Metadata = {
  title: "The A to Z Classes",
  description:
    "The A to Z Classes is a premier coaching institute offering comprehensive resources for Class 1-12, including expert faculty, personalized learning plans, and interactive study materials.",
  keywords:
    "coaching institute, educational resources, study materials, online classes, secure payments, personalized learning, Class 1-12, sample papers, exam preparation",
  openGraph: {
    title: "The A to Z Classes",
    description:
      "Join The A to Z Classes for expert coaching in Class 1-12 subjects, access a wide range of study materials, sample papers, and personalized support.",
    url: "https://theatozclasses.com",
    images: [
      {
        url: "/logo.png",
        alt: "The A to Z Classes Logo",
      },
    ],
    siteName: "The A to Z Classes",
  },
  icons: {
    icon: "/logo.png",
  },
  alternates: {
    canonical: "https://theatozclasses.com",
  },
  metadataBase: new URL("https://theatozclasses.com"), 
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "The A to Z Classes",
      "description":
        "A premier coaching institute offering comprehensive resources for Class 1-12, including expert faculty, personalized learning plans, interactive study materials, and sample papers.",
      "url": "https://theatozclasses.com",
      "logo": "/logo.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "HIG-A-373/ll Rajajipuram",
        "addressRegion": "Lucknow",
        "postalCode": "226017",
        "addressCountry": "India",
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "telephone": "+91 9454509368",
        "email": "connect@theatozclasses.com",
      },
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="main">
          <AppProvider>
            <Navbar />
            <div className="main-content">{children}</div>
            <FloatButtonComponent />
          </AppProvider>
        </div>
      </body>
    </html>
  );
}
