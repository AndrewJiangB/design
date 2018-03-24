/** Overarching class **/
class actor{
	
	/**
	*Constructor for an actor.
	*@param {name} name - The name of the actor.
	*@variable {list} field - The list of card objects on the player's field. Goal cards for game master.
	*/
	constructor(name, align){
		this.name = name;
		this.alignment = align;
		this.benefactor = [];
		this.played = [];
		this.retribution = [];
		this.hand = [];
		this.tokens = 0;
		this.points = 0;
	}
	
	/**
	* Return the name of the player.
	* @return {string} name - The name of the player.
	*/
	get_name(){
		return this.name;
	}
	
	/**
	* Returns the alignment of the player.
	* @return {string} alignment - The alignment of the player.
	*/
	get_alignment(){
		return this.alignment;
	}
	
	/**
	* Returns the current benefactor.
	* @return {card} benefactor - The currently used benefactor.
	*/
	get_benefactor(){
		if (this.benefactor.length==0)return null;
		return this.benefactor[this.benefactor.length-1];
	}
	
	/**
	* Returns the current played card.
	* @return {card} played - The currently used played card.
	*/
	get_played(){
		if (this.played.length==0)return null;
		return this.played[this.played.length-1];
	}
	
	/**
	* Returns the player's hand.
	* @return {list} hand - The player's hand.
	*/
	get_hand(){
		return this.hand;
	}
	
	/**
	* Take out a card from hand.
	* @return {card} card - The card that was taken out. Otherwise null.
	*/
	out_hand(out_card){
		var card_index = this.hand.indexOf(out_card);
		if (card_index >= 0){
			return this.hand.splice(card_index, 1)[0];
		}
		return null;
	}
	
	/** Adds a card to benefactor list. **/
	give_benefactor(in_card){
		this.benefactor.push(in_card);
		return;
	}
	
	/** Adds a card to field. **/
	give_played(in_card){
		this.played.push(in_card);
		return;
	}
	
	/** Adds a card to hand. **/
	give_hand(in_card){
		this.hand.push(in_card);
		return;
	}
	
	get_retribution(){
		if (this.retribution.length >= 0){
			return this.retribution[this.retribution.length -1];
		}
		return null;
	}

	set_retribution(card){
		this.retribution.push(card);
	}
	
	draw_field(){
		//document.getElementById("handCards").innerHTML = this.get_hand();
		document.getElementById("played").innerHTML = this.get_played();
		document.getElementById("alignment").innerHTML = this.get_alignment();
		document.getElementById("benefactor").innerHTML = this.get_benefactor();
	}
	
	draw_hand(){
		var handCards = "";
		for(var i = 0; i < this.hand.length; i++){
			handCards += "<span class='fieldElement hvr-float' id='"+this.hand[i].get_name()+this.hand[i].repetition+"' onclick='choose("+i+");'>"+this.hand[i].get_name()+"</span>";
		}
		document.getElementById("handCards").innerHTML = handCards;
		
	}
	
}

class gameMaster{
	
	constructor(){
		this.players = [];
		this.current = null;
		this.deck = null
		this.rounds = 0;
	}
	
	getRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1) ) + min;
	}

	a_move(arr, fromIndex, toIndex) {
		var element = arr[fromIndex];
		arr.splice(fromIndex, 1);
		arr.splice(toIndex, 0, element);
	}
	
	setup(playerNames, deck){
		this.deck = deck;
		
		//Set random alignments
		var alignments = ["Spades", "Hearts","Diamonds","Clubs"]
		for (let k = 3; k > 0; k--){
			this.a_move(alignments, this.getRandom(0,k), k);
		}
		
		//Set players
		for (var i = 0; i < playerNames.length; i++){
			console.log(alignments);
			this.players.push(new actor(playerNames[i], alignments.pop()));
			this.players[i].give_hand(this.deck.give());
			this.players[i].give_hand(this.deck.give());
		}
		
		//Draw on page
		for (var i = 0; i < this.players.length; i++){
			this.players[i].draw_field();
			this.players[i].draw_hand();
		}
		
		this.current = this.players[0];
	}
	
	turn(){
		
		
		
		
		currentIndex = this.players.indexOf(this.current);
		if(currentIndex == this.players.length - 1){
			this.current = this.players[0];
		}
		else{
			this.current = this.players[currentIndex + 1];
		}
	}
}