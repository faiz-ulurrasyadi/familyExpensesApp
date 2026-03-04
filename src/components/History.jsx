import { supabase } from "./supabase-client"
import { useState, useEffect, use } from "react"

const History = () => {
    const [expenses, setExpenses] = useState([])
    const [newDescription, setNewDescription] = useState('')
    const [newAmount, setNewAmount] = useState('')
    const [newDate, setNewDate] = useState(new Date())
    const [newCategory, setNewCategory] = useState('daily needs')
    const [editingId, setEditingId] = useState(null)
    const [detailId, setDetailId] = useState(null)
    const category = ['Daily Needs', 'Food', 'Transport', 'Bills', 'Health', 'Education', 'Entertainment', 'Others']

    const fetchTask = async () => {
        const {error, data} = await supabase.from('familyExpensesData').select('*').order('id', {ascending: true})
        setExpenses(data)
    }

    const deleteTask = async (id) => {
        const {error} = await supabase.from('familyExpensesData').delete().eq('id', id)
        if (!error) {
            fetchTask()
        }
    }

    useEffect(() => {
        fetchTask()
    }, [])

    const editExpense = async (e) => {
        e.preventDefault()
        const {error} = await supabase.from('familyExpensesData').update({
            description: newDescription,
            amount: newAmount,
            date: newDate,
            category: newCategory
        }).eq('id', editingId)
        if (!error) {
            fetchTask()
            setEditingId(null)
        }
    }

    return (
        <div className="history-container">
            <ul className="history-list">
                <div className="history-header">
                    <p>No</p>
                    <p>Description</p>
                    <p>Amount</p>
                    <p>Action</p>
                </div>
                {expenses.map((expense, idx) => (
                    <div>
                        <div key={expense.id} className="history-item">
                            <p style={{textAlign: "center"}}>{idx + 1}</p>
                            <p style={{marginLeft: "12px"}}>{expense.description}</p>
                            <p style={{textAlign: "right", marginRight: "10px"}}>Rp. {expense.amount}</p>
                            <div className="action-btns">
                                <button className="edit-btn" onClick={() => {
                                    setEditingId(expense.id)
                                    setNewDescription(expense.description)
                                    setNewAmount(expense.amount)
                                    setNewDate(new Date(expense.date))
                                    setNewCategory(expense.category)
                                }}>✏️</button>
                                <button className="delete-btn" onClick={() => deleteTask(expense.id)}>🗑</button>
                                <button className="detail-btn" onClick={() => {
                                    setDetailId(expense.id)
                                }}>...</button>
                            </div>
                        </div>
                        {detailId === expense.id && (
                            <div className="detail-modal" onClick={() => setDetailId(null)}>
                                <p>Description: {expense.description}</p>
                                <p>Amount: Rp. {expense.amount}</p>
                                <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
                                <p>Category: {expense.category}</p>
                            </div>
                        )}
                        {editingId === expense.id && (
                            <div className="edit-modal">
                                <form className="edit-form" onSubmit={editExpense}>
                                    <label htmlFor="edit-description">Description</label>
                                    <input 
                                        type="text" 
                                        id="edit-description" 
                                        value={newDescription}
                                        onChange={(e) => setNewDescription(e.target.value)}
                                    />
                                    <label htmlFor="edit-amount">Amount</label>
                                    <input 
                                        type="number" 
                                        id="edit-amount" 
                                        value={newAmount}
                                        onChange={(e) => setNewAmount(Number(e.target.value))}
                                    />
                                    <label htmlFor="edit-date">Date</label>
                                    <input 
                                        type="date" 
                                        id="edit-date" 
                                        value={newDate.toISOString().split('T')[0]} 
                                        onChange={(e) => setNewDate(new Date(e.target.value))}
                                    />
                                    <label htmlFor="edit-category">Category</label>
                                    <select id="edit-category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                                        {category.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                    <button className="update-btn" type="submit">Update</button>
                                </form>
                            </div>
                        )}
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default History