version = "2.2";
vnot = version != localStorage.getItem('version');
if (vnot) {
	$("#loadtext").text("UPDATING TO version "+version+"!");
}
window.ga = console.log;
// window.onerror = function(msg, url, linenumber) {
//   alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
//   return true;
// }

// Start Load Code
var loaded = 0;
var count = 0;
function check() {
	count = count + 50
	if (count > 6000) {
		document.write(
			atob(
				"PHN0eWxlPmJvZHl7YmFja2dyb3VuZDpsaWdodGJsdWU7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC1zaXple319PC9zdHlsZT5Tb3JyeSwgYnV0IHRoZXJlIHNlZW1zIHRvIGJlIGFuIGVycm9yLlBsZWFzZSA8YSBocmVmPSIvIj50cnkgYWdhaW4uPC9hPklmIHRoZSBwcm9ibGVtIHNlZW1zIHRvIHBlcnNpc3QsIGVtYWlsIG1lIGF0IDxjb2RlPnN1cHBvcnRAY29sZXdpbHNvbi54eXo8L2NvZGU+PGJyPkkgd2lsbCB3b3JrIHRvIGdldCB0aGUgcHJvYmxlbSBmaXhlZCBBU0FQLg=="
			));
			ga('send', {
  hitType: 'event',
  eventCategory: 'Pageload',
  eventAction: 'error',
  eventLabel: 'error'
});
		return;
	}
	else if(loaded < 3) {
		setTimeout(check, 50);
		return;
	}
	else {
					ga('send', {
  hitType: 'event',
  eventCategory: 'Pageload',
  eventAction: 'success',
  eventLabel: 'success'
});
		$("#load").css("display","none");
		$("body, #assignment-list, #v").css("display","block");
		if (vnot) {
			localStorage.setItem('version',version);
			$.get("https://api.github.com/repos/cole-wilson/assignmentlogger/commits",function(data,status){

				Toastify({
					text: "Version " + version + " just came out! (view details)",
					duration: 6000,
					destination: data[0]["html_url"],
					newWindow: true,
					close: true,
					gravity: "bottom", // `top` or `bottom`
					position: 'right', // `left`, `center` or `right`
					backgroundColor: "gray",
					stopOnFocus: true, // Prevents dismissing of toast on hover
					onClick: function(){} // Callback after click
				}).showToast();
			});
		}
		return;
	}
}check();
