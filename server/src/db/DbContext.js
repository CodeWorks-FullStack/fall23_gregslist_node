import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { CarSchema } from '../models/Car.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  // NOTE creates a new collection in our mongodb database
  // NOTE the first argument passed to the model method names our collection, and the second argument applies our schema restrictions to the collection
  Cars = mongoose.model('Car', CarSchema)
}

export const dbContext = new DbContext()
