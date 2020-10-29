import React from 'react'
import { motion } from 'framer-motion'

const Fade = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

export default Fade;
