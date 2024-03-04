const HttpError = require("../http.error");
const Category = require("../models/category");

const addCategory = async (name, description, createdBy) => {
  const category = new Category({ name, description, createdBy });
  const savedCategory = await category.save();

  if (!savedCategory) {
      const error = new HttpError('Could not add category',500);
      throw error;
  }

  return savedCategory;
};

exports.addCategory = addCategory;
 
