import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ErrorMessage from "../../../components/errorMessage";
import Spinner from "../../../components/spinner";
import SpellDetailsBlock from "./SpellDetailsBlock";
import { AppDispatch, RootState } from "../../../store";
import { fetchSpellByIndexAsync, spellActions } from "../spell.slice";

import "./SpellDetails.scss";

interface Props {
  spellIndex: string;
}

const SpellDetails: React.FC<Props> = ({ spellIndex }) => {
  const appDispatch = useDispatch<AppDispatch>();
  const {
    loading,
    data: spell,
    error,
  } = useSelector((state: RootState) => state.spells.spellByIndex);

  /**
   * Fetch spell by the index and reset state on unmount
   */
  useEffect(() => {
    if (!spell) {
      appDispatch(fetchSpellByIndexAsync(spellIndex));
    }
    return () => {
      appDispatch(spellActions.resetSpellByIndex());
    };
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

  if (!spell) {
    return null;
  }

  return (
    <div className="spell-details">
      <div className="spell-details-header">
        <Link to="/" title="Go back to spell list">
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </Link>
        <h1>{spell?.name}</h1>
      </div>
      <div className="spell-details-container">
        <div className="top-row">
          {spell.range && (
            <SpellDetailsBlock
              title="Range"
              content={spell.range}
              className="spell-range"
            />
          )}

          {spell.components && (
            <SpellDetailsBlock
              title="Componentes"
              content={spell.components.join(", ")}
              className="spell-components"
            />
          )}
          {spell.material && (
            <SpellDetailsBlock
              title="Materials"
              content={spell.material}
              className="spell-materials"
            />
          )}

          {spell.duration && (
            <SpellDetailsBlock
              title="Duration"
              content={spell.duration}
              className="spell-duration"
            />
          )}

          {spell.duration && (
            <SpellDetailsBlock
              title="Casting Time"
              content={spell.castingTime}
              className="spell-casting-time"
            />
          )}

          {spell.level !== undefined && (
            <SpellDetailsBlock
              title="Level"
              content={`${spell.level}`}
              className="spell-level"
            />
          )}

          {spell.damage && spell.damage.damageType?.name && (
            <SpellDetailsBlock
              title="Damage"
              content={spell.damage.damageType.name}
              className="spell-damage"
            />
          )}

          {spell.school?.name && (
            <SpellDetailsBlock
              title="School"
              content={spell.school.name}
              className="spell-school"
            />
          )}
        </div>

        {spell.description.length > 0 && (
          <SpellDetailsBlock
            title="Description"
            content={spell.description.join()}
            className="spell-description"
          />
        )}

        {spell.higherLevel.length > 0 && (
          <SpellDetailsBlock
            title="Higher Level"
            content={spell.higherLevel.join()}
            className="spell-level"
          />
        )}
      </div>
    </div>
  );
};

export default SpellDetails;
