const MONTHS_PER_YEAR = 12

const roundToTwoDecimals = (num: number) => Math.round(num * 100) / 100

// https://www.thebalance.com/loan-payment-calculations-315564
const monthlyPayment = (loan: Loan): number => {
  const periodicInterestRate = loan.interestRate / MONTHS_PER_YEAR
  const numberOfPaymentPeriods = loan.term * MONTHS_PER_YEAR
  const monthlyPayment =
    loan.amount /
    ((Math.pow(1 + periodicInterestRate, numberOfPaymentPeriods) - 1) /
      (periodicInterestRate *
        Math.pow(1 + periodicInterestRate, numberOfPaymentPeriods)))
  const monthlyPaymentRoundedForCurrency = roundToTwoDecimals(monthlyPayment)
  return monthlyPaymentRoundedForCurrency
}

export default monthlyPayment
