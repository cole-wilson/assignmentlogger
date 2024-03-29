// Force HTTPS
// if (location.protocol !== 'https:') {
    // location.replace(`https:${location.href.substring(location.protocol.length)}`);
// }

if (localStorage.getItem("user") == null || localStorage.getItem("signed-in") != "true") {$('body').addClass('sign');}
if (localStorage.getItem("dones") == null) {localStorage.setItem("dones","");}
if (localStorage.getItem("links") == null) {localStorage.setItem("links","");}
if (localStorage.getItem("alertclicks") == null) {localStorage.setItem("alertclicks","");}


var dones = localStorage.getItem("dones");
var userdata = {};
if (JSON.parse(localStorage.getItem("user")) != null) {
userdata = JSON.parse(localStorage.getItem("user"));
}
var assignments = {};

// var alerts = [{name:"a"}];
// for (var a in alerts) {
// 	if (localStorage.getItem('alertclicks').includes(a[name]+';')) {
// 		// alert(a[name]);
// 		console.log('a');
// 	}
// 	else{
// 		$("#v").append(`<div class="alert"><button onclick="localStorage.setItem('alertclicks',localStorage.getItem('alertclicks')+'${a.name}'+';');$(this).parent().remove();">&times;</button><br><h4>Share!</h4><p>Please share this site with your friends!</p></div>`)
// 	}
// }

dones = localStorage.getItem("dones");
$.get('https://aback.cwi.repl.co/users?mode=doneslist&id='+userdata.id,function(data,status){
	// if (data != dones) {
	// 	localStorage.setItem("dones",data);
	// }
	dones = localStorage.getItem("dones");
});


setInterval(function(){
	dones = localStorage.getItem("dones");
	$.get('https://aback.cwi.repl.co/users?mode=doneslist&id='+userdata.id,function(data,status){
		if (data != dones) {
			localStorage.setItem("dones",data);
		}
	}
)}, 120000);


setInterval(function(){updatelinks();},600000);

setInterval(function(){ listAssignments(); console.log('Updated assignments.'); }, 120000);

function listAssignments() {
	if (typeof userdata.schoology !== 'undefined') {
	var schoo = userdata.schoology;
	}
	else {
		var schoo = "";
	}
	// prompt("https://aback.cwi.repl.co/assignments?mode=list&school="+userdata.school+"&schoology="+encodeURIComponent(schoo)+"&p1="+userdata.p1+"&p2="+userdata.p2+"&p3="+userdata.p3+"&p4="+userdata.p4+"&p5="+userdata.p5+"&p6="+userdata.p6);
	$.get("https://aback.cwi.repl.co/assignments?mode=list&school="+userdata.school+"&schoology="+encodeURIComponent(schoo)+"&p1="+userdata.p1+"&p2="+userdata.p2+"&p3="+userdata.p3+"&p4="+userdata.p4+"&p5="+userdata.p5+"&p6="+userdata.p6, function(data, status){
		var list = {};
		for (var key in data) {
			var checked = false;
			if (dones.split(';').includes(key)){
				checked = true;
			}
			var d = "";
			if (checked){d="done"}
			list[key] = {
				due: data[key].due,
				user: key.split(':')[1],
				submitted: data[key].submitted,
				title: data[key].title,
				clas: data[key].clas,
				id: key,
				checked: checked,
				desc: data[key].description,
				d: d,

				close: ( data[key].due.includes('hours') || data[key].due.includes('minutes') || data[key].due.includes('seconds') ) ? ((data[key].due.includes('minutes') || data[key].due.includes('seconds')) ? "veryclose" : "close"): ""
			}
		}
	  v.assignments = list;
		loaded++;
	});
}
function bigAssignment(i) {
	var id = atob(i.replace('#',''));
	if (v.assignments[id] != null) {
	var data = v.assignments[id];
	v.chosentitle = data.title;
	v.chosendue = data.due;
	v.chosenclass = data.clas;
	v.chosensub = data.submitted;
	v.chosenuser = data.user;
	if (data.desc == " ") {
		v.chosendesc = "There was no description provided for this assignment."
	}
	else {
		v.chosendesc = data.desc;
	}

	$("#assignment-big").css('display','block');
	}
	else {
		window.location.hash = "";
	}
}

// Fetch first data
$.get("https://aback.cwi.repl.co/schools?mode=info&school="+userdata.school, function(data, status){
	if (userdata.school !== undefined) {
	var metaThemeColor = document.querySelector("meta[name=theme-color]");
  metaThemeColor.setAttribute("content", data.colors[0]);
	document.documentElement.style.setProperty('--main-color', data.colors[0]);
	document.documentElement.style.setProperty('--second-color', data.colors[1]);
	v.schoolink = data.link;v.schoolname = data.name;v.schoologo = data.logo;loaded++;console.log('loaded school');
	}
	else {
		loaded++;
	}
});

listAssignments();

