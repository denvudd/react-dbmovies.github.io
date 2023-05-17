import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer";
import { Layout } from "antd";

interface Props {
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <Layout>
        <Header />
      {children}
        <Footer />
    </Layout>
  );
};

export default AppLayout;
