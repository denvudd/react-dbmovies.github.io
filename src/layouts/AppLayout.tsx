import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import Layout  from "antd/es/layout/index";

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
