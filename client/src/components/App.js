/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from "react";
import { useState } from "@hookstate/core";
import styled from "styled-components";
import classNames from "classnames";

import AutomaticColorization from "./AutomaticColorization";
import GuidedColorization from "./GuidedColorization";
import LinksColorization from "./LinksColorization";

const Tab = {
  Automatic: "Automatic Colorization",
  Guided: "Guided Colorization",
  Links: "Links Colorization",
};

const Tabs = [
  {
    id: Tab.Automatic,
    title: Tab.Automatic,
    component: AutomaticColorization,
  },
  {
    id: Tab.Guided,
    title: Tab.Guided,
    component: GuidedColorization,
  },
  {
    id: Tab.Links,
    title: Tab.Links,
    component: LinksColorization,
  },
];

const App = ({ className }) => {
  const tabState = useState(Tab.Guided);
  const currentTab = Tabs.find(({ id }) => id === tabState.get());
  const Component = currentTab.component;

  return (
    <div className={classNames(className, "u-widthFull", "u-flex u-flexColumn u-alignItemsCenter", "u-paddingMedium")}>
      <div className="tabs u-flex u-justifyContentCenter u-alignItemsCenter">
        {Tabs.map((tab) => (
          <div
            key={tab.id}
            className={classNames(
              "tab u-roundedMedium u-cursorPointer u-userSelectNone",
              tab.id === currentTab.id && "tab-active"
            )}
            onClick={() => {
              tabState.set(tab.id);
            }}
          >
            <span>{tab.title}</span>
          </div>
        ))}
      </div>

      <div className="content">
        <Component />
      </div>
    </div>
  );
};

export default styled(App)`
  row-gap: 30px;

  .tabs {
    column-gap: 30px;

    .tab {
      width: 200px;
      height: 40px;
      line-height: 40px;

      border: 1px solid #ecf0f1;
      text-align: center;

      transition: background-color 0.1s linear, color 0.1s linear;

      color: #ecf0f1;

      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
        color: #bdc3c7;
      }
    }
  }

  .tab-active {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .content {
    width: 100%;
    height: 100%;
  }
`;
