let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
	var addBtn = document.getElementById('a2hs');
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
		addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';

    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
					ga('send', {
  hitType: 'event',
  eventCategory: 'Home Screen',
  eventAction: 'prompt',
  eventLabel: 'accept'
});
        } else {
					ga('send', {
  hitType: 'event',
  eventCategory: 'Home Screen',
  eventAction: 'prompt',
  eventLabel: 'dismiss'
});
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});