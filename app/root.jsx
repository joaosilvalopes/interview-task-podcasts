import { Outlet, Scripts } from "@remix-run/react";
import { useState } from "react";

import Header from './components/Header';

import LoadingContext from "./context/LoadingContext";

const globalCss = `
    html {
        /* 62.5% of 16px browser font size is 10px (make 1 rem = 10px) */
        font-size: 62.5%;
        font-family: Arial, Helvetica, sans-serif;
    }

    * {
        box-sizing: border-box;
    }
`;

const Root = () => {
    const [loading, setLoading] = useState(true);

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Podcasts app" />
                <title>Podcasts</title>
                <link href=" https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css " rel="stylesheet" />
                <style>{globalCss}</style>
                {
                    typeof document === "undefined"
                    ? "__STYLES__"
                    : null
                }
            </head>
            <body>
                <div id="root">
                    <LoadingContext.Provider value={[loading, setLoading]}>
                        <Header />
                        <Outlet />
                    </LoadingContext.Provider>
                </div>
                <Scripts />
            </body>
        </html>
    );
}

export default Root;
