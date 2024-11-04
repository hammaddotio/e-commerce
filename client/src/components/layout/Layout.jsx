import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, content, keywords, author }) => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={content} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{title}</title>
            </Helmet>

            <div className="text-secondary-100 bg-primary-100 min-h-[100vh] max-w-[100%] select-none">
                <Toaster />
                <Header />
                <main className="min-h-[90vh] bg-primary-200">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
};

Layout.defaultProps = {
    title: "Shopping App",
    author: "Mady",
    content: "MERN Stack Single Page Web Application",
    keywords: "shopping shop ecommerce shoes buy payment",
};

export default Layout;
