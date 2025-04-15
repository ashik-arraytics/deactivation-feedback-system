import { useEffect, useRef, useState } from 'react';

/**
 * Hook to manage plugin deactivation modal
 * 
 * @param {Object} options - Hook options
 * @param {string} options.pluginName - The plugin name
 * @param {Function} options.onDeactivationClick - Callback when deactivation link is clicked
 * @returns {Object} - Hook methods and state
 */
const useDeactivationModal = ({ 
  pluginName, 
  onDeactivationClick 
}) => {
  const deactivationUrlRef = useRef(null);
  const initialized = useRef(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Skip if already initialized or missing required parameters
    if (initialized.current || !pluginName || !onDeactivationClick) {
      return;
    }

    const findDeactivationLink = () => {
    // Find the deactivation link in the plugins page
    const deactivateLink = Array.from(document.querySelectorAll('a[href*="plugins.php?action=deactivate"]'))
      .find(link => link.href.includes(`plugin=${pluginName}`) || link.id === `deactivate_${pluginName}`);
    
      if (!deactivateLink) {
        console.warn(`[WP Plugin Feedback] Deactivation link not found for plugin: ${pluginName}`);
        return false;
      }
      
      // Store the original deactivation URL
      deactivationUrlRef.current = deactivateLink.getAttribute('href');
      
      // Override the click event
      deactivateLink.addEventListener('click', handleDeactivationClick);
      
      return true;
    };

    const handleDeactivationClick = (event) => {
      event.preventDefault();
      setIsModalVisible(true);
      // Call the callback function
      if (onDeactivationClick) {
        onDeactivationClick();
      }
    };

    // Check if we're on the plugins page
    if (window.pagenow === 'plugins' || document.body.classList.contains('plugins-php')) {
      // Try to find and initialize the deactivation link
      const found = findDeactivationLink();
      
      if (found) {
        initialized.current = true;
      } else {
        // If not found, try again after a short delay
        // This allows for dynamic plugin lists to finish loading
        setTimeout(() => {
          findDeactivationLink();
          initialized.current = true;
        }, 1000);
      }
    }

    // Cleanup function
    return () => {
      if (initialized.current) {
        const deactivateLink = document.querySelector(`[data-plugin="${pluginName}"] .deactivate a`);
        if (deactivateLink) {
          deactivateLink.removeEventListener('click', handleDeactivationClick);
        }
      }
    };
  }, [pluginName, onDeactivationClick]);

  /**
   * close modal
   */
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return {
    isInitialized: initialized.current,
    deactivationUrl: deactivationUrlRef.current,
    isModalVisible,
    closeModal,
  };
};

export default useDeactivationModal;