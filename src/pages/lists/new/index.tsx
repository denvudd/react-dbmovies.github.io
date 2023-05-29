import DetailLayout from "@/layouts/DetailsLayout";
import React from "react";
import { Steps } from "antd";
import ListNewBlock from "@/components/ListNewBlock/ListNewBlock";

const ListNewPage: React.FC = () => {
  return (
    <DetailLayout>
      <div className="app-container">
        <ListNewBlock/>
      </div>
    </DetailLayout>
  );
};

export default ListNewPage;
