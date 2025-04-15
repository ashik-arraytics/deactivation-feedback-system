import React, { useState } from 'react';
import { Modal, Input, Button, Space } from 'antd';
import { FrownOutlined, SearchOutlined, AppstoreOutlined, StopOutlined, EyeOutlined, ExclamationCircleOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import './DeactivationModal.scss';

const { TextArea } = Input;

const defaultFeedbackOptions = [
  {
    key: 'couldnt_understand',
    icon: <FrownOutlined />,
    text: "Couldn't understand",
    placeholder: 'Would you like us to assist you?'
  },
  {
    key: 'better_plugin',
    icon: <SearchOutlined />,
    text: 'Found a better plugin',
    placeholder: 'Would you mind sharing which plugin you found? This helps us improve.'
  },
  {
    key: 'missing_feature',
    icon: <AppstoreOutlined />,
    text: 'Missing a specific feature',
    placeholder: 'Would you tell us about it?'
  },
  {
    key: 'not_working',
    icon: <StopOutlined />,
    text: 'Not working Properly',
    placeholder: 'Would you tell us about the issue?'
  },
  {
    key: 'not_expected',
    icon: <EyeOutlined />,
    text: 'Not what I was looking',
    placeholder: 'What were you expecting to find? Your feedback helps us improve our product description.'
  },
  {
    key: 'didnt_work',
    icon: <InfoCircleOutlined />,
    text: "Didn't work as expected",
    placeholder: 'How did you expect it to work? This helps us understand your needs better.'
  },
  {
    key: 'other',
    icon: <AppstoreAddOutlined />,
    text: 'Others',
    placeholder: 'Would you please elaborate a bit more?'
  }
];

const DeactivationModal = ({
  isOpen,
  onClose,
  onSubmit,
  pluginName = 'the plugin',
  title = 'If you have a moment, please let us know how we can improve.',
  submitButtonText = 'Submit & Deactivate',
  cancelButtonText = 'Cancel',
  skipButtonText = 'Skip & Deactivate',
  feedbackOptions = defaultFeedbackOptions,
  privacyText = '',
  privacyLink = '#',
  privacyLinkText = 'Learn more',
  theme = {
    primaryColor: '#6B46C1',
    dangerColor: '#ff4d4f'
  }
}) => {
  const [selectedReason, setSelectedReason] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async () => {
    if (onSubmit) {
      await onSubmit({
        reason: selectedReason,
        feedback,
      });
    }
    onClose();
  };

  const currentPlaceholder = feedbackOptions.find(option => option.key === selectedReason)?.placeholder || '';

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      title={title}
      footer={null}
      width={1200}
      className="deactivation-feedback-modal"
    >
      <div className="feedback-options">
        {feedbackOptions.map((option) => (
          <div
            key={option.key}
            className={`feedback-option ${selectedReason === option.key ? 'selected' : ''}`}
            onClick={() => setSelectedReason(option.key)}
          >
            {option.icon}
           <p> {option.text}</p>
          </div>
        ))}
      </div>

      {selectedReason && (
        <TextArea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder={currentPlaceholder}
          rows={4}
          className="feedback-textarea"
        />
      )}

      <div className="privacy-notice">
        {privacyText} <a href={privacyLink} target="_blank" rel="noopener noreferrer">{privacyLinkText}</a>
      </div>

      <div className="modal-footer">
        <Button onClick={onClose}>{cancelButtonText}</Button>
        <Button onClick={handleSubmit} type="text">{skipButtonText}</Button>
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={!selectedReason}
          style={{ backgroundColor: theme.primaryColor }}
        >
          {submitButtonText}
        </Button>
      </div>
    </Modal>
  );
};

export default DeactivationModal;