import React from "react";
import Layout  from "antd/es/layout/index";
interface Props {
  children: React.ReactNode;
}

const DetailLayout: React.FC<Props> = ({ children }) => {
  const { Content } = Layout;
  return (
      <Layout>
        <Content style={{minHeight: "100vh"}}>
          <div className="detail-container">{children}</div>
        </Content>
      </Layout>
  );
};

export default DetailLayout;