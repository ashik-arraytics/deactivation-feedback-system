import React from 'react';
import { createRoot } from 'react-dom/client';
import DeactivationModal from './components/DeactivationModal/DeactivationModal';

// Utility function to initialize the deactivation feedback system
const initDeactivationFeedback = ({
  selector = '.deactivate-plugin',
  pluginName,
  onFeedbackSubmit,
  modalConfig = {}
} = {}) => {
  // Create container for modal
  const modalContainer = document.createElement('div');
  modalContainer.id = 'wp-deactivation-feedback-modal';
  document.body.appendChild(modalContainer);

  const root = createRoot(modalContainer);

  // Find all deactivate links matching the selector
  const deactivateLinks = document.querySelectorAll(selector);

  deactivateLinks.forEach(link => {
    const originalHref = link.getAttribute('href');

    link.addEventListener('click', async (e) => {
      e.preventDefault();

      let isModalOpen = true;

      const handleClose = () => {
        isModalOpen = false;
        root.render(
          <DeactivationModal
            isOpen={false}
            onClose={handleClose}
            pluginName={pluginName}
            {...modalConfig}
          />
        );
      };

      const handleSubmit = async (feedbackData) => {
        try {
          if (onFeedbackSubmit) {
            await onFeedbackSubmit(feedbackData);
          }
          // Proceed with plugin deactivation
          window.location.href = originalHref;
        } catch (error) {
          console.error('Error submitting feedback:', error);
          // Still proceed with deactivation even if feedback submission fails
          window.location.href = originalHref;
        }
      };

      root.render(
        <DeactivationModal
          isOpen={isModalOpen}
          onClose={handleClose}
          onSubmit={handleSubmit}
          pluginName={pluginName}
          {...modalConfig}
        />
      );
    });
  });
};

export { DeactivationModal, initDeactivationFeedback };