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

const arena = createPiece(12,20);

function collide(arena,player)
{

    const [p,o] = [player.piece,player.position];
    
    for(let y=0; y < p.length; y++)
    {
        for(let x=0; x < p[y].length; x++)
        {
            if(p[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x +o.x])!==0)
            {
                return true;
            }
            
        }
    }
    return false;
}

function createPiece(w,h)
{
    const piece = [];
    while(h--)
    {
        piece.push(new Array(w).fill(0));
    }
    return piece;
}

function stick(arena,player)
{
    player.piece.forEach((row,y) =>{

        row.forEach((value,x) =>{
        
            if(value !== 0)
            {
                arena[y + player.position.y][x + player.position.x] = value;
            }
        });
    });
}
function draw()
{
    ctx.fillStyle='#000';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    drawPiece(arena,{x:0,y:0});
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
    lastTime = time;
    dropCounter += deltaTime;
    if (dropCounter > dropInterval)
    {
       playerDrop();
    }
    draw();
    requestAnimationFrame(update);
}

function playerDrop()
{
    player.position.y++;
    if(collide(arena,player))
    {
        player.position.y--;
        stick(arena,player);
        player.position.y =0;
    }
    
    dropCounter = 0;
}

const player = {
    position: {x: 0, y: 0},
    piece:piece,
}

playerMove(value)
{
    player.position.x += value;
    if(collide(arena,player))
    {
        player.position.y -= value;
    }

}

document.addEventListener('keydown',e => {
if( e.keyCode === 37 || e.keyCode === 65){
playerMove(-1);
}
else if( e.keyCode === 39 || e.keyCode === 68 ){
    playerMove(1);
}
    else if( e.keyCode === 40 || e.keyCode === 83 ){
        playerDrop();
        }
});


update();