import React from "react";
import styled from "styled-components";
import classNames from "classnames";

const getChunksByLength = (length) => {
  if (length === 0) {
    return [];
  }

  const chunks = Array(4).fill(Math.floor(length / 4));
  const result = [];
  for (let j = 0; j < length % 4; j++) {
    chunks[j] += 1;
  }

  let from = 0;
  for (let i = 0; i < 4; i++) {
    const to = from + chunks[i];
    const temp = [];
    for (let j = from; j < to; j++) {
      temp.push(j);
    }

    result.push(temp);

    from += chunks[i];
  }

  return result;
};

const PhotoGrid = ({ className, length, renderPhoto = () => null }) => {
  const chunks = getChunksByLength(length);

  return (
    <div className={classNames(className, "u-widthFull")}>
      <div className="u-widthFull origin-photo-row">
        <div className="origin-photo-column">{chunks[0] && chunks[0].map((index) => renderPhoto(index))}</div>

        <div className="origin-photo-column">{chunks[1] && chunks[1].map((index) => renderPhoto(index))}</div>

        <div className="origin-photo-column">{chunks[2] && chunks[2].map((index) => renderPhoto(index))}</div>

        <div className="origin-photo-column">{chunks[3] && chunks[3].map((index) => renderPhoto(index))}</div>
      </div>
    </div>
  );
};

export default styled(PhotoGrid)`
  .origin-photo-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .origin-photo-column {
    flex-basis: calc(25% - 8px);
    max-width: calc(25% - 8px);

    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }

  /* Responsive layout - makes a two column-layout instead of four columns */
  @media screen and (max-width: 800px) {
    .origin-photo-column {
      flex-basis: calc(50% - 8px);
      max-width: calc(50% - 8px);
    }
  }

  /* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
  @media screen and (max-width: 600px) {
    .origin-photo-column {
      flex: 100%;
      max-width: 100%;
    }
  }
`;
