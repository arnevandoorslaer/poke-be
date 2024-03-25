export interface PokemonDetails {
  sprites: {
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
  };
  height: number;
  weight: number;
  moves: {
    move: string;
    version_group_details: {
      move_learn_method: string;
      version_group: string;
      level_learned_at: number;
    }[];
  }[];
  order: number;
  species: string;
  stats: {
    stat: string;
    base_stat: number;
    effort: number;
  }[];
  abilities: {
    ability: string;
    is_hidden: boolean;
    slot: number;
  }[];
  form: string;
}
