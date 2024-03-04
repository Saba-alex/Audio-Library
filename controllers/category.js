const HttpError = require("../http.error");
const CategoryServices = require("../services/category");

const addCategory = async (req, res, next) => {
  const { name, description } = req.body;
  const createdBy = req.userData.userId; 

  try {
      const addedCategory = await CategoryServices.addCategory(name, description, createdBy);
      res.status(201).json(addedCategory);
  } catch (err) {
    const error = new HttpError("Could not add category", 500);
    return next(error);
  }
};

exports.addCategory = addCategory;
