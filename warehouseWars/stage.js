/** The stage that holds all the map data. **/
class Map{
	
	/**
	*Constructor for a card.
	*@param {int} width - The width of the map.
	*@param {int} height - The height of the map.
	*@param {string} stageID - The current game.
	*/
	constructor(width, height, stageID){
		this.actors = [];
		this.user = null;
		this.player = null;
		this.width = width;
		this.height = height;
		this.stageID = stageID;
		this.num_monsters = 0;
		this.time = 0;
		this.score = 60;
		
		this.scream = document.createElement("audio");
		this.scream.src = "./sounds/Scream.mp3";
		
		this.cheer = document.createElement("audio");
		this.cheer.src = "./sounds/Audience.mp3";
		
		this.boo = document.createElement("audio");
		this.boo.src = "./sounds/boo3.mp3";
		
	}
	
	checkObjects(w,h,mapObjects){
		if(mapObjects == null)return false;
		if(mapObjects.length == 0)return false;
		for(var i = 0; i < mapObjects.length; i++){
			if(w == mapObjects[i].getX() && h == mapObjects[i].getY()){
				return mapObjects[i];
			}
		}
		
		return false;
	}
	
	/** Sets up the game map **/
	gameSetup(mapObjects, player, num_monsters){
		
		//The player
		this.player = player;
		
		this.num_monsters = num_monsters;
		
		this.actors = mapObjects;
		
		var map = "<table>";
		for (var h = 0; h < this.height; h++){
			map += "<tr>";
			for (var w = 0; w < this.width; w++){
				if (this.checkObjects(w,h,mapObjects).objectType == "wall"){
					map += "<td> <img src='icons/wall.jpeg' id='" + "tile_" + w + "_" + h + "' /> </td>";
				}
				else if(h == this.height/2 && w == this.width/2){
					map += "<td> <img src='"+this.player.getImg()+"' id='" + "tile_" + w + "_" + h + "' /> </td>";
				}
				else if (this.checkObjects(w,h,mapObjects).objectType == "monster"){
					if(this.checkObjects(w,h,mapObjects).movement == 5){
						map += "<td> <img src='icons/face-devil-grin-26.png' id='" + "tile_" + w + "_" + h + "' /> </td>";
					}
					else if(this.checkObjects(w,h,mapObjects).movement == 6){
						map += "<td> <img src='icons/face-devil-grin-25.png' id='" + "tile_" + w + "_" + h + "' /> </td>";
					}
					else{
						map += "<td> <img src='icons/face-devil-grin-24.png' id='" + "tile_" + w + "_" + h + "' /> </td>";
					}
				}
				else if(this.checkObjects(w,h,mapObjects).objectType == "box"){
					map += "<td> <img src='icons/emblem-package-2-24.png' id='" + "tile_" + w + "_" + h + "' /> </td>";
				}
				else{
					map += "<td> <img src='icons/blank.gif' id='" + "tile_" + w + "_" + h + "' /> </td>";
				}
			}
			map += '</tr>';
		}
		map += '</table>';
		document.getElementById("map").innerHTML = map;
	}
	
	getTileID(x, y){
		for(var i = 0; i < this.actors.length; i++){
			if (this.actors[i].getX() == x && this.actors[i].getY() == y){
				return this.actors[i];
			}
		}
		return null;
	}
	
	/**
	*Add an actor to the actor list.
	*@param {actor} actor - The actor object.
	*@return {boolean} boolean - If add was successful.
	*/
	addActor(actor){
		if (actor == null)return false;
		this.actors.push(actor);
		return true;
	}
	
	/**
	*Remove an actor from the actor list.
	*@param {actor} actor - The actor object.
	*@return {boolean} boolean - If removal was successful.
	*/
	removeActor(actor){
		var index = this.actors.indexOf(actor);
		if (index == -1){return false;}
		this.actors.splice(index, 1);
		return true;
	}
	
	getActor(actor){
		var index = this.actors.indexOf(actor);
		if (index !== -1){return null;}
		return this.actors[index];
	}
	
	setImage(x, y, img){
		document.getElementById("tile_"+x+"_"+y).src = img;
		return null;
	}
	
	step(){
		if(this.score==0){
			this.boo.play();
			alert("Game Over, you ran out of time.");
			updateScore(this.score);
			clearInterval(interval);
			this.player=null;
			return;
		}
		else if(this.player == null){
			this.scream.play();
			alert("Game Over, You Lose!\n"+"Your score is: "+this.score);
			//document.getElementById("map").innerHTML = "<table class='map id='map'></table>";
			updateScore(this.score);
			clearInterval(interval);
			storeScore(this.user, this.score);
			return;
		}
		else if(this.num_monsters == 0){
			this.cheer.play();
			alert("Game Over, You Win!\n"+"Your score is: "+this.score);
			updateScore(this.score);
			clearInterval(interval);
			storeScore(this.user, this.score);
			return;
		}
		for(var i = 0; i < this.actors.length; i++){
			if(this.actors[i].getObjectType() == "monster"){
				this.setImage(this.actors[i].getX(), this.actors[i].getY(), "icons/blank.gif");
				this.actors[i].moveChoose(this);
				this.setImage(this.actors[i].getX(), this.actors[i].getY(), this.actors[i].getImg());
				if(this.actors[i].getX() == this.player.getX() && this.actors[i].getY() == this.player.getY()){
					this.player = null;
				}
				if(this.actors[i].checkDead(this)){
					this.setImage(this.actors[i].getX(), this.actors[i].getY(), "icons/blank.gif");
					this.removeActor(this.actors[i]);
					this.num_monsters -= 1;
					this.score += 60;
				}
			}
		}
		this.time += 1;
		this.score -= 1;
		document.getElementById("timePassed").innerHTML = this.time;
		document.getElementById("scoreBoard").innerHTML = this.score;
		
		return null;
	}

	setUser(user){
		this.user = user;
	}

	getUser(){
		return this.user;
	}
	
	getScore(){
		return this.score;
	}
}