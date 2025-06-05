//declaring local storage
if (localStorage.getItem('No.of Player 1 wins :')===null){
    localStorage.setItem('No.of Player 1 wins :',0);
}
if (localStorage.getItem("No.of Player 2 wins :")===null){
    localStorage.setItem("No.of Player 2 wins :",0);
}
if (localStorage.getItem("Least Moves to a win :")===null){
    localStorage.setItem("Least Moves to a win :",'NA');
}

//constants
const board=document.getElementById("board");
const c=board.getContext("2d");
const game_time=180;

//variables
click=document.getElementById("click");
special=document.getElementById("special");
winn=document.getElementById('win');
lose=document.getElementById('lose');
let audio=1;
let player1_time=game_time-1;//one second decreased cause function displays this time one sec after started. if this variable equals 180. then timer starts only 2 sec later
let player2_time=game_time-1;
let p1time=null;
let p2time=null;
let l_all=[];
let l=[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];
//0 means no coin, 1 means coin of player 1, 2 means coin of player 2, 3 means blocked
l_all[0]=structuredClone(l); //to create deep copy of l
let count=0;

//text variables
player1_title=document.getElementById("player1_title");
player2_title=document.getElementById("player2_title");
time_text_1=document.getElementById("time_text_1");
time_text_2=document.getElementById("time_text_2");
title=document.getElementById("titl");

//button variables and action
document.getElementById("sound").addEventListener("click",()=>{
    if (audio===1){
        click.currentTime=0;
        click.play();
        audio=0;
        document.getElementById("sound").textContent='Sound : OFF';
    }
    else if(audio===0){
        audio=1;
        document.getElementById("sound").textContent="Sound : ON";
    }
})
let leaderbo=0;
let data=''
reset=document.getElementById("reset");
reset.hidden=true;
leader=document.getElementById("leader");
player1wins=document.getElementById("player1wins")
player2wins=document.getElementById("player2wins")
least=document.getElementById("least")
leader.hidden=true;
document.getElementById("leaderboard_button").addEventListener("click",()=>{
    if (audio===1){
        click.currentTime=0;
        click.play();
    }
    if (leaderbo===0){
        player1wins.textContent="No.of Player 1 wins : "+localStorage.getItem("No.of Player 1 wins :");
        player2wins.textContent="No.of Player 2 wins : "+localStorage.getItem("No.of Player 2 wins :");
        least.textContent="Least Moves to a win : "+localStorage.getItem("Least Moves to a win :");
        reset.hidden=false;
        leader.hidden=false;
        leaderbo=1;    
    }
    else if(leaderbo===1){
        reset.hidden=true;
        leader.hidden=true;
        leaderbo=0;
    }
});

reset.addEventListener("click",()=>{
    localStorage.setItem('No.of Player 1 wins :',0);
    localStorage.setItem('No.of Player 2 wins :',0);
    localStorage.setItem('Least Moves to a win :','NA');
    player1wins.textContent="No.of Player 1 wins : 0";
    player2wins.textContent="No.of Player 2 wins : 0";
    least.textContent="Least Moves to a win : NA";
});

extratime1=document.getElementById("extratime1")
extratime1.addEventListener("click",()=>{
        if (audio===1){
            special.currentTime=0;
            special.play()
        }
        player1_time+=30;
        let min=Math.floor(player1_time/60);
        let sec=player1_time%60;
        sec=(sec<10)?'0'+sec:sec;
        time_text_1.textContent=`${min}:${sec}`;
        extratime1.hidden=true;});
