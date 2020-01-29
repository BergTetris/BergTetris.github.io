const canvas = document.querySelector('#tetris');
const ctx = canvas.getContext('2d');
ctx.scale(20,20);
let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;



const arena = createPiece(12,20);

const colors =
[
    null,
    'red',
    'violet',
    'blue',
    'green',
    'purple',
    'white',
    'orange',
    'pink'

]
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
function createElement(type)
{
    switch(type)
    {
        case 'T': return  [
            [0,0,0],
            [1,1,1],
            [0,1,0],
            ];
            break;
        case 'O': return  [
            [2,2],
            [2,2],
            ];
            break;
        case 'C': return  [
            [3,3,3],
            [3,0,0],
            [3,3,3],
            ];
            break;
        case 'L': return  [
            [4,0,0],
            [4,0,0],
            [4,4,4],
            ];
            break;
            case 'I': return  [
            [0,5,0,0],
            [0,5,0,0],
            [0,5,0,0],
            [0,5,0,0],
            ];
            break;
        case 'J': return  [
            [0,6,0],
            [0,6,0],
            [6,6,0],
            ];
        case 'S': return  [
            [0,7,7],
            [7,7,0],
            [0,0,0],
            ]; 
        case 'Z': return  [
            [8,8,0],
            [0,8,8],
            [0,0,0],
            ];                   
    }
}
function playerReset()
{
    const pieces = "TOCLIJSZ";
    player.piece = createElement(pieces[pieces.length * Math.random() | 0]);
    player.position.y = 0;
    player.position.x = (arena[0].length / 2 | 0) - (player.piece[0].length / 2 | 0);
    if(collide(arena,player))
    {
        arena.forEach(row => row.fill(0));
    }
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
                ctx.fillStyle = colors[value];
               // ctx.strokeRect(x ,y ,1,1);
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
        playerReset();
    }
    
    dropCounter = 0;
}

const player = {
    position: {x:5, y: 5},
    piece:createElement('T'),
}

function playerMove(value)
{
    player.position.x += value;
    if(collide(arena,player))
    {
        player.position.x -= value;
    }

}
function pieceRotate(value)
{
    const pos = player.position.x;
    let offset = 1;
    rotate(player.piece,value);
    while(collide(arena,player))
    {
        player.position.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.piece[0].length)
        {
            rotate(player.piece, -value);
            player.position.x = pos;
            return;
        }
    }
}

function rotate(piece,value)
{
for (let y=0; y<piece.length; y++)
{
    for(let x=0; x<y; x++)
    {
        [piece[y][x],piece[x][y]]=[piece[x][y],piece[y][x]];
    }

}
if(value > 0)
{
    piece.forEach(row => row.reverse());
}
else
{
    piece.reverse();
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
else if( e.keyCode === 90 ){
    pieceRotate(1);
}
else if( e.keyCode === 88 ){
    pieceRotate(-1);
}
});


update();