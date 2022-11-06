import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Loan from '../components/Loan';
import { collection } from "firebase/firestore"
import { UserAuth } from '../config/authConfig';
import { db } from '../config/firebaseConfig'
import { deepCopy } from '@firebase/util';

const LoanView = () => {
    const {user} = UserAuth();

    
    const dir = "users/" + user.uid + "/loans"
    const q = collection(db, dir);
    const [docs, loading, error] = useCollectionData(q)

  return (
    <div className='container'>
        <div>
            {loading && "Loading..."}
            {error && "There was an error loading your investments. Please try again later."}
            {
                docs?.map(function(doc, key) {
                    console.log(doc);
                    return <Loan name={doc.loanName} interestRate={doc.interestRate} period={doc.loanPeriod} amount={doc.loanAmount} monthlyAmount={doc.monthlyRate} docID={doc.docID} key={key}/>
            })
            }
        </div>
    </div>
  )
}

export default LoanView