extratime2=document.getElementById("extratime2")
extratime2.addEventListener("click",()=>{
        if (audio===1){
                special.currentTime=0;
                special.play()
            }
        player2_time+=30;
        let min=Math.floor(player2_time/60);
        let sec=player2_time%60;
        sec=(sec<10)?'0'+sec:sec;
        time_text_2.textContent=`${min}:${sec}`;
        extratime2.hidden=true;
});
reducetime1=document.getElementById("reducetime1")
reducetime1.addEventListener("click",()=>{
    if (audio===1){
            special.currentTime=0;
            special.play()
        }
    player2_time-=20;
    let min=Math.floor(player2_time/60);
    let sec=player2_time%60;
    sec=(sec<10)?'0'+sec:sec;
    time_text_2.textContent=`${min}:${sec}`;
    reducetime1.hidden=true;
});
reducetime2=document.getElementById("reducetime2")
reducetime2.addEventListener("click",()=>{
    if (audio===1){
            special.currentTime=0;
            special.play()
        }
    player1_time-=20;
    let min=Math.floor(player1_time/60);
    let sec=player1_time%60;
    sec=(sec<10)?'0'+sec:sec;
    time_text_1.textContent=`${min}:${sec}`;
    reducetime2.hidden=true;
});
remove_block1=document.getElementById("remove_block1");
remove_block1.addEventListener("click",()=>{
    if (audio===1){
            special.currentTime=0;
            special.play()
        }
    remove_black();
    board_draw();
    l_all[l_all.length]=structuredClone(l);
    remove_block1.hidden=true;
})
remove_block2=document.getElementById("remove_block2");
remove_block2.addEventListener("click",()=>{
    if (audio===1){
            special.currentTime=0;
            special.play()
        }
    remove_black();
    board_draw();
    l_all[l_all.length]=structuredClone(l);
    remove_block2.hidden=true;
})
switchcolors1=document.getElementById("switchcolors1");
switchcolors1.addEventListener("click",()=>{
    if (audio===1){
            special.currentTime=0;
            special.play()
        }
    replace_color();
    board_draw();
    l_all[l_all.length]=structuredClone(l);
    switchcolors1.hidden=true;
})
switchcolors2=document.getElementById("switchcolors2");
switchcolors2.addEventListener("click",()=>{
    if (audio===1){
            special.currentTime=0;
            special.play()
        }
    replace_color();
    board_draw();
    l_all[l_all.length]=structuredClone(l);
    switchcolors2.hidden=true;
})

replay=document.getElementById('replay');
replay.hidden=true;
let replaymode=0;
let play=null;
let io=0
replay.addEventListener("click",()=>{
    if (audio===1){
        click.currentTime=0;
        click.play()
    }
    if (replaymode===0){
        if (play===null){
            play=setInterval(replayer,750);
        }
        replay.textContent="Pause";
        replaymode=1;
    }
    else if (replaymode===1){
        clearInterval(play);
        play=null;
        replay.textContent="Replay";
        replaymode=0;
    }

})

function replayer() {
    if (io < l_all.length) {
        l = structuredClone(l_all[io]);
        board_draw();
        io++;
    } else {
        clearInterval(play);
        play = null;
        replay.textContent = "Replay";
        replaymode = 0;
        io=0;
    }
}

restart=document.getElementById('restart');
restart.addEventListener("click",()=>{
    if (audio===1){
        click.currentTime=0;
        click.play()
    }
    l=[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];
    l_all=[];
    board_draw();
    count=0;
    replay.hidden=true;
    extratime1.hidden=false;
    extratime2.hidden=false;
    reducetime1.hidden=false;
    reducetime2.hidden=false;
    remove_block1.hidden=false;
    remove_block2.hidden=false;
    switchcolors1.hidden=false;
    switchcolors2.hidden=false;
    player1_time=game_time-1;
    player2_time=game_time-1;
    clearInterval(p1time);
    clearInterval(p2time);
    p1time=null;
    p2time=null;
    time_text_1.textContent="3:00";
    time_text_2.textContent="3:00";
    player1_title.textContent='Insert Coin';
    player2_title.textContent='Wait';
    title.textContent='Connect 4';
});

