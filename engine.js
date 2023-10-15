import {move} from './xox.js'
const row = 3, col = 3;
let decision = {
    r: undefined,
    c: undefined,
};

export function computer_move(board) {
    //first for lose:
    if (!move.end) {
        decision = win(board);
        if (decision.r == undefined) {
            decision = lose(board);
            if (decision.r == undefined) {
                decision = good_move(board);
                if (decision.r == undefined) {
                    decision = random_move(board);
                    return decision;
                }
                else {
                    return decision;
                }
            }
            else {
                return decision;
            }
        }
        else {
            return decision;
        }
    }
}

function lose(board) {
    const l = {
        r: undefined,
        c: undefined,
    };
    let flag = false;
    //rows:
    if (!flag) {
        for (let r = 0; r < row; r++) {
            let count = 0;
            for (let c = 0; c < col; c++) {
                if (board[r][c] == 'X') {
                    count++;
                }
            }
            if (count == 2) {
                for (let c = 0; c < col; c++) {
                    if (board[r][c] == '') {
                        l.r = r;
                        l.c = c;
                        break;
                    }
                }
            }
            if (l.r != undefined && l.c != undefined) {
                flag = true;
                break;
            }
        }
    }
    //colunms:
    if (!flag) {
        for (let c = 0; c < col; c++) {
            let count = 0;
            for (let r = 0; r < col; r++) {
                if (board[r][c] == 'X') {
                    count++;
                }
            }
            if (count == 2) {
                for (let r = 0; r < col; r++) {
                    if (board[r][c] == '') {
                        l.r = r;
                        l.c = c;
                        break;
                    }
                }
            }
            if (l.r != undefined && l.c != undefined) {
                flag = true;
                break;
            }
        }
    }
    //diagonals:
    if (!flag) {
        // main diagonal
        let m_count = 0, r_count = 0;
        for (let r = 0; r < row; r++) {
            for (let c = 0; c < col; c++) {
                if (board[r][c] == 'X' && (r == c)) {
                    m_count += 1;
                }
            }
        }
        if (m_count == 2) {
            for (let r = 0; r < row; r++) {
                for (let c = 0; c < col; c++) {
                    if (board[r][c] == '' && r == c) {
                        l.r = r;
                        l.c = c;
                    }
                }
            }
        }
        // reverse diagonal
        else {
            for (let r = 0; r < row; r++) {
                for (let c = 0; c < col; c++) {
                    if (board[r][c] == 'X' && ((r == 0 && c == 2) || (r == 2 && c == 0) || (r == 1 && c == 1))) {
                        r_count += 1;
                    }
                }
            }
            if (r_count == 2) {
                for (let r = 0; r < row; r++) {
                    for (let c = 0; c < col; c++) {
                        if (board[r][c] == '' && ((r == 0 && c == 2) || (r == 2 && c == 0) || (r == 1 && c == 1))) {
                            l.r = r;
                            l.c = c;
                            break;
                        }
                    }
                }
            }
        }
    }

    return l;
}

