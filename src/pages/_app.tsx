import type { AppProps } from "next/app";
import AppLayout from "@/layouts/AppLayout";
import store from "@/redux/store";
import { Provider } from "react-redux";

import "@/styles/globals.scss";
import { ConfigProvider } from "antd";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ConfigProvider theme={{ token: { colorBgLayout: "#fff" } }}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ConfigProvider>
    </Provider>
  );
};

export default App;
