const Category = require("../models/category");

const addCategory = async (name, description) => {
  try {
    const category = new Category({ name, description });
    await category.save();
    return category;
  } catch (err) {
    console.log(`could not add any category ${err}`);
    throw err;
  }
};

exports.addCategory = addCategory;
 
