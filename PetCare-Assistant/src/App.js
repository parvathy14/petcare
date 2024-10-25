import React from 'react';
import PetCareAssistant from './components/PetCareAssistant';
import { motion } from 'framer-motion';

const App = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PetCareAssistant />
    </motion.div>
  );
};

export default App;