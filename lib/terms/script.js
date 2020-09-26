function go() {
	if ($('#asdf').is(':checked')) {
		window.location = "/settings";
	}
	else {
		$('#s').css('border','1px solid red')
	}
}