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
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    });
    const categoryList = categoryData.map((catData) =>
      catData.get({ plain: true })
    );
    if (!categoryList) {
      res.status(404).json({ message: "No categories were found" });
    }
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
    if (!categoryId) {
      res.status(404).json({ message: "No category ID was found!!!" });
    }
    res.json(categoryId);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const postCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.json(postCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(updateCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryDelete = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(categoryDelete);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
