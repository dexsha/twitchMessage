const toolbar = document.querySelector('.chat-input__buttons-container');

const trackButton = document.createElement('button');
trackButton.innerHTML = 'Track';
toolbar.appendChild(trackButton);

trackButton.addEventListener('click', uiPopup);

function uiPopup() {
	let trackUsername = prompt('Enter username to track:')
	if(trackUsername != null) {
		trackMessages(trackUsername);
}

function trackMessages(trackUsername) {
	const targetNode = document.querySelectorAll('[role="log"]')[0];

	// Options for the observer (which mutations to observe)
	const config = { childList: true };

	// Callback function to execute when mutations are observed
	const callback = function(mutationsList, observer) {
		const lastMessageUsername = targetNode.childNodes[targetNode.childNodes.length - 2].childNodes[1].outerText;
		const lastMessageText = targetNode.childNodes[targetNode.childNodes.length - 2].childNodes[3].outerText;
		for(let mutation of mutationsList) {
	        if (mutation.type === 'childList') {
	        	if(lastMessageUsername === trackUsername) {
	        		console.log(lastMessageUsername + ': ' + lastMessageText);
	        	}
	        }
	    }
	};

	// Create an observer instance linked to the callback function
	const observer = new MutationObserver(callback);

	// Start observing the target node for configured mutations
	observer.observe(targetNode, config);

	// Later, you can stop observing
	//observer.disconnect();
}