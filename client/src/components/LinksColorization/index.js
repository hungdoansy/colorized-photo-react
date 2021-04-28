import React from "react";
import { useHookstate } from "@hookstate/core";

import linksColorizationStore from "./store";
import UrlInput from "./UrlInput";
import OriginPhotos from "./OriginPhotos";
import ColorizedPhotos from "./ColorizedPhotos";

const LinksColorization = () => {
  const ids = useHookstate(linksColorizationStore.ids).get();

  return (
    <div
      className="u-widthFull u-flex u-flexColumn"
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

export default LinksColorization;
