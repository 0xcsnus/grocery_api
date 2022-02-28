import mongoose from 'mongoose'
const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    serial_num: {
       type: Number,
       required: true,
       unique: true
    },
    stock:{
      type: Number,
      required: false,
      default: 0
    },
    price:{
        type: Number,
        required: false,
        default: 0
      },
    notes: {
        type: String,
        required: false,
        default: "N/A"
    },
  },
  { timestamps: true }
)

export const Item = mongoose.model('item', itemSchema)
