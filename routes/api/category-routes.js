const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: {
        model: Product,
        attributes: ["id", "product_name", "stock", "category_id"],
      },
    });
    const categoryList = categoryData.map((dbCatData) => {
      if (!dbCatData) {
        res.status(404).json({ message: "No categories found" });
      }
      dbCatData.get({ plain: true });
    });
    res.json(categoryList);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryId = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    });
    const categoryIdList = categoryId.map((dbCatData) => {
      if (!dbCatData) {
        res.status(404).json({ message: "No categories found" });
      }
      dbCatData.get({ plain: true });
    });
    res.json(categoryIdList);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
