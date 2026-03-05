import { useState } from 'react'
import { supabase } from './supabase-client'

const AddExpenses = () => {
    const [expenses, setExpenses] = useState({description: '', amount: "", date: new Date(), category: 'Daily Needs'})
    const [showModal, setShowModal] = useState(false)
    const [modalMessage, setModalMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const {error} = await supabase.from('familyExpensesData').insert(expenses).single()
        
        if(error) {
            console.error('Error inserting data:', error)
            setModalMessage('Error Adding')
            setShowModal(true)
            setTimeout(() => {
                setShowModal(false)
            }, 1000)
            return
        }

        setShowModal(true)
        setModalMessage('Expense Added')
        setTimeout(() => {
            setShowModal(false)
        }, 1000)

        setExpenses({description: '', amount: "", date: new Date(), category: 'Daily Needs'})
    }

    const category = ['Daily Needs', 'Food', 'Transport', 'Bills', 'Health', 'Education', 'Entertainment', 'Others']
    
    return (
        <form className="expense-form" onSubmit={handleSubmit}>
            <div className="modal-container" style={{display: showModal ? 'flex' : 'none'}}>
                <div className="modal-content">
                    <h2>{modalMessage}</h2>
                </div>
            </div>
            <label htmlFor="description">Description:</label>
            <input 
                type="text" 
                id="description" 
                name="description" 
                required
                placeholder='Type your expense' 
                value={expenses.description} 
                onChange={(e) => setExpenses(prev => (
                    {...prev, description: e.target.value}
                ))}
            />
            <label htmlFor="amount">Amount:</label>
            <input 
                type="number" 
                id="amount" 
                name="amount" 
                required
                placeholder='20.000' 
                value={expenses.amount} 
                onChange={(e) => setExpenses(prev => (
                    {...prev, amount: parseInt(e.target.value) || 0}
                ))}
            />
            <label htmlFor="date">Date:</label>
            <input 
                type="date" 
                id="date"
                name="date"
                value={expenses.date.toISOString().split('T')[0]}
                onChange={(e) => setExpenses(prev => (
                    {...prev, date: new Date(e.target.value)}
                ))}
            />
            <label htmlFor="category">Category:</label>
            <select 
                id="category"
                name="category"
                value={expenses.category}
                onChange={(e) => setExpenses(prev => (
                    {...prev, category: e.target.value}
                ))}
            >
                {category.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>
            <button type="submit">Add Expense</button>
        </form>
    )
}

export default AddExpenses