import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { dashboardTheme } from './dashboardTheme';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={dashboardTheme}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
