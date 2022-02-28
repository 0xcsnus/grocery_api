import express from "express";
import {Item} from './item_model.js'
import {Create,findOne,update,remove} from '../db/db.js';
const router = express.Router();


router.route('/item')
.post(Create(Item))


router.route('/item/:id')
.get(findOne(Item))
.put(update(Item))
.delete(remove(Item))


export default router;