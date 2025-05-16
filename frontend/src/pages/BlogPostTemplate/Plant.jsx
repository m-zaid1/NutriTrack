"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import "./BlogPostTemplate.css"

const Plant = () => {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [activePage, setActivePage] = useState("blog")
  const [showLogin, setShowLogin] = useState(false)

  // Handle scroll to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (

    
    <div className="blog-post-template">
      <div className="blog-post-content-wrapper">
        <article className="blog-post-article">
          <h1 className="blog-post-title">The Science Behind Proper Hydration</h1>

          <div className="blog-post-author">
            <div className="author-info">
              <span className="author-name">Dr. Sarah Johnson</span>
              <span className="post-date">15 April 2025</span>
            </div>
          </div>

          <div className="blog-post-divider">
            <span className="divider-dot"></span>
            <span className="divider-dot"></span>
            <span className="divider-dot"></span>
          </div>

          <div className="blog-post-featured-image">
            <img src="/public/4.png" alt="Hydration Science" />
          </div>

          <div className="blog-post-content">
            <p>
              Water is essential for life. It makes up about 60% of your body weight and is involved in many important
              functions, including:
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat pretium, mi sed id dui sed orci, tempor.
              Pellentesque egestas odio enim, accumsan, cursus. Fermentum in bibendum aliquet est viverra eu vitae in
              nibh. Leo, feugiat amet neque, quis. Amet, eget vulputate cursus in eu sit pulvinar et.
            </p>

            <p>
              Nibh at sem viverra pellentesque hac odio duis a. Urna vitae, at ac et rhoncus. Mauris sit accumsan vitae,
              nibh netus. In elementum pharetra in lacinia nibh. Non est eget egestas eu et purus amet. Vitae aliquam
              sit tincidunt pellentesque netus suspendisse vulputate. Dui justo, ac maecenas pharetra.
            </p>

            <h2>How Much Water Do You Need?</h2>

            <p>
              You've probably heard the advice to drink eight glasses of water a day. That's easy to remember, and it's
              a reasonable goal. But different people need different amounts of water to stay hydrated.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat pretium, mi sed id dui sed orci, tempor.
              Pellentesque egestas odio enim, accumsan, cursus. Fermentum in bibendum aliquet est viverra eu vitae in
              nibh. Leo, feugiat amet neque, quis. Amet, eget vulputate cursus in eu sit pulvinar et.
            </p>

            <p>
              Nibh at sem viverra pellentesque hac odio duis a. Urna vitae, at ac et rhoncus. Mauris sit accumsan vitae,
              nibh netus. In elementum pharetra in lacinia nibh. Non est eget egestas eu et purus amet. Vitae aliquam
              sit tincidunt pellentesque netus suspendisse vulputate. Dui justo, ac maecenas pharetra.
            </p>

            <h2>Signs of Dehydration</h2>

            <p>
              Your body loses water through breathing, sweating, digestion, and elimination. If you don't replace lost
              fluids, you can become dehydrated.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat pretium, mi sed id dui sed orci, tempor.
              Pellentesque egestas odio enim, accumsan, cursus. Fermentum in bibendum aliquet est viverra eu vitae in
              nibh. Leo, feugiat amet neque, quis. Amet, eget vulputate cursus in eu sit pulvinar et.
            </p>

            <p>
              Nibh at sem viverra pellentesque hac odio duis a. Urna vitae, at ac et rhoncus. Mauris sit accumsan vitae,
              nibh netus. In elementum pharetra in lacinia nibh. Non est eget egestas eu et purus amet. Vitae aliquam
              sit tincidunt pellentesque netus suspendisse vulputate. Dui justo, ac maecenas pharetra.
            </p>

            <h2>Hydration and Physical Performance</h2>

            <p>
              Even mild dehydration can drain your energy and make you tired. Research has shown that losing just 1-2%
              of your body weight in fluid can decrease performance by up to 25%.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat pretium, mi sed id dui sed orci, tempor.
              Pellentesque egestas odio enim, accumsan, cursus. Fermentum in bibendum aliquet est viverra eu vitae in
              nibh. Leo, feugiat amet neque, quis. Amet, eget vulputate cursus in eu sit pulvinar et.
            </p>

            <p>
              Nibh at sem viverra pellentesque hac odio duis a. Urna vitae, at ac et rhoncus. Mauris sit accumsan vitae,
              nibh netus. In elementum pharetra in lacinia nibh. Non est eget egestas eu et purus amet. Vitae aliquam
              sit tincidunt pellentesque netus suspendisse vulputate. Dui justo, ac maecenas pharetra.
            </p>
          </div>
        </article>
      </div>
      
      {showBackToTop && (
        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          <span>Back to top</span>
          <ArrowUp size={16} />
        </button>
      )}

    </div>
  )
}

export default Plant