undo=document.getElementById('undo');
undo.addEventListener("click",() =>{
    if (count>=0){
        if (l_all.length>1){
            l_all.pop();
            l=structuredClone(l_all[l_all.length-1]);
            board_draw();
            count-=1
            if (count<0){
            }
            else if (count%4==0){
                player1_title.textContent='Insert Coin';
                player2_title.textContent='Wait';
                if (p1time===null){
                    p1time=setInterval(timer_1,1000);
                }
                clearInterval(p2time);
                p2time=null;
            }
            else if (count%4==1){
                player1_title.textContent='Choose Block';
                player2_title.textContent='Wait';
                if (p1time===null){
                    p1time=setInterval(timer_1,1000);
                }
                clearInterval(p2time);
                p2time=null;
            }
            else if (count%4==2){
                player1_title.textContent='Wait';
                player2_title.textContent='Insert Coin';
                if (p2time===null){
                    p2time=setInterval(timer_2,1000);
                }
                clearInterval(p1time);
                p1time=null;
            }
            else if (count%4==3){
                player1_title.textContent='Wait';
                player2_title.textContent='Choose Block';
                if (p2time===null){
                    p2time=setInterval(timer_2,1000);
                }
                clearInterval(p1time);
                p1time=null;
            }
        }
    }
});
col_1_1=document.getElementById('col_1_1');
col_1_1.addEventListener("click",() =>{
    game(1,1);
});
col_2_1=document.getElementById('col_2_1');
col_2_1.addEventListener("click",() =>{
    game(1,2);
});
col_3_1=document.getElementById('col_3_1');
col_3_1.addEventListener("click",() =>{
    game(1,3);
});
col_4_1=document.getElementById('col_4_1');
col_4_1.addEventListener("click",() =>{
    game(1,4);
});
col_5_1=document.getElementById('col_5_1');
col_5_1.addEventListener("click",() =>{
    game(1,5);
});
col_6_1=document.getElementById('col_6_1');
col_6_1.addEventListener("click",() =>{
    game(1,6);
});
col_7_1=document.getElementById('col_7_1');
col_7_1.addEventListener("click",() =>{
    game(1,7);
});
col_1_2=document.getElementById('col_1_2');
col_1_2.addEventListener("click",() =>{
    game(2,1);
});
col_2_2=document.getElementById('col_2_2');
col_2_2.addEventListener("click",() =>{
    game(2,2);
});
col_3_2=document.getElementById('col_3_2');
col_3_2.addEventListener("click",() =>{
    game(2,3);
});
col_4_2=document.getElementById('col_4_2');
col_4_2.addEventListener("click",() =>{
    game(2,4);
});
col_5_2=document.getElementById('col_5_2');
col_5_2.addEventListener("click",() =>{
    game(2,5);
});
col_6_2=document.getElementById('col_6_2');
col_6_2.addEventListener("click",() =>{
    game(2,6);
});
col_7_2=document.getElementById('col_7_2');
col_7_2.addEventListener("click",() =>{
    game(2,7);
});

themebutton=document.getElementById('themebutton');
theme=document.getElementById("theme");
let whattheme=0;
themebutton.addEventListener("click",()=>{
    if (audio===1){
        special.currentTime=0;
        special.play()
    }
    if (theme.getAttribute("href")==='./connect.css'){
        theme.setAttribute("href","./darktheme.css");
        whattheme=1;
        board_draw();
    }
    else{
        theme.setAttribute("href","./connect.css");
        whattheme=0;
        board_draw();
    }
})


//functions

function replace_color(){
    for (let i=0;i<6;i++){
        for (let j=0;j<7;j++){
            if (l[i][j]===1){
                l[i][j]=2;
            }
            else if (l[i][j]===2){
                l[i][j]=1;
            }
        }
    }
}

