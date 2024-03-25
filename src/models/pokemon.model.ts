export interface Pokemon {
  id: number;
  name: string;
  sprites: Record<string, string>;
  types: Record<string, any>[];
}
