/** Actors represent all tiles in the map. **/
class Actor{
	constructor(ID, x, y, img, objectType){
		this.actorID = ID;
		this.x = x;
		this.y = y;
		this.img = img;
		this.objectType = objectType;
	}
	
	getX(){
		return this.x;
	}
	
	getY(){
		return this.y;
	}
	
	setCoords(newX, newY){
		if (newX >= 0, newY >= 0)return false;
		this.x = newX;
		this.Y = newY;
		return true;
	}
	
	getImg(){
		return this.img;
	}
	
	getObjectType(){
		return this.objectType;
	}
}

class Monster extends Actor{
	constructor(ID, x, y, movement){
		var objectType = "monster";
		var imageLink = "icons/face-devil-grin-24.png";
		super(ID, x, y, imageLink, objectType);
		var number_of_movements = 6;
		this.movement = Math.floor(Math.random() * (number_of_movements - 1 + 1) ) + 1;
		if(this.movement == 5){this.img = "icons/face-devil-grin-26.png";}
		if(this.movement == 6){this.img = "icons/face-devil-grin-25.png";}
		this.directionFlag = "down";
		this.patternChoice = 1;
	}
	
	checkDead(map){
		var neighbors = [[-1,-1],[0,-1],[1,-1],[-1,0],[0,0],[1,0],[-1,1],[0,1],[1,1]];
		for(var i = 0; i < neighbors.length; i++){
			if(map.getTileID(this.x + neighbors[i][0], this.y + neighbors[i][1]) == null){
				return false;
			}
			else if(map.getTileID(this.x + neighbors[i][0], this.y + neighbors[i][1]) == "box" || map.getTileID(this.x + neighbors[i][0], this.y + neighbors[i][1]) == "wall"){
				return true;
			}
		}
		return true;
	} 	
	
	/** Top left to bottom right. (y=-x) **/
	movePattern1(map){
		if (this.directionFlag == "down"){
			if (map.getTileID(this.x + 1, this.y + 1) == null){
				this.x += 1; 
				this.y += 1;
			}
			if(map.getTileID(this.x + 1, this.y + 1) != null){
				this.directionFlag = "up";
				return false;
			}
			return true;
		}
		else if(this.directionFlag == "up"){
			if (map.getTileID(this.x - 1, this.y - 1) == null){				
				this.x -= 1;
				this.y -= 1;
			}
			if(map.getTileID(this.x - 1, this.y - 1) != null){
				this.directionFlag = "down";
				return false;
			}
			return true;
		}
	}
	
	/** Bottom left to top right. (y=x) **/
	movePattern2(map){
		if (this.directionFlag == "down"){
			if (map.getTileID(this.x + 1, this.y - 1) == null){
				this.x += 1; 
				this.y -= 1;
			}
			if(map.getTileID(this.x + 1, this.y - 1) != null){
				this.directionFlag = "up";
				return false;
			}
			return true;
		}
		else if(this.directionFlag == "up"){
			if (map.getTileID(this.x - 1, this.y + 1) == null){				
				this.x -= 1;
				this.y += 1;
			}
			if(map.getTileID(this.x - 1, this.y + 1) != null){
				this.directionFlag = "down";
				return false;
			}
			return true;
		}
	}
	
	/** Horizontal **/
	movePattern3(map){
		if (this.directionFlag == "down"){
			if (map.getTileID(this.x + 1, this.y) == null){
				this.x += 1; 
			}
			if(map.getTileID(this.x + 1, this.y) != null){
				this.directionFlag = "up";
				return false;
			}
			return true;
		}
		else if(this.directionFlag == "up"){
			if (map.getTileID(this.x - 1, this.y) == null){				
				this.x -= 1;
			}
			if(map.getTileID(this.x - 1, this.y) != null){
				this.directionFlag = "down";
				return false;
			}
			return true;
		}
	}
	
	/** Vertical. **/
	movePattern4(map){
		if(this.directionFlag == "down"){
			if(map.getTileID(this.x, this.y+1) == null){
				this.y += 1;
			}
			if(map.getTileID(this.x, this.y+1) != null){
				this.directionFlag = "up";
				return false;
			}
			return true;
		}
		else if(this.directionFlag == "up"){
			if(map.getTileID(this.x, this.y-1)==null){
				this.y -= 1;
			}
			if(map.getTileID(this.x, this.y-1)!=null){
				this.directionFlag = "down";
				return false;
			}
			return true;
		}
	}
	
