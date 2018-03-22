/** Class representing a single card. **/
class card{
	
	/**
	*Constructor for a card.
	*@param {string} name - The name of the card.
	*@param {string} num - The repetition of the card.
	*@param {image} img - The image of the card.
	*/
	constructor(name, type, repetition, img){
		this.name = name;
		this.type = type;
		this.repetition = repetition;
		this.img = img;
		this.fake = name;
	}
	
	/**
	* Return the title of the card
	* @return {string} The title.
	*/
	get_name(){
		return this.name;
	}
	
	get_type(){
		return this.type;
	}
	
	/**
	* Return the image of the card
	* @return {object} The image.
	*/
	get_image(){
		return this.img;
	}
	
	get_fake(){
		return this.name;
	}
	
	set_fake(name){
		this.fake = name;
	}
	
	is_liar(){
		return this.name != this.fake;
	}
}


/** Class representing the deck. **/
class Deck{
	
	constructor(){
		this.deck = [];
	}
	
	/** 
	* Creates a deck. 
	* Does not return, deck list is stored within deck_class.
	*/
	new_deck(){
		for (var i = 0; i < 4; i++){
			this.deck.push(new heartking(i));
			this.deck.push(new heartqueen(i));
			this.deck.push(new heartjack(i));
			/*this.deck.push(new diamondking(i));
			this.deck.push(new diamondqueen(i));
			this.deck.push(new diamondjack(i));
			this.deck.push(new spadeking(i));
			this.deck.push(new spadequeen(i));
			this.deck.push(new spadejack(i));
			this.deck.push(new clubking(i));
			this.deck.push(new clubqueen(i));
			this.deck.push(new clubjack(i));*/
		}
	}
	
	/** Moves an item in an array. **/
	array_move(arr, fromIndex, toIndex) {
		var element = arr[fromIndex];
		arr.splice(fromIndex, 1);
		arr.splice(toIndex, 0, element);
	}
	
	/** Gets a random number. **/
	get_random(min, max) {
		return Math.floor(Math.random() * (max - min + 1) ) + min;
	}

	/** Shuffles the deck. **/
	shuffle(){
		for (var cardsleft = this.deck.length; cardsleft > 0; cardsleft--){
			this.array_move(this.deck, this.get_random(0,cardsleft),this.deck.length);
		}
		return;
	}
	
	/** Gives away a card. 
	* @return {card} A card object.
	* @return {null} Null if there are no more cards.
	*/
	give(){
		if (this.deck.length == 0)return null;
		return this.deck.pop();
	}
	
	/** Takes a card. **/
	take(card){
		this.deck.push(card);
		return;
	}
}

class heartking extends card{
	
	constructor(repetition){
		var name = "King of Hearts";
		var type = "Hearts";
		var img = "css/wicked/heartking.jpg";
		super(name, type, repetition, img);
	}

	effect(score){
		return score + score;
	}
	
	tally(alignment, benefactor, tokens){
		var score = 3;
		if(alignment==this.type){score += 1;}
		if(benefactor.get_type() == this.type){score += 1;}
		return benefactor.effect(score);
	}
	
	end(tokens){
		
	}
}

class heartqueen extends card{
	
	constructor(repetition){
		var name = "Queen of Hearts";
		var type = "Hearts";
		var img = "css/wicked/heartqueen.jpg";
		super(name, type, repetition, img);
	}

	effect(score){
		return score + 2;
	}
	
	tally(alignment, benefactor, tokens){
		var score = 2;
		if(alignment==this.type){score += 1;}
		if(benefactor.get_type() == this.type){score += 1;}
		return benefactor.effect(score);
	}
}

class heartjack extends card{
	
	constructor(repetition){
		var name = "Jack of Hearts";
		var type = "Hearts";
		var img = "css/wicked/heartjack.jpg";
		super(name, type, repetition, img);
	}

	effect(score, tokens){
		return score + floor(tokens / 2);
	}
	
	tally(alignment, benefactor, tokens){
		var score = 1;
		if(alignment==this.type){score += 1;}
		if(benefactor.get_type() == this.type){score += 1;}
		return benefactor.effect(score, tokens);
	}
}

