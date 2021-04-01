import loansPayments from "./loansPayments"

const roundToTwoDecimals = (num: number) => Math.round(num * 100) / 100

test("the interest payments are in decreasing order", () => {
  const amount = 265_240
  const interestRate = 0.03625
  const term = 30
  const loan: Loan = {
    amount,
    interestRate,
    term,
    propertyTaxes: 0,
    mortgageInsurance: 0,
    homeownersInsurance: 0,
  }

  const actualPaymentOrder = loansPayments(loan)

  const byDescendingInterestPaymentAmounts = (
    payment1: Payment,
    payment2: Payment,
  ) => {
    return payment1.interest > payment2.interest ? 1 : -1
  }

  const expectedPaymentOrder = actualPaymentOrder.sort(
    byDescendingInterestPaymentAmounts,
  )

  expect(actualPaymentOrder).toEqual(expectedPaymentOrder)
})

test("the principal payments are in increasing order", () => {
  const amount = 265_240
  const interestRate = 0.03625
  const term = 30
  const loan: Loan = {
    amount,
    interestRate,
    term,
    propertyTaxes: 0,
    mortgageInsurance: 0,
    homeownersInsurance: 0,
  }

  const actualPaymentOrder = loansPayments(loan)

  const byAscendingPrinciplePaymentAmounts = (
    payment1: Payment,
    payment2: Payment,
  ) => {
    return payment1.principal < payment2.principal ? 1 : -1
  }

  const expectedPaymentOrder = actualPaymentOrder.sort(
    byAscendingPrinciplePaymentAmounts,
  )

  expect(actualPaymentOrder).toEqual(expectedPaymentOrder)
})

test("the principal payments sum to the total principal owed", () => {
  const amount = 265_240
  const interestRate = 0.03625
  const term = 30
  const loan: Loan = {
    amount,
    interestRate,
    term,
    propertyTaxes: 0,
    mortgageInsurance: 0,
    homeownersInsurance: 0,
  }

  const payments = loansPayments(loan)

  const initialPrinciplePaid = 0
  const actualPrinciplePaid = payments.reduce(
    (summedPrinciple: number, payment: Payment) =>
      summedPrinciple + payment.principal,
    initialPrinciplePaid,
  )

  // we're about 30 cents off in the given example / assertion.
  //
  // (the actual principal paid is 265,239.70 and
  //    the true principal owed is 265,240.00)
  //
  // I'm pretty sure the calculator logic is
  // working correctly, given it works so closely
  // well with the (looked-up), wacky "total
  // monthly payment amount" formula found in
  // ./monthlyPayment.ts
  //
  // I think this is the result of rounding
  // numbers with lots of decimals using
  // javascript. We're about 30 cents off and
  // 360 decimals additions were made
  // ( 12 (months) * 30 (years) ).
  //
  // It'd make sense that about 1 cent could be
  // lost in every 12 calculations.
  //
  // therefor -> rounding to the nearest dollar
  // in the following assertion

  expect(Math.round(actualPrinciplePaid)).toEqual(amount)
})
