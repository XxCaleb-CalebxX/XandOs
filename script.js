const board = document.querySelector(".board")
const clearbttn = document.querySelector('#clear')
const change = document.querySelector('#change')


clearbttn.addEventListener('click' , () => {
    newGame.clear()
    clearBoard()
})

change.addEventListener('click' , () => {
    newGame.clear();
    clearBoard();
    turn = "X"
    let next_move = computerMove(newGame , turn).getMoves()
    let next_turn = next_move.at(newGame.getMoves().length)

    let new_thing = document.querySelector(`#${next_turn}`)
    new_thing.textContent = turn 
    newGame.play(next_turn , turn);
    turn = toggle(turn)
})

board.addEventListener('click' , function(e) {
    let thing = document.querySelector(`#${e.target.id}`)
    thing.textContent = turn;
    newGame.play(e.target.id , turn);
    let winner = newGame.checkEnd(); 

    if (winner == "X" || winner == "O") {
        turn = "X"
        newGame.clear()
        clearBoard()
        alert("Game has ended, " + winner + " has won!")
    }
    else if (newGame.checknoTurns() == true) {
        turn= "X"
        newGame.clear()
        clearBoard()
        alert('Tie');
    } else {
        turn = toggle(turn)
        let next_move = computerMove(newGame , turn).getMoves()
        let next_turn = next_move.at(newGame.getMoves().length)

        let new_thing = document.querySelector(`#${next_turn}`)
        new_thing.textContent = turn 
        newGame.play(next_turn , turn);
        let new_winner = newGame.checkEnd(); 

        if (new_winner == "X" || new_winner == "O") {
            turn = "X"
            newGame.clear()
            clearBoard()
            alert("Game has ended, " + winner + " has won!")
        }
        else if (newGame.checknoTurns() == true) {
            turn= "X"
            newGame.clear()
            clearBoard()
            alert('Tie');
        } else {
            turn = toggle(turn)
        } }
})

function clearBoard() {
    let current = document.querySelectorAll('.pos')
    current.forEach((element) =>
    element.textContent = "")

}

function toggle(turn) {
    if (turn == "X") return "O"
    return "X"
}

class Game  {
    static default = [["A1" , 'A2' , 'A3'] , ['B1' , 'B2' , 'B3'] , ['C1' , 'C2' , 'C3']];


    constructor(state = [[null , null, null] , [null , null, null] , [null , null, null]], moves = []) {
        this.state = state;
        this.moves = moves;
    }

    play(position , role) {
        if (position[0] == "A") {
            if (this.state[0][+position[1]-1] == null) {
                this.state[0][+position[1] -1] = role;
                this.moves.push(position)
                return true
            }
        } else if (position[0] == "B") {
            if (this.state[1][+position[1]-1] == null) {
                this.state[1][+position[1] -1] = role;
                this.moves.push(position)
                return true
            }
        } else if (position[0] == "C") {
            if (this.state[2][+position[1]-1] == null) {
                this.state[2][+position[1] -1] = role;
                this.moves.push(position)
                return true
            }
        }
    }

    clear() {
        this.state = [[null , null, null] , [null , null, null] , [null , null, null]]
    }
    checkEnd() {
        for (let row of this.state){
            if (row[0] != null && row[0] == row[1] && row[1] == row[2])
                return row[0]
        }

        for (let i= 0; i<3;i++){
            if (this.state[0][i] == this.state[1][i] && this.state[1][i] == this.state[2][i] && this.state[0][i] != null){return this.state[0][i]}
        }

        if (this.state[0][0] == this.state[1][1] && this.state[1][1] == this.state[2][2] && this.state[0][0] != null){return this.state[0][0]}
        if (this.state[0][2] == this.state[1][1] && this.state[1][1] == this.state[2][0] && this.state[0][2] != null){return this.state[0][2]}

        return null
    }

    checknoTurns() {
        for (let row of this.state){
            for (let item of row) {
                if (item == null) {return false}
            }
        }

        return true
    }

    utility() {
        this.state = [[null , null, null] , [null , null, null] , [null , null, null]]
    }

    getState(){
        return structuredClone(this.state)
    }

    getMoves(){
        return structuredClone(this.moves)
    }

    turns() {
        let new_arr = [];
        for (let index in this.state) {
            for (let i in this.state[index]) {
                if (this.state[index][i] == null){new_arr.push(Game.default[index][i])}
            }
        }

        return new_arr
    }

    utility() {
        let num= 0;

        for (let row of this.state) {
            for (let item of row){
                if (item == null) {num+=1}
            }
        }

        let res = this.checkEnd()

        if (res == "X") return num
        else if (res == "O") return num*-1
        return 0
    }

}

function computerMove(current_state , current_player) {
    if (current_state.checkEnd() == "X" || current_state.checkEnd() == "O" || current_state.checknoTurns() == true) {
        return current_state
    }

    if (current_player == "X") {
        let maxEval = -10000
        let moves = current_state.turns()

        for (let turn of moves) {
            let temp = new Game(current_state.getState() , current_state.getMoves())
            temp.play( turn, current_player)
            let eval = computerMove(temp , toggle(current_player))

            if (typeof maxEval == Game) {
                if (eval.utility() > maxEval.utility()) {
                    maxEval = new Game(eval.getState() , eval.getMoves())
                } }
            else {
                    maxEval = new Game(eval.getState() , eval.getMoves())
                
                }
            
        } return maxEval

    } else {
        let minEval = 10000;
        let moves = current_state.turns()

        for (let turn of moves) {
            let temp = new Game(current_state.getState() , current_state.getMoves())
            temp.play(turn , current_player)
            let eval = computerMove(temp , toggle(current_player))

            if (typeof minEval == Game) {
                if (eval.utility() < minEval.utility()){
                    minEval = new Game(eval.getState() , eval.getMoves())
                } } 
            else {
                minEval = new Game(eval.getState() , eval.getMoves())
            }

        } return minEval

    }
}

const newGame = new Game()
let turn = "X"
