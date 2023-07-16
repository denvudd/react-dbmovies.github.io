import React from "react";
import PersonListBlock from "@/components/blocks/person/PersonListBlock/PersonListBlock";
import DetailLayout from "@/layouts/DetailsLayout";

const PersonPopularPage: React.FC = () => {
  return (
    <div className="app-container panel-details">
      <DetailLayout>
        <PersonListBlock />
      </DetailLayout>
    </div>
  );
};

export default PersonPopularPage;
