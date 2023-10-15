import { computer_move } from "./engine.js";

let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];

const row = 3;
const col = 3;
const blocks = document.querySelectorAll('#X_O');
const reset = document.querySelector('#reset_button');
const tie_div = document.querySelector('#tie');

export let move = {
    x: true,
    o: false,
    end: false,
};
const score = {
    x: 0,
    o: 0,
};
let info = {
    name: undefined,
    type: undefined,
    order: undefined,
};
const player_x = document.querySelector('#playerx');
const player_o = document.querySelector('#playero');


reset.addEventListener('click', e => {
    window.location.reload();
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];
});

blocks.forEach((block, index) => {
    block.addEventListener('click', e => {
        if (move.x && !move.end) {
            // drawing x in this possition 
            const grid = get_location(block.className);
            if(board[grid[0]][grid[1]] == ''){
            board[grid[0]][grid[1]] = 'X';
            make_board();
            move.x = false;
            move.o = true;
            end();
            if(!move.end){
            setTimeout(() => {
                computer_turn();
                move.x = true;
                move.o = false;
                end();
            }, 200);
        }
    }
        }
        console.log(move)
    });
});

function make_board() {

    blocks.forEach(element => {
        element.innerHTML = '';
    });

    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            const b = document.querySelector(`.a${c}${r}`);
            const h = document.createElement('h1');
            h.innerHTML = board[c][r];
            b.appendChild(h);
        }
    }
}

function computer_turn() {
    const d = computer_move(board);
    board[d.r][d.c] = 'O';
    make_board();
}

function get_location(cls) {
    return [cls[1], cls[2]];
}

function win() {
    let result;
    result
    //rows:
    for(let r = 0; r < row; r ++){
        //first row for x
        if(board[r][0] == 'X' && board[r][1] == 'X' && board[r][2] == 'X'){
            info.name = 'X';
            info.type = 'row';
            info.order = r;
            result = 'win';
            return result;
        }
        else if(board[r][0] == 'O' && board[r][1] == 'O' && board[r][2] == 'O'){
            info.name = 'O';
            info.type = 'row';
            info.order = r;
            result = 'win';
            return result;
        }
    }

    //colunms:
    for(let c = 0; c < col; c ++){
        //for x
        if(board[0][c] == 'X' && board[1][c] == 'X' && board[2][c] == 'X'){
            info.name = 'X';
            info.type = 'col';
            info.order = c;
            result = 'win';
            return result;
        }
        //for o
        else if(board[0][c] == 'O' && board[1][c] == 'O' && board[2][c] == 'O'){
            info.name = 'O';
            info.type = 'col';
            info.order = c;
            result = 'win';
            return result;
        }
    }

    //for diagonal
    if (board[0][0] == 'X' && board[1][1] == 'X' && board[2][2] == 'X') {
        info.name = 'X';
        info.type = 'diagonal';
        info.order = 1; 
        result = 'win';
        return result;
    } else if (board[0][0] == 'O' && board[1][1] == 'O' && board[2][2] == 'O') {
        info.name = 'O';
        info.type = 'diagonal';
        info.order = 1; 
        result = 'win';
        return result;
    }

    if (board[0][2] == 'X' && board[1][1] == 'X' && board[2][0] == 'X') {
        info.name = 'X';
        info.type = 'rdiagonal';
        info.order = 2; 
        result = 'win';
        return result;
    } else if (board[0][2] == 'O' && board[1][1] == 'O' && board[2][0] == 'O') {
        info.name = 'O';
        info.type = 'rdiagonal';
        info.order = 2; 
        result = 'win';
        return result;
    }

    if(result != 'win'){
        // tie
        let foundEmptyElement = false;
        for (let r = 0; r < row; r++) {
            for (let c = 0; c < col; c++) {
                if (board[r][c] === '') {
                    foundEmptyElement = true;
                    break;
                }
            }
        }
        if (!foundEmptyElement) {
            result = 'tie';
        }
        return result;
    }

}

function end() {
    if(win() == 'win'){
        move.end = true;
        win_effect();
        score_update();
        setTimeout(() => {
            clear();
        },500);
    }
    else if(win() == 'tie'){
        move.end = true;
        tie_effect();
        score_update();
        setTimeout(() => {
            clear();
        },500);
    }
    else{
        return;
    }
}

function win_effect() {
    switch (info.type) {
        case 'row':
            for(let c = 0; c < col; c++){
                const b = document.querySelector(`.a${info.order}${c}`)
                b.classList.add('red');
            }    
            break;
        case 'col':
            for(let r = 0; r < row; r++){
                const b = document.querySelector(`.a${r}${info.order}`)
                b.classList.add('red');
            }    
            break;
        case 'diagonal':
            for(let r = 0, c = 0; r < row, c < col; r++, c++){
                const b = document.querySelector(`.a${r}${c}`)
                b.classList.add('red');
            } 
            break;
        case 'rdiagonal':
            document.querySelector(`.a02`).classList.add('red');
            document.querySelector(`.a11`).classList.add('red');
            document.querySelector(`.a20`).classList.add('red');
            break;
        default:
            break;
    }
    
}

function tie_effect() {
    const h1 = document.createElement('h1');
    h1.innerText = 'Tie';
    const tie = document.querySelector('#tie');
    tie.append(h1);
}

function score_update() {
    switch(info.name){
        case 'X':
            score.x += 1;
            break;
        case 'O':
            score.o += 1;
            break;
        default: 
            break;
    }
    player_x.innerText = `Player X: ${score.x}`;
    player_o.innerText = `Player O: ${score.o}`;
}

function clear() {
    
    for(let r = 0; r < row ;r++){
        for(let c = 0; c < col ;c++){
            board[r][c] = '';
        }
    }
    make_board();

    blocks.forEach(b => {
        b.classList.remove('red');
    });

    tie_div.innerHTML = '';

    move = {
        x: true,
        o: false,
        end: false,
    };

    info = {
        name: undefined,
        type: undefined,
        order: undefined,
    };
}
