import { Repository } from 'typeorm'







export const mockedUser = {
  id: 1,
  user: 'test12345',
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'test@test.com',
  password: '$2a$12$AJWfXaf0/cvJk.GRCTSLPeeeU3qR0ddIhx57J96XYP3Vl.sTURpKK', // 1234
}

export type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]?: jest.Mock<{}>
}

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
  })
)
