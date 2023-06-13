import React from "react";
import Layout  from "antd/es/layout/index";
interface Props {
  children: {
    sidebar: React.ReactNode;
    mainContent: React.ReactNode;
  };
}

const ListLayout: React.FC<Props> = ({ children }) => {
  const { Content, Sider } = Layout;
  return (
    <Layout hasSider>
      <Sider width={260}>{children.sidebar}</Sider>
      <Content style={{ minHeight: "100vh" }}>
        <div className="app-container">{children.mainContent}</div>
      </Content>
    </Layout>
  );
};

export default ListLayout;
