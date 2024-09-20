import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { UsersModule } from '../users.module';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],  
      controllers: [UsersController],
      providers: [UsersService],
    })
    
    .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('User Controller', () => {
    expect(controller).toBeDefined();
  });
});
