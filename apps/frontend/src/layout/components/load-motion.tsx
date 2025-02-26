import { useLocation } from "@tanstack/react-router"
import { AnimatePresence } from "motion/react"
import * as motion from "motion/react-client"
import type { PropsWithChildren } from "react"

export function LoadMotion({ children }: PropsWithChildren) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{
          opacity: 0,
          x: -10 // 从左侧稍微偏移
        }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.2,
            ease: [0.4, 0, 0.2, 1] // Material Design 推荐的缓动函数
          }
        }}
        exit={{
          opacity: 0,
          x: 10, // 退出时向右偏移
          transition: {
            duration: 0.15,
            ease: [0.4, 0, 1, 1]
          }
        }}
        className="size-full overflow-hidden"
      >
        <motion.div
          variants={{
            initial: {
              opacity: 0,
              y: 10
            },
            animate: {
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.05,
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1]
              }
            }
          }}
          initial="initial"
          animate="animate"
          className="size-full overflow-hidden"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
