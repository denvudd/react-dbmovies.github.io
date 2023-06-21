import type { AppProps } from "next/app";
import AppLayout from "@/layouts/AppLayout";
import { wrapper } from "@/redux/store";
import { Provider } from "react-redux";

import "@/styles/globals.scss";
import { ConfigProvider } from "antd";

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <ConfigProvider theme={{ token: { colorBgLayout: "#fff" } }}>
        <AppLayout>
          <Component {...props.pageProps} />
        </AppLayout>
      </ConfigProvider>
    </Provider>
  );
};

export default App;
