import React, { useState } from "react";

import "./SwitchTabs.scss";

interface SwitchTabsProps {
  data: string[];
  onTabChange: (tab: string) => void;
}

const SwitchTabs = ({ data, onTabChange }: SwitchTabsProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (element: string, index : number) => {
    setLeft(index * 100);
    setTimeout(() => {
        setSelectedTab(index);
    }, 300);
    onTabChange(element);
  };

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((element, index) => (
          <span
            key={index}
            className={`tabItem ${selectedTab === index ? "active" : ""}`}
            onClick={() => activeTab(element, index)}
          >
            {element}
          </span>
        ))}
        <span className="movingBg" style={{left}} />
      </div>
    </div>
  );
};

export default SwitchTabs;
