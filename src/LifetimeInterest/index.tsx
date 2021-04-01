import React from "react"
import loansMonthlyPayment from "../loansMonthlyPayment"
import loansPayments from "../loansPayments"

const usdCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

interface LifetimeInterestProps {
  loan: Loan
}

const LifetimeInterest = ({ loan }: LifetimeInterestProps) => {
  const monthlyPayment = React.useMemo(() => loansMonthlyPayment(loan), [loan])

  const payments = React.useMemo(
    () => (monthlyPayment ? loansPayments(loan) : []),
    [loan, monthlyPayment],
  )

  const initialInterestPaid = 0
  const lifetimeInterest = React.useMemo(
    () =>
      payments.reduce(
        (summedInterest, payment) => summedInterest + payment.interest,
        initialInterestPaid,
      ),
    [payments],
  )

  const displayedLifetimeInterest = lifetimeInterest
    ? usdCurrency.format(lifetimeInterest)
    : usdCurrency.format(0)
  return <h1>Lifetime Interest: {displayedLifetimeInterest}</h1>
}

export default LifetimeInterest
