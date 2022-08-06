import React from "react";
import SpellList from "../../features/spells/spellList";

import "./Homepage.scss";

const Homepage: React.FC = () => {
  return (
    <div className="homepage">
      <h1 className="title">Dungeons and Dragons Spells</h1>
      <SpellList />
    </div>
  );
};

export default Homepage;
