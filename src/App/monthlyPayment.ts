const MONTHS_PER_YEAR = 12

// https://www.thebalance.com/loan-payment-calculations-315564
const monthlyPayment = (loan: Loan): number => {
  const periodicInterestRate = loan.interestRate / MONTHS_PER_YEAR
  const numberOfPaymentPeriods = loan.term * MONTHS_PER_YEAR
  const monthlyPayment =
    loan.amount /
    ((Math.pow(1 + periodicInterestRate, numberOfPaymentPeriods) - 1) /
      (periodicInterestRate *
        Math.pow(1 + periodicInterestRate, numberOfPaymentPeriods)))
  const monthlyPaymentRoundedForCurrency =
    Math.round(monthlyPayment * 100) / 100
  return monthlyPaymentRoundedForCurrency
}

export default monthlyPayment
