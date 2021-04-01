import React from "react"

import loansMonthlyPayment from "../loansMonthlyPayment"

const usdCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

interface MonthlyPaymentProps {
  loan: Loan
}

const MonthlyPayment = ({ loan }: MonthlyPaymentProps) => {
  const monthlyPayment = React.useMemo(() => loansMonthlyPayment(loan), [loan])

  const displayedMonthlyLoanPayment =
    monthlyPayment && monthlyPayment !== Infinity
      ? usdCurrency.format(
          monthlyPayment +
            loan.propertyTaxes +
            loan.homeownersInsurance +
            loan.mortgageInsurance,
        )
      : usdCurrency.format(0)

  return <h1>Monthly Payment: {displayedMonthlyLoanPayment}</h1>
}

export default MonthlyPayment
