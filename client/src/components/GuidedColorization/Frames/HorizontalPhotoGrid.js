import React from "react";
import { useHookstate } from "@hookstate/core";
import styled from "styled-components";
import classNames from "classnames";

import guidedColorization from "../store";

const PhotoGrid = ({ className }) => {
  const frameIds = useHookstate(guidedColorization.frameIds).get();
  const frameById = useHookstate(guidedColorization.frameById).get();

  const frameUrls = frameIds.map((id) => frameById[id].objectUrl);

  return (
    <div className={classNames(className, "photo-grid", "u-flex u-justifyContentBetween u-flexWrap")}>
      {frameUrls.map((src, index) => (
        <div key={index} className="photo-cell">
          <img src={src} alt="dummy" className="photo" />
        </div>
      ))}

      <div className="photo-cell" />
    </div>
  );
};

export default styled(PhotoGrid)`
  gap: 8px 8px;

  &:after {
    content: "";
    flex: auto;
  }

  .photo-cell {
    display: inline-flex;
    flex-grow: 1;
    height: 20vh;

    &:last-child {
      flex-grow: 10;
    }
  }

  .photo {
    height: 100%;
    min-width: 100%;
    object-fit: cover;
    vertical-align: bottom;
    border-radius: 4px;
  }
`;
