import mongoose from "mongoose";

export const connect = (url) => {
    return mongoose.connect(
      url
    )
  }

export const Create = model => async (req,res) => {
  try {
    if(req.body.name && req.body.serial_num){
      const doc = await model.create(req.body)
      res.status(201).json({ data: doc })
    }else{
      res.json({Message: "Name and serial number required!"})
    }
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}


export const findOne = model => async (req,res) => {
  try {
    const doc = await model
      .findOne({serial_num: req.params.id})
      .lean()
      .exec()

    if (!doc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}


export const update = model => async (req, res) => {
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          serial_num: req.params.id
        },
        req.body,
        { new: true }
      )
      .lean()
      .exec()

    if (!updatedDoc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}


export const remove = model => async (req, res) => {
  try {
    const removed = await model.findOneAndRemove({
      serial_num: req.params.id
    })

    if (!removed) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: removed })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

