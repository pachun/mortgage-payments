import React from "react"

interface LoanFormProps {
  loan: Loan
  setLoan: (loan: Loan) => void
}

const LoanForm = ({ loan, setLoan }: LoanFormProps) => {
  const displayedAmount = loan.amount === 0 ? "" : loan.amount
  const displayedInterestRate = loan.interestRate ? loan.interestRate : "0.0"
  const displayedTerm = loan.term === 0 ? "" : loan.term
  const displayedPropertyTaxes =
    loan.propertyTaxes === 0 ? "" : loan.propertyTaxes
  const displayedHomeownersInsurance =
    loan.homeownersInsurance === 0 ? "" : loan.homeownersInsurance
  const displayedMortgageInsurance =
    loan.mortgageInsurance === 0 ? "" : loan.mortgageInsurance
  return (
    <form>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label>Amount</label>
        <input
          type="number"
          min={0}
          value={displayedAmount}
          onChange={e => setLoan({ ...loan, amount: Number(e.target.value) })}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label>Interest Rate</label>
        <input
          type="number"
          min={0}
          step={0.0001}
          value={displayedInterestRate}
          onChange={e =>
            setLoan({ ...loan, interestRate: Number(e.target.value) })
          }
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label>Term</label>
        <input
          type="number"
          min={1}
          value={displayedTerm}
          onChange={e => setLoan({ ...loan, term: Number(e.target.value) })}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label style={{ color: "#777" }}>Property Taxes</label>
        <input
          type="number"
          min={0}
          value={displayedPropertyTaxes}
          onChange={e =>
            setLoan({ ...loan, propertyTaxes: Number(e.target.value) })
          }
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label style={{ color: "#777" }}>Homeowner's Insurance</label>
        <input
          type="number"
          min={0}
          value={displayedHomeownersInsurance}
          onChange={e =>
            setLoan({ ...loan, homeownersInsurance: Number(e.target.value) })
          }
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label style={{ color: "#777" }}>Mortgage Insurance</label>
        <input
          type="number"
          min={0}
          value={displayedMortgageInsurance}
          onChange={e =>
            setLoan({ ...loan, mortgageInsurance: Number(e.target.value) })
          }
        />
      </div>
    </form>
  )
}

export default LoanForm
