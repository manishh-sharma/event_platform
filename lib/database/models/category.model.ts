import { Document, Schema, model, models } from "mongoose";
//to create schema for category of events and theeir types to be saved in mongo
export interface ICategory extends Document {
  _id: string;
  name: string;
}

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
})

const Category = models.Category || model('Category', CategorySchema);

export default Category;