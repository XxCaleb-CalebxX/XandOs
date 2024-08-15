class Game():

    def __init__(self):
        self.newBoard = Board()
        self.turn = "X"
    
    def changeTurn(self):
        if self.turn == "X":
            self.turn = "O"
        else:
            self.turn = "X"

    def startGame(self):
        while True:
            self.newBoard.display()
            pos = input("Make a move: ")
            if self.newBoard.play(self.turn , pos) == False:
                print("Illegal move or incorrect input, try again")
                print("")
                continue
            checking = self.newBoard.checkEnd()
            if checking == "X" or checking == "Y":
                print(self.turn + " has won!")
                self.newBoard.display()
                break
            elif self.newBoard.checkNoTurns():
                print("It's a tie!")
                self.newBoard.display()
                break
            else:
                print("")
                self.changeTurn()

    def startCompGame(self, start = "X"):
        while True:
            self.newBoard.display()
            if start == self.turn:
                temp = minimax(self.newBoard , "X")
                pos = temp.moves[len(self.newBoard.moves)]
            else:
                pos = input("Make a move: ")
            if self.newBoard.play(self.turn , pos) == False:
                print("Illegal move or incorrect input, try again")
                print("")
                continue
            checking = self.newBoard.checkEnd()
            if checking == "X" or checking == "Y":
                print(self.turn + " has won!")
                self.newBoard.display()
                break
            elif self.newBoard.checkNoTurns():
                print("It's a tie!")
                self.newBoard.display()
                break
            else:
                print("")
                self.changeTurn()

class Board():
    default = [["A1" , 'A2' , 'A3'] , ['B1' , 'B2' , 'B3'] , ['C1' , 'C2' , 'C3']]

    def __init__(self , state = [ [None, None , None] , [None, None, None] , [None, None, None]] , moves = []):
        self.state = state
        self.moves = moves

    def getState(self):
        return self.state
    
    def getMoves(self):
        return self.moves.copy()
    
    def getStateCopy(self):
        thing = []
        thing.append(self.state[0].copy())
        thing.append(self.state[1].copy())
        thing.append(self.state[2].copy())

        return thing
    
    def display(self):
        for index, row in enumerate(self.state):
            for indexx , item in enumerate(row):
                if indexx == 2:
                    if item == None:
                        print("   " )
                    else:
                        print(item)
                else:
                    if item == None:
                        print("   |" , end =  "")
                    else:
                        print(item + " | " , end = "")
            if index != 2:
                print('___________')
    
    def play(self , role , position):
        if position[0] == "A":
            if self.state[0][int(position[1]) - 1] == None:
                self.state[0][int(position[1]) - 1] = role
                self.moves.append(position)
                return True
        elif position[0]  == 'B':
            if self.state[1][int(position[1]) - 1] == None:
                self.state[1][int(position[1]) - 1] = role
                self.moves.append(position)
                return True
        elif position[0] == 'C':
            if self.state[2][int(position[1]) - 1] == None:
                self.state[2][int(position[1]) - 1] = role
                self.moves.append(position)
                return True
        return False
    
    def checkEnd(self):
        for row in self.state:
            if row[0] == row[1] == row[2] and row[0] != None:
                return row[0]
        for index in range(0,3):
            if self.state[0][index] == self.state[1][index] == self.state[2][index] and self.state[0][index] != None:
                return self.state[0][index]    
        if self.state[0][0] == self.state[1][1] == self.state[2][2] and self.state[0][0] != None:
            return self.state[0][0]    
        if self.state[0][2] == self.state[1][1] == self.state[2][0] and self.state[0][2] != None:
            return self.state[0][2]
        return None


    def checkNoTurns(self):
        for row in self.state:
            for item in row:
                if item == None:
                    return False   
        return True

    def turns(self):
        new_arr = []
        for index , row in enumerate(self.state):
            for indexx , pos in enumerate(row):
                if pos == None:
                    new_arr.append(Board.default[index][indexx])
        return new_arr
    
    def clear(self):
        self.state = [ [None, None , None] , [None, None, None] , [None, None, None]]
    
    def utility(self):
        num = 0
        for row in self.state:
            for item in row:
                if item == None:
                    num += 1
        res = self.checkEnd()
        if res == "X":
            return num
        elif res == "O":
            return num*(-1)
        return 0

def toggleTurn(turn):
        if turn == "X":
            return "O"
        else:
            return "X"


def minimax(board : Board , current):
    if board.checkNoTurns() or board.checkEnd() == "X" or board.checkEnd() == "O":
        return board
        
    if current == "X":
        maxEval = -100
        moves = board.turns()
        for turn in moves:
            temp = Board(board.getStateCopy() , board.getMoves())
            temp.play(current , turn)
            eval = minimax(temp , toggleTurn(current))
            if type(maxEval) == Board:
                if eval.utility() > maxEval.utility():
                    maxEval = Board(eval.getStateCopy() , eval.getMoves())
            else:
                maxEval = Board(eval.getStateCopy() , eval.getMoves())
        return maxEval
        
    else:
        minEval = 100
        moves = board.turns()
        for turn in moves:
            temp = Board(board.getStateCopy() , board.getMoves())
            temp.play(current , turn)
            eval = minimax(temp, toggleTurn(current))
            if type(minEval) == Board:
                if eval.utility() < minEval.utility():
                    minEval = Board(eval.getStateCopy() , eval.getMoves())
            else:
                minEval = Board(eval.getStateCopy() , eval.getMoves())
        return minEval


game = Game()

game.startCompGame("O")

# newBoard = Board()

# newBoard.play("X" , "C3")
# newBoard.play("O" , "A1")
# newBoard.play("X" , "C1")
# newBoard.display()
# res = minimax(newBoard , "O")
# res.display()
# print(newBoard.moves)
# print(res.moves)