import { supabase } from "./supabase-client"
import { useState, useEffect } from "react"

const Summary = () => {
    const [expenses, setExpenses] = useState([])
    const [total, setTotal] = useState(0)
    const [totalByCategory, setTotalByCategory] = useState({
        "Daily Needs": 0,
        "Food": 0,
        "Transport": 0,
        "Bills": 0,
        "Health": 0,
        "Education": 0,
        "Entertainment": 0,
        "Others": 0
    })
    const [totalTransactions, setTotalTransactions] = useState(0)
    const [averageExpense, setAverageExpense] = useState(0)

    const fetchTask = async () => {
        const {error, data} = await supabase.from('familyExpensesData').select('*').order('id', {ascending: true})
        setExpenses(data)
    }

    useEffect(() => {
        fetchTask()
    }, [])

    useEffect(() => {
        let newTotal = 0
        const newTotalByCategory = {
            "Daily Needs": 0,
            "Food": 0,
            "Transport": 0,
            "Bills": 0,
            "Health": 0,
            "Education": 0,
            "Entertainment": 0,
            "Others": 0
        }
        let newTotalTransactions = 0
        let newAverageExpense = 0

        expenses.forEach(expense => {
            newTotal += parseInt(expense.amount)
            newTotalByCategory[expense.category] += parseInt(expense.amount)
            newTotalTransactions++
            newAverageExpense = newTotal / newTotalTransactions
        })
        setTotal(newTotal)
        setTotalByCategory(newTotalByCategory)
        setTotalTransactions(newTotalTransactions)
        setAverageExpense(newAverageExpense)

    }, [expenses])

    const showInRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount)
    }

    return (
        <div className="summary-container">
            <h2>Summary</h2>
            <p>Total amount expenses: {showInRupiah(total) }</p>
            <p>Expenses by Category: 
                <ul>
                    {Object.entries(totalByCategory).map(([category, amount]) => (
                        <li key={category}>
                            {category}: {showInRupiah(amount)}
                        </li>
                    ))}
                </ul>
            </p>
            <p>Total transactions: {totalTransactions}</p>
            <p>Average expense: {showInRupiah(averageExpense)}</p>
            {/* <button type="button" className="reset-btn">Save this month's summary and reset history</button> */}
        </div>
    )
}

export default Summary