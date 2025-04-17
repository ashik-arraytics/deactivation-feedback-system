// import React from 'react';
// import { createRoot } from 'react-dom/client';
import DeactivationModal from './components/DeactivationModal/DeactivationModal';
import useDeactivationModal from './hooks/useDeactivationFeedback';

// Utility function to initialize the deactivation feedback system
// const initDeactivationFeedback = ({
//   pluginName,
//   onFeedbackSubmit,
//   modalConfig = {}
// } = {}) => {
//   // Create container for modal
//   const modalContainer = document.createElement('div');
//   modalContainer.id = 'wp-deactivation-feedback-modal';
//   document.body.appendChild(modalContainer);

//   const root = createRoot(modalContainer);

//   const ModalWrapper = () => {
//     const { isModalVisible, closeModal, deactivationUrl } = useDeactivationModal({
//       pluginName,
//       onDeactivationClick: () => {}
//     });

//     const handleSubmit = async (feedbackData) => {
//       try {
//         if (onFeedbackSubmit) {
//           await onFeedbackSubmit(feedbackData);
//         }
//         // Proceed with plugin deactivation
//         if (deactivationUrl) {
//           window.location.href = deactivationUrl;
//         }
//       } catch (error) {
//         console.error('Error submitting feedback:', error);
//         // Still proceed with deactivation even if feedback submission fails
//         if (deactivationUrl) {
//           window.location.href = deactivationUrl;
//         }
//       }
//     };

//     return (
//       <DeactivationModal
//         isOpen={isModalVisible}
//         onClose={closeModal}
//         onSubmit={handleSubmit}
//         pluginName={pluginName}
//         {...modalConfig}
//       />
//     );
//   };

//   root.render(<ModalWrapper />);

//   // Cleanup function
//   return () => {
//     if (modalContainer && modalContainer.parentNode) {
//       modalContainer.parentNode.removeChild(modalContainer);
//     }
//   };
// };

export { DeactivationModal , useDeactivationModal};