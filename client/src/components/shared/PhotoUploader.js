import React, { useState } from "react";
import classNames from "classnames";
import { Form } from "@ahaui/react";
import styled from "styled-components";

const AllowedMIMETypes = ["image/jpeg", "image/png", ".png", ".PNG", ".jpeg", ".JPEG", ".jpg", ".JPG"];
const accept = AllowedMIMETypes.join(",");

const validateFile = (file) => {
  if (!file) {
    return false;
  }

  return AllowedMIMETypes.includes(file.type);
};

const Button = styled.label`
  display: inline-block;

  height: 40px;
  line-height: 40px;

  padding-left: 1.2em;
  padding-right: 1.2em;

  border: 1px solid #ecf0f1;

  text-align: center;

  background-color: transparent;
  color: #ecf0f1;

  transition: background-color 0.1s linear, color 0.1s linear;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    color: #bdc3c7;
  }
`;

const PhotoUploader = ({ onSuccess }) => {
  const [dragging, setDragging] = useState(false);
  const [valid, setValid] = useState(false);

  const onFileChange = (e) => {
    if (!(e.target.files?.length > 0)) {
      return;
    }

    const file = e.target.files[0];

    const localImageUrl = window.URL.createObjectURL(file);

    onSuccess(localImageUrl, file.name);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(true);

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      const file = e.dataTransfer.items[0];
      setValid(validateFile(file));
    }
  };

  return (
    <div
      className={classNames(
        "u-widthFull u-heightFull",
        "u-flex u-flexColumn u-alignItemsCenter",
        "u-backgroundTransparent",
        "u-roundedMedium u-border u-borderDashed u-borderSmall u-paddingMedium u-flex u-justifyContentCenter",
        dragging && valid && "u-borderPositive u-textPositive",
        dragging && !valid && "u-borderNegative u-textNegative",
        !dragging && "u-textWhite"
      )}
      onDragOver={handleDragOver}
      onDragEnd={() => setDragging(false)}
      onDragLeave={() => setDragging(false)}
    >
      {dragging && valid && (
        <div className="u-text500 u-fontMedium" data-name="file-name">
          Upload for colorization
        </div>
      )}

      {dragging && !valid && (
        <div className="u-text500 u-fontMedium" data-name="file-name">
          This file type is not supported
        </div>
      )}

      {!dragging && (
        <>
          <div className="u-marginBottomMedium u-flex">
            <div className="u-positionRelative u-marginRightSmall u-flexShrink-0">
              <img src={require("assets/drop-zone-upload.svg")} className="u-maxWidthFull" alt="" />
            </div>
            <div className="u-text500 u-fontMedium" data-name="file-name">
              Drop your image here (.png, .jpg) or
            </div>
          </div>

          <div className="u-textCenter">
            <Form.Group className="u-marginNone">
              <input
                className="u-hidden"
                type="file"
                id="submissionFile"
                onChange={onFileChange}
                accept={accept}
                disabled={false}
              />
              <Button as="label" htmlFor="submissionFile" className="u-roundedMedium u-cursorPointer">
                BROWSE FILE...
              </Button>
            </Form.Group>
          </div>
        </>
      )}
    </div>
  );
};

export default PhotoUploader;
