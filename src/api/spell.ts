import axios from "axios";
import { SpellDto } from "../features/spells/types";

/**
 * Fetch all spells
 */
export const fetchSpells = async () => {
  const { data } = await axios.get("https://www.dnd5eapi.co/api/spells");
  return data;
};

/**
 * Fetch a spell by the given index
 * @param spellIndex Index of the spell
 */
export const fetchSpellByIndex = async (
  spellIndex: string
): Promise<SpellDto> => {
  const { data } = await axios.get(
    `https://www.dnd5eapi.co/api/spells/${spellIndex}`
  );
  return data;
};
