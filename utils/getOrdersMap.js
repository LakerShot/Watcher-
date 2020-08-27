const moment = require('moment')

module.exports = (orders = []) => {
  const daysOrders = {}
  orders.forEach(order => {
    const date = moment(order.date).format('DD.MM.YYYY')

    if (date === moment().format('DD.MM.YYYY')) return

    if (!daysOrders[date]) daysOrders[date] = []

    daysOrders[date].push(order)
  })

  return daysOrders
} 