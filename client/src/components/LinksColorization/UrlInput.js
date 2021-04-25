import React, { useEffect, useState } from "react";
import { useHookstate } from "@hookstate/core";
import { Icon, Loader } from "@ahaui/react";
import axios from "axios";

import linksColorizationStore, { setUrl, removeUrl, setOriginPhotos } from "./store";
import classNames from "classnames";
import styled from "styled-components";

const endpoint = "http://localhost:9001";

const UrlInput = ({ className }) => {
  const url = useHookstate(linksColorizationStore.url).get();
  const [input, setInput] = useState(url);
  const [loading, setLoading] = useState(false);

  const shouldDisableInput = url || loading;

  useEffect(() => {
    setInput(url);
  }, [url]);

  const handleClickSearch = () => {
    setUrl(input);

    setLoading(true);

    axios
      .post(
        `${endpoint}/links`,
        { test: 1 },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const urls = res.data;
        setOriginPhotos(urls);

        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const handleClickRemove = () => {
    removeUrl();
  };

  const renderIcon = () => {
    if (loading) {
      return <Loader size="small" className="u-textNeutral50 u-marginHorizontalExtraSmall" />;
    }

    if (!input) {
      return null;
    }

    if (!url) {
      return (
        <Icon
          size="small"
          name="arrowDroprightCircle"
          className="u-marginHorizontalExtraSmall u-cursorPointer u-textWhite hover:u-textGray"
          onClick={handleClickSearch}
        />
      );
    }

    return (
      <Icon
        size="small"
        name="closeCircleOutline"
        className="u-marginHorizontalExtraSmall u-textWhite hover:u-textGray"
        onClick={handleClickRemove}
      />
    );
  };

  return (
    <div
      className={classNames(
        className,
        "u-border u-backgroundTransparent u-roundedMedium u-flex u-paddingLeftExtraSmall u-alignItemsCenter"
      )}
      style={{
        width: 300,
        height: 32,
      }}
      disabled={shouldDisableInput}
    >
      <input
        className="u-backgroundTransparent u-borderTransparent u-textPlaceholder u-textWhite u-flexGrow1 u-heightFull u-text300"
        placeholder="Enter your url..."
        value={input ?? ""}
        onChange={(e) => {
          const value = e.target.value;
          setInput(value);
        }}
        disabled={shouldDisableInput}
      />

      {renderIcon()}
    </div>
  );
};

export default styled(UrlInput)`
  &[disabled] {
    background-color: rgba(255, 255, 255, 0.1);
    user-select: none;

    input {
      color: #97a0af;
    }
  }
`;
