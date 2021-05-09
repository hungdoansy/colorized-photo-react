import { css } from "styled-components";

export const CustomButtonCSS = css`
  .custom-button {
    display: inline-block;

    padding-left: 10px;
    padding-right: 10px;

    height: 32px;

    border: 1px solid #ecf0f1;
    text-align: center;

    transition: background-color 0.1s linear, color 0.1s linear;

    color: #ecf0f1;

    cursor: pointer;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      color: #bdc3c7;
    }

    &[disabled] {
      background-color: rgba(255, 255, 255, 0.1);
      border-color: #81868f;
      user-select: none;
      color: #81868f;
    }
  }
`;
