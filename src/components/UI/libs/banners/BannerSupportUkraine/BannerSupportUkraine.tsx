import React from "react";

const BannerSupportUkraine = () => {
  return (
    <a
      className="support-ukraine"
      href="https://help.unicef.org/ukraine-emergency"
      target="_blank"
      rel="nofollow noopener"
      title="Donate to support Ukraine's independence."
    >
      <div
        className="support-ukraine__flag"
        role="img"
        aria-label="Flag of Ukraine"
      >
        <div className="support-ukraine__flag__blue"></div>
        <div className="support-ukraine__flag__yellow"></div>
      </div>
      <div className="support-ukraine__label">
        Donate to support Ukraine's independence.
      </div>
    </a>
  );
};

export default BannerSupportUkraine;
