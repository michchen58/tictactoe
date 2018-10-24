const React = require('react');
const ReactDOM = require('react-dom');

import Square from './components/Square.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: Array(3).fill().map((x,i)=>Array(3)),
      turn: 0, // false=O, true=X
      gameEnd: false
    }

    this.clickSquare = this.clickSquare.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  endGame(message) {
    this.setState({
      gameEnd: true
    }, () => {
      alert(message);
    });
  }

  checkWin(squareData) {
    let {board, turn} = this.state;
    let {row, col} = squareData;

    let hSum = board[row][0] + board[row][1] + board[row][2];
    let vSum = board[0][col] + board[1][col] + board[2][col];
    let posDSum = board[0][2] + board[1][1] + board[2][0];
    let negDSum = board[0][0] + board[1][1] + board[2][2];

    // alert message uses opposite state.turn because turn has already been changed
    if (hSum === 0 || hSum === 3) {
      this.endGame(`${turn === 0 ? 'X' : 'O'} horizontal win`);
    } else if (vSum === 0 || vSum === 3) {
      this.endGame(`${turn === 0 ? 'X' : 'O'} vertical win`)
    } else if (posDSum === 0 || posDSum === 3) {
      this.endGame(`${turn === 0 ? 'X' : 'O'} diagonal win`)
    } else if (negDSum === 0 || negDSum === 3) {
      this.endGame(`${turn === 0 ? 'X' : 'O'} diagonal win`)
    }
  }

  clickSquare(squareData) {
    if (this.state.gameEnd) {
      alert('game has already ended');
      return;
    }
    if (this.state.board[squareData.row][squareData.col] === undefined) {
      this.setState(prevState => {
        prevState.board[squareData.row][squareData.col] = prevState.turn;
        return {
          board: prevState.board,
          turn: (prevState.turn === 0 ? 1 : 0)
        }
      }, () => {
        // console.log(this.state.turn);
        setTimeout(
          () => {this.checkWin(squareData);},
          100
        )
      });
    } else {
      alert('can\'t play here!')
    }
  }

  render(){
    return (<React.Fragment>
      {
        Array(3).fill().map((x, i) => (
          Array(3).fill().map((y, j) => <Square row={i} col={j} clickCb={this.clickSquare} value={this.state.board[i][j]} key={`${i}${j}`} />)
        ))
      }
    </React.Fragment>);
  }

}

ReactDOM.render(<App />, document.getElementById('app'));
