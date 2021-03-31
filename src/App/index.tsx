import React from "react"
import {
  BarChart,
  Bar,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

import monthlyPayment from "./monthlyPayment"
import payments from "./payments"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const roundToTwoDecimals = (num: number) => Math.round(num * 100) / 100

const usdCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

const App = () => {
  const [amount, setAmount] = React.useState(265_240)
  const [interestRate, setInterestRate] = React.useState(0.03625)
  const [term, setTerm] = React.useState(30)
  const loansMonthlyPayment = React.useMemo(
    () => monthlyPayment({ amount, interestRate, term }),
    [amount, interestRate, term],
  )

  const loansPayments = React.useMemo(
    () => (loansMonthlyPayment ? payments({ amount, interestRate, term }) : []),
    [amount, interestRate, term, loansMonthlyPayment],
  )

  const initialInterestPaid = 0
  const lifetimeInterest = React.useMemo(
    () =>
      loansPayments.reduce(
        (summedInterest, payment) => summedInterest + payment.interest,
        initialInterestPaid,
      ),
    [loansPayments],
  )

  const displayedAmount = amount === 0 ? "" : amount
  const displayedInterestRate = interestRate ? interestRate : "0.0"
  const displayedTerm = term === 0 ? "" : term
  const displayedMonthlyLoanPayment =
    loansMonthlyPayment && loansMonthlyPayment !== Infinity
      ? usdCurrency.format(loansMonthlyPayment)
      : usdCurrency.format(0)
  const displayedPaymentData = React.useMemo(
    () =>
      loansPayments.map((payment, paymentNumber) => {
        return {
          name: `Year ${Math.floor(paymentNumber / 12) + 1}: ${
            months[paymentNumber % 12]
          }`,
          Principal: roundToTwoDecimals(payment.principle),
          Interest: roundToTwoDecimals(payment.interest),
        }
      }),
    [loansPayments],
  )
  const displayedLifetimeInterest = lifetimeInterest
    ? usdCurrency.format(lifetimeInterest)
    : usdCurrency.format(0)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 100,
      }}
    >
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
          <h1>Monthly Payment: {displayedMonthlyLoanPayment}</h1>
        </div>
      </div>
      <BarChart width={730} height={250} data={displayedPaymentData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Interest" fill="#8884d8" />
        <Bar dataKey="Principal" fill="#82ca9d" />
      </BarChart>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Lifetime Interest: {displayedLifetimeInterest}</h1>
      </div>
    </div>
  )
}

export default App
