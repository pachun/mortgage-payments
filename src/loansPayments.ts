import loansMonthlyPayment from "./loansMonthlyPayment"

const MONTHS_PER_YEAR = 12

const interestForNextPayment = (loan: Loan, previousPayments: Payment[]) => {
  const originalPrinciplePaid = 0
  const currentLoanBalance =
    loan.amount -
    previousPayments.reduce(
      (summedPrinciple, payment) => summedPrinciple + payment.principal,
      originalPrinciplePaid,
    )

  const interest = (currentLoanBalance * loan.interestRate) / MONTHS_PER_YEAR

  return interest
}

const payments = (loan: Loan): Payment[] => {
  const monthlyPayment = loansMonthlyPayment(loan)
  const { propertyTaxes, homeownersInsurance, mortgageInsurance } = loan
  const paymentRange = [...Array(MONTHS_PER_YEAR * loan.term)]
  const toIndividualPayments = (previousPayments: Payment[]): Payment[] => {
    const interest = interestForNextPayment(loan, previousPayments)
    const principal = monthlyPayment - interest

    return [
      ...previousPayments,
      {
        interest,
        principal,
        propertyTaxes,
        homeownersInsurance,
        mortgageInsurance,
      },
    ]
  }

  return paymentRange.reduce(toIndividualPayments, [])
}

export default payments
