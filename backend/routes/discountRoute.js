import express from "express";
import { applyDiscount, getDiscountHistory, revertDiscount } from "../controllers/discountController.js";

const discountRouter = express.Router();

// Route for Applying Discount
discountRouter.post("/apply", applyDiscount);

// Route for Fetching Discount History
discountRouter.get("/history", getDiscountHistory);

// Route for Reverting Discount
discountRouter.delete("/revert/:historyId", revertDiscount);

export default discountRouter;
