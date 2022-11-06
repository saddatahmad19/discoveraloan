import { deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { UserAuth } from '../config/authConfig';
import {db} from '../config/firebaseConfig'

const Loan = ({name, interestRate, period, amount, monthlyAmount, id}) => {
    const {user} = UserAuth();

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

    const deleteDocument = async() => {
        const ref = 'users/' + user.uid + '/loans'
        let deleting = await deleteDoc(doc(db, ref, id));
        deleting.toPromise();
        console.log(deleting)
    }


  return (
    <div className='row card'>
        <div>

            <div className=''>
                {name}
            </div>
            <div className=''>
                Interest Rate: {interestRate}%
            </div>
            <div className=''>
                Loan Period: {period} Years
            </div>
            <div className=''>
                Loan Amount: ${amount}        
            </div>
            <div className=''>
                Monthly Amount: ${monthlyAmount.toFixed(2)}        
            </div>
            <button type='button' onClick={deleteDocument} className='btn btn-outline-light'>
                <span class="badge badge-pill badge-danger">x</span>
            </button>
            
        </div>
        
    </div>
  )
}

export default Loan