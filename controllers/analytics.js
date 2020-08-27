const moment = require('moment')
const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')
const getOrdersMap = require('../utils/getOrdersMap')
const calculatePrice = require('../utils/calculatePrice')

module.exports.overview = async function(req, res) {
  try {
    const allOrders = await Order.find({user: req.user.id}).sort({date: 1})
    const ordersMap = getOrdersMap(allOrders)
    const yesterdayOrder = moment().add(-1, 'd').format('DD.MM.YYYY')
    const yesterdayOrders = ordersMap[yesterdayOrder] || []

    const yesterdayOrdersNumber = yesterdayOrders.length
    const totalOrdersNumber = allOrders.length
    const daysNumber = Object.keys(ordersMap).length
    const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0)

    const ordersPercent = (((yesterdayOrdersNumber / ordersPerDay) - 1) * 100).toFixed(2)

    const totalGain = calculatePrice(allOrders)
    const gainPerDay = totalGain / daysNumber
    const yesterdayGain = calculatePrice(yesterdayOrders)
    const gainPercent = (((yesterdayGain / gainPerDay) - 1) * 100).toFixed(2)
    const compareGain = (yesterdayGain - gainPerDay).toFixed(2)
    const compareNumber = (yesterdayOrdersNumber - ordersPerDay).toFixed(2)

    res.status(200).json({
      gain: {
        percent: Math.abs(+gainPercent),
        compare: Math.abs(+compareGain),
        yesterday: +yesterdayGain,
        isHigher: +gainPercent > 0
      },
      orders: {
        percent: Math.abs(+ordersPercent),
        compare: Math.abs(+compareNumber),
        yesterday: +yesterdayOrdersNumber,
        isHigher: +ordersPercent > 0
      }
    })

  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.analytics = async function(req, res) {
  try {
    const allOrders = await Order.find({user: req.user.id}).sort({date: 1})
    const ordersMap = getOrdersMap(allOrders)
    const average = +(calculatePrice(allOrders) / Object.keys(ordersMap).length).toFixed(2)
    const chart = Object.keys(ordersMap).map(lable => {
      const gain = calculatePrice(ordersMap[lable])
      const order = ordersMap[lable].length

      return {lable, gain, order}
    })

    res.status(200).json({average, chart})
  } catch (e) {
    errorHandler(res, e)
  }
}