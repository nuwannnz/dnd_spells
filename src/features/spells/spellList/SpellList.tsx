import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { fetchAllSpellsAsync } from "../spell.slice";
import SpellListItem from "./spellListItem";
import Spinner from "../../../components/spinner";
import ErrorMessage from "../../../components/errorMessage";
import SpellFilter from "./spellFilter";
import { SpellFilterType, SpellListItemData } from "../types";

import "./SpellList.scss";

const SpellList: React.FC = () => {
  const appDispatch = useDispatch<AppDispatch>();
  const {
    loading,
    data: spells,
    error,
  } = useSelector((state: RootState) => state.spells.spellList);
  const favourites = useSelector(
    (state: RootState) => state.spells.favouriteSpellIndexes
  );

  const [spellFilter, setSpellFilter] = useState<SpellFilterType>("all");
  const [filteredSpellList, setFilteredSpellList] = useState<
    SpellListItemData[]
  >([]);

  useEffect(() => {
    // fetch spells if not loaded
    if (!spells) {
      appDispatch(fetchAllSpellsAsync());
    }
  }, []);

  useEffect(() => {
    if (spells) {
      if (spellFilter === "all") {
        setFilteredSpellList(spells);
      } else if (spellFilter === "favourites") {
        setFilteredSpellList(
          spells.filter((spell) => favourites.includes(spell.index))
        );
      }
    }
  }, [spells, spellFilter, favourites]);

  if (loading) {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="spell-list">
      <div className="spell-filter-container">
        <SpellFilter
          filterKey="all"
          name="All"
          activeFilter={spellFilter}
          onClickHandler={(filter) => setSpellFilter(filter)}
        />
        <SpellFilter
          filterKey="favourites"
          name="Favourites"
          activeFilter={spellFilter}
          onClickHandler={(filter) => setSpellFilter(filter)}
        />
      </div>

      {filteredSpellList.map((spell) => (
        <SpellListItem key={spell.index} spell={spell} />
      ))}
    </div>
  );
};

export default SpellList;
