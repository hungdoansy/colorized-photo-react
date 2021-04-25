import React from "react";

const Header = () => {
  return (
    <div
      className="u-widthFull sticky-header u-paddingVerticalExtraSmall u-paddingTopMedium"
      style={{
        background: "#2c3e50",
        height: 110,
      }}
    >
      <p className="u-widthFull u-textWhite u-text600 u-fontMedium u-marginBottomExtraSmall">Colorized photos</p>
    </div>
  );
};

export default Header;
