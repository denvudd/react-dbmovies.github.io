import type { AppProps } from "next/app";
import AppLayout from "@/layouts/AppLayout";
import { wrapper } from "@/redux/store";
import { Provider } from "react-redux";

import "@/styles/globals.scss";

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <AppLayout>
        <Component {...props.pageProps} />
      </AppLayout>
    </Provider>
  );
}

export default App;
