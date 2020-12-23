const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var bodies = [];
let boy, boyimage;

function preload() {
	boyimage = loadImage("boy.png");
}

function setup() {
	createCanvas(1600, 700);

	engine = Engine.create();
	world = engine.world;

	boy = createSprite(200, 620);
	boy.addImage("boy", boyimage);
	boy.scale = 0.1;

	//Create the Bodies Here.
	ground = new Ground(width / 2, height, width, 25);

	wall1 = new Ground(1600, height / 2, 50, height);

	wall2 = new Ground(0, height / 2, 50, height);

	topWall = new Ground(width / 2, 0, width, 25);

	tree = new Tree(width / 2, 400);

	stone = new Stone(150, 560);

	launcher = new Launcher(stone.body, { x: 150, y: 567.5 });

	mango1 = new Mango(850, 140);

	mango2 = new Mango(575 + 180, 315);

	mango3 = new Mango(640 + 180, 190);

	mango4 = new Mango(570 + 180, 200);

	mango5 = new Mango(675 + 180, 270);

	mango6 = new Mango(485 + 180, 310);

	Engine.run(engine);
}


function draw() {
	rectMode(CENTER);
	background("white");

	textSize(25);
	fill("black")
	text("Press r key to cheat and reset the stone!", 200, 200);

	drawSprites();

	
	launcher.display();
	tree.display();
	wall1.display();
	wall2.display();
	topWall.display();
	mango1.display();
	mango2.display();
	mango3.display();
	mango4.display();
	mango5.display();
	mango6.display();
	stone.display();
	
	detectColission(stone, mango1);
	detectColission(stone, mango2);
	detectColission(stone, mango3);
	detectColission(stone, mango4);
	detectColission(stone, mango5);
	detectColission(stone, mango6);

}

function keyPressed() {
	if (key == 'r') {
		Body.setPosition(stone.body, { x: 150, y: 560 });
		launcher.attach(stone.body);
	}
}


function mouseDragged() {
	if (launcher.constraint.bodyA)
		Body.setPosition(stone.body, { x: mouseX, y: mouseY });
}

function mouseReleased() {
	launcher.fly();
}

function detectColission(stone, mango) {
	let distance = dist(stone.body.position.x, stone.body.position.y, mango.body.position.x, mango.body.position.y);
	console.log(stone.radius);
	if (distance <= stone.radius + mango.radius) {
		Body.setStatic(mango.body, false);
	}
}