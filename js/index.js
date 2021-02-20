window.onload = function(){
	var score = 0;
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var res = document.getElementById("res");
	var mask = document.getElementById("mask");
	var a = document.getElementsByTagName("a")[0];
	//bird init
	var bird = new Bird();
	bird_init();
	function bird_init(){
		bird.position = [100, 100];
		bird.pathname1 = "./img/bird2.png";
		bird.pathname2 = "./img/bird0.png";
		bird.img.src = bird.pathname1;
	} 
	
	
	bird.img.onload = function(){
		if(bird.timer == null){
			//bird.timer仅开启一个，多个会加速；因为每次更换src会使得imgBird重新load一次
			bird.timer = setInterval(function(){
				bird.fly_down();
				context.clearRect(0, 0, 800, 400);
				context.drawImage(bird.img, bird.position[0], bird.position[1]);
				drawPipes(check);
				
			}, 10)
		}
	}
	document.addEventListener("mousedown", function(){
		bird.fly_up();
		bird.img.src = bird.pathname2;
	})
	document.addEventListener("mouseup", function(){
		bird.img.src = bird.pathname1;
	})
	
	
	
	//pipe
	var pipes = [];   //优化，定时回收，减小内存
	var pipe_timer;
	var pipeid = null;
	creatPipe();
	function pipe_init(pipe){
		pipe.position = [800, -100];
		pipe.upImg.src = "./img/pipe_up.png";
		pipe.downImg.src = "./img/pipe_down.png";
		pipe.pipeY();
	}
	function creatPipe(){
		pipe_timer = setInterval(function(){
			let pipe = new Pipe();
			pipe_init(pipe);
			pipes.push(pipe);
		}, 1500)
	}
	function drawPipes(check){
		for(let i = 0; i< pipes.length; i++){
			pipes[i].position[0]--;
			context.drawImage(pipes[i].upImg, pipes[i].position[0], pipes[i].position[1]);
			context.drawImage(pipes[i].downImg, pipes[i].position[0], pipes[i].position[1] + 400);
			//经过
			check(i);
		}
	}
	
	var check = function(i){
		if(bird.position[0] + 40 >= pipes[i].position[0] && bird.position[0] - 70 <= pipes[i].position[0]){
			//重复检测
			if(pipeid != pipes[i].id){
				pipeid = pipes[i].id;
				//计算分数
				if(bird.position[1] >= pipes[i].position[1] + 300 && bird.position[1] <= pipes[i].position[1] + 400){
					score++;
				}else{
					var crash = new Promise(function(full, rej){
						clearInterval(bird.timer);
						clearInterval(pipe_timer);
						res.style.display = "block";
						mask.style.display = "block";
						res.children[0].innerText = score;
						if(score > 80){
							res.children[1].src = "./img/medals1.png";
						}else if(score >60){
							res.children[1].src = "./img/medals2.png";
						}else{
							res.children[1].src = "./img/medals3.png";
						}
						full(res);
						
					})
					crash.then(restart)
				}
				
			}
		}
	}
	function restart(){
		score = 0;
		setTimeout(function(){
			res.style.display = "none";
			mask.style.display = "none";
			a.style.display = "block";
		}, 1500)
	}
	a.addEventListener("click", function(){
		location.reload();
	},false)
	
}
