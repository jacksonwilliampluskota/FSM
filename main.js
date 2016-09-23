(function () {
'use strict';
var HEIGHT;
var WIDTH;
var img;
var ctx;
var ataque = false;
var action =false;

/*Background*/
var bgReady = false;
var bgImage;
var count = 0;

/*variaveis do boss*/
var bossReady = false;
var bossImage;
var boss = {
	x: 400,
	y: 0,
	velocyti: 0,
	gravity: 1.5,
	powerJump:15,
};
var spritesBossWidth = 490;
var spritesBossHeight = 100;
var row = 1;
var colls = 7;
var trackBoss = 0;
var widthBoss = spritesBossWidth/colls;
var heightBoss = spritesBossHeight/row;
var srcX=0;
var srcY=0;
var states = "BOSS_APRESENTATION"
/*FPS*/
var curFrame = 0;
var frameCount = 7;
var fps = 8;

/* chao */
var floor = {
	y: 190,
	height: 297,
}
var fps, fpsInterval, startTime, now, then, elapsed;

/* power ranger*/
var powerRanger = {
	x: 100,
	y: 100,
};
var powerReady = false;
var powerImage;
var spritesPowerWidth = 800;
var spritespowerHeight = 90;
var powerCol = 13;
var powerRow = 1;
var powerWidth = spritesPowerWidth / powerCol;
var powerHeight = spritespowerHeight / powerRow;
var powerSrcX=0;
var powerSrcY=0;

var powerCurFrame = 0;
var powerFrameCount = 13;

function add(type, value, id, name) {
	var element = document.createElement('input');
	element.type = type;
	element.value = value;
	element.id = id;
	element.name = name;
	document.body.appendChild(element);

	document.getElementById(id).onclick = function() {
  		if (type == 'button') {
  			ataque = true;
  			count = 485;

	  		/*spritesPowerWidth = 540;
			spritespowerHeight = 80;
			powerCol = 6;
			powerRow = 1;
			powerWidth = spritesPowerWidth / powerCol;
			powerHeight = spritespowerHeight / powerRow;
			powerSrcX=0;
			powerSrcY=0;

			powerCurFrame = 0;
		 	powerFrameCount = 6;
		 	powerImage.src = 'sprites/powerAtaque.png';

		 	powerCurFrame = 12;*/
  		}
	}
}

function main() {
	var snd = new Audio("sound/instrumental.mp3");
	snd.loop = true;
	snd.play();
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    var canvas = document.createElement('canvas');
    canvas.id = 'canvas'
    canvas.width = WIDTH / 2;
    canvas.height = HEIGHT / 2;
    //console.log(canvas.width);
    canvas.style.border = '1px solid #000';

    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    bgImage = new Image();
    bgImage.onload = function () {
        bgReady = true;
    };
    bgImage.src = 'sprites/cenario2.png';


    bossImage = new Image();
    bossImage.onload = function () {
    	bossReady = true;
    }
    bossImage.src = 'sprites/ApresentatioDarkWarrior.png';

    powerImage = new Image();
    powerImage.onload = function () {
    	powerReady = true;
    }
    powerImage.src = 'sprites/power.png';

	//setInterval(draw,8);

	fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    init();
}

function init() {
    update();
    draw();
    window.requestAnimationFrame(init);
}

function update() {

	if (trackBoss && count == 400) {
		spritesBossWidth = 146;
		spritesBossHeight = 80;
		row = 1;
		colls = 2;
		widthBoss = spritesBossWidth/colls;
		heightBoss = spritesBossHeight/row;
		srcX=0;
		srcY=0;

		curFrame = 0;
		frameCount = 2;

		bossImage.src = 'sprites/bossParado.png';

		trackBoss = 0;
	}

	now = Date.now();
    elapsed = now - then;


    if (elapsed > fpsInterval) {
    	then = now - (elapsed % fpsInterval);

		curFrame = (++curFrame % frameCount);
		srcX = curFrame * widthBoss;
		ctx.clearRect(boss.x,boss.y,widthBoss,heightBoss);

		powerCurFrame = (++powerCurFrame % powerFrameCount);
		powerSrcX = powerCurFrame * powerWidth;
		ctx.clearRect(powerRanger.x,powerRanger.y,powerWidth,powerHeight);
    }

    if (powerCurFrame == 12) {
    	//console.log('power');
    	spritesPowerWidth = 151;
		spritespowerHeight = 66;
		powerCol = 3;
		powerRow = 1;
		powerWidth = spritesPowerWidth / powerCol;
		powerHeight = spritespowerHeight / powerRow;
		powerSrcX=0;
		powerSrcY=0;

		powerCurFrame = 0;
	 	powerFrameCount = 3;
	 	powerImage.src = 'sprites/powerParado.png';
	 	powerRanger.y = 120

    }

    boss.velocyti += boss.gravity;
    boss.y += boss.velocyti;
    if (boss.y > floor.y - heightBoss) {
    	boss.y = floor.y - heightBoss;

    	if (curFrame == 6) {
    		//console.log('aqui');

    		spritesBossWidth = 146;
			spritesBossHeight = 80;
			row = 1;
			colls = 2;
			widthBoss = spritesBossWidth/colls;
			heightBoss = spritesBossHeight/row;
			srcX=0;
			srcY=0;

			curFrame = 0;
			frameCount = 2;

			bossImage.src = 'sprites/bossParado.png';
			if (ataque) {
				boss.velocyti = -boss.powerJump;
				boss.x += 100;
				ataque = false;
				states = 'BOSS_DISTANCIATE'
			}

			action = true;

    	}

    	if (count == 490) {
	    	switch (states) {
	    		case 'BOSS_APRESENTATION':
	    			//console.log('apresatation');
	    			boss.velocyti = -boss.powerJump;
					boss.x += 100;
					states = 'BOSS_DISTANCIATE';
					document.getElementById("acaoAtaque").innerText = 'nao atacou';
					document.getElementById("acaoBoss").innerText = 'BOSS_DISTANCIATE';
				break;
				case 'BOSS_DISTANCIATE':
					if (ataque) {
						states = 'BOSS_JUMP_TWICE';
						boss.velocyti = -boss.powerJump;
						boss.x += 100;

						ataque = false;

						document.getElementById("acaoAtaque").innerText = 'atacou';
						document.getElementById("acaoBoss").innerText = 'BOSS_DISTANCIATE';

					} else {
						states = 'BOSS_POSITION';
						boss.x -= 100;
						document.getElementById("acaoAtaque").innerText = 'nao atacou';
						document.getElementById("acaoBoss").innerText = 'BOSS_POSITION';
					}
				break;
				case 'BOSS_POSITION':
					boss.x -= 100;
					if (ataque) {
						states = 'BOSS_JUMP';
						document.getElementById("acaoAtaque").innerText = 'atacou';
					} else {
						document.getElementById("acaoBoss").innerText = 'BOSS_ATAQUE';
						document.getElementById("acaoAtaque").innerText = 'nao atacou';
						states = 'BOSS_ATAQUE';
						ataque = false;
					}
				break;
				case 'BOSS_JUMP':
					boss.velocyti = -boss.powerJump;
					boss.x += 30;
					states = 'BOSS_ATAQUE';
				break;
				case 'BOSS_ATAQUE':
					spritesBossWidth = 225;
					spritesBossHeight = 95;
					row = 1;
					colls = 3;
					widthBoss = spritesBossWidth/colls;
					heightBoss = spritesBossHeight/row;
					srcX=0;
					srcY=0;

					curFrame = 0;
					frameCount = 3;

					bossImage.src = 'sprites/bossAtaque.png';
					trackBoss = 1;
					states = 'BOSS_DISTANCIATE';
					document.getElementById("acaoBoss").innerText = 'BOSS_ATAQUE';
				break;
				case 'BOSS_JUMP_TWICE':
					if (ataque) {
						states = 'BOSS_JUMP_OVER';
						ataque = false;
						document.getElementById("acaoAtaque").innerText = 'atacou';

					} else {
						states = 'BOSS_ATAQUE';
						document.getElementById("acaoAtaque").innerText = 'nao atacou';
					}
				break;
				case 'BOSS_JUMP_OVER':
					states = 'BOSS_POSITION';
					boss.velocyti = -boss.powerJump * 1.3;
					boss.x += 100;
					document.getElementById("acaoBoss").innerText = 'BOSS_JUMP_OVER';
	    	}

    		count = 0;
    	}


    }


	if (boss.x > canvas.width - widthBoss) {
		boss.x = canvas.width - widthBoss;
	}

	if (boss.x < 0 + widthBoss) {
		boss.x = widthBoss;
	}

	count ++;
	//console.log(count);


}

function draw() {
	update();
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (bossReady) {
    	ctx.drawImage(bossImage,srcX,srcY,widthBoss,heightBoss,boss.x,boss.y,widthBoss,heightBoss);
    }

    if (powerReady) {
    	ctx.drawImage(powerImage,powerSrcX,powerSrcY,powerWidth,powerHeight,powerRanger.x,powerRanger.y,powerWidth,powerHeight);
    }

}

main();
add('button', 'Ataque', 'ataque', 'ataque');
})();