function timer_1(){
    let min=Math.floor(player1_time/60);
    let sec=player1_time%60;
    sec=(sec<10)?'0'+sec:sec;
    if (player1_time>0){
        time_text_1.textContent=`${min}:${sec}`;
        player1_time=player1_time-1;
    }
    else if (player1_time===0){
        time_text_1.textContent="0:00";
        if (audio===1){
            winncurrentTime=0;
            winn.play()
        }
        title.textContent='Timeout!  Player 2 Wins !!!'
        localStorage.setItem('No.of Player 2 wins :',parseInt(localStorage.getItem('No.of Player 2 wins :'))+1)
        if (localStorage.getItem("Least Moves to a win :")==='NA'){
            localStorage.setItem("Least Moves to a win :",l_all.length-1);
        }
        else if (localStorage.getItem("Least Moves to a win :")>(l_all.length-1)){
            localStorage.setItem("Least Moves to a win :",l_all.length-1);
            console.log(l_all.length)
        }
        clearInterval(p1time);
        clearInterval(p2time);
        p1time=null;
        p2time=null
        replay.hidden=false
        count=-4;
    }
}
function timer_2(){
    let min=Math.floor(player2_time/60);
    let sec=player2_time%60;
    sec=(sec<10)?'0'+sec:sec;
    if (player2_time>0){
        time_text_2.textContent=`${min}:${sec}`;
        player2_time=player2_time-1;
    }
    else if (player2_time===0){
        time_text_2.textContent="0:00";
        if (audio===1){
            winncurrentTime=0;
            winn.play()
        }
        title.textContent='Timeout!  Player 1 Wins !!!';
        localStorage.setItem('No.of Player 1 wins :',parseInt(localStorage.getItem('No.of Player 1 wins :'))+1)
        if (localStorage.getItem("Least Moves to a win :")==='NA'){
            localStorage.setItem("Least Moves to a win :",l_all.length-1);
        }
        else if (localStorage.getItem("Least Moves to a win :")>(l_all.length-1)){
            localStorage.setItem("Least Moves to a win :",l_all.length-1);
        }
        clearInterval(p1time);
        clearInterval(p2time);
        p1time=null;
        p2time=null
        replay.hidden=false
        count=-5;
    }
}

//board properties
const rows=6;
const cols=7;
const cell_size=70;
const hole_radius=23;
const x_offset=55;
const y_offset=60;

//drawing hole
let x=0;
let y=0;
let row=0;
let col=0;

//board drawing function
function board_draw(){
    c.clearRect(0,0,board.width,board.height);
    c.save();

    //board
    c.fillStyle="#2a31fa";
    c.fillRect(x_offset,y_offset,cell_size*cols,cell_size*rows);

    //holes
    for (row=0;row<rows;row++){
        for (col=0;col<cols;col++){
            x=x_offset+cell_size*col+cell_size/2;
            y=y_offset+cell_size*row+cell_size/2;
            c.beginPath();
            c.arc(x,y,hole_radius,0,Math.PI*2);
            c.fillStyle="white";
            c.fill();
            c.closePath();
        }
    }
    
    //for column no.
    for (col=0;col<cols;col++){
        x=x_offset+cell_size*col+cell_size/2-10;
        if (whattheme==0){
            c.font="40px Arial";
            c.fillStyle='black';
        }
        else{
            c.font="40px Arial";
            c.fillStyle='white';
        }
        c.fillText((col+1).toString(),x,40);
    }
    all_holes_fill();

}

//fill hole function
function holefill(col,row,color){
    //colors one hole
    row=rows-row-1;

    x=x_offset+cell_size*col+cell_size/2;
    y=y_offset+cell_size*row+cell_size/2;
    c.beginPath();
    c.arc(x,y,hole_radius,0,Math.PI*2);
    c.fillStyle=color;
    c.fill();
    c.closePath();
}

board_draw();

function holecolor(n){
    //function return color of circle based on input
    if (n===0){
        return "white";
    }
    else if (n===1){
        return "yellow";
    }
    else if (n===2) {
        return "red";
    }
    else if (n===3){
        return "black";
    }
}


function all_holes_fill(){
    //fills all the holes of the board 
    for (let i=0;i<6;i++){
        for (let j=0;j<7;j++){
            holefill(j,i,holecolor(l[i][j]));
        }
    }
}

function lowest_white(x){
    //returns 0,1,2,3,4,5 for y value
    //finds lowest white circle in the given column
    //return -1 if it is blocked
    x=x-1;
    for (let i=0;i<6;i++){
        if (l[i][x]===0){
            return i;
        }
        else if (l[i][x]===3){
            return -1;
        }
    }
    return 6;
}

