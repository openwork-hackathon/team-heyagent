'use client'

import { useEffect, useState, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    // Start fade out
    setIsVisible(false)
    
    // After fade out, update children and fade in
    const timeout = setTimeout(() => {
      setDisplayChildren(children)
      setIsVisible(true)
    }, 150)

    return () => clearTimeout(timeout)
  }, [pathname, children])

  // Initial mount
  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div
      className={`transition-all duration-300 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-2'
      }`}
    >
      {displayChildren}
    </div>
  )
}

// Staggered animation wrapper for lists
interface StaggeredListProps {
  children: ReactNode[]
  className?: string
  staggerMs?: number
}

export function StaggeredList({ children, className = '', staggerMs = 50 }: StaggeredListProps) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    const total = children.length
    let count = 0
    
    const interval = setInterval(() => {
      count++
      setVisibleCount(count)
      if (count >= total) {
        clearInterval(interval)
      }
    }, staggerMs)

    return () => clearInterval(interval)
  }, [children.length, staggerMs])

  return (
    <div className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={`transition-all duration-300 ease-out ${
            index < visibleCount
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: `${index * staggerMs}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

// Fade in on scroll component
interface FadeInOnScrollProps {
  children: ReactNode
  className?: string
  threshold?: number
}

export function FadeInOnScroll({ children, className = '', threshold = 0.1 }: FadeInOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [ref, setRef] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref, threshold])

  return (
    <div
      ref={setRef}
      className={`transition-all duration-500 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  )
}
