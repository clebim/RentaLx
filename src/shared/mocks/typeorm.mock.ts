/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { mock, MockProxy } from 'jest-mock-extended';
import {
  Connection,
  EntityManager,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

export const repositoryMock = mock<Repository<any>>();
export const connectionMock: MockProxy<Connection> = mock<Connection>();
export const entityManagerMock = mock<EntityManager>();
export const selectQueryBuilderMock = mock<SelectQueryBuilder<any>>();

jest.mock('typeorm', () => {
  const { Between, Not } = jest.requireActual('typeorm');
  return {
    Between,
    Not,
    getCustomRepository: () => repositoryMock,
    getRepository: () => repositoryMock,
    getConnection: () => connectionMock,
    Entity: () => () => {},
    PrimaryColumn: () => () => {},
    PrimaryGeneratedColumn: () => () => {},
    Column: () => () => {},
    CreateDateColumn: () => () => {},
    UpdateDateColumn: () => () => {},
    Unique: () => () => {},
    JoinColumn: () => () => {},
    JoinTable: () => () => {},
    OneToOne: () => () => {},
    OneToMany: () => () => {},
    ManyToOne: () => () => {},
    ManyToMany: () => () => {},
    Repository: jest.fn(),
    EntityRepository: () => () => {},
    AfterLoad: () => () => {},
  };
});
