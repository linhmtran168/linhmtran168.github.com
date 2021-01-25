import '../styles/globals.css';
import { AppProps } from 'next/app';
import { pageview } from '../libs/gtag';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();
  const handleRouteChange = (url: string): void => {
    pageview(url);
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  });

  return <Component {...pageProps} />;
}

export default MyApp;