function win_check(){
    //horizontal check
    for (let i=0;i<6;i++){
        for (let j=0;j<4;j++){
            if (l[i][j]===1 && l[i][j+1]===1 && l[i][j+2]===1 && l[i][j+3]===1){
                return 1;
            }
            else if (l[i][j]===2 && l[i][j+1]===2 && l[i][j+2]===2 && l[i][j+3]===2){
                return 2;
            }
        }
    }
    //vertical check
    for (let i=0;i<3;i++){
        for (let j=0;j<7;j++){
            if (l[i][j]===1 && l[i+1][j]===1 && l[i+2][j]===1 && l[i+3][j]===1){
                return 1;
            }
            else if (l[i][j]===2 && l[i+1][j]===2 && l[i+2][j]===2 && l[i+3][j]===2){
                return 2;
            }
        }
    }
    //diagoanl check forward (/)
    for (let i=0;i<3;i++){
        for (let j=0;j<4;j++){
            if (l[i][j]===1 && l[i+1][j+1]===1 && l[i+2][j+2]===1 && l[i+3][j+3]===1){
                return 1;
            }
            else if (l[i][j]===2 && l[i+1][j+1]===2 && l[i+2][j+2]===2 && l[i+3][j+3]===2){
                return 2;
            }
        }
    }
    //diagonal check backward (\)
    for (let i=3;i<6;i++){
        for (let j=0;j<4;j++){
            if (l[i][j]===1 && l[i-1][j+1]===1 && l[i-2][j+2]===1 && l[i-3][j+3]===1){
                return 1;
            }
            else if (l[i][j]===2 && l[i-1][j+1]===2 && l[i-2][j+2]===2 && l[i-3][j+3]===2){
                return 2;
            }
        }
    }
    //draw check
    for (let i=0;i<6;i++){
        for (let j=0;j<7;j++){
            if (l[i][j]===0){
                return 0
            }
        }
    }
    return 3;
}

function convert_toblack(x){
    //function to block empty hole 
    for (let i=0;i<6;i++){
        if (l[i][x]===0){
            l[i][x]=3;
        }
    }
}

function remove_black(){
    //to remove all blocked holes
    for (let i=0;i<6;i++){
        for (let j=0;j<7;j++){
            if (l[i][j]===3)
            {
                l[i][j]=0;
            }
        }
    }
}

