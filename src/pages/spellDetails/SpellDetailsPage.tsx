import React from "react";
import { useParams } from "react-router-dom";
import SpellDetails from "../../features/spells/spellDetails";

const SpellDetailsPage: React.FC = () => {
  const { spellIndex } = useParams();

  return (
    <div className="spell-details-page">
      {spellIndex && <SpellDetails spellIndex={spellIndex} />}
    </div>
  );
};

export default SpellDetailsPage;
