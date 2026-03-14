import logo from '../assets/familyExpensesAppLogo.png'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <header>
                <img src={logo} alt="Family Expenses App Logo" className="logo" />
                <h1>Family Expenses App</h1>
            </header>
            {/* <div className="auth-container">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" placeholder="Enter your username" />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" />
                <div style={{display: "grid", gridTemplateColumns: "1fr 1fr"}}>
                    <button style={{width: "100px", height: "40px", fontSize: "14px"}} 
                        className="login-btn"
                    >Login</button>
                    <button style={{width: "100px", height: "40px", fontSize: "14px"}} 
                        className="register-btn"
                    >Register</button>
                </div>
            </div> */}
            <nav>
                <NavLink to="/add-expense" className={({isActive}) => isActive?"nav-link active":"nav-link"}>
                    Add Expense
                </NavLink>
                <NavLink to="/history" className={({isActive}) => isActive?"nav-link active":"nav-link"}>
                    History
                </NavLink>
                <NavLink to="/summary" className={({isActive}) => isActive?"nav-link active":"nav-link"}>
                    Summary
                </NavLink>
            </nav>
        </>
    )
}

export default Header