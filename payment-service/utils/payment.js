class PaymentUtils {
  caculateDiscountPrice = (basePrice, voucher) => {
    switch (voucher.type) {
      case "Fixed": {
        return Math.min(basePrice, voucher.amount)
      }
      case "Percentage": {
        return basePrice * voucher.amount / 100
      }
    }
    return 0
  }
}

module.exports = new PaymentUtils()