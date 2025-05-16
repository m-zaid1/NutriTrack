"use client"

import { useState } from "react"
import { Search, ChevronDown, ChevronUp, MessageCircle, FileText, HelpCircle } from "lucide-react"
import "./Orders.css"

const SupportPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [expandedFaqs, setExpandedFaqs] = useState([])

  // Sample FAQs
  const faqs = [
    {
      id: 1,
      question: "How do I create a meal plan?",
      answer:
        "To create a meal plan, log in to your account and navigate to the 'Meal Plans' section. Click on 'Create New Plan' and follow the step-by-step guide. You can choose from our pre-made templates or create a custom plan based on your dietary preferences and nutritional goals.",
      category: "meal-plans",
    },
    {
      id: 2,
      question: "How do I track my daily water intake?",
      answer:
        "You can track your water intake in the 'Hydration Tracking' section. Simply click the 'Add Water' button each time you drink water, or enter a specific amount. The app will show your daily progress toward your hydration goal with visual indicators.",
      category: "hydration",
    },
    {
      id: 3,
      question: "Can I sync NutriTrack with my fitness tracker?",
      answer:
        "Yes, NutriTrack can sync with most popular fitness trackers and smartwatches. Go to 'Settings' > 'Connected Devices' and follow the instructions to connect your device. Once connected, your activity data will automatically be imported into NutriTrack.",
      category: "account",
    },
    {
      id: 4,
      question: "How do I update my weight in the app?",
      answer:
        "To update your weight, go to your 'Profile' page and click on 'Update Measurements'. Enter your current weight and the date of measurement. You can view your weight history and progress charts in the 'Progress' section.",
      category: "account",
    },
    {
      id: 5,
      question: "Is my personal data secure?",
      answer:
        "We take data security very seriously. All your personal information is encrypted and stored securely. We never share your data with third parties without your explicit consent. You can review our full Privacy Policy for more details on how we protect your information.",
      category: "privacy",
    },
    {
      id: 6,
      question: "How do I cancel my subscription?",
      answer:
        "To cancel your subscription, go to 'Settings' > 'Subscription' and click on 'Cancel Subscription'. Follow the prompts to complete the cancellation. Please note that you'll still have access to premium features until the end of your current billing period.",
      category: "billing",
    },
    {
      id: 7,
      question: "Can I export my nutrition data?",
      answer:
        "Yes, you can export your nutrition data in CSV or PDF format. Go to 'Food Diary', select the date range you want to export, and click the 'Export' button. You can choose which data points to include in your export.",
      category: "food-diary",
    },
    {
      id: 8,
      question: "How accurate is the nutritional information?",
      answer:
        "Our nutritional database is regularly updated and contains information from reliable sources including the USDA Food Database. While we strive for accuracy, some variations may occur, especially for restaurant meals or homemade recipes. You can always adjust the nutritional values manually if needed.",
      category: "food-diary",
    },
    {
      id: 9,
      question: "Can I create custom recipes?",
      answer:
        "Yes, you can create custom recipes in the 'Recipes' section. Click 'Add New Recipe', enter the ingredients and their amounts, and the app will automatically calculate the nutritional information per serving. You can then easily add these recipes to your food diary.",
      category: "meal-plans",
    },
    {
      id: 10,
      question: "How do I reset my password?",
      answer:
        "If you forgot your password, click on 'Forgot Password' on the login screen. Enter the email address associated with your account, and we'll send you a link to reset your password. For security reasons, the link expires after 24 hours.",
      category: "account",
    },
  ]

  // Toggle FAQ expansion
  const toggleFaq = (id) => {
    if (expandedFaqs.includes(id)) {
      setExpandedFaqs(expandedFaqs.filter((faqId) => faqId !== id))
    } else {
      setExpandedFaqs([...expandedFaqs, id])
    }
  }

  // Filter FAQs based on search and category
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="support-page">
      <div className="support-hero">
        <div className="support-hero-content">
          <h1>How can we help you?</h1>
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="support-content">
        <div className="support-categories">
          <h2>Categories</h2>
          <ul className="category-list">
            <li className={activeCategory === "all" ? "active" : ""} onClick={() => setActiveCategory("all")}>
              All Topics
            </li>
            <li className={activeCategory === "account" ? "active" : ""} onClick={() => setActiveCategory("account")}>
              Account & Profile
            </li>
            <li
              className={activeCategory === "meal-plans" ? "active" : ""}
              onClick={() => setActiveCategory("meal-plans")}
            >
              Meal Plans
            </li>
            <li
              className={activeCategory === "food-diary" ? "active" : ""}
              onClick={() => setActiveCategory("food-diary")}
            >
              Food Diary
            </li>
            <li
              className={activeCategory === "hydration" ? "active" : ""}
              onClick={() => setActiveCategory("hydration")}
            >
              Hydration Tracking
            </li>
            <li className={activeCategory === "billing" ? "active" : ""} onClick={() => setActiveCategory("billing")}>
              Billing & Subscription
            </li>
            <li className={activeCategory === "privacy" ? "active" : ""} onClick={() => setActiveCategory("privacy")}>
              Privacy & Security
            </li>
          </ul>

          <div className="support-contact-card">
            <h3>Need more help?</h3>
            <p>Can't find what you're looking for? Contact our support team directly.</p>
            <div className="support-contact-options">
              <a href="/contact" className="contact-option">
                <MessageCircle size={20} />
                <span>Contact Us</span>
              </a>
              <a href="/documentation" className="contact-option">
                <FileText size={20} />
                <span>Documentation</span>
              </a>
            </div>
          </div>
        </div>

        <div className="faq-container">
          <h2>Frequently Asked Questions</h2>
          {filteredFaqs.length > 0 ? (
            <div className="faq-list">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="faq-item">
                  <div className="faq-question" onClick={() => toggleFaq(faq.id)}>
                    <h3>{faq.question}</h3>
                    {expandedFaqs.includes(faq.id) ? (
                      <ChevronUp size={20} className="faq-icon" />
                    ) : (
                      <ChevronDown size={20} className="faq-icon" />
                    )}
                  </div>
                  {expandedFaqs.includes(faq.id) && <div className="faq-answer">{faq.answer}</div>}
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <HelpCircle size={48} />
              <h3>No results found</h3>
              <p>
                We couldn't find any FAQs matching your search. Try different keywords or{" "}
                <a href="/contact">contact our support team</a>.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default SupportPage
