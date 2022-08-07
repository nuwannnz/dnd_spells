import { Spell, SpellDto } from "../features/spells/types";

/**
 * Mapps the given SpellDto object into a Spell object
 * @param spellDto dto returned from the API
 * @returns Mapped Spell object
 */
export const mapSpellDtoToSpell = (spellDto: SpellDto): Spell => {
  const {
    index,
    desc,
    name,
    higher_level,
    casting_time,
    damage,
    components,
    material,
    level,
    range,
    duration,
    school,
  } = spellDto;
  return {
    index,
    name: name,
    description: desc,
    higherLevel: higher_level,
    castingTime: casting_time,
    damage: {
      damageType: damage?.damage_type,
    },
    components,
    material,
    level,
    range,
    duration,
    school,
  };
};
