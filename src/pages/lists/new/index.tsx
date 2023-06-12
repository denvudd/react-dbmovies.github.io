import React from "react";

import DetailLayout from "@/layouts/DetailsLayout";
import ListNewBlock from "@/components/ListNewBlock/ListNewBlock";
import { withAuth } from "@/auth/withAuth";

const ListNewPage: React.FC = () => {
  return (
    <DetailLayout>
      <div className="app-container">
        <ListNewBlock />
      </div>
    </DetailLayout>
  );
};

export default withAuth(ListNewPage);
