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

import loansMonthlyPayment from "../loansMonthlyPayment"
import loansPayments from "../loansPayments"

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

interface PrincipalAndInterestChartProps {
  loan: Loan
}

const PrincipalAndInterestChart = ({
  loan,
}: PrincipalAndInterestChartProps) => {
  const monthlyPayment = React.useMemo(() => loansMonthlyPayment(loan), [loan])

  const payments = React.useMemo(
    () => (monthlyPayment ? loansPayments(loan) : []),
    [loan, monthlyPayment],
  )

  const displayedPaymentData = React.useMemo(
    () =>
      payments.map((payment, paymentNumber) => {
        return {
          name: `Year ${Math.floor(paymentNumber / 12) + 1}: ${
            months[paymentNumber % 12]
          }`,
          Principal: roundToTwoDecimals(payment.principal),
          Interest: roundToTwoDecimals(payment.interest),
          PropertyTaxes: roundToTwoDecimals(payment.propertyTaxes),
        }
      }),
    [payments],
  )

  return (
    <BarChart width={730} height={250} data={displayedPaymentData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Interest" fill="#8884d8" />
      <Bar dataKey="Principal" fill="#82ca9d" />
    </BarChart>
  )
}

export default PrincipalAndInterestChart
