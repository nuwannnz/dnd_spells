import React, { useMemo } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { addFavouriteAndSave, removeFavouriteAndSave } from "../spell.slice";

import "./FavouriteButton.scss";

interface Props {
  spellIndex: string;
}

const FavouriteButton: React.FC<Props> = ({ spellIndex }) => {
  const appDispatch: AppDispatch = useDispatch();
  const favourites = useSelector(
    (state: RootState) => state.spells.favouriteSpellIndexes
  );

  const isFavourite = useMemo(
    () => favourites && favourites.includes(spellIndex),
    [spellIndex, favourites]
  );

  const handleFavouriteClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (isFavourite) {
      appDispatch(removeFavouriteAndSave(spellIndex));
    } else {
      appDispatch(addFavouriteAndSave(spellIndex));
    }
  };

  return (
    <button
      className="spell-favourite-button"
      onClick={handleFavouriteClick}
      title={isFavourite ? "Remove from favourites" : "Add to favourites"}
    >
      <FontAwesomeIcon
        icon={isFavourite ? faHeart : farHeart}
        size="2x"
        data-testid="favourite-icon"
      />
    </button>
  );
};

export default FavouriteButton;
