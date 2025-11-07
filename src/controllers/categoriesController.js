import { Category } from '../models/category.js';

export async function getAllCategories(req, res) {
  const { page = 1, perPage = 6 } = req.query;

  const skip = (page - 1) * perPage;

  const categoriesQuery = Category.find();

  const [totalCategories, categories] = await Promise.all([
    categoriesQuery.clone().countDocuments(),
    categoriesQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalCategories / perPage);

  res.status(200).json({
    page,
    perPage,
    totalCategories,
    totalPages,
    categories,
  });
}
