export interface Pokemon {
  abilities: Ability2[];
  base_experience: number;
  cries: Cries;
  forms: Ability[];
  game_indices: Gameindex[];
  height: number;
  held_items: any[];  // Consider defining a more specific type if needed
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_abilities: any[];  // Consider making this optional if not always available
  past_types: any[];      // Consider making this optional if not always available
  species: Ability;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
  evolves_from_species?: Species;  // Optional field for evolution tracking
}

export interface Type {
  slot: number;
  type: Ability;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Ability;
}

export interface Sprites {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
  other: Other;
  versions: Versions;
}

export interface Versions {
  'generation-i': Generationi;
  'generation-ii': Generationii;
  'generation-iii': Generationiii;
  'generation-iv': Generationiv;
  'generation-v': Generationv;
  'generation-vi': Generationvi;
  'generation-vii': Generationvii;
  'generation-viii': Generationviii;
}

export interface Generationviii {
  icons: Dreamworld;
}

export interface Generationvii {
  icons: Dreamworld;
  'ultra-sun-ultra-moon': Home;
}

export interface Generationvi {
  'omegaruby-alphasapphire': Home;
  'x-y': Home;
}

export interface Generationv {
  'black-white': Blackwhite;
}

export interface Blackwhite {
  animated: Showdown;
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface Generationiv {
  'diamond-pearl': Showdown;
  'heartgold-soulsilver': Showdown;
  platinum: Showdown;
}

export interface Generationiii {
  emerald: Officialartwork;
  'firered-leafgreen': Fireredleafgreen;
  'ruby-sapphire': Fireredleafgreen;
}

export interface Fireredleafgreen {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

export interface Generationii {
  crystal: Crystal;
  gold: Gold;
  silver: Gold;
}

export interface Gold {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent: string;
}

export interface Crystal {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
}

export interface Generationi {
  'red-blue': Redblue;
  yellow: Redblue;
}

export interface Redblue {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

export interface Other {
  dream_world: Dreamworld;
  home: Home;
  'official-artwork': Officialartwork;
  showdown: Showdown;
}

export interface Showdown {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface Officialartwork {
  front_default: string;
  front_shiny: string;
}

export interface Home {
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface Dreamworld {
  front_default: string;
  front_female?: any;
}

export interface Move {
  move: Ability;
  version_group_details: Versiongroupdetail[];
}

export interface Versiongroupdetail {
  level_learned_at: number;
  move_learn_method: Ability;
  version_group: Ability;
}

export interface Gameindex {
  game_index: number;
  version: Ability;
}

export interface Cries {
  latest: string;
  legacy: string;
}

export interface Ability2 {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

export interface Ability {
  name: string;
  url: string;
}

export interface Species {
  name: string;
  url: string;
}
