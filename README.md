# WordPress Plugin Deactivation Feedback Modal

A reusable React component for collecting user feedback when deactivating WordPress plugins. This package provides a beautiful, customizable modal that appears when users attempt to deactivate your plugin, helping you understand their reasons and improve your product.

## Features

- 🎨 Beautiful, modern UI built with Ant Design
- 🔧 Highly customizable (colors, text, icons, etc.)
- 📱 Responsive design
- 🔌 Easy integration with any WordPress plugin
- 💅 SASS styling with easy theming
- ✨ Dynamic feedback form with conditional text areas

## Installation

```bash
npm install wp-deactivation-feedback-modal
# or
yarn add wp-deactivation-feedback-modal
```

## Usage

### Basic Integration

```javascript
import { initDeactivationFeedback } from "wp-deactivation-feedback-modal";

// Initialize the feedback system
initDeactivationFeedback({
	pluginName: "Your Plugin Name",
	onFeedbackSubmit: async (feedbackData) => {
		// Send feedback to your server
		await fetch("/your-api-endpoint", {
			method: "POST",
			body: JSON.stringify(feedbackData),
		});
	},
});
```

### Advanced Configuration

```javascript
initDeactivationFeedback({
	selector: ".your-custom-deactivate-link", // Custom selector for deactivate links
	pluginName: "Your Plugin Name",
	onFeedbackSubmit: async (feedbackData) => {
		// Handle feedback submission
	},
	modalConfig: {
		title: "Custom goodbye message",
		submitButtonText: "Submit Feedback & Deactivate",
		cancelButtonText: "Keep Plugin",
		skipButtonText: "Skip Feedback",
		theme: {
			primaryColor: "#1890ff",
			dangerColor: "#ff4d4f",
		},
		feedbackOptions: [
			{
				key: "custom_reason",
				icon: <YourCustomIcon />,
				text: "Your Custom Reason",
				placeholder: "Custom placeholder text",
			},
			// ... more options
		],
	},
});
```

### Using the Modal Component Directly

```javascript
import { DeactivationModal } from "wp-deactivation-feedback-modal";

function YourComponent() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleSubmit = async (feedbackData) => {
		// Handle feedback submission
	};

	return (
		<DeactivationModal
			isOpen={isModalOpen}
			onClose={() => setIsModalOpen(false)}
			onSubmit={handleSubmit}
			pluginName="Your Plugin"
		/>
	);
}
```

## API Reference

### initDeactivationFeedback Options

| Option           | Type     | Default              | Description                               |
| ---------------- | -------- | -------------------- | ----------------------------------------- |
| selector         | string   | '.deactivate-plugin' | CSS selector for deactivate links         |
| pluginName       | string   | -                    | Your plugin's name                        |
| onFeedbackSubmit | function | -                    | Callback for handling feedback submission |
| modalConfig      | object   | {}                   | Configuration for the modal component     |

### Modal Configuration Options

| Option           | Type   | Default                       | Description               |
| ---------------- | ------ | ----------------------------- | ------------------------- |
| title            | string | 'Goodbyes are always hard...' | Modal title               |
| submitButtonText | string | 'Submit & Deactivate'         | Submit button text        |
| cancelButtonText | string | 'Cancel'                      | Cancel button text        |
| skipButtonText   | string | 'Skip & Deactivate'           | Skip button text          |
| theme            | object | { primaryColor: '#1890ff' }   | Theme configuration       |
| feedbackOptions  | array  | [...]                         | Array of feedback options |

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## License

MIT
# deactivation-feedback-system
