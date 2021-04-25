import React, { useCallback } from "react";
import { useHookstate } from "@hookstate/core";
import classNames from "classnames";

import Header from "./Header";
import linksColorizationStore from "components/LinksColorization/store";
import PhotoWrapper from "./PhotoWrapper";
import PhotoGrid from "../PhotoGrid";

const OriginPhotos = ({ className }) => {
  const ids = useHookstate(linksColorizationStore.ids).get();

  const renderPhoto = useCallback(
    (index) => {
      const id = ids[index];

      return <PhotoWrapper key={id} id={id} />;
    },
    [ids]
  );

  return (
    <div className={classNames(className, "u-widthFull")}>
      <Header />
      <PhotoGrid length={ids.length} renderPhoto={renderPhoto} />
    </div>
  );
};

export default OriginPhotos;
