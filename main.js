let height = 500; //размер поля
let width = 800; //размер поля 
let highScore = 0;
let img;



function setup () {
    createCanvas(width, height);
    img = new Image();
    img.src = "4.jpg";
    highScore = localStorage.getItem(`birdScore`);
   
}

let x = 0;
let y = 100;
let jump = 0.1;
let yV = 0; //скорость падения
let h = 160; //расстояние между препятствиями
let gameInProgress = 1;

const massHeight = 200; // расстояние между верхом и низом препятствия
const massWidth =  10; // толщина препятствия

let mass = [randomInteger(30, height-massHeight-70)];
let massX= [0];

function draw () {
    
    if (gameInProgress == 1){
        checkScreen();
        checkBird();
        drawingContext.drawImage(img, 0, 0)
        drawBird();
    if (x%100 ==0){
        massX.push(x -100 * massX.length);     //рисуются препятствия
        mass.push (randomInteger(30, height-massHeight-70));
        }
    for (let i = 0; i < massX.length; i +=1){
    drawRect (massX[i], mass[i]);
    }
    text ('Score '+score, 20,20);
    text ('High Score '+highScore,20, 40)

    if (highScore == null){
        highScore = score;
    }
    if (score > highScore){
        highScore = score;
    }
    localStorage.setItem(`birdScore`, highScore);
}
    if (gameInProgress == 0){
        stroke (100, 70, 200); 
        strokeWeight(0);
        fill(80,65,200);
        text ('Игра окончена. Нажми клавишу R, чтобы начать заново', width/2-100 , height/2 );
        
    }
}

function drawRect (a, b){  
    rectMode(CORNERS); //препятствия
    stroke (100, 255, 0);
    strokeWeight(3);
    fill(120,120,120);
    rect(width - massWidth - a, 0 , width - a , b); //прямоугольник верхний по координатам x1,x2,y1,y2 и его движение
    rect(width - massWidth - a, b + massHeight , width - a , 500); // прямоугольник нижний
}

function drawBird  (){     //управление шариком
    stroke (100, 255, 0); //цвет контура шарика
    strokeWeight (5); //толщина контура
    fill (120,120,120); //цвет шарика
    ellipse (400, y, 20*2);  //шарик  

    x += 1;
    for (let i = 0; i < massX.length; i +=1) {//шарик летит вбок
        massX [i] += 1;
    }
    if (yV < 0) {
        yV += jump*10;
    }
    if (yV >= 0) {
        yV += jump;
    }
    y += yV; // шарик летит вниз
}

function checkScreen (){     //выход шарика за границы экрана
    if (y >= height || y < 0){
        gameInProgress = 0;
    }
}

function checkBird (){ //столкновение с препятствием
    let massNumber = 0; 
    for (let i = 0; i < massX.length; i +=1){
        if (massX [i] >= 420){ //подсчет очков 
            massNumber = i+1;
        }
        if (massX[i] <= 420 && massX[i] >= 370){
            if (y - 20 < mass[i]){
                gameInProgress = 0;
            }
            if (y + 20 > mass[i]+massHeight){
                gameInProgress = 0;
                
            }

        }
    }
score = massNumber;
}

function randomInteger (min, max){
    let rand = min - 0.5 + Math.random() * (max - min + 1); 
    return Math.round(rand);

}

function keyPressed(){
    if (keyCode == 32){
        yV = -10;
    }
    
    if (keyCode == 82){ // Press R to restart
        window.location.reload();
    }
    
}