	/** Follows the player. **/
	moveSmart(map){
		var toX = null;
		var toY = null;
		if(map.player.getX()-this.x != 0){var toX = this.x + ((map.player.getX()-this.x) / Math.abs((map.player.getX()-this.x)));}
		if(map.player.getY()-this.y != 0){var toY = this.y + ((map.player.getY()-this.y) / Math.abs((map.player.getY()-this.y)));}
		if(toX != null && toY != null){
			if(map.getTileID(toX,toY) == null){
				this.x = toX;
				this.y = toY;
				return true;
			}
		}
		else if(toX != null){
			if(map.getTileID(toX,this.y) == null){
				this.x = toX;
				return true;
			}
		}
		else if(toY != null){
			if(map.getTileID(this.x,toY) == null){
				this.y = toY;
				return true;
			}
		}
		return false;
	}
	
	moveRandom(map){
		if(this.patternChoice == 1){
			if(this.movePattern1(map)){return true;}
		}
		else if(this.patternChoice == 2){
			if(this.movePattern2(map)){return true;}
		}
		else if(this.patternChoice == 3){
			if(this.movePattern3(map)){return true;}
		}
		else if(this.patternChoice == 4){
			if(this.movePattern4(map)){return true;}
		}
		this.patternChoice = Math.floor(Math.random() * (4 - 1 + 1) ) + 1;
		return false;
	}
	
	moveChoose(map){
		if(this.movement == 1){this.movePattern1(map);}
		else if(this.movement == 2){this.movePattern2(map);}
		else if(this.movement == 3){this.movePattern3(map);}
		else if(this.movement == 4){this.movePattern4(map);}
		else if(this.movement == 5){this.moveSmart(map);}
		else if(this.movement == 6){this.moveRandom(map);}
	}
}

class Player extends Actor{
	constructor(ID, x, y, map){
		var imageLink = "icons/face-cool-24.png";
		var objectType = "player";
		super(ID, x, y, imageLink, objectType);
		this.paused = false;
	}
	
	pauseSwitch(){
		if(this.paused){
			this.paused = false;
			return false;
		}
		this.paused = true;
		return true;
	}
	
	move(new_x, new_y, map){
		if(map.getTileID(this.x + new_x, this.y + new_y) == null){
			this.x += new_x;
			this.y += new_y;
			return true;
		}
		else{
			if(map.getTileID(this.x + new_x, this.y + new_y).objectType == "box"){
				if(map.getTileID(this.x + new_x, this.y + new_y).move(new_x, new_y, map)){
					this.x += new_x;
					this.y += new_y;
					return true;
				}							
			}
			if(map.getTileID(this.x + new_x, this.y + new_y).objectType == "monster"){
				map.player = null;
				this.img = "icons/blank.gif";
				return false;
			}
		}
		return false;
	}
	
	keypress(key, map){
		if(this.paused){return;}
		map.setImage(this.x, this.y, "icons/blank.gif");
		//Arrow Keys
		if (key && key == 37) {this.move(-1,0,map);}//left
		if (key && key == 39) {this.move(1,0,map);}//right
		if (key && key == 38) {this.move(0,-1,map);}//up
		if (key && key == 40) {this.move(0,1,map);}//down
		
		//Compass Movement
		if (key && key == 81) {this.move(-1,-1,map);}//NW
		if (key && key == 87) {this.move(0,-1,map);}//N
		if (key && key == 69) {this.move(1,-1,map);}//NE
		if (key && key == 65) {this.move(-1,0,map);}//W
		if (key && key == 68) {this.move(1,0,map);}//E
		if (key && key == 90) {this.move(-1,1,map);}//SW
		if (key && key == 88) {this.move(0,1,map);}//S
		if (key && key == 67) {this.move(1,1,map);}//SE
		map.setImage(this.x, this.y, this.img);
	}
}

class Box extends Actor{
	constructor(ID, x, y){
		var imageLink = "icons/emblem-package-2-24.png";
		var objectType = "box";
		super(ID, x, y, imageLink, objectType);
	}
	
	move(new_x, new_y, map){
		if(map.getTileID(this.x + new_x, this.y + new_y) != null){
			if(map.getTileID(this.x + new_x, this.y + new_y).objectType == "box"){
				if(map.getTileID(this.x + new_x, this.y + new_y).move(new_x, new_y, map)){
					this.x += new_x;
					this.y += new_y;
					map.setImage(this.x, this.y, this.img);
					return true;
				}							
			}
		}
		else{
			this.x += new_x;
			this.y += new_y;
			map.setImage(this.x, this.y, this.img);
			return true;		
		}
		return false;
	}
}

class Wall extends Actor{
	constructor(ID, x, y){
		var imageLink = "icons/wall.jpeg";
		var objectType = "wall";
		super(ID, x, y, imageLink, objectType);
	}
}