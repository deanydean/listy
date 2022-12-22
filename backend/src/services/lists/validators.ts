import { ValidationChain, body, param } from 'express-validator';

const idParam: ValidationChain = param('id').exists().trim().escape();
const validTitleInBody: ValidationChain = body(
  'title',
  'Must provide title with length between 1-60 chars.'
)
  .exists()
  .trim()
  .escape()
  .isLength({ min: 1, max: 60 });

export class ListsValidator {
  createListValidator: ValidationChain[];
  editListValidator: ValidationChain[];
  deleteListValidator: ValidationChain[];

  constructor() {
    this.createListValidator = [validTitleInBody];
    this.editListValidator = [validTitleInBody, idParam];
    this.deleteListValidator = [idParam];
  }
}
