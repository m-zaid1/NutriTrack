import Food from "../models/foodModel.js";
import DiscountHistory from "../models/DiscountHistory.js";

// Apply Discount to Selected Categories
export const applyDiscount = async (req, res) => {
  try {
    const { categories, discount } = req.body;

    if (!categories || categories.length === 0 || !discount) {
      return res.status(400).json({ success: false, message: "Invalid input data." });
    }

    // Update Prices of Products in Selected Categories
    const foodItems = await Food.find({ category: { $in: categories } });
    const updatedProducts = await Food.updateMany(
      { category: { $in: categories } },
      { $mul: { price: 1 - discount / 100 } }
    );

    // Save Discount History
    const discountHistory = new DiscountHistory({
      categories,
      discount,
      products: foodItems.map(item => ({
        name: item.name,
        previousPrice: item.price,
        discountedPrice: item.price * (1 - discount / 100),
      })),
    });
    await discountHistory.save();

    return res.status(200).json({
      success: true,
      message: `Discount applied successfully to ${updatedProducts.modifiedCount} products.`,
    });
  } catch (error) {
    console.error("Error applying discount:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again.",
    });
  }
};

//Fetch Discount History
export const getDiscountHistory = async (req, res) => {
  try {
    const history = await DiscountHistory.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, history });
  } catch (error) {
    console.error("Error fetching discount history:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again.",
    });
  }
};


// Revert Discount
export const revertDiscount = async (req, res) => {
  try {
    const { historyId } = req.params;

    // Find Discount History Entry
    const historyEntry = await DiscountHistory.findById(historyId);
    if (!historyEntry) {
      return res.status(404).json({ success: false, message: "Discount history not found." });
    }

    // Revert Prices for Associated Products
    for (const product of historyEntry.products) {
      await Food.updateOne(
        { name: product.name },
        { $set: { price: product.previousPrice } }
      );
    }

    // Remove Discount History Entry
    await DiscountHistory.findByIdAndDelete(historyId);

    return res.status(200).json({
      success: true,
      message: "Discount reverted successfully.",
    });
  } catch (error) {
    console.error("Error reverting discount:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again.",
    });
  }
};
