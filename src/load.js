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
		return;
	}
	else if(loaded < 3) {
		setTimeout(check, 50);
		return;
	}
	else {
		$("#load").css("display","none");
		$("body, #assignment-list, #v").css("display","block");
		return;
	}
}check();