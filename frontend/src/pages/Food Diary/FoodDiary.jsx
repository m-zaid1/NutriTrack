"use client"

import { useState } from "react"
import "./FoodDiary.css"
import { toast } from "react-toastify"

import { Trash2, Plus, ChevronLeft, ChevronRight } from "lucide-react"

const FoodDiary = () => {
  // Nutritional database - random values for different foods
  const nutritionalDatabase = [
    { calories: 250, carbs: 30, protein: 15, fats: 10, sugar: 5 },
    { calories: 350, carbs: 45, protein: 20, fats: 12, sugar: 8 },
    { calories: 180, carbs: 15, protein: 10, fats: 8, sugar: 3 },
    { calories: 420, carbs: 55, protein: 25, fats: 15, sugar: 10 },
    { calories: 300, carbs: 35, protein: 18, fats: 12, sugar: 7 },
    { calories: 220, carbs: 25, protein: 12, fats: 9, sugar: 4 },
    { calories: 380, carbs: 48, protein: 22, fats: 14, sugar: 9 },
    { calories: 280, carbs: 32, protein: 16, fats: 11, sugar: 6 },
    { calories: 450, carbs: 60, protein: 30, fats: 18, sugar: 12 },
    { calories: 200, carbs: 20, protein: 8, fats: 6, sugar: 2 },
    { calories: 320, carbs: 40, protein: 18, fats: 14, sugar: 8 },
    { calories: 270, carbs: 30, protein: 15, fats: 10, sugar: 5 },
    { calories: 400, carbs: 50, protein: 25, fats: 15, sugar: 10 },
    { calories: 150, carbs: 12, protein: 8, fats: 5, sugar: 2 },
    { calories: 500, carbs: 65, protein: 35, fats: 20, sugar: 15 },
  ]

  // Function to get random nutritional values
  const getRandomNutritionalValues = () => {
    const randomIndex = Math.floor(Math.random() * nutritionalDatabase.length)
    return nutritionalDatabase[randomIndex]
  }

  // Initial food entries data with random nutritional values
  const initialEntries = [
    {
      id: 1,
      date: "2028-09-01",
      time: "7:30 AM",
      category: "Breakfast",
      menu: "Scrambled Eggs with Spinach & Whole Grain Toast",
      amount: "2 Slices",
      calories: 300,
      carbs: 25,
      protein: 20,
      fats: 12,
      sugar: 3,
      thoughts: "Energized",
    },
    {
      id: 2,
      date: "2028-09-01",
      time: "12:30 PM",
      category: "Lunch",
      menu: "Grilled Chicken Wrap with Avocado",
      amount: "1 Wrap",
      calories: 450,
      carbs: 40,
      protein: 30,
      fats: 18,
      sugar: 4,
      thoughts: "Quite Satisfied",
    },
    {
      id: 3,
      date: "2028-09-01",
      time: "4:00 PM",
      category: "Snacks",
      menu: "Greek Yogurt with Mixed Berries",
      amount: "1 Cup",
      calories: 200,
      carbs: 18,
      protein: 12,
      fats: 10,
      sugar: 16,
      thoughts: "Quite Satisfied",
    },
    {
      id: 4,
      date: "2028-09-01",
      time: "7:00 PM",
      category: "Dinner",
      menu: "Cheeseburger and Fries",
      amount: "1 Serving",
      calories: 700,
      carbs: 55,
      protein: 35,
      fats: 35,
      sugar: 5,
      thoughts: "Guilty",
    },
    {
      id: 5,
      date: "2028-09-02",
      time: "8:00 AM",
      category: "Breakfast",
      menu: "Avocado Toast with Poached Egg",
      amount: "2 Slices",
      calories: 320,
      carbs: 30,
      protein: 14,
      fats: 18,
      sugar: 2,
      thoughts: "Satisfied",
    },
    {
      id: 6,
      date: "2028-09-02",
      time: "1:00 PM",
      category: "Lunch",
      menu: "Quinoa Salad with Roasted Veggies & Feta",
      amount: "1 Bowl",
      calories: 450,
      carbs: 50,
      protein: 15,
      fats: 12,
      sugar: 6,
      thoughts: "Quite Satisfied",
    },
    {
      id: 7,
      date: "2028-09-02",
      time: "3:30 PM",
      category: "Snacks",
      menu: "Apple Slices with Peanut Butter",
      amount: "1 Apple",
      calories: 200,
      carbs: 30,
      protein: 6,
      fats: 10,
      sugar: 19,
      thoughts: "Energized",
    },
    {
      id: 8,
      date: "2028-09-02",
      time: "6:30 PM",
      category: "Dinner",
      menu: "Pasta Alfredo with Garlic Bread",
      amount: "1 Plate",
      calories: 650,
      carbs: 80,
      protein: 20,
      fats: 30,
      sugar: 4,
      thoughts: "Uncomfortable",
    },
    {
      id: 9,
      date: "2028-09-03",
      time: "7:15 AM",
      category: "Breakfast",
      menu: "Blueberry Protein Smoothie",
      amount: "1 Glass",
      calories: 300,
      carbs: 50,
      protein: 20,
      fats: 10,
      sugar: 24,
      thoughts: "Energized",
    },
    {
      id: 10,
      date: "2028-09-03",
      time: "12:00 PM",
      category: "Lunch",
      menu: "Greek Salad with Feta and Olives",
      amount: "1 Bowl",
      calories: 400,
      carbs: 40,
      protein: 12,
      fats: 20,
      sugar: 4,
      thoughts: "Satisfied",
    },
    {
      id: 11,
      date: "2028-09-03",
      time: "4:15 PM",
      category: "Snacks",
      menu: "Hummus with Carrot Sticks",
      amount: "1 Serving",
      calories: 180,
      carbs: 20,
      protein: 8,
      fats: 7,
      sugar: 2,
      thoughts: "Quite Satisfied",
    },
    {
      id: 12,
      date: "2028-09-03",
      time: "7:00 PM",
      category: "Dinner",
      menu: "Chocolate Cake and Ice Cream",
      amount: "1 Serving",
      calories: 600,
      carbs: 75,
      protein: 8,
      fats: 25,
      sugar: 50,
      thoughts: "Guilty",
    },
  ]

  // State variables
  const [entries, setEntries] = useState(initialEntries)
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage] = useState(10)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split("T")[0],
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    category: "Breakfast",
    menu: "",
    amount: "",
    thoughts: "",
  })

  // Calculate totals
  const calculateTotals = () => {
    return entries.reduce(
      (acc, entry) => {
        return {
          calories: acc.calories + entry.calories,
          carbs: acc.carbs + entry.carbs,
          protein: acc.protein + entry.protein,
          fats: acc.fats + entry.fats,
        }
      },
      { calories: 0, carbs: 0, protein: 0, fats: 0 },
    )
  }

  const totals = calculateTotals()

  // Get current entries for pagination
  const indexOfLastEntry = currentPage * entriesPerPage
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage
  const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, pageCount))
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

  // Calculate total pages
  const pageCount = Math.ceil(entries.length / entriesPerPage)

  // Handle delete entry
  const handleDeleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id))
  }

  // Handle add new entry
  const handleAddEntry = () => {
    const id = entries.length > 0 ? Math.max(...entries.map((entry) => entry.id)) + 1 : 1

    // Get random nutritional values
    const nutritionalValues = getRandomNutritionalValues()

    // Create new entry with auto-calculated nutritional values
    const completeEntry = {
      ...newEntry,
      id,
      ...nutritionalValues,
    }

    setEntries([...entries, completeEntry])
    setShowAddModal(false)
    setNewEntry({
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      category: "Breakfast",
      menu: "",
      amount: "",
      thoughts: "",
    })
  }

  // Handle input change for new entry
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewEntry({
      ...newEntry,
      [name]: value,
    })
  }

  return (
    <div className="food-diary">
      <div className="summary-cards">
        <div className="summary-card calories">
          <div className="icon">🔥</div>
          <div className="summary-content">
            <div className="summary-label">Total Calories</div>
            <div className="summary-value">
              {totals.calories.toLocaleString()} <span>kcal</span>
            </div>
          </div>
        </div>
        <div className="summary-card carbs">
          <div className="icon">🍞</div>
          <div className="summary-content">
            <div className="summary-label">Total Carbs</div>
            <div className="summary-value">
              {totals.carbs.toLocaleString()} <span>gr</span>
            </div>
          </div>
        </div>
        <div className="summary-card protein">
          <div className="icon">🍗</div>
          <div className="summary-content">
            <div className="summary-label">Total Proteins</div>
            <div className="summary-value">
              {totals.protein.toLocaleString()} <span>gr</span>
            </div>
          </div>
        </div>
        <div className="summary-card fats">
          <div className="icon">💧</div>
          <div className="summary-content">
            <div className="summary-label">Total Fats</div>
            <div className="summary-value">
              {totals.fats.toLocaleString()} <span>gr</span>
            </div>
          </div>
        </div>
      </div>

      <div className="diary-actions">
        <button className="add-button" onClick={() => setShowAddModal(true)}>
          <Plus size={16} />
          Add
        </button>
      </div>

      <div className="diary-table-container">
        <table className="diary-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Category</th>
              <th>Menu</th>
              <th>Amount</th>
              <th>Cals</th>
              <th colSpan="3" className="macros-header">
                Macronutrients
              </th>
              <th>Sugar</th>
              <th>Thoughts</th>
              <th></th>
            </tr>
            <tr className="subheader">
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th className="macro-subheader">Carbs</th>
              <th className="macro-subheader">Protein</th>
              <th className="macro-subheader">Fats</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((entry) => (
              <tr key={entry.id}>
                <td className="date-time-column">
                  <div className="date">{entry.date}</div>
                  <div className="time">{entry.time}</div>
                </td>
                <td>
                  <span className={`category-tag ${entry.category.toLowerCase()}`}>{entry.category}</span>
                </td>
                <td className="menu-column">{entry.menu}</td>
                <td>{entry.amount}</td>
                <td className="calories-column">
                  {entry.calories} <span className="unit">kcal</span>
                </td>
                <td>
                  {entry.carbs} <span className="unit">gr</span>
                </td>
                <td>
                  {entry.protein} <span className="unit">gr</span>
                </td>
                <td>
                  {entry.fats} <span className="unit">gr</span>
                </td>
                <td>
                  {entry.sugar} <span className="unit">gr</span>
                </td>
                <td>
                  <span className="thoughts-tag">{entry.thoughts}</span>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteEntry(entry.id)}
                    aria-label="Delete entry"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pageCount > 1 && (
        <div className="pagination">
          <button className="pagination-arrow" onClick={prevPage} disabled={currentPage === 1}>
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: pageCount }).map((_, index) => {
            // Show first page, last page, current page, and pages around current
            const pageNum = index + 1
            const showPage =
              pageNum === 1 || pageNum === pageCount || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)

            if (!showPage && pageNum === currentPage - 2) {
              return (
                <span key={`ellipsis-prev`} className="ellipsis">
                  ...
                </span>
              )
            }

            if (!showPage && pageNum === currentPage + 2) {
              return (
                <span key={`ellipsis-next`} className="ellipsis">
                  ...
                </span>
              )
            }

            if (showPage) {
              return (
                <button
                  key={pageNum}
                  onClick={() => paginate(pageNum)}
                  className={`pagination-number ${currentPage === pageNum ? "active" : ""}`}
                >
                  {pageNum}
                </button>
              )
            }

            return null
          })}

          <button className="pagination-arrow" onClick={nextPage} disabled={currentPage === pageCount}>
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {showAddModal && (
        <div className="modal-overlay">
          <div className="add-modal">
            <h2>Add New Food Entry</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date" value={newEntry.date} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="time">Time</label>
                <input type="time" id="time" name="time" value={newEntry.time} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select id="category" name="category" value={newEntry.category} onChange={handleInputChange}>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Dinner">Dinner</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label htmlFor="menu">Menu</label>
                <input
                  type="text"
                  id="menu"
                  name="menu"
                  value={newEntry.menu}
                  onChange={handleInputChange}
                  placeholder="Enter food description"
                />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={newEntry.amount}
                  onChange={handleInputChange}
                  placeholder="e.g., 1 Serving"
                />
              </div>
              <div className="form-group">
                <label htmlFor="thoughts">Thoughts</label>
                <select id="thoughts" name="thoughts" value={newEntry.thoughts} onChange={handleInputChange}>
                  <option value="">Select...</option>
                  <option value="Energized">Energized</option>
                  <option value="Satisfied">Satisfied</option>
                  <option value="Quite Satisfied">Quite Satisfied</option>
                  <option value="Guilty">Guilty</option>
                  <option value="Uncomfortable">Uncomfortable</option>
                </select>
              </div>
              <div className="form-group full-width">
                <p className="nutrition-note">
                  <strong>Note:</strong> Nutritional values (calories, carbs, protein, fats, sugar) will be
                  automatically calculated.
                </p>
              </div>
            </div>
            <div className="modal-actions">
              <button className="cancel-button" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button className="save-button" onClick={handleAddEntry} disabled={!newEntry.menu || !newEntry.amount}>
                Save Entry
              </button>
            </div>
          </div>
        </div>
        
      )}
    </div>
  )
}

export default FoodDiary
