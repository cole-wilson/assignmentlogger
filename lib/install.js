// window.addEventListener('beforeinstallprompt', (event) => {
// alert();
//   // Stash the event so it can be triggered later.
//   window.deferredPrompt = event;
//   // Remove the 'hidden' class from the install button container
//   // divInstall.classList.toggle('hidden', false);
// });
// document.getElementById('#assignment-block').addEventListener('click', () => {
//   alert('👍'+ 'butInstall-clicked');
//   const promptEvent = window.deferredPrompt;
//   if (!promptEvent) {
//     // The deferred prompt isn't available.
//     return;
//   }
//   // Show the install prompt.
//   promptEvent.prompt();
//   // Log the result
//   promptEvent.userChoice.then((result) => {
//     alert('👍'+ 'userChoice'+result);
//     // Reset the deferred prompt variable, since
//     // prompt() can only be called once.
//     window.deferredPrompt = null;
//     // Hide the install button.
//     // divInstall.classList.toggle('hidden', true);
//   });
// });