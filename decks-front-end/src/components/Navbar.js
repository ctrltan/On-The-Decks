import Nav from 'react'
import LoginButton from './auth/Login';
import LogoutButton from './auth/Logout';

export default function Navbar() {
    return (
        <nav className='navbar'>
            <div className='navbar-right'>
                <ul>
                    <li>
                        <LoginButton />
                    </li>
                    <li>
                        <LogoutButton />
                    </li>
                    <li>
                        <a href='/'>Home</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}