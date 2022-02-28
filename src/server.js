import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import {connect} from './resources/db/db.js'
import {signup, login, protect} from './resources/auth/auth.js';
import router from './resources/item/item_router.js';

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.use('/api',protect)
app.post('/signup',signup);
app.post('/login',login);

app.use('/api',protect);
app.use('/api',router);


export const start = async () => {
  try{
    await connect('mongodb://localhost:27017/grocery_api');
    app.listen(3000,()=> console.log("Server Running!"));
  }catch(e){
    console.log(e);
  }
}