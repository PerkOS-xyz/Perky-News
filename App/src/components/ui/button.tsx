import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#EB1B69] via-[#EF5B57] to-[#FD8F50] text-white rounded-full hover:shadow-lg hover:shadow-[#EB1B69]/25",
        destructive:
          "bg-[#EF5B57] text-white rounded-full hover:bg-[#EF5B57]/90",
        outline:
          "border border-[#2d2548] bg-transparent text-white rounded-full hover:bg-[#1B1833] hover:border-[#EB1B69]/50",
        secondary:
          "bg-[#1B1833] text-white border border-[#2d2548] rounded-full hover:bg-[#251e42]",
        ghost: 
          "text-[#a3a3a3] rounded-full hover:bg-[#1B1833] hover:text-white",
        link: 
          "text-[#EB1B69] underline-offset-4 hover:underline hover:text-[#FD8F50]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
