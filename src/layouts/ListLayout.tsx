import React from "react";
import { Layout } from "antd";

interface Props {
  children: {
    sidebar: React.ReactNode;
    mainContent: React.ReactNode;
  };
  siderTheme?: "light" | "dark";
}

const ListLayout: React.FC<Props> = ({ children, siderTheme = "dark" }) => {
  const { Content, Sider } = Layout;
  return (
    <Layout hasSider className="list-layout">
      <Sider theme={siderTheme} width={260}>{children.sidebar}</Sider>
      <Content style={{ minHeight: "100vh" }}>
        <div className="app-container">{children.mainContent}</div>
      </Content>
    </Layout>
  );
};

export default ListLayout;
