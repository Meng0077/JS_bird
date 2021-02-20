class Pipe{
	constructor(arg) {
		this.position = [];
		this.upImg = new Image();
		this.downImg = new Image();
		this.downImg.src = "";
		this.upImg.src = "";
		this.id = new Date().getTime();
	}
	pipeY(){
		this.position[1] = -Math.round(Math.random()*100 + 100);
	}
	
}