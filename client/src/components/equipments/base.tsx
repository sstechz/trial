import React from "react";
import "./base.scss";

interface equipmentProps {
  equipment: { [key: string]: number };
}

const Base = ({ equipment }: equipmentProps) => {
  return (
    <div className="items">
      {Object.entries(equipment).map(([item, count]) => (
        <div key={item} className="item">
          {item}: {count}
        </div>
      ))}
    </div>
  );
};

export default Base;
