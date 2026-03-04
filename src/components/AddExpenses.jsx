import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const AddExpenses = () => {
    const [expenses, setExpenses] = useState({description: '', amount: "", date: new Date(), category: 'daily needs'})
    const supabase = createClient('https://eoqgkceqdsvmauukcvmh.supabase.co', 
        'sb_publishable_2ELdfYr9xZC0rHgtyQK1Ow_MTnpbSZD')

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const {error} = await supabase.from('familyExpensesData').insert(expenses).single()
        
        if(error) {
            console.error('Error inserting data:', error)
            return
        }
    }

    const category = ['Daily Needs', 'Food', 'Transport', 'Bills', 'Health', 'Education', 'Entertainment', 'Others']
    
    return (
        <form className="expense-form" onSubmit={handleSubmit}>
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