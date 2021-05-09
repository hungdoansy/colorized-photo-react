import React, { useState } from "react";
import axios from "axios";
import { useHookstate } from "@hookstate/core";
import classNames from "classnames";
import { Button, Loader } from "@ahaui/react";
import styled from "styled-components";

import linksColorizationStore, {
  selectAllPhoto,
  unselectAllPhoto,
  getSelectedPhotos,
  updateColorizedPhotos,
} from "components/LinksColorization/store";
import config from "envConfig";
import { CustomButtonCSS } from "utils/style";

const Header = ({ className }) => {
  const linksColorizationState = useHookstate(linksColorizationStore).get();
  const [loading, setLoading] = useState(false);

  const numberOfSelectedPhotos = linksColorizationState.ids.reduce((sum, id) => {
    return (
      sum + !!(linksColorizationState.photoById[id].selected && !linksColorizationState.photoById[id].colorizedUrl)
    );
  }, 0);

  const handleColorizeSelectedPhotos = () => {
    if (loading || numberOfSelectedPhotos === 0) {
      return;
    }

    const selectedPhotos = getSelectedPhotos();

    setLoading(true);
    axios
      .post(`${config.apiUrl}/colorize`, selectedPhotos, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const colorizedPhotos = res.data;
        updateColorizedPhotos(colorizedPhotos);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  return (
    <div
      className={classNames(className, "u-widthFull sticky-header u-paddingVerticalExtraSmall u-paddingTopMedium")}
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
        <Button
          size="small"
          variant="primary_outline"
          onClick={selectAllPhoto}
          disabled={loading}
          className="custom-button u-text300"
        >
          Select All
        </Button>

        <Button
          size="small"
          variant="primary_outline"
          onClick={unselectAllPhoto}
          disabled={loading}
          className="custom-button u-text300"
        >
          Unselect All
        </Button>

        <Button
          size="small"
          variant="primary_outline"
          onClick={handleColorizeSelectedPhotos}
          disabled={loading}
          className="custom-button u-text300"
        >
          Colorize Selected (<span>{numberOfSelectedPhotos}</span>)
        </Button>

        {loading && (
          <div className="u-flex u-justifyContentCenter u-alignItemsCenter">
            <Loader size="small" className="u-textNeutral50 u-marginHorizontalExtraSmall" />;
          </div>
        )}
      </div>
    </div>
  );
};

export default styled(Header)`
  ${CustomButtonCSS}
`;
