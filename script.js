const board = document.querySelector(".board")
const clearbttn = document.querySelector('#clear')
const change = document.querySelector('#change')


clearbttn.addEventListener('click' , () => {
    newGame.clear()
    clearBoard()
})

change.addEventListener('click' , () => {
    turn = toggle(turn);
    newGame.clear();
    clearBoard();
})

board.addEventListener('click' , function(e) {
    console.log(e.target.id)
    console.log(newGame.state)
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
    }
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
        if (res == "O") return num*-1
        return 0
    }

}

const newGame = new Game()
let turn = "X"