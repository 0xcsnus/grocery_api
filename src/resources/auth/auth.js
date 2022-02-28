import {User} from '../user/user_model.js';
import jwt from 'jsonwebtoken'


export const signup = async (req,res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'need email and password' })
      }
    
      try {
        const user = await User.create(req.body)
        const token = newToken(user)
        return res.status(201).send({ token })
      } catch (e) {
        return res.status(500).end()
      }
}

export const login = async (req,res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'need email and password' })
      }
    
      const invalid = { message: 'Invalid email and passoword combination' }
    
      try {
        const user = await User.findOne({ email: req.body.email })
          .select('email password')
          .exec()
    
        if (!user) {
          return res.status(401).send(invalid)
        }
    
        const match = await user.checkPassword(req.body.password)
    
        if (!match) {
          return res.status(401).send(invalid)
        }
        console.log(user.id);
        const token = newToken(user)
        return res.status(201).send({ token })
      } catch (e) {
        console.error(e)
        res.status(500).end()
      }
}

export const protect = async (req, res,next) => {
  const bearer = req.headers.authorization
  if (!bearer || !bearer.startsWith('Bearer ')) {
    console.log("1");
    return res.status(401).end()
  }

  const token = bearer.split('Bearer ')[1].trim()
  let payload
  try {
    payload = await verifyToken(token)
  } catch (e) {
    console.log("2");
    return res.status(401).end()
  }

  const user = await User.findById(payload.id)
  .select('-password')
  .lean()
  .exec()

if (!user) {
  console.log("3");
  return res.status(401).end()
}

req.user = user
next();
}

var secret = 'shhhhhhh';

const newToken = user => {
  return jwt.sign({ id: user.id },
    secret, {
    expiresIn: '100d'
  })
}

const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token,secret, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })