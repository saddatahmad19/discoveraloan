import React, { useState } from 'react'
import LoanJS from 'loanjs'
import {UserAuth} from '../config/authConfig'
import {db} from '../config/firebaseConfig'
import {setDoc, doc} from 'firebase/firestore'

const AddLoan = () => {
    const {user} = UserAuth(); 

    const [loanName, setLoanName] = useState('');
    const [rate, setRate] = useState(0);
    const [period, setPeriod] = useState(0);
    const [amount, setAmount] = useState(0);
    const [monthlyAmount, setMonthlyAmount] = useState(0);

    const handleMonthly = () => {
        let monthlyPayment = Payment(amount, rate, period);
        setMonthlyAmount(monthlyPayment);
    }

    const handleInfo = async() => {
        console.log(rate + " " + period + " " + amount);
        const monthlyPayment = Payment(amount, rate, period);
        let loc = "users/" + user.uid + "/loans";
        let id = makeid(28);
        await setDoc(doc(db, loc, id), {
            loanName: loanName,
            interestRate: rate,
            loanPeriod: period,
            loanAmount: amount,
            monthlyRate: monthlyPayment,
            docID: id
        }).catch((e) => {
            console.log(e)
        })
        window.location.reload(false);
        console.log("Document Added");


        function makeid(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i =  0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
    }

    function Payment(amount, rate, period){
        let cash = 0;
        let months = period * 12;
        let r = (rate/12) * 0.01;
        cash = amount/((1/r)*(1-(1/(1+r)**months)));

        return cash;
    }



    
  return (
    <div className='d-flex justify-content-center'>
        <div className='border mt-4'>
            <form className='col' onSubmit={handleInfo}>
                {user !== null &&
                <div className='row'>
                    <lable>Loan Name</lable>
                    <input placeholder='Loan Name' type='text' onChange={(e) => setLoanName(e.target.value)} required/>
                </div>
                }
               <div className='row'>
                    <lable>Interest Rate</lable>
                    <input placeholder='Interest Rate (%)' type='number' step='0.01' onChange={(e) => setRate(e.target.value)} required/>
                </div>

                <div className='row'>
                    <lable>Loan Period</lable>
                    <input placeholder='Loan Period (years)' type='number' step='0.01' onChange={(e) => setPeriod(e.target.value)} required/>
                </div>

                <div className='row'>
                    <lable>Loan Amount</lable>
                    <input placeholder='Loan Amount ($)' type='number' step='0.01' onChange={(e) => setAmount(e.target.value)} required/>
                </div>

                {/* <button type='button' className='btn' onClick={handleMonthly}>See Monthly Loan Payments</button> */}

                {user != null && <button type='submit' className='btn m-2'>Save Loan Details</button>}
                <button type='button' className='btn' onClick={handleMonthly}>See Monthly Loan Payments</button>

                {/* <button type='submit' className='btn m-2'>Save Loan Details</button> */}

            </form>

            {monthlyAmount !== 0 && 
            <div>
                <h1>Monthly Amount</h1>
                {monthlyAmount}
            </div>
            }
        </div>
        
    </div>
  )
}

export default AddLoan