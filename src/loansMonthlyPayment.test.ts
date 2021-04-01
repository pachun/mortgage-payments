import loansMonthlyPayment from "./loansMonthlyPayment"

// https://www.thebalance.com/loan-payment-calculations-315564
test("monthlyPayment(loan) returns the loans monthly payment", () => {
  const monthlyPayment1 = loansMonthlyPayment({
    amount: 100_000,
    interestRate: 0.06,
    term: 30,
    propertyTaxes: 0,
    mortgageInsurance: 0,
    homeownersInsurance: 0,
  })

  expect(monthlyPayment1).toEqual(599.55)
})
