import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { dashboardTheme } from './dashboardTheme';
import { GoogleTagManager } from '@next/third-parties/google';
import { useEffect } from 'react';
import {ConfigProvider} from "antd";


export default function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'pageview',
                page: window.location.pathname
            });
        }
    }, []);
    return (
        <ConfigProvider>
            <Component {...pageProps} />
            <GoogleTagManager gtmId='GTM-5DD38WQJ' />
        </ConfigProvider>
    );
}
