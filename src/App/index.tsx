import React from "react"

import LoanForm from "../LoanForm"
import MonthlyPayment from "../MonthlyPayment"
import PrincipalAndInterestChart from "../PrincipalAndInterestChart"
import LifetimeInterest from "../LifetimeInterest"

const App = () => {
  const [loan, setLoan] = React.useState<Loan>({
    amount: 265_240,
    interestRate: 0.03625,
    term: 30,
    propertyTaxes: 0,
    homeownersInsurance: 0,
    mortgageInsurance: 0,
  })

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 100,
      }}
    >
      <h4>Amortized Loan Calculator</h4>
      <LoanForm loan={loan} setLoan={setLoan} />
      <MonthlyPayment loan={loan} />
      <PrincipalAndInterestChart loan={loan} />
      <LifetimeInterest loan={loan} />
    </div>
  )
}

export default App
