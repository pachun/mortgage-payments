import React from "react"
import monthlyPayment from "./monthlyPayment"
import payments from "./payments"

const App = () => {
  const [amount, setAmount] = React.useState(265_240)
  const [interestRate, setInterestRate] = React.useState(0.03625)
  const [term, setTerm] = React.useState(30)
  const loansMonthlyPayment = React.useMemo(
    () => monthlyPayment({ amount, interestRate, term }),
    [amount, interestRate, term],
  )

  const displayedAmount = amount === 0 ? "" : amount
  const displayedInterestRate = interestRate ? interestRate : "0.0"
  const displayedTerm = term === 0 ? "" : term
  const displayedMonthlyLoanPayment = (loansMonthlyPayment
    ? loansMonthlyPayment
    : 0
  ).toFixed(2)

  const loansPayments = React.useMemo(
    () => (loansMonthlyPayment ? payments({ amount, interestRate, term }) : []),
    [amount, interestRate, term, loansMonthlyPayment],
  )
  console.log(loansPayments)
  console.log(
    `total principle = ${loansPayments.reduce(
      (summedPrinciple: number, currentPayment: Payment) => {
        return summedPrinciple + currentPayment.principle
      },
      0,
    )}`,
  )
  console.log(
    `total interest = ${loansPayments.reduce(
      (summedInterest: number, currentPayment: Payment) => {
        return summedInterest + currentPayment.interest
      },
      0,
    )}`,
  )

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <div style={{ width: 500 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h4>Amortized Loan Calculator</h4>
        </div>
        <form>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label>Amount</label>
            <input
              type="number"
              min={0}
              value={displayedAmount}
              onChange={e => setAmount(Number(e.target.value))}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label>Interest Rate</label>
            <input
              type="number"
              min={0}
              step={0.0001}
              value={displayedInterestRate}
              onChange={e => setInterestRate(Number(e.target.value))}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label>Term</label>
            <input
              type="number"
              min={1}
              value={displayedTerm}
              onChange={e => setTerm(Number(e.target.value))}
            />
          </div>
        </form>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>Monthly Payment: ${displayedMonthlyLoanPayment}</h1>
        </div>
      </div>
    </div>
  )
}

export default App
