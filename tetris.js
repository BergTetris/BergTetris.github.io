const canvas = document.querySelector('#tetris');
const ctx = canvas.getContext('2d');
ctx.scale(20,20);
let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

const piece = 
[
[0,0,0],
[1,1,1],
[0,1,0],
];

function draw()
{
    ctx.fillStyle='#000';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    drawPiece(player.piece,player.position);
}

function drawPiece(piece,offset)
{
    piece.forEach((row,y) =>{
        row.forEach((value,x) => {
            if (value != 0)
            {
                ctx.fillStyle = 'red';
                ctx.fillRect(x +offset.x,y + offset.y,1,1);
            }
        });
    });
}

function update(time=0)
{
    const deltaTime = time - lastTime;
    console.log(deltaTime);
    lastTime = time;
    dropCounter += deltaTime;
    if (dropCounter > dropInterval)
    {
        player.position.y++;
        dropCounter = 0;
    }
    draw();
    requestAnimationFrame(update);
}

function playerDrop()
{
    player.position.y++;
    dropCounter = 0;
}

const player = {
    position: {x: 0, y: 0},
    piece:piece,
}

document.addEventListener('keydown',e => {
if( e.keyCode === 37 || e.keyCode === 65){
player.position.x--;
}
else if( e.keyCode === 39 || e.keyCode === 68 ){
    player.position.x++;
    }
    else if( e.keyCode === 40 || e.keyCode === 83 ){
        playerDrop();
        }
});


update();