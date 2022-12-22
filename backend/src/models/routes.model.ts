import express from 'express';

export interface Routes<TController, TValidator> {
  readonly router: express.Router;
  readonly controller: TController;
  readonly validator?: TValidator;
  init: () => void;
}
