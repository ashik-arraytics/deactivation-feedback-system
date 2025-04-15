
import './App.css'
import DeactivationModal from './components/DeactivationModal/DeactivationModal';
import useDeactivationModal from './hooks/useDeactivationFeedback';



function App() {
  // api function
	const handleSubmit = async (feedbackData) => {
    console.log("✨ ~ handleSubmit ~ feedbackData:", feedbackData)
		// Handle feedback submission
	};
  
const {isModalVisible, closeModal } =  useDeactivationModal({
    pluginName:"Poptics",
    onDeactivationClick:() => {
      // call api function
      handleSubmit()
    }
  })

  return (
    <div className='plugins-php'>
     <a href="plugins.php?action=deactivate&amp;plugin=poptics%2Fpoptics.php&amp;plugin_status=all&amp;paged=1&amp;s&amp;_wpnonce=9be40b1d0b" id="deactivate-poptics" aria-label="Deactivate Poptics">Deactivate</a>
<br/>
     <a href="plugins.php?action=activate&amp;plugin=woo-discount-rules%2Fwoo-discount-rules.php&amp;plugin_status=all&amp;paged=1&amp;s&amp;_wpnonce=bacf2f1107" id="activate-woo-discount-rules" class="edit" aria-label="Activate Discount Rules Core">Activate</a>

     <DeactivationModal
			isOpen={isModalVisible}
			onClose={closeModal}
			onSubmit={handleSubmit}
			pluginName="Poptics"
		/>
    </div>
  )
}

export default App
