class Bird{
	constructor() {
		this.position = [];
		this.pathname1 = "";
		this.pathname2 = "";
		this.timer = null;
		this.img = new Image();
	}
	fly_down(){
		this.position[1]++;
		if(this.position[1] >= 350){
			this.position[1] = 350;
		}
		return this.position
	}
	fly_up(){
		this.position[1] -= 30;
		if(this.position[1] <= 0){
			this.position[1] = 0
		}
		return this.position
	}
}