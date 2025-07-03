"use client"

import { useRef, useCallback, useEffect } from "react"
import gsap from "gsap"

/**
 * Custom hook for form animations
 * @returns {Object} Animation utilities
 */
export const useFormAnimation = () => {
  const questionRef = useRef(null)

  const animateIn = useCallback(() => {
    if (questionRef.current) {
      gsap.fromTo(questionRef.current, { opacity: 0, x: 100 }, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" })
    }
  }, [])

  const animateOut = useCallback((direction, callback) => {
    if (questionRef.current) {
      gsap.to(questionRef.current, {
        opacity: 0,
        x: direction === "next" ? -100 : 100,
        duration: 0.3,
        ease: "power2.in",
        onComplete: callback,
      })
    } else {
      callback()
    }
  }, [])

  // Cleanup GSAP on unmount
  useEffect(() => {
    return () => {
      if (questionRef.current) {
        gsap.killTweensOf(questionRef.current)
      }
    }
  }, [])

  return { questionRef, animateIn, animateOut }
}
