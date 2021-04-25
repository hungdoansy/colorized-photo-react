import React from "react";
import classNames from "classnames";
import styled from "styled-components";
import { useHookstate } from "@hookstate/core";

import linksColorizationStore from "./store";
import UrlInput from "./UrlInput";
import OriginPhotos from "./OriginPhotos";
import ColorizedPhotos from "./ColorizedPhotos";

const LinksColorization = ({ className }) => {
  const ids = useHookstate(linksColorizationStore.ids).get();

  return (
    <div
      className={classNames(className, "u-widthFull", "u-flex u-flexColumn")}
      style={{
        rowGap: "16px",
      }}
    >
      <div className="u-widthFull u-flex u-alignItemsCenter u-justifyContentCenter">
        <UrlInput />
      </div>

      {!!ids?.length && (
        <>
          <OriginPhotos />
          <ColorizedPhotos />
        </>
      )}
    </div>
  );
};

export default styled(LinksColorization)`
  .custom-button {
    display: inline-block;

    padding-left: 10px;
    padding-right: 10px;

    height: 32px;
    line-height: 32px;

    border: 1px solid #ecf0f1;
    text-align: center;

    transition: background-color 0.1s linear, color 0.1s linear;

    color: #ecf0f1;

    cursor: pointer;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      color: #bdc3c7;
    }
  }
`;
