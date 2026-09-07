import React from 'react'
import { cn } from '../../utils/cn'

export const Container = ({
  children,
  size = 'default', // 'sm' | 'md' | 'default' | 'fluid'
  className,
  as: Component = 'div',
  ...props
}) => {
  const sizes = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    default: 'max-w-7xl',
    fluid: 'max-w-full'
  }

  return (
    <Component
      className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizes[size], className)}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Container