function game(player_no,x){
    let y=lowest_white(x);
    if (count<0){
        replay.hidden=false
    }
    if (count===-1){
        title.textContent="Player 1 Wins !!!";
    }
    else if (count===-2){
        title.textContent="Player 2 Wins !!!";
    }
    else if (count===-3){
        title.textContent="Draw :(";
    }
    else if (count===-4){
        title.textContent='Timeout!  Player 2 Wins !!!'
    }
    else if (count===-5){
        title.textContent='Timeout!  Player 1 Wins !!!'
    }
    else if (count%4===0){
        if (player_no===1){
            if (y!=-1 && y<6){
                if (audio===1){
                    click.currentTime=0;
                    click.play()
                }
                l[y][x-1]=1;
                count+=1;
                remove_black();
                if (p1time===null){
                    p1time=setInterval(timer_1,1000);
                }
                clearInterval(p2time);
                p2time=null;
                l_all[l_all.length]=structuredClone(l);
                let win=win_check();
                if (win!=0){
                    if (win===1){
                        count=-1;
                        if (audio===1){
                            winncurrentTime=0;
                            winn.play()
                        }
                        title.textContent="Player 1 Wins !!!";
                        localStorage.setItem('No.of Player 1 wins :',parseInt(localStorage.getItem('No.of Player 1 wins :'))+1)
                        if (localStorage.getItem("Least Moves to a win :")==='NA'){
                            localStorage.setItem("Least Moves to a win :",l_all.length-1);
                        }
                        else if (localStorage.getItem("Least Moves to a win :")>(l_all.length-1)){
                            localStorage.setItem("Least Moves to a win :",l_all.length-1);
                        }
                        replay.hidden=false
                        clearInterval(p1time);
                        clearInterval(p2time);
                        p1time=null;
                        p2time=null;
                    }
                    else if (win===2){
                        count=-2;
                        title.textContent="Player 2 Wins !!!";
                        localStorage.setItem('No.of Player 2 wins :',parseInt(localStorage.getItem('No.of Player 2 wins :'))+1)
                        if (localStorage.getItem("Least Moves to a win :")==='NA'){
                            localStorage.setItem("Least Moves to a win :",l_all.length-1);
                        }
                        else if (localStorage.getItem("Least Moves to a win :")>(l_all.length-1)){
                            localStorage.setItem("Least Moves to a win :",l_all.length-1);
                        }
                        if (audio===1){
                            winncurrentTime=0;
                            winn.play()
                        }
                        replay.hidden=false
                        clearInterval(p1time);
                        clearInterval(p2time);
                        p1time=null;
                        p2time=null;
                    }
                    else if (win===3){
                        count=-3;
                        title.textContent="Draw :(";
                        if (audio===1){
                            lose.currentTime=0;
                            lose.play()
                        }
                        replay.hidden=false
                        clearInterval(p1time);
                        clearInterval(p2time);
                        p1time=null;
                        p2time=null;
                    }
                }
                player1_title.textContent='Choose Block';
                player2_title.textContent='Wait';
            }
        }
    }
    else if (count%4===1){
        if (player_no===1){
            if (y<6){
                if (audio===1){
                    click.currentTime=0;
                    click.play()
                }
                convert_toblack(x-1);
                count+=1;
                l_all[l_all.length]=structuredClone(l);
                if (p2time===null){
                    p2time=setInterval(timer_2,1000);
                }
                clearInterval(p1time);
                p1time=null;
                let win=win_check();
                if (win!=0){
                    if (win===1){
                        count=-1;
                        title.textContent="Player 1 Wins !!!";
                        localStorage.setItem('No.of Player 1 wins :',parseInt(localStorage.getItem('No.of Player 1 wins :'))+1)
                        if (localStorage.getItem("Least Moves to a win :")==='NA'){
                            localStorage.setItem("Least Moves to a win :",l_all.length-1);
                        }
                        else if (localStorage.getItem("Least Moves to a win :")>(l_all.length-1)){
                            localStorage.setItem("Least Moves to a win :",l_all.length-1);
                        }
                        if (audio===1){
                            winncurrentTime=0;
                            winn.play()
                        }
                        replay.hidden=false
                        clearInterval(p1time);
                        clearInterval(p2time);
                        p1time=null;
                        p2time=null;
                    }
                    else if (win===2){
                        count=-2;
                        title.textContent="Player 2 Wins !!!";
                        localStorage.setItem('No.of Player 2 wins :',parseInt(localStorage.getItem('No.of Player 2 wins :'))+1)
                        if (localStorage.getItem("Least Moves to a win :")==='NA'){
                            localStorage.setItem("Least Moves to a win :",l_all.length-1);
                        }
                        else if (localStorage.getItem("Least Moves to a win :")>(l_all.length-1)){
                            localStorage.setItem("Least Moves to a win :",l_all.length-1);
                        }
                        if (audio===1){
                            winncurrentTime=0;
                            winn.play()
                        }
                        replay.hidden=false
                        clearInterval(p1time);
                        clearInterval(p2time);
                        p1time=null;
                        p2time=null;
                    }
                    else if (win===3){
                        count=-3;
                        title.textContent="Draw :(";
                        if (audio===1){
                            lose.currentTime=0;
                            lose.play()
                        }
                        replay.hidden=false
                        clearInterval(p1time);
                        clearInterval(p2time);
                        p1time=null;
                        p2time=null;
                    }
                }
                player1_title.textContent='Wait';
                player2_title.textContent='Insert Coin';
            }
        }
    }
    else if (count%4===2){
        if (player_no===2){
            if (y!=-1 && y<6){
                if (audio===1){
                    click.currentTime=0;
                    click.play()
                }
                l[y][x-1]=2;
                count+=1;
                remove_black();
                if (p2time===null){
                    p2time=setInterval(timer_2,1000);
                }
                clearInterval(p1time);
                p1time=null;
                l_all[l_all.length]=structuredClone(l);
                let win=win_check();
                if (win!=0){
                    if (win===1){
                        count=-1;
                        title.textContent="Player 1 Wins !!!";
                        localStorage.setItem('No.of Player 1 wins :',parseInt(localStorage.getItem('No.of Player 1 wins :'))+1)
                        if (localStorage.getItem("Least Moves to a win :")==='NA'){
                            localStorage.setItem("Least Moves to a win :",l_all.length-1);
                        }
                        else if (localStorage.getItem("Least Moves to a win :")>(l_all.length-1)){
                            localStorage.setItem("Least Moves to a win :",l_all.length-1);
                        }
                        if (audio===1){
                            winncurrentTime=0;
                            winn.play()
                        }
                        replay.hidden=false
                        clearInterval(p1time);
                        clearInterval(p2time);
                        p1time=null;
                        p2time=null;
                    }
                    else if (win===2){
                        count=-2;
                        title.textContent="Player 2 Wins !!!";
                        localStorage.setItem('No.of Player 2 wins :',parseInt(localStorage.getItem('No.of Player 2 wins :'))+1)
                        if (localStorage.getItem("Least Moves to a win :")==='NA'){
                            localStorage.setItem("Least Moves to a win :",l_all.length-1);
                        }
                        else if (localStorage.getItem("Least Moves to a win :")>(l_all.length-1)){
                            localStorage.setItem("Least Moves to a win :",l_all.length-1);
                        }
                        if (audio===1){
                            winncurrentTime=0;
                            winn.play()
                        }
                        replay.hidden=false
                        clearInterval(p1time);
                        clearInterval(p2time);
                        p1time=null;
                        p2time=null;
                    }
                    else if (win===3){
                        count=-3;
                        title.textContent="Draw :(";
                        if (audio===1){
                            lose.currentTime=0;
                            lose.play()
                        }
                        replay.hidden=false
                        clearInterval(p1time);
                        clearInterval(p2time);
                        p1time=null;
                        p2time=null;
                    }
                }
                player1_title.textContent='Wait';
                player2_title.textContent='Choose Block';
            }
        }
    }
    else if (count%4===3){
        if (player_no===2){
            if (y<6){
                if (audio===1){
                    click.currentTime=0;
                    click.play()
                }
                convert_toblack(x-1);
                count+=1;
                if (p1time===null){
                    p1time=setInterval(timer_1,1000);
                }
                clearInterval(p2time);
                p2time=null;
                l_all[l_all.length]=structuredClone(l);
                let win=win_check();
                if (win!=0){
                    if (win===1){
                        count=-1;
                        title.textContent="Player 1 Wins !!!";
                        localStorage.setItem('No.of Player 1 wins :',parseInt(localStorage.getItem('No.of Player 1 wins :'))+1)
                        if (localStorage.getItem("Least Moves to a win :")==='NA'){
                            localStorage.setItem("Least Moves to a win :",l_all.length-1);
                        }
                        else if (localStorage.getItem("Least Moves to a win :")>(l_all.length-1)){
                            localStorage.setItem("Least Moves to a win :",l_all.length-1);
                        }
                        if (audio===1){
                            winncurrentTime=0;
                            winn.play()
                        }
                        replay.hidden=false
                        clearInterval(p1time);
                        clearInterval(p2time);
                        p1time=null;
                        p2time=null;
                    }
                    else if (win===2){
                        count=-2;
                        title.textContent="Player 2 Wins !!!";
                        localStorage.setItem('No.of Player 2 wins :',parseInt(localStorage.getItem('No.of Player 2 wins :'))+1)
                        if (localStorage.getItem("Least Moves to a win :")==='NA'){
                            localStorage.setItem("Least Moves to a win :",l_all.length-1);
                        }
                        else if (localStorage.getItem("Least Moves to a win :")>(l_all.length-1)){
                            localStorage.setItem("Least Moves to a win :",l_all.length-1);
                        }
                        if (audio===1){
                            winncurrentTime=0;
                            winn.play()
                        }
                        replay.hidden=false
                        clearInterval(p1time);
                        clearInterval(p2time);
                        p1time=null;
                        p2time=null;
                    }
                    else if (win===3){
                        count=-3;
                        title.textContent="Draw :(";
                        if (audio===1){
                            lose.currentTime=0;
                            lose.play()
                        }
                        replay.hidden=false
                        clearInterval(p1time);
                        clearInterval(p2time);
                        p1time=null;
                        p2time=null;
                    }
                }
                player1_title.textContent='Insert Coin';
                player2_title.textContent='Wait';
            }
        }
    }
    
    // for (let i=5;i>-1;i--){
    //     console.log(l_all[l_all.length-1][i]);
    // }
    // console.log("break");
    board_draw();
}