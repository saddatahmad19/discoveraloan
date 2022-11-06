import React, { useState } from 'react'
import {UserAuth} from '../config/authConfig'
import {db} from '../config/firebaseConfig'
import {setDoc, doc} from 'firebase/firestore'

const AddLoan = () => {
    const {user} = UserAuth(); 

    const [loanName, setLoanName] = useState('');
    const [rate, setRate] = useState(0);
    const [period, setPeriod] = useState(0);
    const [amount, setAmount] = useState(0);

    const handleInfo = async() => {
        console.log(rate + " " + period + " " + amount);
        let loc = "users/" + user.uid + "/loans";
        await setDoc(doc(db, loc, makeid(28)), {
            loanName: loanName,
            interestRate: rate,
            loanPeriod: period,
            loanAmount: amount
        }).catch((e) => {
            console.log(e)
        })
        window.location.reload(false)
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


  return (
    <div className='d-flex justify-content-center'>
        <div className='border mt-4'>
            <form className='col' onSubmit={handleInfo}>

                <div className='row'>
                    <lable>Loan Name</lable>
                    <input placeholder='Loan Name' type='text' onChange={(e) => setLoanName(e.target.value)} required/>
                </div>

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

                <button type='submit'>Submit Loan Details</button>

            </form>
        </div>
        
    </div>
  )
}

export default AddLoan