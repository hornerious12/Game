import React from 'react';
import Board from './Board';

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(squares) {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Game extends React.Component {
  constructor(){
    super();
    this.state = {
      history: [Array(9).fill(null)],
      xIsNext: true,
      stepNumber: 0,
    };
    this.handleClick=this.handleClick.bind(this);
    this.jumpTo=this.jumpTo.bind(this);
  }

  jumpTo(step) {
    this.setState({
      ...( step === 0 ? {
        history: [this.state.history[0]]
      } : null),
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, 10)
    const current = [...history[history.length - 1]]
    
    if (calculateWinner(current) || current[i]) {
      return;
    }
    current[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: [...history, current],
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current);
    const status = winner ? `Winner: ${winner}` : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current} onClick={this.handleClick}/>
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ul>
            {history.map((_, move) => {
              const desc = move ? `Move #${move}` : 'Restart Game';
              return (
                <li key={move}>
                  <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
export default Game;
