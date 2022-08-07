import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { fetchAllSpellsAsync } from "../spell.slice";
import SpellListItem from "./SpellListItem";
import Spinner from "../../../components/spinner";
import ErrorMessage from "../../../components/errorMessage";

import "./SpellList.scss";

const SpellList: React.FC = () => {
  const appDispatch = useDispatch<AppDispatch>();
  const {
    loading,
    data: spells,
    error,
  } = useSelector((state: RootState) => state.spells.spellList);

  useEffect(() => {
    // fetch spells if not loaded
    if (!spells) {
      appDispatch(fetchAllSpellsAsync());
    }
  }, []);

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
      {spells?.map((spell) => (
        <SpellListItem key={spell.index} spell={spell} />
      ))}
    </div>
  );
};

export default SpellList;
