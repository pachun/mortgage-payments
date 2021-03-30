import React from "react"
import monthlyPayment from "./monthlyPayment"

// const numberToPercentage = (num: number): string => (num * 100).toFixed(3)
// const percentageToNumber = (percentage: number): number => percentage / 100

const App = () => {
  const [amount, setAmount] = React.useState(265_240)
  const [interestRate, setInterestRate] = React.useState(0.05)
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

  return (
    <div>
      <form>
        <label>Amount</label>
        <input
          type="number"
          min={0}
          value={displayedAmount}
          onChange={e => setAmount(Number(e.target.value))}
        />
        <label>Interest Rate</label>
        <input
          type="number"
          min={0}
          step={0.0001}
          value={displayedInterestRate}
          onChange={e => setInterestRate(Number(e.target.value))}
        />
        <label>Term</label>
        <input
          type="number"
          min={1}
          value={displayedTerm}
          onChange={e => setTerm(Number(e.target.value))}
        />
      </form>
      <h1>Monthly Payment: ${displayedMonthlyLoanPayment}</h1>
    </div>
  )
}

export default App
