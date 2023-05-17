import React from 'react';

interface AdditionalSortMenuProps {
  onAdditionalSortChange: (additionalSortBy: string) => void;
}

const AdditionalSortMenu: React.FC<AdditionalSortMenuProps> = ({ onAdditionalSortChange }) => {
  const handleAdditionalSortChange = (key: string) => {
    const additionalSortBy = key;
    onAdditionalSortChange(additionalSortBy);
  };

  return (
    <div>
      
    </div>
  );
};

export default AdditionalSortMenu;