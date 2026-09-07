import React, { useEffect, useRef, useState } from 'react'
import { cn } from '../../utils/cn'

export const Reveal = ({
  children,
  className,
  as: Tag = 'div',
  delay = 0,
  direction = 'up', // 'up' | 'fade'
  ...props
}) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={cn(
        inView
          ? direction === 'up'
            ? 'animate-fade-up'
            : 'animate-fade-in'
          : 'opacity-0',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

export default Reveal