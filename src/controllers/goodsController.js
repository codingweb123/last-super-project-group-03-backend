import createHttpError from 'http-errors';

import { Good } from '../models/good.js';

export async function getAllGoods(req, res) {
  const {
    category,
    sizes,
    fromPrice = 1,
    toPrice = 20000,
    color,
    gender,
    page = 1,
    perPage = 12,
  } = req.query;

  const skip = (page - 1) * perPage;

  const goodsQuery = Good.find()
    .populate('feedbacks')
    .where('price.value')
    .gte(fromPrice)
    .lte(toPrice);

  if (category) goodsQuery.where('category').equals(category);
  if (sizes) goodsQuery.where('sizes').in(sizes.split(','));
  if (color) goodsQuery.where('colors').in(color);
  if (gender) goodsQuery.where('gender').equals(gender);

  const [totalGoods, goods] = await Promise.all([
    goodsQuery.clone().countDocuments(),
    goodsQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalGoods / perPage);

  res.status(200).json({
    page,
    perPage,
    totalGoods,
    totalPages,
    goods,
  });
}

export async function getGoodById(req, res, next) {
  const good = await Good.findById(req.params.goodId);
  // Checks if there's no good.
  if (!good) {
    next(createHttpError(404, 'Good not found'));
    return;
  }

  res.status(200).json(good);
}
