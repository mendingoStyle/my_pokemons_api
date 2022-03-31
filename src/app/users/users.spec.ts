import { Test, TestingModule } from '@nestjs/testing';


class ApiServiceMock {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getStudent(_firstName: string, _lastName: string) {
    return {
      name: 'Jane Doe',
      grades: [3.7, 3.8, 3.9, 4.0, 3.6],
    };
  }
}

describe('UsersService', () => {
  let UsersService;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    UsersService = module.get<any>(UsersService);
  });

  it('StudentService - should be defined', () => {
    expect(UsersService).toBeDefined();
  });

  describe('getGpa', () => {
    it('should get student GPA', async () => {
      const expectedGpa = 3.8;
      const gpa = await UsersService.getGpa('Jane', 'Doe');
      expect(gpa).toEqual(expectedGpa);
    });
  });
});