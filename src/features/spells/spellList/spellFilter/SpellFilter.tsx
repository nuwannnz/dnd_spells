import React from "react";
import { SpellFilterType } from "../../types";

import "./SpellFilter.scss";

interface Props {
  filterKey: SpellFilterType;
  name: string;
  activeFilter: SpellFilterType;
  onClickHandler: (key: SpellFilterType) => void;
}
const SpellFilter: React.FC<Props> = ({
  filterKey,
  name,
  activeFilter,
  onClickHandler,
}) => {
  return (
    <button
      className={`spell-filter ${activeFilter === filterKey ? "active" : ""}`}
      onClick={() => onClickHandler(filterKey)}
      title={`Filter spells by ${name}`}
    >
      {name}
    </button>
  );
};

export default SpellFilter;
