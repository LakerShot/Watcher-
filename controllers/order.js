const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

// example -> localhost:5000/api/order?offset=5&limit=20    limit - amount of elements    offset - how much element we have to skip
module.exports.getAll = async function(req, res) {
  const query = {
    user: req.user.id
  }

  if (req.query.start) {
    //greater or equal. take orders that (greater/equal) (than/to) the start (by date)
    // it means that we recive the date that GTE or EQ start and put it in query.date (condition down below)
    query.date = { $gte: req.query.start }
  }

  if (req.query.end) {
    
    if (!query.date) query.date = {}

    query.date['$lte'] = req.query.end
  }

  if (req.query.order) {
    query.order = +req.query.order
  }

  try {
    const orders = await Order.find(query)
      .sort({date: -1})
      .skip(+req.query.offset)
      .limit(+req.query.limit)
      // add + cus we retrive a string and we have to convert it to a number. one way is a add +, second way is a wrapp it ParseInt(str, base).
      // skip() - method for pagination. Check more about it -> (https://docs.mongodb.com/manual/reference/method/cursor.skip/#pagination-example)

      res.status(200).json(orders)
  } catch (e) {
    errorHandler(req, e)
  }
}

module.exports.create = async function(req, res) {
  try {
    const lastOrder = await Order.findOne({user: req.user.id}).sort({date: -1})
    // sort it's a server method that we can easily retrieve newest order by date from server 

    const maxOrder = lastOrder ? lastOrder.order : 0

    const order = await new Order({
      list: req.body.list,
      user: req.user.id,
      order: maxOrder + 1
    }).save()

    res.status(201).json(order)
  } catch (e) {
    errorHandler(req, e)
  }
}