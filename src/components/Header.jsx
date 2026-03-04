import logo from '../assets/familyExpensesAppLogo.png'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <header>
                <img src={logo} alt="Family Expenses App Logo" className="logo" />
                <h1>Family Expenses App</h1>
            </header>
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