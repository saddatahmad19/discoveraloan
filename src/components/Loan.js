import React, { useEffect, useState } from 'react'

const Loan = ({name, interestRate, period, amount}) => {
    const [compRate, setCompRate] = useState(0);
    const [compPeriod, setCompPeriod] = useState(0);
    const [compAmount, setCompAmount] = useState(0);

    useEffect(() => {
        function setStates() {
            setCompRate(interestRate);
            setCompPeriod(period);
            setCompAmount(amount)
            console.log(compRate + " " + compPeriod + " " + compAmount);
        }
        setStates();
    }, [])



  return (
    <div className='row card'>
        <div className=''>
            {name}
        </div>
        <div className=''>
            Interest Rate: {interestRate}%
        </div>
        <div className=''>
            Loan Period: 
            {period} Years
        </div>
        <div className=''>
            Loan Amount: ${amount}        
        </div>
    </div>
  )
}

export default Loan