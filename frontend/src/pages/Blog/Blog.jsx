"use client"

import { useState, useEffect } from "react"
import "./Blog.css"
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react'
import { Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [filteredPosts, setFilteredPosts] = useState([])
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success("Subscription added successfully!");
        setEmail(""); // Clear the input field after successful subscription
      } else {
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  // Blog post data
  const blogPosts = [
    {
      id: 1,
      title: "The Science Behind Proper Hydration",
      excerpt:
        "Discover why staying hydrated is crucial for your overall health and how it affects everything from cognitive function to physical performance.",
      image: "1.png",
      category: "Hydration",
      author: "Dr. Sarah Johnson",
      date: "April 15, 2025",
      readTime: "5 min read",
      url: "/blogpost",
    },
    {
      id: 2,
      title: "Balanced Nutrition: The Foundation of Wellness",
      excerpt:
        "Learn how a balanced diet with the right mix of macronutrients and micronutrients can transform your health and energy levels.",
      image: "2.png",
      category: "Nutrition",
      author: "Michael Chen, RD",
      date: "April 12, 2025",
      readTime: "7 min read",
      url: "/blog/balanced-nutrition",
    },
    {
      id: 3,
      title: "Mindful Eating: Transform Your Relationship with Food",
      excerpt:
        "Explore the practice of mindful eating and how it can help you develop healthier eating habits and a better relationship with food.",
      image: "3.png",
      category: "Wellness",
      author: "Emma Rodriguez",
      date: "April 8, 2025",
      readTime: "6 min read",
      url: "/blog/mindful-eating",
    },
    {
      id: 4,
      title: "The Power of Plant-Based Proteins",
      excerpt:
        "Discover how plant-based proteins can provide all the essential amino acids your body needs while supporting environmental sustainability.",
      image: "4.png",
      category: "Nutrition",
      author: "Dr. James Wilson",
      date: "April 5, 2025",
      readTime: "8 min read",
      url: "/blog/plant-based-proteins",
    },
    {
      id: 5,
      title: "Sleep and Metabolism: The Hidden Connection",
      excerpt:
        "Uncover the surprising ways that sleep quality affects your metabolism, weight management, and overall health.",
      image: "5.png",
      category: "Wellness",
      author: "Dr. Lisa Patel",
      date: "April 2, 2025",
      readTime: "5 min read",
      url: "/sleep-metabolism",
    },
    {
      id: 6,
      title: "Seasonal Eating: Why Local Foods Matter",
      excerpt:
        "Learn why eating seasonally and locally can improve your nutrition, support your community, and benefit the environment.",
      image: "6.png",
      category: "Nutrition",
      author: "Thomas Green",
      date: "March 28, 2025",
      readTime: "6 min read",
      url: "/blog/seasonal-eating",
    },
    {
      id: 7,
      title: "The Ultimate Guide to Staying Hydrated During Exercise",
      excerpt:
        "Follow these expert tips to maintain optimal hydration before, during, and after your workouts for better performance and recovery.",
      image: "2.png",
      category: "Hydration",
      author: "Alex Thompson",
      date: "March 25, 2025",
      readTime: "7 min read",
      url: "/blog/hydration-during-exercise",
    },
    {
      id: 8,
      title: "Understanding Food Labels: What You Need to Know",
      excerpt:
        "Decode nutrition facts panels and ingredient lists to make more informed choices about the foods you eat.",
      image: "8.png",
      category: "Nutrition",
      author: "Sophia Martinez, RD",
      date: "March 22, 2025",
      readTime: "9 min read",
      url: "/blog/understanding-food-labels",
    },
    {
      id: 9,
      title: "The Mental Health Benefits of Regular Exercise",
      excerpt:
        "Explore how physical activity can improve mood, reduce anxiety, and boost overall mental wellbeing.",
      image: "9.png",
      category: "Fitness",
      author: "Dr. Robert Kim",
      date: "March 18, 2025",
      readTime: "6 min read",
      url: "/blog/mental-health",
    },
    {
      id: 10,
      title: "Intermittent Fasting: Science or Hype?",
      excerpt:
        "A balanced look at the research behind intermittent fasting and whether it might be right for your lifestyle.",
      image: "10.png",
      category: "Nutrition",
      author: "Dr. Amanda Johnson",
      date: "March 15, 2025",
      readTime: "8 min read",
      url: "/blog/intermittent-fasting",
    },
  
  ]

  // Get unique categories
  const categories = ["All", ...new Set(blogPosts.map((post) => post.category))]

  // Filter posts based on search term and category
  useEffect(() => {
    let result = blogPosts

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (activeCategory !== "All") {
      result = result.filter((post) => post.category === activeCategory)
    }

    setFilteredPosts(result)
  }, [searchTerm, activeCategory])

  // Handle "Read More" click
  const handleReadMore = (url) => {
    // In a real application, this would navigate to the blog post page
    window.open(url, "_blank")
  }

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1>Health & Wellness Blog</h1>
        <p>Discover tips, insights, and the latest research on nutrition, fitness, and overall wellbeing</p>
      </div>

      <div className="blog-controls">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-tab ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="featured-post">
        <div className="featured-post-image">
          <img src={blogPosts[0].image || "/placeholder.svg"} alt={blogPosts[0].title} />
        </div>
        <div className="featured-post-content">
          <span className="featured-label">Featured Article</span>
          <h2>{blogPosts[0].title}</h2>
          <p>{blogPosts[0].excerpt}</p>
          <div className="post-meta">
            <span className="post-author">{blogPosts[0].author}</span>
            <span className="post-date">
              <Calendar size={14} />
              {blogPosts[0].date}
            </span>
            <span className="post-read-time">
              <Clock size={14} />
              {blogPosts[0].readTime}
            </span>
          </div>
          <button className="read-more-btn" onClick={() => navigate("/blogpost")}>
            Read Full Article <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="blog-grid">
        {filteredPosts.slice(1).map((post) => (
          <div className="blog-card" key={post.id}>
            <div className="blog-card-image">
              <img src={post.image || "/placeholder.svg"} alt={post.title} />
            </div>
            <div className="blog-card-content">
              <span className="blog-category">{post.category}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="post-meta">
                <span className="post-author">{post.author}</span>
                <div className="post-details">
                  <span className="post-date">
                    <Calendar size={14} />
                    {post.date}
                  </span>
                  <span className="post-read-time">
                    <Clock size={14} />
                    {post.readTime}
                  </span>
                </div>
              </div>
              <button className="read-more-btn" onClick={() => handleReadMore(post.url)}>
                Read More <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="no-results">
          <p>No articles found matching your search criteria.</p>
          <button className="reset-filters-button" onClick={() => {
            setSearchTerm("")
            setActiveCategory("All")
          }}>
            Reset Filters
          </button>
        </div>
      )}

    <div className="newsletter-section">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for the latest health tips, recipes, and wellness advice.</p>
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSubscribe}>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
