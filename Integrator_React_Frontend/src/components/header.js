import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import logo from '../logo.png';

export default function Header() {
    
    const [dataProfile, setData] = useState({ profile: [] });
    
    useEffect(() => {
        axiosInstance.get(`user/authcheck/`).then((res) => {
            setData({ profile: res.data });			
        });        
    }, [setData]);
    
    return (
        <React.Fragment>            
            <nav className='navbar navbar-expand-lg navbar-dark bg-primary mb-4'>           
                <div className='container-fluid'>
                    <a className='navbar-brand py-2' href='/'><img src={logo} style={{ height:'60px' }} /></a>
                    <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>

                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav ml-auto'>

                            <li className='nav-item'>
                                <a className='nav-link' aria-current='page' href='/'>Home</a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link' href='/events'>Events</a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link' href='/locations'>Locations</a>
                            </li>                
                            
                            {dataProfile.profile.id !== null ?
                            <li className='nav-item'>
                                <a className='nav-link' href={"/profile/" + dataProfile.profile.id}>Profile</a>
                            </li> : null}                                       

                            {dataProfile.profile.id !== null ?
                            <li className='nav-item'>
                                <a className='nav-link' href='/logout'>Logout</a>
                            </li> : null}
                            
                            {dataProfile.profile.id === null ? 
                            <li className='nav-item'>
                                <a className='nav-link' href='/login'>Login</a>
                            </li> : null}

                            {dataProfile.profile.id === null ? 
                            <li className='nav-item'>
                                <a className='nav-link' href='/register'>Register</a>
                            </li> : null}
                        
                        </ul>                
                    </div>
                </div>            
            </nav>
        </React.Fragment>
    )
    
}