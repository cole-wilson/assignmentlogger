$("#submit").click(function(){
	var user = JSON.parse(localStorage.getItem("user"));
	user.kjHgfdgrt56khjgfGJKlhgfdRYE86ghjk = $("#code").val();
	localStorage.setItem('user',JSON.stringify(user));
	$.get("https://aback.cwi.repl.co/admin?mode=claim&id="+user.id+"&code="+$("#code").val()),function(data,status){
		window.location = "/";
	})
});