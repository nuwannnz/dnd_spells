export interface SpellListItemData {
  index: string;
  name: string;
}

export interface SpellDto extends SpellListItemData {
  desc: string[];
  higher_level: string[];
  range: string;
  components: string[];
  material: string;
  duration: string;
  casting_time: string;
  level: number;
  damage: {
    damage_type: {
      index: string;
      name: string;
    };
  };
  school: {
    index: string;
    name: string;
  };
}

export interface Spell extends SpellListItemData {
  description: string[];
  higherLevel: string[];
  range: string;
  components: string[];
  material: string;
  duration: string;
  castingTime: string;
  level: number;
  damage: {
    damageType: {
      index: string;
      name: string;
    };
  };
  school: {
    index: string;
    name: string;
  };
}

export type SpellFilterType = "all" | "favourites";
