import axios from "axios";

export const fetchSpells = async () => {
  const { data } = await axios.get("https://www.dnd5eapi.co/api/spells");
  return data;
};
