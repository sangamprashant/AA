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

// Enhanced metadata for better SEO
export const metadata: Metadata = {
  title: "The A to Z Classes",
  description:
    "The A to Z Classes is a leading educational platform providing expert coaching for students in Class 1-12 across CBSE, ICSE, and State Boards. Our comprehensive learning system offers personalized study plans tailored to individual student needs, access to a wide variety of interactive study materials, sample papers, mock tests, and in-depth subject coaching. With a focus on academic excellence, our experienced faculty provides guidance across core subjects like Mathematics, Science, English, Social Studies, and more. Whether preparing for board exams, competitive tests, or improving overall academic performance, students benefit from customized learning solutions designed to enhance their strengths and address their weaknesses. The A to Z Classes also offers live online classes, on-demand resources, homework help, and career guidance to ensure students are fully equipped to succeed in their educational journey.",
  keywords:
    "coaching institute, educational resources, study materials, online classes, Class 1-12 coaching, sample papers, exam preparation, learning plans, competitive exams, CBSE, ICSE, State Boards, Class 1 coaching, Class 12 board exam preparation, mock tests, interactive learning, online tutoring, personalized learning, homework help, school subjects, academic success, revision notes, online quizzes, subject-wise coaching, board exam tips, science coaching, math coaching, English coaching, social studies coaching, physics coaching, chemistry coaching, biology coaching, competitive exam prep, career guidance, test series, scholarship exams, online mock exams, free study materials, board exam strategies, after-school coaching, academic improvement, educational platform, e-learning, live classes, student mentorship, academic guidance, extra classes",
  openGraph: {
    title: "The A to Z Classes - Premier Coaching Institute for Class 1-12",
    description:
      "Join The A to Z Classes, a premier educational platform offering top-quality coaching and extensive resources for students in Class 1-12. Our programs are designed to provide comprehensive academic support, including personalized learning plans, interactive study materials, and expert guidance across subjects like Mathematics, Science, English, and Social Studies. We specialize in preparing students for success in CBSE, ICSE, and State Board exams with targeted study plans, sample papers, and mock tests that simulate real exam conditions. Whether you're striving for top marks in board exams, preparing for competitive entrance tests, or seeking to strengthen your understanding of key concepts, The A to Z Classes has the tools and resources to help you excel. Benefit from live online classes, recorded lectures, and continuous performance tracking to stay on top of your learning journey. Our experienced faculty is committed to providing one-on-one support and tailored strategies to help each student achieve their full academic potential with ease.",
    url: "https://theatozclasses.com",
    images: [
      {
        url: "/logo.png",
        alt: "The A to Z Classes Logo",
      },
    ],
    siteName: "The A to Z Classes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The A to Z Classes - Coaching for Class 1-12",
    description:
      "Achieve academic success with The A to Z Classes. We offer expert coaching for Class 1-12 with personalized plans and comprehensive study materials.",
    images: ["/logo.png"],
    site: "@theatozclasses", // Update with your actual Twitter handle
  },
  icons: {
    icon: "/favicon.ico", // Ensure you have a favicon file at public/favicon.ico
    shortcut: "/favicon.ico",
    apple: "/logo-crop.png", // For Apple touch devices
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
      description:
        "A premier coaching institute offering top resources for students in Class 1-12, including personalized learning, interactive study materials, and cutting-edge exam preparation tools. At The A to Z Classes, students benefit from expert faculty who specialize in a wide range of subjects, such as Mathematics, Science, English, and Social Studies. Our unique approach combines engaging online lectures, comprehensive practice materials, and personalized learning plans tailored to each student's needs. In addition to regular academic support, we offer specialized resources for CBSE, ICSE, and State Board exam preparation, complete with sample papers, mock tests, and real-time performance tracking. With our interactive tools, students can monitor their progress, identify areas for improvement, and receive instant feedback from our experienced instructors. Whether you’re aiming for top scores in school exams or preparing for competitive entrance exams, The A to Z Classes equips students with the skills, confidence, and knowledge needed to succeed.",
      "url": "https://theatozclasses.com",
      "logo": "/logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "HIG-A-373/ll Rajajipuram",
        "addressLocality": "Lucknow",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "226017",
        "addressCountry": "IN",
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "telephone": "+91 9454509368",
        "email": "connect@theatozclasses.com",
      },
      "sameAs": [
        "https://www.facebook.com/people/Theatoz-Classes/61560106029558/?mibextid=ZbWKwL",
        "https://www.instagram.com/theatozclasses",
        "https://x.com/theatozclasses",
        "https://www.linkedin.com/company/theatozclasses/",
        "https://www.youtube.com/@theatozclasses"
      ],
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
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo-32.jpg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo-16.jpg" />
        <link rel="apple-touch-icon" href="/logo-crop.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
       
        <meta
          name="description"
          content="The A to Z Classes provides expert coaching and comprehensive resources for students in Class 1-12, designed to help them achieve academic excellence. Join us to access a wide range of interactive study materials, personalized learning plans, and in-depth exam preparation tools. Our coaching covers all major boards, including CBSE, ICSE, and State Boards, ensuring students receive the support they need to excel in their studies and competitive exams. With experienced faculty, regular assessments, and engaging online classes, we provide the ideal learning environment for students to thrive."
        />
        <meta
          name="keywords"
          content="coaching institute, Class 1-12 education, exam preparation, study materials, personalized learning, CBSE, ICSE, State Board, sample papers, online classes, academic excellence, competitive exams, mock tests, interactive study tools, experienced faculty, learning resources"
        />
        <meta
          name="author"
          content="The A to Z Classes"
        />
        <meta
          property="og:image"
          content="/logo.png"
        />
        <meta
          property="og:type"
          content="website"
        />
        <meta
          property="og:title"
          content="The A to Z Classes - Expert Coaching for Class 1-12"
        />
        <meta
          property="og:description"
          content="Join The A to Z Classes for top-quality coaching and a comprehensive range of study materials designed to help students excel. We offer personalized learning plans, expert support from experienced faculty, and resources tailored for Class 1-12 students preparing for CBSE, ICSE, and State Board exams. With interactive study tools, mock tests, and flexible online classes, we empower students to achieve academic success."
        />
        <meta
          name="twitter:card"
          content="summary_large_image"
        />
        <meta
          name="twitter:title"
          content="The A to Z Classes"
        />
        <meta
          name="twitter:description"
          content="Achieve academic success with The A to Z Classes. Our expert coaching for Class 1-12 includes personalized learning plans, interactive study materials, and exam preparation resources. Whether you're preparing for CBSE, ICSE, or State Board exams, we provide the tools and support needed to excel in your studies. Join our online classes for flexible, tailored learning experiences."
        />
        <meta
          name="twitter:image"
          content="/logo.png"
        />
      </head>
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
