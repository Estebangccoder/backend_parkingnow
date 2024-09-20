import { Test, TestingModule } from '@nestjs/testing';
import { SlotsService } from './slots.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Slot } from './entities/slot.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateSlotDto } from './dto/create-slot.dto';

describe('SlotsService', () => {
  let service: SlotsService;
  let repository: Repository<Slot>;
  let usersService: UsersService;

  beforeEach(async () => {
    const mockUsersService = {
      findOneByEmail: jest.fn().mockResolvedValue({ id: 'user-id', name: 'Test User' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SlotsService,
        {
          provide: getRepositoryToken(Slot),
          useClass: Repository,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get<SlotsService>(SlotsService);
    repository = module.get<Repository<Slot>>(getRepositoryToken(Slot));
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new slot', async () => {
      const createSlotDto: CreateSlotDto = {
        name: 'Parking Slot A1',
        hour_price: 5000.00,
        is_covered: true,
        vehicle_type_id: 1,
        property_id: '72a54315-27ee-49aa-be8f-aea94b83b5a1',
        owner_id: '3f33ba0b-c4fe-4640-b655-7c5a99cbec10',
      };

      const savedSlot: Partial<Slot> = {
        id: '1',
        name: createSlotDto.name,
        hour_price: createSlotDto.hour_price,
        is_covered: createSlotDto.is_covered,
        vehicle_type_id: createSlotDto.vehicle_type_id,
        property_id: createSlotDto.property_id,
        owner_id: createSlotDto.owner_id,
        is_available: true,
        created_at: new Date(),
        updated_at: new Date(),
        delete_at: null,
      };

     
      jest.spyOn(repository, 'create').mockReturnValue(savedSlot as Slot);
      jest.spyOn(repository, 'save').mockResolvedValue(savedSlot as Slot);

      const result = await service.create(createSlotDto, 'user@test.com');
      
      expect(repository.create).toHaveBeenCalledWith(createSlotDto);
      expect(repository.save).toHaveBeenCalledWith(savedSlot);
      expect(result).toEqual(savedSlot);
    });
  });
});