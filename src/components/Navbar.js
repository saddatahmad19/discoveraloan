import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import { UserAuth } from '../config/authConfig';

const Navbar = () => {
    const {user, logOut} = UserAuth(); 

    const handleSignOut = async() => {
        try {
            await logOut();
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     if (user != null) {
    //         nav('/portfolio')
    //     }
    // }, [user])

    const [show, setShow] = useState(true);

  return (
    <div>
        <nav className="navbar navbar-inverse navbar-expand-lg navbar-light bg-light">
            <div className='container-fluid'>

                <a className="navbar-brand" href="#">InvestATrack</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" onClick={() => {setShow(!show)}}>
                    <span class="navbar-toggler-icon"></span>
                </button>

                
                <div className={show ? "collapse navbar-collapse" : "collapse show collapsing navbar-collapse"} id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                        <li className="nav-item">
                            <Link to='/' className='nav-link'>Home</Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link to='/calculateloans' className='nav-link'>Loan Calculations</Link>
                        </li>
                        
                        
                        {user != null && 
                            <li className="nav-item">
                                <Link to='/viewloans' className='nav-link'>Your Loans</Link>
                            </li>
                        }
                    
                    </ul>
                    {user?.displayName ? <button className='btn btn-outline-danger my-2 my-sm-0 mr-2' onClick={handleSignOut}>Logout</button> : 
                    <Link to='/login'>
                        <button className="btn btn-outline-success my-2 my-sm-0 mr-2" data-mdb-ripple-centered="true">Login</button>
                    </Link>
                    }

                </div>
            </div>

            </nav>
    </div>
  )
}

export default Navbar