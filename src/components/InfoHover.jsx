import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/components/InfoHover.scss';

const InfoHover = ({ position, title, content, icon : Icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="info-hover-container" 
      style={{ top: position.top, left: position.left }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="info-icon"
        whileHover={{ scale: 1.2 }}
      >
        <Icon size={24} />
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="info-popup"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <h4 className="info-title">{title}</h4>
            <div className="info-content">
              {Array.isArray(content)
                ? content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                : <p>{content}</p>
              }
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InfoHover;