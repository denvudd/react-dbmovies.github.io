import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import AppLayout from "@/layouts/AppLayout";

import { Provider } from "react-redux";
import store from "@/redux/store";

const App = ({ Component, ...rest }: AppProps) => {

  return (
    <Provider store={store}>
      <AppLayout>
        <Component {...rest.pageProps} />
      </AppLayout>
    </Provider>
  );
}

export default App;
