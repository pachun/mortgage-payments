import monthlyPayment from "./monthlyPayment"

const MONTHS_PER_YEAR = 12

const interestForNextPayment = (loan: Loan, previousPayments: Payment[]) => {
  const originalPrinciplePaid = 0
  const currentLoanBalance =
    loan.amount -
    previousPayments.reduce(
      (summedPrinciple, payment) => summedPrinciple + payment.principle,
      originalPrinciplePaid,
    )

  const interest = (currentLoanBalance * loan.interestRate) / MONTHS_PER_YEAR

  return interest
}

const payments = (loan: Loan): Payment[] => {
  const loansMonthlyPayment = monthlyPayment(loan)
  const paymentRange = [...Array(MONTHS_PER_YEAR * loan.term)]
  const toIndividualPayments = (previousPayments: Payment[]): Payment[] => {
    const interest = interestForNextPayment(loan, previousPayments)
    const principle = loansMonthlyPayment - interest

    return [
      ...previousPayments,
      {
        interest,
        principle,
      },
    ]
  }

  return paymentRange.reduce(toIndividualPayments, [])
}

export default payments