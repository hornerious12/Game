import React from 'react';

import Square from './Square';

const Board = (props) => {
  const matrix = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]

  return (
    <div>
      {matrix.map(row => {
        return (
          <div key={row.join()} className="board-row">
            {row.map(i => (
              <Square 
                key={i} 
                value={props.squares[i]} 
                onClick={() => props.onClick(i)}
              />
            ))}
          </div>
        )
      })}
    </div>
  );
}

export default Board;
