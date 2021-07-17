import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});
