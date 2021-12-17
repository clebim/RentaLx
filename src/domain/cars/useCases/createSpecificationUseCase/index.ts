import { SpecificationRepository } from '../../infra/repositories/SpeficicationRepository';
import { CreateSpecificationController } from './createSpecificationController';
import { CreateSpecificationUseCase } from './createSpecificationUseCase';

const specificationsRepository = new SpecificationRepository();
const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationsRepository,
);

export const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase,
);
