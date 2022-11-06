import React from 'react'

const AddLoan = () => {
  return (
    <div className='d-flex justify-content-center'>
        <div className=''>
            <form className='col'>
                <div className='col-sm-4'>
                    <lable>Interest Rate</lable>
                    <input placeholder='Interest Rate (%)' type='number' step='0.01' />
                </div>

                <div className='col-sm-4'>
                    <lable>Loan Period</lable>
                    <input placeholder='Loan Period (years)' type='number' step='0.01' />
                </div>

                <div className='col-sm-4'>
                    <lable>Loan Period</lable>
                    <input placeholder='Loan Amount ($)' type='number' step='0.01' />
                </div>

                <button type='submit' >Submit Loan Details</button>

            </form>
        </div>
        
    </div>
  )
}

export default AddLoan