import { Router } from "express";
import * as predictValidators from './predict.validator';
import * as predictControllers from './predict.controllers';

const predictRoute = Router();

predictRoute
    .get('/:id', predictControllers.predict)

export default predictRoute;