// Vue.js
var v = new Vue({
  el: '#v',
  data: {
		username: userdata.name,
		usericon: userdata.icon,
		p1: userdata.p1,
		p2: userdata.p2,
		p3: userdata.p3,
		p4: userdata.p4,
		p5: userdata.p5,
		p6: userdata.p6,
		linklinks: [],
		sign: false,
		schoologo: "https://via.placeholder.com/40C/",
		schoolink: "/",
    assignments: [],
		chosentitle: "",
		chosenuser: "",
		chosensub: "",
		chosendesc: "",
		chosenclass: "",
		chosendue: "",
		schoolname: "School Logo",
		currentyear: 2020
  },
	mounted: function(){
		loaded++;
		console.log('Loaded Vue.js instance.');
	}
});

// Events
$(document).on("click",".assignment-block input[type=checkbox]",function(){
	var id = $(this).parent().parent().attr('id');
	if (dones.split(';').includes(id) && $(this).is(':not(:checked)') ){
		localStorage.setItem('dones',dones.replace(id+";",""));
		dones = localStorage.getItem('dones');
		$(this).parent().parent().removeClass('done');
	}
	else if (!dones.split(';').includes(id) && $(this).is(':checked')) {
		localStorage.setItem('dones',dones+id+';');
		dones = localStorage.getItem('dones');
		$(this).parent().parent().addClass('done');
	}
	// $.get("https://aback.cwi.repl.co/users?mode=donesnew&id="+userdata.id+"&dones="+localStorage.getItem('dones'))
});

$(document).on("click",".newa input, .newa i",function(){
	$(this).parent().parent().addClass('bn');
	$("#morenew").css('display','block');
});

$(document).on("click",".linkwrapc",function(){
	win = window.open($(this).attr('data-link'), "MsgWindow", "top=0,left=0,width=1,height=1");
	setTimeout(function () { win.close();}, 2000);
});


$(document).on("click",".assignment-clickbox",function(){
	var id = $(this).parent().attr('id');
	window.location.hash = btoa(id);
});

$(document).on("click",".linka",function(){
	// alert();
	localStorage.setItem('links',
	localStorage.getItem('links').replace($(this).attr('data-id')+';','')
	);
	updatelinks();
});






window.onhashchange = function() {
	bigAssignment(window.location.hash.replace('#',''));
}


window.onload = function() {
	var h = window.location.hash.replace('#','');
	if (h != "") {
		bigAssignment(h);
	}
}

$("#newcancel").click(function(){
	$("#morenew").css('display','none');
	$(".newa").removeClass('bn');
});

$("#newsubmit").click(function(){
	if (($("#morenew select").val()!="Select class..." && $("#morenew select").val()!="") && $(".newa input[type=text]").val()!="" && $("#morenew input[type=date]").val()!="") {
		$.post("https://aback.cwi.repl.co/assignments?mode=new&school="+userdata.school+"&class="+encodeURI($("#morenew select").val())+"&name="+encodeURI(userdata.name)+"&title="+encodeURIComponent($(".newa input[type=text]").val())+"&date="+encodeURI($("#morenew input[type=date]").val())+"&desc="+encodeURIComponent($("#morenew textarea").val().replace(/\n/g,'<br>')),
		{
  	  name: userdata.name,
  	  city: "Duckburg"
  	},
  	function(data, status){
			$("#morenew").css('display','none');
			$(".newa").removeClass('bn');
			listAssignments();
  	});
	}
	else {
		alert("Please finish filling out the information.");
	}
});
$("#closebig").click(function(){
	$("#assignment-big").css('display','none');
	window.location.hash = "";
});



function signOut() {
	localStorage.setItem("signed-in","false");
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
			window.location = "/";
  });
}
window.go = function(data) {
let jwt = data.credential
console.log(jwt)
	if (localStorage.getItem("signed-in") != "true") {
		localStorage.setItem("signed-in","true");
	if (localStorage.getItem("user") == null) {
		var user = {};
	}
	else {
		var user = JSON.parse(localStorage.getItem("user"));
	}
	var profile = JSON.parse(atob(jwt.split(".")[1]));
	  user.id = btoa(profile.email);
	  user.name = profile.name;
	  user.icon = profile.picture;
	  user.email = profile.email;
	$.get("https://aback.cwi.repl.co/users?mode=info&id="+btoa(profile.email), function(data, status){
		if (data.school == null) {
			localStorage.setItem('user',JSON.stringify(user));
			window.location = "/settings";
		}
		else {
			user.school = data.school;
			user.p1 = data.p1;
			user.p2 = data.p2;
			user.p3 = data.p3;
			user.p4 = data.p4;
			user.p5 = data.p5;
			user.p6 = data.p6;
			localStorage.setItem('user',JSON.stringify(user));
			window.location = "/";
		}
	});
	}
}

function updatelinks(){
	var l = [];
	var da = localStorage.getItem('links').split(';');
	for (var k in da) {
		var key = da[k];
		// alert(key.split(':::')[2]);
		if (key != ""){
		l.push(
			{
				name:key.split(':::')[0],
				link:key.split(':::')[1],
				style:"background-color: #"+String(Math.floor(Math.random()*16777215).toString(16))+";",
				icon:key.split(':::')[2],
				id:key
			}
		)
	}}
	v.linklinks = l;
}updatelinks();

function newlink() {
	localStorage.setItem('links',localStorage.getItem('links')+prompt('Name:')+":::"+prompt('Link:')+":::"+"fas fa-zoom"+";");
	updatelinks();
}
