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
	else if(loaded < 1) {
		setTimeout(check, 50);
		return;
	}
	else {
		$("#load").css("display","none");
		$("#v, #assignment-list").css("display","block");
		return;
	}
}check();

var v = new Vue({
  el: '#box',
  data: {
		schools: [],
		classes: [],
		t: "Settings"
  },
	mounted: function() {
		loaded++;
	}
});

$.get("https://api.assignmentlogger.com/schools?mode=list",function(data,status){
	for (var key in data) {
		v.schools.push({key:key,name:data[key]});
	}
});

$("#schoolselect").change(function(){
	$.get("https://api.assignmentlogger.com/schools?mode=classes&school="+$(this).val(),function(data,status){
		v.classes = data;
	});
});
window.onload = function() {
	var b = window.location.hash;
	if (b = "#settings") {
		v.t = "Settings";
		document.title = "Settings - AssignmentLogger"
	}
}
$("#submit").click(function(){
	if ($("#schoolselect").val() == "nope") {
		alert('Select your school please');
		return;
	}
	var user = JSON.parse(localStorage.getItem("user"));
	user.school = $("#schoolselect").val();
	user.p1 = $("#p1").val();
	user.p2 = $("#p2").val();
	user.p3 = $("#p3").val();
	user.p4 = $("#p4").val();
	user.p5 = $("#p5").val();
	user.p6 = $("#p6").val();
	user.schoology = $("#schoology").val().replace('webcal://','');
	
	localStorage.setItem('user',JSON.stringify(user));
	$.get("https://api.assignmentlogger.com/users?mode=new&id="+user.id+"&school="+$("#schoolselect").val()+"&schoology="+encodeURIComponent($("#schoology").val())+"&p1="+encodeURI($("#p1").val())+"&p2="+encodeURI($("#p2").val())+"&p3="+encodeURI($("#p3").val())+"&p4="+encodeURI($("#p4").val())+"&p5="+encodeURI($("#p5").val())+"&p6="+encodeURI($("#p6").val()),function(data,status){
		window.location = "/";
	})
});