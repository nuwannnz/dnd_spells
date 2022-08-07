import React from "react";
import { Link } from "react-router-dom";
import FavouriteButton from "../favouriteButton/FavouriteButton";
import { SpellListItemData } from "../types";

import "./SpellListItem.scss";

interface Props {
  spell: SpellListItemData;
}
const SpellListItem: React.FC<Props> = ({ spell }) => {
  return (
    <Link
      to={`/spell/${spell.index}`}
      className="spell-list-item"
      title="Click to view details"
    >
      <span className="spell-name">{spell.name}</span>
      <FavouriteButton spellIndex={spell.index} />
    </Link>
  );
};

export default SpellListItem;
