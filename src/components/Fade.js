import React from 'react';
import { motion } from 'framer-motion';

const Fade = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ ease: 'easeOut', duration: 1 }}
  >
    {children}
  </motion.div>
);

export default Fade;
