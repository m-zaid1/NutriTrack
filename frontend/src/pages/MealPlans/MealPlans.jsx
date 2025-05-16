"use client"

import { useState, useEffect, useRef } from "react"
import "./MealPlans.css"
import { Search, Sliders, ChevronLeft, ChevronRight, Clock, BarChart2, ChefHat, Star } from "lucide-react"

const MealPlans = () => {
  // Meal data
  const allMeals = [
    {
      id: 1,
      name: "Grilled Turkey Breast with Steamed Asparagus and Brown Rice",
      image: "1.png",
      category: "Lunch",
      rating: 4.8,
      difficulty: "Medium",
      healthScore: 85,
      cookDuration: 10,
      totalSteps: 4,
      calories: 450,
      carbs: 40,
      proteins: 35,
      fats: 12,
      steps: [
        "Season turkey breast with salt, pepper, and herbs",
        "Grill turkey until fully cooked",
        "Steam asparagus until tender",
        "Serve with cooked brown rice",
      ],
      featured: true,
    },
    {
      id: 2,
      name: "Avocado Toast with Poached Egg",
      image: "2.png",
      category: "Breakfast",
      rating: 4.7,
      difficulty: "Easy",
      healthScore: 90,
      cookDuration: 15,
      totalSteps: 3,
      calories: 320,
      carbs: 30,
      proteins: 14,
      fats: 18,
      steps: [
        "Toast whole grain bread",
        "Mash avocado and spread on toast",
        "Top with poached egg and season with salt and pepper",
      ],
      featured: true,
    },
    {
      id: 3,
      name: "Grilled Shrimp Tacos with Mango Salsa",
      image: "3.png",
      category: "Lunch",
      rating: 4.6,
      difficulty: "Medium",
      healthScore: 80,
      cookDuration: 20,
      totalSteps: 5,
      calories: 400,
      carbs: 45,
      proteins: 25,
      fats: 12,
      steps: [
        "Marinate shrimp in lime juice and spices",
        "Prepare mango salsa with diced mango, red onion, cilantro, and lime juice",
        "Grill shrimp until pink and cooked through",
        "Warm corn tortillas",
        "Assemble tacos with shrimp and top with mango salsa",
      ],
      featured: false,
    },
    {
      id: 4,
      name: "Greek Salad with Feta and Olives",
      image: "4.png",
      category: "Lunch",
      rating: 4.9,
      difficulty: "Easy",
      healthScore: 95,
      cookDuration: 10,
      totalSteps: 2,
      calories: 350,
      carbs: 20,
      proteins: 15,
      fats: 25,
      steps: [
        "Combine chopped cucumber, tomatoes, red onion, and bell peppers",
        "Top with feta cheese, olives, and Greek dressing",
      ],
      featured: false,
    },
    {
      id: 5,
      name: "Blueberry Protein Smoothie",
      image: "5.png",
      category: "Breakfast",
      rating: 4.8,
      difficulty: "Easy",
      healthScore: 90,
      cookDuration: 5,
      totalSteps: 1,
      calories: 300,
      carbs: 40,
      proteins: 20,
      fats: 5,
      steps: ["Blend frozen blueberries, protein powder, Greek yogurt, almond milk, and honey until smooth"],
      featured: false,
    },
    {
      id: 6,
      name: "Grilled Salmon with Lemon and Asparagus",
      image: "6.png",
      category: "Dinner",
      rating: 4.9,
      difficulty: "Medium",
      healthScore: 95,
      cookDuration: 20,
      totalSteps: 4,
      calories: 380,
      carbs: 10,
      proteins: 40,
      fats: 20,
      steps: [
        "Season salmon with salt, pepper, and lemon zest",
        "Grill salmon until cooked through",
        "Steam asparagus until tender",
        "Serve with lemon wedges",
      ],
      featured: true,
    },
    {
      id: 7,
      name: "Oatmeal with Almond Butter and Berries",
      image: "7.png",
      category: "Breakfast",
      rating: 4.7,
      difficulty: "Easy",
      healthScore: 85,
      cookDuration: 10,
      totalSteps: 3,
      calories: 350,
      carbs: 45,
      proteins: 12,
      fats: 14,
      steps: ["Cook oats with water or milk", "Stir in almond butter", "Top with fresh berries and a drizzle of honey"],
      featured: false,
    },
    {
      id: 8,
      name: "Grilled Chicken Wrap with Avocado and Spinach",
      image: "8.png",
      category: "Lunch",
      rating: 4.6,
      difficulty: "Easy",
      healthScore: 85,
      cookDuration: 15,
      totalSteps: 4,
      calories: 450,
      carbs: 40,
      proteins: 30,
      fats: 18,
      steps: [
        "Grill chicken breast with seasonings",
        "Slice avocado",
        "Layer chicken, avocado, and spinach on a whole grain wrap",
        "Roll up and serve",
      ],
      featured: false,
    },
    {
      id: 9,
      name: "Quinoa Salad with Roasted Vegetables and Feta",
      image: "9.png",
      category: "Dinner",
      rating: 4.8,
      difficulty: "Medium",
      healthScore: 90,
      cookDuration: 30,
      totalSteps: 5,
      calories: 420,
      carbs: 50,
      proteins: 15,
      fats: 22,
      steps: [
        "Cook quinoa according to package instructions",
        "Roast mixed vegetables with olive oil and seasonings",
        "Combine quinoa and roasted vegetables",
        "Add crumbled feta cheese",
        "Dress with lemon vinaigrette",
      ],
      featured: false,
    },
    {
      id: 10,
      name: "Vegetable Stir Fry with Tofu",
      image: "10.png",
      category: "Dinner",
      rating: 4.5,
      difficulty: "Medium",
      healthScore: 90,
      cookDuration: 20,
      totalSteps: 5,
      calories: 380,
      carbs: 35,
      proteins: 20,
      fats: 15,
      steps: [
        "Press and cube tofu",
        "Stir-fry tofu until golden",
        "Add mixed vegetables and stir-fry",
        "Add sauce and simmer",
        "Serve over brown rice or noodles",
      ],
      featured: false,
    },
    {
      id: 11,
      name: "Banana Peanut Butter Overnight Oats",
      image: "11.png",
      category: "Breakfast",
      rating: 4.7,
      difficulty: "Easy",
      healthScore: 80,
      cookDuration: 5,
      totalSteps: 3,
      calories: 400,
      carbs: 55,
      proteins: 15,
      fats: 15,
      steps: [
        "Mix oats, milk, and chia seeds",
        "Add sliced banana and peanut butter",
        "Refrigerate overnight and enjoy in the morning",
      ],
      featured: false,
    },
    {
      id: 12,
      name: "Caprese Stuffed Chicken Breast",
      image: "12.png",
      category: "Dinner",
      rating: 4.8,
      difficulty: "Medium",
      healthScore: 85,
      cookDuration: 30,
      totalSteps: 5,
      calories: 450,
      carbs: 10,
      proteins: 50,
      fats: 25,
      steps: [
        "Butterfly chicken breasts",
        "Stuff with mozzarella, tomatoes, and basil",
        "Secure with toothpicks",
        "Bake until chicken is cooked through",
        "Drizzle with balsamic glaze",
      ],
      featured: false,
    },
    {
      id: 13,
      name: "Sweet Potato and Black Bean Bowl",
      image: "1.png",
      category: "Lunch",
      rating: 4.6,
      difficulty: "Easy",
      healthScore: 90,
      cookDuration: 25,
      totalSteps: 4,
      calories: 380,
      carbs: 60,
      proteins: 15,
      fats: 10,
      steps: [
        "Roast diced sweet potatoes",
        "Heat black beans with spices",
        "Prepare quinoa or rice",
        "Assemble bowl with toppings like avocado and cilantro",
      ],
      featured: false,
    },
    {
      id: 14,
      name: "Apple Cinnamon Protein Pancakes",
      image: "2.png",
      category: "Breakfast",
      rating: 4.7,
      difficulty: "Medium",
      healthScore: 80,
      cookDuration: 15,
      totalSteps: 4,
      calories: 350,
      carbs: 40,
      proteins: 25,
      fats: 10,
      steps: [
        "Mix protein powder, oats, egg whites, and cinnamon",
        "Fold in diced apples",
        "Cook pancakes on a griddle",
        "Top with Greek yogurt and a drizzle of honey",
      ],
      featured: false,
    },
    {
      id: 15,
      name: "Mediterranean Chickpea Salad",
      image: "3.png",
      category: "Lunch",
      rating: 4.5,
      difficulty: "Easy",
      healthScore: 95,
      cookDuration: 10,
      totalSteps: 2,
      calories: 320,
      carbs: 45,
      proteins: 15,
      fats: 12,
      steps: [
        "Combine chickpeas, cucumber, tomatoes, red onion, and olives",
        "Dress with olive oil, lemon juice, and herbs",
      ],
      featured: false,
    },
    {
      id: 16,
      name: "Baked Cod with Herb Crust",
      image: "4.png",
      category: "Dinner",
      rating: 4.6,
      difficulty: "Medium",
      healthScore: 90,
      cookDuration: 25,
      totalSteps: 4,
      calories: 300,
      carbs: 10,
      proteins: 40,
      fats: 10,
      steps: [
        "Mix herbs, breadcrumbs, and olive oil",
        "Top cod fillets with herb mixture",
        "Bake until fish flakes easily",
        "Serve with roasted vegetables",
      ],
      featured: false,
    },
    {
      id: 17,
      name: "Chia Pudding with Mango",
      image: "5.png",
      category: "Breakfast",
      rating: 4.5,
      difficulty: "Easy",
      healthScore: 85,
      cookDuration: 5,
      totalSteps: 2,
      calories: 280,
      carbs: 35,
      proteins: 10,
      fats: 15,
      steps: ["Mix chia seeds with coconut milk and vanilla", "Refrigerate overnight and top with fresh mango"],
      featured: false,
    },
    {
      id: 18,
      name: "Turkey and Vegetable Chili",
      image: "6.png",
      category: "Dinner",
      rating: 4.7,
      difficulty: "Medium",
      healthScore: 85,
      cookDuration: 40,
      totalSteps: 5,
      calories: 380,
      carbs: 40,
      proteins: 35,
      fats: 10,
      steps: [
        "Brown ground turkey",
        "Add onions, peppers, and garlic",
        "Stir in beans, tomatoes, and spices",
        "Simmer until flavors meld",
        "Top with Greek yogurt and avocado",
      ],
      featured: false,
    },
    {
      id: 19,
      name: "Hummus and Vegetable Wrap",
      image: "7.png",
      category: "Lunch",
      rating: 4.4,
      difficulty: "Easy",
      healthScore: 85,
      cookDuration: 10,
      totalSteps: 3,
      calories: 320,
      carbs: 45,
      proteins: 12,
      fats: 15,
      steps: ["Spread hummus on a whole grain wrap", "Add sliced vegetables and greens", "Roll up and slice"],
      featured: false,
    },
    {
      id: 20,
      name: "Berry Protein Parfait",
      image: "8.png",
      category: "Snack",
      rating: 4.8,
      difficulty: "Easy",
      healthScore: 90,
      cookDuration: 5,
      totalSteps: 3,
      calories: 250,
      carbs: 25,
      proteins: 20,
      fats: 8,
      steps: ["Layer Greek yogurt in a glass", "Add mixed berries", "Top with granola and a drizzle of honey"],
      featured: false,
    },
    {
      id: 21,
      name: "Zucchini Noodles with Pesto",
      image: "9.png",
      category: "Dinner",
      rating: 4.5,
      difficulty: "Easy",
      healthScore: 90,
      cookDuration: 15,
      totalSteps: 4,
      calories: 280,
      carbs: 15,
      proteins: 10,
      fats: 22,
      steps: [
        "Spiralize zucchini into noodles",
        "Prepare pesto sauce",
        "Sauté zucchini noodles briefly",
        "Toss with pesto and top with cherry tomatoes",
      ],
      featured: false,
    },
    {
      id: 22,
      name: "Almond Butter Energy Bites",
      image: "10.png",
      category: "Snack",
      rating: 4.7,
      difficulty: "Easy",
      healthScore: 80,
      cookDuration: 15,
      totalSteps: 3,
      calories: 120,
      carbs: 15,
      proteins: 5,
      fats: 7,
      steps: ["Mix oats, almond butter, honey, and chia seeds", "Form into small balls", "Refrigerate until firm"],
      featured: false,
    },
  ]

  // State variables
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [filteredMeals, setFilteredMeals] = useState(allMeals)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [filters, setFilters] = useState({
    difficulty: "All",
    duration: "All",
  })
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0)
  const featuredMeals = allMeals.filter((meal) => meal.featured)
  const suggestedMeals = allMeals.slice(3, 6)
  const recommendedMeals = allMeals.slice(6, 9)

  // Filter meals based on search term, category, and filters
  useEffect(() => {
    let result = allMeals

    // Filter by search term
    if (searchTerm) {
      result = result.filter((meal) => meal.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Filter by category
    if (activeCategory !== "All") {
      result = result.filter((meal) => meal.category === activeCategory)
    }

    // Filter by difficulty
    if (filters.difficulty !== "All") {
      result = result.filter((meal) => meal.difficulty === filters.difficulty)
    }

    // Filter by duration
    if (filters.duration !== "All") {
      switch (filters.duration) {
        case "Quick (<15 min)":
          result = result.filter((meal) => meal.cookDuration < 15)
          break
        case "Medium (15-30 min)":
          result = result.filter((meal) => meal.cookDuration >= 15 && meal.cookDuration <= 30)
          break
        case "Long (>30 min)":
          result = result.filter((meal) => meal.cookDuration > 30)
          break
      }
    }

    setFilteredMeals(result)
  }, [searchTerm, activeCategory, filters])

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  // Handle featured meal navigation
  const nextFeaturedMeal = () => {
    setCurrentFeaturedIndex((prev) => (prev + 1) % featuredMeals.length)
  }

  const prevFeaturedMeal = () => {
    setCurrentFeaturedIndex((prev) => (prev - 1 + featuredMeals.length) % featuredMeals.length)
  }

  // Refs for scrolling
  const allMenuRef = useRef(null)

  return (
    <div className="meal-plans">
      <div className="meal-plans-container">
        <div className="meal-plans-main">
          <div className="meal-plans-header">
            <h1>Healthy Menu</h1>
            <div className="search-filter-container">
              <div className="search-container">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search menu"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="filter-button" onClick={() => setShowFilterModal(true)}>
                <Sliders size={18} />
              </button>
            </div>
          </div>

          {/* Featured Menu Section */}
          <div className="featured-menu-section">
            <div className="section-header">
              <h2>Featured Menu</h2>
              <div className="carousel-controls">
                <button onClick={prevFeaturedMeal} className="carousel-control">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={nextFeaturedMeal} className="carousel-control">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="featured-meal">
              <div className="featured-meal-image">
                <img
                  src={featuredMeals[currentFeaturedIndex]?.image || "/placeholder.svg?height=300&width=400"}
                  alt={featuredMeals[currentFeaturedIndex]?.name}
                />
              </div>
              <div className="featured-meal-details">
                <h3>{featuredMeals[currentFeaturedIndex]?.name}</h3>

                <div className="featured-meal-category">
                  <span className={`category-tag ${featuredMeals[currentFeaturedIndex]?.category.toLowerCase()}`}>
                    {featuredMeals[currentFeaturedIndex]?.category}
                  </span>
                  <div className="rating">
                    <Star size={16} className="star-icon" />
                    <span>{featuredMeals[currentFeaturedIndex]?.rating}/5</span>
                  </div>
                </div>

                <div className="featured-meal-stats">
                  <div className="stat">
                    <BarChart2 size={18} />
                    <div className="stat-details">
                      <span className="stat-label">Difficulty</span>
                      <span className="stat-value">{featuredMeals[currentFeaturedIndex]?.difficulty}</span>
                    </div>
                  </div>

                  <div className="stat">
                    <ChefHat size={18} />
                    <div className="stat-details">
                      <span className="stat-label">Health Score</span>
                      <span className="stat-value">{featuredMeals[currentFeaturedIndex]?.healthScore}/100</span>
                    </div>
                  </div>
                </div>

                <div className="featured-meal-stats">
                  <div className="stat">
                    <Clock size={18} />
                    <div className="stat-details">
                      <span className="stat-label">Cook Duration</span>
                      <span className="stat-value">{featuredMeals[currentFeaturedIndex]?.cookDuration} minutes</span>
                    </div>
                  </div>

                  <div className="stat">
                    <div className="list-icon">
                      <div className="list-line"></div>
                      <div className="list-line"></div>
                      <div className="list-line"></div>
                    </div>
                    <div className="stat-details">
                      <span className="stat-label">Total Steps</span>
                      <span className="stat-value">{featuredMeals[currentFeaturedIndex]?.totalSteps} steps</span>
                    </div>
                  </div>
                </div>

                <div className="featured-meal-nutrition">
                  <div className="nutrition-item calories">
                    <div className="nutrition-icon">🔥</div>
                    <div className="nutrition-details">
                      <span className="nutrition-label">Calories</span>
                      <span className="nutrition-value">{featuredMeals[currentFeaturedIndex]?.calories} kcal</span>
                    </div>
                  </div>

                  <div className="nutrition-item carbs">
                    <div className="nutrition-icon">🍞</div>
                    <div className="nutrition-details">
                      <span className="nutrition-label">Carbs</span>
                      <span className="nutrition-value">{featuredMeals[currentFeaturedIndex]?.carbs} gr</span>
                    </div>
                  </div>

                  <div className="nutrition-item proteins">
                    <div className="nutrition-icon">🍗</div>
                    <div className="nutrition-details">
                      <span className="nutrition-label">Proteins</span>
                      <span className="nutrition-value">{featuredMeals[currentFeaturedIndex]?.proteins} gr</span>
                    </div>
                  </div>

                  <div className="nutrition-item fats">
                    <div className="nutrition-icon">💧</div>
                    <div className="nutrition-details">
                      <span className="nutrition-label">Fats</span>
                      <span className="nutrition-value">{featuredMeals[currentFeaturedIndex]?.fats} gr</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Menu Section */}
          <div className="all-menu-section" ref={allMenuRef}>
            <h2>All Menu</h2>

            <div className="category-tabs">
              <button
                className={`category-tab ${activeCategory === "All" ? "active" : ""}`}
                onClick={() => setActiveCategory("All")}
              >
                All
              </button>
              <button
                className={`category-tab ${activeCategory === "Breakfast" ? "active" : ""}`}
                onClick={() => setActiveCategory("Breakfast")}
              >
                Breakfast
              </button>
              <button
                className={`category-tab ${activeCategory === "Lunch" ? "active" : ""}`}
                onClick={() => setActiveCategory("Lunch")}
              >
                Lunch
              </button>
              <button
                className={`category-tab ${activeCategory === "Snack" ? "active" : ""}`}
                onClick={() => setActiveCategory("Snack")}
              >
                Snack
              </button>
              <button
                className={`category-tab ${activeCategory === "Dinner" ? "active" : ""}`}
                onClick={() => setActiveCategory("Dinner")}
              >
                Dinner
              </button>
            </div>

            <div className="meal-cards">
              {filteredMeals.length > 0 ? (
                filteredMeals.map((meal) => (
                  <div className="meal-card" key={meal.id}>
                    <div className="meal-card-image">
                      <img src={meal.image || "/placeholder.svg?height=150&width=200"} alt={meal.name} />
                    </div>
                    <div className="meal-card-content">
                      <div className="meal-card-header">
                        <span className={`category-tag ${meal.category.toLowerCase()}`}>{meal.category}</span>
                        <span className={`difficulty-tag ${meal.difficulty.toLowerCase()}`}>{meal.difficulty}</span>
                      </div>

                      <div className="health-score">
                        Health Score: <span>{meal.healthScore}/100</span>
                        <div className="health-score-bar">
                          <div className="health-score-fill" style={{ width: `${meal.healthScore}%` }}></div>
                        </div>
                      </div>

                      <h3 className="meal-name">{meal.name}</h3>

                      <div className="meal-nutrition">
                        <div className="nutrition-pill">
                          <span className="nutrition-icon">🔥</span>
                          <span>{meal.calories} kcal</span>
                        </div>
                        <div className="nutrition-pill">
                          <span className="nutrition-icon">🍞</span>
                          <span>{meal.carbs}g carbs</span>
                        </div>
                        <div className="nutrition-pill">
                          <span className="nutrition-icon">🍗</span>
                          <span>{meal.proteins}g protein</span>
                        </div>
                        <div className="nutrition-pill">
                          <span className="nutrition-icon">💧</span>
                          <span>{meal.fats}g fats</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <p>No meals found matching your criteria.</p>
                  <button
                    className="reset-filters-button"
                    onClick={() => {
                      setSearchTerm("")
                      setActiveCategory("All")
                      setFilters({
                        difficulty: "All",
                        duration: "All",
                      })
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="meal-plans-sidebar">
          {/* Suggested Swap Meals */}
          <div className="sidebar-section">
            <div className="section-header">
              <h2>Suggested Swap Meals</h2>
              <button className="more-button">...</button>
            </div>

            <div className="sidebar-meals">
              {suggestedMeals.map((meal) => (
                <div className="sidebar-meal" key={`suggested-${meal.id}`}>
                  <div className="sidebar-meal-image">
                    <img src={meal.image || "/placeholder.svg?height=80&width=80"} alt={meal.name} />
                  </div>
                  <div className="sidebar-meal-details">
                    <h3>{meal.name}</h3>
                    <div className="sidebar-meal-nutrition">
                      <div className="mini-nutrition">
                        <span className="mini-icon">🔥</span>
                        <span>{meal.calories} kcal</span>
                      </div>
                      <div className="mini-nutrition">
                        <span className="mini-icon">🍞</span>
                        <span>{meal.carbs}g</span>
                      </div>
                      <div className="mini-nutrition">
                        <span className="mini-icon">🍗</span>
                        <span>{meal.proteins}g</span>
                      </div>
                      <div className="mini-nutrition">
                        <span className="mini-icon">💧</span>
                        <span>{meal.fats}g</span>
                      </div>
                    </div>
                  </div>
                  <div className="sidebar-meal-category">
                    <span className={`category-tag ${meal.category.toLowerCase()}`}>{meal.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Meals */}
          <div className="sidebar-section">
            <div className="section-header">
              <h2>Recommended Meals</h2>
              <button className="more-button">...</button>
            </div>

            <div className="sidebar-meals">
              {recommendedMeals.map((meal) => (
                <div className="sidebar-meal" key={`recommended-${meal.id}`}>
                  <div className="sidebar-meal-image">
                    <img src={meal.image || "/placeholder.svg?height=80&width=80"} alt={meal.name} />
                  </div>
                  <div className="sidebar-meal-details">
                    <h3>{meal.name}</h3>
                    <div className="sidebar-meal-nutrition">
                      <div className="mini-nutrition">
                        <span className="mini-icon">🔥</span>
                        <span>{meal.calories} kcal</span>
                      </div>
                      <div className="mini-nutrition">
                        <span className="mini-icon">🍞</span>
                        <span>{meal.carbs}g</span>
                      </div>
                      <div className="mini-nutrition">
                        <span className="mini-icon">🍗</span>
                        <span>{meal.proteins}g</span>
                      </div>
                      <div className="mini-nutrition">
                        <span className="mini-icon">💧</span>
                        <span>{meal.fats}g</span>
                      </div>
                    </div>
                  </div>
                  <div className="sidebar-meal-category">
                    <span className={`category-tag ${meal.category.toLowerCase()}`}>{meal.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="modal-overlay">
          <div className="filter-modal">
            <h2>Filter Meals</h2>

            <div className="filter-section">
              <h3>Difficulty</h3>
              <div className="filter-options">
                <button
                  className={`filter-option ${filters.difficulty === "All" ? "active" : ""}`}
                  onClick={() => handleFilterChange("difficulty", "All")}
                >
                  All
                </button>
                <button
                  className={`filter-option ${filters.difficulty === "Easy" ? "active" : ""}`}
                  onClick={() => handleFilterChange("difficulty", "Easy")}
                >
                  Easy
                </button>
                <button
                  className={`filter-option ${filters.difficulty === "Medium" ? "active" : ""}`}
                  onClick={() => handleFilterChange("difficulty", "Medium")}
                >
                  Medium
                </button>
              </div>
            </div>

            <div className="filter-section">
              <h3>Cooking Duration</h3>
              <div className="filter-options">
                <button
                  className={`filter-option ${filters.duration === "All" ? "active" : ""}`}
                  onClick={() => handleFilterChange("duration", "All")}
                >
                  All
                </button>
                <button
                  className={`filter-option ${filters.duration === "Quick (<15 min)" ? "active" : ""}`}
                  onClick={() => handleFilterChange("duration", "Quick (<15 min)")}
                >
                  Quick (&lt;15 min)
                </button>
                <button
                  className={`filter-option ${filters.duration === "Medium (15-30 min)" ? "active" : ""}`}
                  onClick={() => handleFilterChange("duration", "Medium (15-30 min)")}
                >
                  Medium (15-30 min)
                </button>
                <button
                  className={`filter-option ${filters.duration === "Long (>30 min)" ? "active" : ""}`}
                  onClick={() => handleFilterChange("duration", "Long (>30 min)")}
                >
                  Long (&gt;30 min)
                </button>
              </div>
            </div>

            <div className="filter-actions">
              <button className="cancel-button" onClick={() => setShowFilterModal(false)}>
                Cancel
              </button>
              <button className="apply-button" onClick={() => setShowFilterModal(false)}>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MealPlans
