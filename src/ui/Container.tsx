import { ReactNode } from "react"

type ContainerProps = {
  children: ReactNode
  className?: string
  max?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  noPadding?: boolean
}

export function Container({
  children,
  className = "",
  max = 'xl',
  noPadding,
}: ContainerProps) {
  const maxMap = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
  } as const

  return (
    <div
      className={[
        'mx-auto',
        maxMap[max],
        noPadding ? '' : 'px-4 sm:px-6 lg:px-8',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}
