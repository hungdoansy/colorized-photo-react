import React from "react";
import axios from "axios";

import linksColorizationStore, {
  selectAllPhoto,
  unselectAllPhoto,
  getSelectedPhotos,
  updateColorizedPhotos,
} from "components/LinksColorization/store";
import { useHookstate } from "@hookstate/core";

const endpoint = "http://localhost:9001";

const Header = () => {
  const linksColorizationState = useHookstate(linksColorizationStore).get();
  const numberOfSelectedPhotos = linksColorizationState.ids.reduce((sum, id) => {
    return (
      sum + !!(linksColorizationState.photoById[id].selected && !linksColorizationState.photoById[id].colorizedUrl)
    );
  }, 0);

  const handleColorizeSelectedPhotos = () => {
    const selectedPhotos = getSelectedPhotos();

    axios
      .post(`${endpoint}/colorize`, selectedPhotos, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const colorizedPhotos = res.data;
        updateColorizedPhotos(colorizedPhotos);
      });
  };

  return (
    <div
      className="u-widthFull sticky-header u-paddingVerticalExtraSmall u-paddingTopMedium"
      style={{
        background: "#2c3e50",
        height: 110,
      }}
    >
      <p className="u-widthFull u-textWhite u-text600 u-fontMedium u-marginBottomExtraSmall">Origin photos</p>
      <div
        className="u-flex"
        style={{
          columnGap: 8,
        }}
      >
        <div onClick={() => selectAllPhoto()} className="custom-button u-roundedMedium">
          Select All
        </div>

        <div onClick={() => unselectAllPhoto()} className="custom-button u-roundedMedium">
          Unselect All
        </div>

        <div onClick={handleColorizeSelectedPhotos} className="custom-button u-roundedMedium">
          Colorize Selected (<span>{numberOfSelectedPhotos}</span>)
        </div>
      </div>
    </div>
  );
};

export default Header;
