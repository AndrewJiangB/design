var username;



function showStage(){
	$("#game").show();
	$("#login").hide();
	$("#register").hide();
	setupGame();
	startGame();
}

function showLogin(){
	$(".form_input").val("");
	setTop10();
	$("#game").hide();
	$("#login").show();
	$("#register").hide();
}

function showRegister(){
	$(".form_input").val("");
	$("#game").hide();
	$("#login").hide();
	$("#register").show();
}

function validateLoginUsername(username){
	if(username.length < 8){
		$("#login_error_message").html("Username too short, must be at least 8 characters");
		$("#login_error_message").show();
		return false;
	}
	if(!username.match(/^[0-9a-zA-Z]+$/)){
		$("#login_error_message").html("Username must be alpha-numeric");
		$("#login_error_message").show();
	}
	return true;
}
function validateLoginPassword(password){
	if(password.length < 8){
		$("#login_error_message").html("Password too short, must be at least 8 characters");
		$("#login_error_message").show();
		return false;
	}
	return true;
}
function validateRegisterUsername(username){
	if(username.length < 8){
		$("#register_error_message").html("Username too short, must be at least 8 characters");
		$("#register_error_message").show();
		return false;
	}
	if(!username.match(/^[0-9a-zA-Z]+$/)){
		$("#register_error_message").html("Username must be alpha-numeric");
		$("#register_error_message").show();
	}
	return true;
}
function validateRegisterPassword(password){
	if(password.length < 8){
		$("#register_error_message").html("Password too short, must be at least 8 characters");
		$("#register_error_message").show();
		return false;
	}
	return true;
}

function setProfile(){
	var data = {username: this.username};

	$.ajax({
		method: "GET",
		url: "/ww/api/user/" + data.username,
		data: data,
	}).done(function(data){
		var username = data["user"]["name"];
		var score = data["user"]["score"];
		$("#profile_username").html(username);
		$("#profile_username").val(username);
		$("#profile_score").html(score);
		$("#profile_score").val(score);

	}).fail(function(err){

	});
	}

function loginUser(){
	this.username = $("#login_username").val();
	pass = $("#login_password").val();
	$(".form_input").val("");
	if(validateLoginUsername(this.username) && validateLoginPassword(pass)){
		var data = {username: this.username, password: pass};
		$.ajax({ 
			method: "POST", 
			url: "/ww/api/login",
			data: data
		}).done(function(data){
			if(typeof data !== "undefined"){
				setProfile();
				showStage();
			}
			else{
				$("#login_error_message").html("Invalid Login");
				$("#login_error_message").show();
			}
		}).fail(function(err){
			console.log(err.status);
			console.log(JSON.stringify(err.responseJSON));
		});
	}
}

function registerUser(){
	this.username = $("#register_username").val();
	var pass = $("#register_password").val();
	var second_pass = $("#register_confirmation_password").val();
	// radio button stuff
	var gender = "";
	if($("#male_radio")[0].checked == true){
		gender = $("#male_radio").val();
	}
	else if($("#female_radio")[0].checked == true){
		gender = $("#female_radio").val();
	}
	else if($("#other_radio")[0].checked == true){
		gender = $("#other_radio").val();
	}
	// checkbox stuff
	var agree = "false";
	if($("#terms")[0].checked == true){
		agree = "true";
	}

	console.log(gender);
	if(validateRegisterUsername(this.username) && validateRegisterPassword(pass)){
		$(".form_input").val("");
		if(pass !== second_pass){
			$("#register_error_message").html("Passwords must match");
			return;
		}
		if(agree !== "true"){
			$("#register_error_message").html("You must accept the condition");
			return;
		}
		var data = {username: this.username, password: pass, gender: gender, agree: agree};
		console.log(data);
		$.ajax({ 
			method: "PUT", 
			url: "/ww/api/register",
			data: data
		}).done(function(data){
			setProfile();
			showStage();
		}).fail(function(err){
			$("#register_error_message").html("sorry, that username is already taken");
		});
	}
}

function deleteUser(){
	this.username = $("#profile_username").val();
	var score = $("#profile_score").val();
	$("#profile_username").html("");
	$("#profile_score").html("");
	$("#profile_username").val("");
	$("#profile_score").val("");

	var data = {username: this.username}

	$.ajax({
		method: "DELETE",
		url: "/ww/api/delete",
		data: data,
	}).done(function(data){
		console.log("deleted");
		clearInterval(interval);
		showLogin();
	}).fail(function(err){
		console.log("not deleted");
		alert("user not deleted");
	});
}

function storeScore(new_score){
	var user = getUser();
	var data = {score: new_score};
	$.ajax({
		method: "POST",
		data: JSON.stringify(data),
		url: "/ww/api/score" + user,
	}).done(function(data){
		console.log("new score scored");
	}).fail(function(err){
		console.log("new score unable to be scored");
	});
}

function setTop10(){
	$.ajax({
		method: "GET",
		url: "/ww/api/user",
	}).done(function(data){
		var top10 = "<table><tr><th> Rank </th><th> Player Name </th><th> Score </th></tr>";
		for(var i = 1; i <= 10; i++){
			top10 += "<tr>"
			top10 += "<td>" + i + "</td>";
			if(i <= data["user"].length){
				top10 += "<td> " + data["user"][i-1]["name"] + " </td>";
				top10 += "<td> " + data["user"][i-1]["score"] + " </td>";
			}
			else{
				top10 += "<td> ---------------- </td>";
			}
			top10 += "</tr>"
		}
		$("#top10List").html(top10);
	}).fail(function(err){
		console.log(err.status);
		console.log(JSON.stringify(err.responseJSON));
	});
}

function updateScore(new_score){
	var data = {username: this.username, score: new_score};
	$.ajax({
		method: "POST",
		url: "/ww/api/update/score",
		data: data,
	}).done(function(data){
		console.log("stored")
	}).fail(function(err){
		console.log("did not store away");
	});
}
