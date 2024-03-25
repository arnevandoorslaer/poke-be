import { TeamService } from './team.service';
import { TeamEntity } from './team.entity';
import { PokemonTeamEntity } from '../pokemonteam/pokemonteam.entity';
import { NotFoundException } from '@nestjs/common';

describe('TeamService', () => {
  let service: TeamService;
  let teamRepository: any;
  let pokemonTeamRepository: any;

  beforeEach(() => {
    teamRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
    };

    pokemonTeamRepository = {
      find: jest.fn(),
      insert: jest.fn(),
    };
    service = new TeamService(teamRepository, pokemonTeamRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('should return a team by id', async () => {
      const teamId = 1;
      const expectedTeam: TeamEntity = { id: teamId, name: 'Team' } as any;
      jest.spyOn(teamRepository, 'findOne').mockResolvedValueOnce(expectedTeam);

      const result = await service.findOne(teamId);

      expect(result).toEqual({ id: teamId, name: 'Team', pokemons: [] });
      expect(teamRepository.findOne).toHaveBeenCalledWith({
        where: { id: teamId },
        relations: ['pokemons'],
      });
    });

    it('should return null if team not found', async () => {
      const teamId = 1;
      jest.spyOn(teamRepository, 'findOne').mockResolvedValueOnce(undefined);

      const result = await service.findOne(teamId);

      expect(result).toBeNull();
      expect(teamRepository.findOne).toHaveBeenCalledWith({
        where: { id: teamId },
        relations: ['pokemons'],
      });
    });
  });

  describe('create', () => {
    it('should create a team', async () => {
      const teamData = { name: 'Team' };
      const createdTeam: TeamEntity = { id: 1, ...teamData } as any;
      jest.spyOn(teamRepository, 'save').mockResolvedValueOnce(createdTeam);

      const result = await service.create(teamData);

      expect(result).toEqual({ id: 1, ...teamData, pokemons: [] });
      expect(teamRepository.save).toHaveBeenCalledWith(teamData);
    });
  });

  describe('findAll', () => {
    it('should return all teams', async () => {
      const expectedTeams: TeamEntity[] = [{ id: 1, name: 'Team' } as any];
      jest.spyOn(teamRepository, 'find').mockResolvedValueOnce(expectedTeams);

      const result = await service.findAll();

      expect(result).toEqual([{ id: 1, name: 'Team', pokemons: [] }]);
      expect(teamRepository.find).toHaveBeenCalledWith({
        relations: ['pokemons'],
      });
    });
  });

  describe('setPokemonsOfTeam', () => {
    let findOneSpy: jest.SpyInstance;
    let findSpy: jest.SpyInstance;
    let insertSpy: jest.SpyInstance;

    beforeEach(() => {
      findOneSpy = jest.spyOn(service, 'findOne').mockImplementation();
      findSpy = jest.spyOn(pokemonTeamRepository, 'find').mockImplementation();
      insertSpy = jest
        .spyOn(pokemonTeamRepository, 'insert')
        .mockImplementation();
    });

    it('should set pokemons of team', async () => {
      const teamId = 1;
      const pokemonIds = [101, 102, 103, 104];
      const existingPokemonIds = [101, 102];
      const newPokemonTeamEntities = [
        { team_id: teamId, pokemon_id: 103 },
        { team_id: teamId, pokemon_id: 104 },
      ] as PokemonTeamEntity[];

      findOneSpy.mockResolvedValueOnce({ id: teamId });
      findSpy.mockResolvedValueOnce(
        existingPokemonIds.map((id) => ({ pokemon_id: id })),
      );

      await expect(
        service.setPokemonsOfTeam(teamId, pokemonIds),
      ).resolves.not.toThrow();
      expect(insertSpy).toHaveBeenCalledWith(newPokemonTeamEntities);
    });

    it('should throw NotFoundException if team not found', async () => {
      const teamId = 1;
      const pokemonIds = [1, 2, 3];
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);

      await expect(
        service.setPokemonsOfTeam(teamId, pokemonIds),
      ).rejects.toThrowError(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith(teamId);
    });
  });
});
