import Document, { Html, Head, Main, NextScript } from "next/document"
import { ServerStyleSheet } from "styled-components"

interface Font {
    href: string
    type: string
}

const preloadedFonts: Font[] = [
    {
        href: "/assets/fonts/larken/Larken-Regular.woff2",
        type: "font/woff2",
    },
    {
        href: "/assets/fonts/larken/Larken-Medium.woff2",
        type: "font/woff2",
    },
    {
        href: "/assets/fonts/larken/Larken-Bold.woff2",
        type: "font/woff2",
    },
    {
        href: "/assets/fonts/gt-walsheim-pro/GTWalsheimPro-Regular.woff2",
        type: "font/woff2",
    },
    {
        href: "/assets/fonts/gt-walsheim-pro/GTWalsheimPro-Medium.woff2",
        type: "font/woff2",
    },
    {
        href: "/assets/fonts/gt-walsheim-pro/GTWalsheimPro-Bold.woff2",
        type: "font/woff2",
    },
]

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                })

            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        } finally {
            sheet.seal()
        }

        // const initialProps = await Document.getInitialProps(ctx)
        // return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    {preloadedFonts.map((font, index) => {
                        return (
                            <link
                                rel="preload"
                                href={font.href}
                                as="font"
                                type={font.type}
                                crossOrigin="anonymous"
                                key={`font-link-${index}`}
                            />
                        )
                    })}
                    <link
                        href="/assets/fonts/gt-walsheim-pro/stylesheet.css"
                        rel="stylesheet"
                        crossOrigin="anonymous"
                    />
                    <link
                        href="/assets/fonts/larken/stylesheet.css"
                        rel="stylesheet"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="shortcut icon"
                        type="image/x-icon"
                        href="/assets/favicons/favicon.ico"
                    />
                </Head>
                <body style={{ margin: 0 }}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
