import mongoose, { Document } from "mongoose";

// Item interface
export interface ItemDoc extends Document {
  task: string;
  completed: boolean;
}
// List interface
export interface ListDoc extends Document {
  name: string;
  items: ItemDoc[];
}
// Item schema
const itemSchema = new mongoose.Schema({
  task: String,
  completed: Boolean,
});
// List schema
const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema],
});

export const Item = mongoose.model<ItemDoc>("Item", itemSchema);
export const List = mongoose.model<ListDoc>("List", listSchema);
