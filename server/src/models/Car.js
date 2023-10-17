import { Schema } from "mongoose";

export const CarSchema = new Schema(
  // NOTE first object passed to the Scema class is an object containing validation for the data we are storing in our database
  {
    make: { type: String, required: true, maxLength: 20 },
    model: { type: String, required: true, maxLength: 50 },
    price: { type: Number, required: true, min: 0, max: 1000000 },
    year: { type: Number, required: true, min: 1886, max: new Date().getUTCFullYear() },
    runs: { type: Boolean, required: true, default: true },
    color: { type: String, required: true, minLength: 4, maxLength: 7, default: '#000000' },
    imgUrl: { type: String, required: true, minLength: 20, maxLength: 500 },
    mileage: { type: Number, required: true, min: 1, max: 500000 },
    description: { type: String, maxLength: 500 },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
  },
  // NOTE second argument is an object with options we can turn on for the data retrieved from the database
  { timestamps: true, toJSON: { virtuals: true } }
)