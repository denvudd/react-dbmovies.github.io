import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppLayout from "@/layouts/AppLayout";
import { wrapper } from "@/redux/store";

export function App({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}

export default wrapper.withRedux(App);