function win(board) {
    const l = {
        r: undefined,
        c: undefined,
    };
    let flag = false;
    //rows:
    if (!flag) {
        for (let r = 0; r < row; r++) {
            let count = 0;
            for (let c = 0; c < col; c++) {
                if (board[r][c] == 'O') {
                    count++;
                }
            }
            if (count == 2) {
                for (let c = 0; c < col; c++) {
                    if (board[r][c] == '') {
                        l.r = r;
                        l.c = c;
                        break;
                    }
                }
            }
            if (l.r != undefined && l.c != undefined) {
                flag = true;
                break;
            }
        }
    }
    //colunms:
    if (!flag) {
        for (let c = 0; c < col; c++) {
            let count = 0;
            for (let r = 0; r < col; r++) {
                if (board[r][c] == 'O') {
                    count++;
                }
            }
            if (count == 2) {
                for (let r = 0; r < col; r++) {
                    if (board[r][c] == '') {
                        l.r = r;
                        l.c = c;
                        break;
                    }
                }
            }
            if (l.r != undefined && l.c != undefined) {
                flag = true;
                break;
            }
        }
    }
    //diagonals:
    if (!flag) {
        // main diagonal
        let m_count = 0, r_count = 0;
        for (let r = 0; r < row; r++) {
            for (let c = 0; c < col; c++) {
                if (board[r][c] == 'O' && (r == c)) {
                    m_count += 1;
                }
            }
        }
        if (m_count == 2) {
            for (let r = 0; r < row; r++) {
                for (let c = 0; c < col; c++) {
                    if (board[r][c] == '' && r == c) {
                        l.r = r;
                        l.c = c;
                    }
                }
            }
        }
        // reverse diagonal
        else {
            for (let r = 0; r < row; r++) {
                for (let c = 0; c < col; c++) {
                    if (board[r][c] == 'O' && ((r == 0 && c == 2) || (r == 2 && c == 0) || (r == 1 && c == 1))) {
                        r_count += 1;
                    }
                }
            }
            if (r_count == 2) {
                for (let r = 0; r < row; r++) {
                    for (let c = 0; c < col; c++) {
                        if (board[r][c] == '' && ((r == 0 && c == 2) || (r == 2 && c == 0) || (r == 1 && c == 1))) {
                            l.r = r;
                            l.c = c;
                            break;
                        }
                    }
                }
            }
        }
    }

    return l;
}

function good_move(board) {
    const l = {
        r: undefined,
        c: undefined,
    };
    let flag = false;
    //rows:
    if (!flag) {
        for (let r = 0; r < row; r++) {
            let count = 0;
            for (let c = 0; c < col; c++) {
                if (board[r][c] == 'O') {
                    count++;
                }
            }
            if (count == 1) {
                for (let c = 0; c < col; c++) {
                    if (board[r][c] == '') {
                        l.r = r;
                        l.c = c;
                        break;
                    }
                }
            }
            if (l.r != undefined && l.c != undefined) {
                flag = true;
                break;
            }
        }
    }
    //colunms:
    if (!flag) {
        for (let c = 0; c < col; c++) {
            let count = 0;
            for (let r = 0; r < col; r++) {
                if (board[r][c] == 'O') {
                    count++;
                }
            }
            if (count == 1) {
                for (let r = 0; r < col; r++) {
                    if (board[r][c] == '') {
                        l.r = r;
                        l.c = c;
                        break;
                    }
                }
            }
            if (l.r != undefined && l.c != undefined) {
                flag = true;
                break;
            }
        }
    }
    //diagonals:
    if (!flag) {
        // main diagonal
        let m_count = 0, r_count = 0;
        for (let r = 0; r < row; r++) {
            for (let c = 0; c < col; c++) {
                if (board[r][c] == 'O' && (r == c)) {
                    m_count += 1;
                }
            }
        }
        if (m_count == 1) {
            for (let r = 0; r < row; r++) {
                for (let c = 0; c < col; c++) {
                    if (board[r][c] == '' && r == c) {
                        l.r = r;
                        l.c = c;
                    }
                }
            }
        }
        // reverse diagonal
        else {
            for (let r = 0; r < row; r++) {
                for (let c = 0; c < col; c++) {
                    if (board[r][c] == 'O' && ((r == 0 && c == 2) || (r == 2 && c == 0) || (r == 1 && c == 1))) {
                        r_count += 1;
                    }
                }
            }
            if (r_count == 1) {
                for (let r = 0; r < row; r++) {
                    for (let c = 0; c < col; c++) {
                        if (board[r][c] == '' && ((r == 0 && c == 2) || (r == 2 && c == 0) || (r == 1 && c == 1))) {
                            l.r = r;
                            l.c = c;
                            break;
                        }
                    }
                }
            }
        }
    }

    return l;
}

function random_move(board) {
    let flag = 0;

    board.forEach(b => {
        if(b != ''){
            flag++;
        }
    });

    if(flag != 9){
    console.log(flag)
    const l = {
        r: undefined,
        c: undefined,
    };

    let r = Math.floor(Math.random() * 3);
    let c = Math.floor(Math.random() * 3);
    // Check if the random position is empty before making a move
    if (board[r][c] === "") {
        l.r = r;
        l.c = c;
        return l;
    } else {
        // If the position is not empty, recursively call the function to find an empty position
        return random_move(board);
    }
    }
}



