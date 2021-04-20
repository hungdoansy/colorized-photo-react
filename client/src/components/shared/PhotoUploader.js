import React from "react";
import classNames from "classnames";

import { Button, Form } from "@ahaui/react";

const PhotoUploader = () => {
  const dragging = false;
  const invalid = false;
  return (
    <div
      className={classNames(
        "u-widthFull u-heightFull",
        "u-backgroundTransparent",
        "u-roundedMedium u-border u-borderDashed u-borderSmall u-paddingMedium u-flex u-justifyContentCenter",
        dragging && !invalid && "u-borderPrimary u-backgroundPrimaryLight",
        dragging && invalid && "u-borderNegative u-backgroundNegativeLight"
      )}
    >
      <div className="u-flex u-flexColumn">
        {true && (
          <div className="u-marginBottomMedium u-flex">
            <div className="u-positionRelative u-marginRightSmall u-flexShrink-0">
              <img src={require("assets/drop-zone-upload.svg")} className="u-maxWidthFull" alt="" />
            </div>
            <div className="u-textGray u-text200" data-name="file-name">
              Drop your file here (.csv) or browse a file
            </div>
          </div>
        )}
        {true && (
          <div className="u-marginBottomExtraSmall">
            <div className="u-positionRelative u-marginRightSmall u-flexShrink-0 u-textCenter">
              <img src={require("assets/drop-zone-upload.svg")} className="u-maxWidthFull" alt="" />
            </div>
            <div className="u-textGray" data-name="file-name">
              <span className="u-textWordBreakAll u-text200">File Name</span>
            </div>
          </div>
        )}
        <div className="u-textCenter">
          <Form.Group className="u-marginNone">
            <input
              className="u-hidden"
              type="file"
              id="submissionFile"
              onChange={() => {}}
              accept={".csv"}
              disabled={false}
            />
            {true && (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a href="#" className="hover:u-textDecorationNone u-block">
                <label htmlFor="submissionFile" className="u-text100 u-cursorPointer">
                  Change file
                </label>
              </a>
            )}
            {true && (
              <Button as="label" htmlFor="submissionFile" variant="secondary">
                BROWSE FILE...
              </Button>
            )}
          </Form.Group>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploader;
