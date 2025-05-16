import mongoose from "mongoose";

const DiscountHistorySchema = new mongoose.Schema({
  categories: [String],
  discount: Number,
  products: [
    {
      name: String,
      previousPrice: Number,
      discountedPrice: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const DiscountHistory = mongoose.model("DiscountHistory", DiscountHistorySchema);
export default DiscountHistory;
