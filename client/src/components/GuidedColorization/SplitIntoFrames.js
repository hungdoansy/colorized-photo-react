import React, { useEffect, useRef, useState } from "react";
import { Button } from "@ahaui/react";

import { getFrames } from "./store";

const SplitIntoFrames = () => {
  const mountedRef = useRef(false);

  const [loading, setLoading] = useState(false);

  const handleClickSplit = async () => {
    setLoading(true);

    await getFrames();

    mountedRef.current && setLoading(false);
  };

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <div className="u-widthFull u-flex u-justifyContentCenter">
      <Button
        size="small"
        variant="primary_outline"
        onClick={handleClickSplit}
        disabled={loading}
        className="custom-button u-text300"
      >
        {loading ? "Splitting..." : "Split into frames"}
      </Button>
    </div>
  );
};

export default SplitIntoFrames;
