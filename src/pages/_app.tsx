import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppLayout from "@/layouts/AppLayout";
import { Provider } from "react-redux";
import store from "@/redux/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
  );
}
