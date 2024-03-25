import { PokemonService } from './pokemon.service';
import { NotFoundException } from '@nestjs/common';
import { Pokemon } from '../models/pokemon.model';

describe('PokemonService', () => {
  let service: PokemonService;
  let repository: any;

  beforeEach(() => {
    repository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      count: jest.fn(),
      createQueryBuilder: jest.fn(),
    };
    service = new PokemonService(repository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all pokemon', async () => {
      const expectedPokemons: Pokemon[] = [
        { id: 1, name: 'Pikachu', sprites: {}, types: [] },
      ];
      (repository.find as jest.Mock).mockResolvedValueOnce(expectedPokemons);

      const result = await service.findAll();

      expect(result).toEqual(
        expectedPokemons.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          sprites: pokemon.sprites,
          types: pokemon.types,
        })),
      );
    });

    it('should return paginated pokemons', async () => {
      const expectedPokemons: Pokemon[] = [
        { id: 1, name: 'Pikachu', sprites: {}, types: [] },
      ];
      const limit = 10;
      const offset = 0;
      (repository.find as jest.Mock).mockResolvedValueOnce(expectedPokemons);

      const result = await service.findAll(limit, offset);

      expect(result).toEqual(
        expectedPokemons.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          sprites: pokemon.sprites,
          types: pokemon.types,
        })),
      );
      expect(repository.find).toHaveBeenCalledWith({
        skip: offset,
        take: limit,
      });
    });
  });

  describe('findOne', () => {
    it('should return a pokemon by id', async () => {
      const expectedPokemon: Pokemon = {
        id: 1,
        name: 'Pikachu',
        sprites: {},
        types: [],
      };
      (repository.findOne as jest.Mock).mockResolvedValueOnce(expectedPokemon);

      const result = await service.findOne(1);

      expect(result).toEqual({
        id: expectedPokemon.id,
        name: expectedPokemon.name,
        sprites: expectedPokemon.sprites,
        types: expectedPokemon.types,
      });
    });

    it('should throw NotFoundException if pokemon not found', async () => {
      (repository.findOne as jest.Mock).mockResolvedValueOnce(undefined);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('searchPokemons', () => {
    it('should return pokemons matching the query', async () => {
      const query = 'pikachu';
      const expectedPokemons: Pokemon[] = [
        { id: 1, name: 'Pikachu', sprites: {}, types: [] },
      ];
      (repository.createQueryBuilder as jest.Mock).mockReturnValueOnce({
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValueOnce(expectedPokemons),
      });

      const result = await service.searchPokemons(query);

      expect(result).toEqual(
        expectedPokemons.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          sprites: pokemon.sprites,
          types: pokemon.types,
        })),
      );
      expect(repository.createQueryBuilder).toHaveBeenCalled();
    });
  });

  describe('bulkCreate', () => {
    it('should save an array of pokemon', async () => {
      const pokemonData: Partial<Pokemon>[] = [
        { name: 'Pikachu', sprites: {}, types: [] },
      ];
      const expectedSavedPokemons: Pokemon[] = [
        { id: 1, name: 'Pikachu', sprites: {}, types: [] },
      ];
      (repository.save as jest.Mock).mockResolvedValueOnce(
        expectedSavedPokemons,
      );

      const result = await service.bulkCreate(pokemonData);

      expect(result).toEqual(expectedSavedPokemons);
      expect(repository.save).toHaveBeenCalledWith(pokemonData);
    });
  });

  describe('getTotal', () => {
    it('should return the total count of pokemon', async () => {
      const expectedCount = 10;
      (repository.count as jest.Mock).mockResolvedValueOnce(expectedCount);

      const result = await service.getTotal();

      expect(result).toBe(expectedCount);
      expect(repository.count).toHaveBeenCalled();
    });
  });
});
