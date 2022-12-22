import express from 'express';

export interface Routes<T> {
  readonly router: express.Router;
  readonly controller: T;
  init: () => void;
}
