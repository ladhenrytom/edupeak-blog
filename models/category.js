import mongoose from "mongoose";

const {Schema, model, models} = mongoose;

const categorySchema = new Schema({
  category: {
    type: String,
    maxLength: 50,
  },
});

const Category = models.Category || model("Category", categorySchema);
export default Category;
