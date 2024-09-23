import { Test, TestingModule } from '@nestjs/testing';
import { S3Provider } from './s3.provider';

describe('S3', () => {
  let provider: S3Provider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [S3Provider],
    }).compile();

    provider = module.get<S3Provider>(S3Provider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
