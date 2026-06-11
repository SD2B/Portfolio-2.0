import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(''));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const calculateWinner = (squares: string[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (winner || board[i]) return;
    const newBoard = board.slice();
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    const win = calculateWinner(newBoard);
    if (win) setWinner(win);
    else if (!newBoard.includes('')) setWinner('Draw');
  };

  const reset = () => {
    setBoard(Array(9).fill(''));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="game-card shine-effect">
      <h3>Tic Tac Toe</h3>
      <div className="game-status">
        {winner ? (winner === 'Draw' ? 'Draw!' : `Winner: ${winner}`) : `Next Player: ${isXNext ? 'X' : 'O'}`}
      </div>
      <div className="ttt-grid">
        {board.map((cell, i) => (
          <div key={i} className="ttt-cell" onClick={() => handleClick(i)}>
            {cell}
          </div>
        ))}
      </div>
      <button className="btn" onClick={reset} style={{ marginTop: '1rem' }}>Reset</button>
    </div>
  );
};

const RockPaperScissors: React.FC = () => {
  const [result, setResult] = useState('Choose your weapon!');
  const choices = ['Rock', 'Paper', 'Scissors'];

  const play = (userChoice: string) => {
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    let res = '';
    if (userChoice === computerChoice) res = "It's a tie!";
    else if (
      (userChoice === 'Rock' && computerChoice === 'Scissors') ||
      (userChoice === 'Paper' && computerChoice === 'Rock') ||
      (userChoice === 'Scissors' && computerChoice === 'Paper')
    ) res = 'You win!';
    else res = 'Computer wins!';
    setResult(`You: ${userChoice} | CPU: ${computerChoice}\n${res}`);
  };

  return (
    <div className="game-card shine-effect">
      <h3>Rock Paper Scissors</h3>
      <div className="game-status" style={{ whiteSpace: 'pre-line' }}>{result}</div>
      <div className="rps-buttons">
        {choices.map(choice => (
          <button key={choice} className="rps-btn" onClick={() => play(choice)}>{choice}</button>
        ))}
      </div>
    </div>
  );
};

const MemoryGame: React.FC = () => {
  const symbols = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
  const [cards, setCards] = useState(() => symbols.sort(() => Math.random() - 0.5).map((s, i) => ({ s, i, flipped: false, matched: false })));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [won, setWon] = useState(false);

  const handleFlip = (index: number) => {
    if (flipped.length === 2 || cards[index].flipped || cards[index].matched) return;
    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);
    setFlipped([...flipped, index]);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [i1, i2] = flipped;
      if (cards[i1].s === cards[i2].s) {
        const newCards = [...cards];
        newCards[i1].matched = true;
        newCards[i2].matched = true;
        setCards(newCards);
        setFlipped([]);
        if (newCards.every(c => c.matched)) setWon(true);
      } else {
        setTimeout(() => {
          const newCards = [...cards];
          newCards[i1].flipped = false;
          newCards[i2].flipped = false;
          setCards(newCards);
          setFlipped([]);
        }, 500);
      }
    }
  }, [flipped, cards]);

  const reset = () => {
    setCards(symbols.sort(() => Math.random() - 0.5).map((s, i) => ({ s, i, flipped: false, matched: false })));
    setFlipped([]);
    setWon(false);
  };

  return (
    <div className="game-card shine-effect">
      <h3>Memory Game</h3>
      {won && <div className="game-status"><strong>You won!</strong></div>}
      <div className="memory-grid">
        {cards.map((card, i) => (
          <div key={i} className={`memory-card ${card.flipped || card.matched ? 'flipped' : ''}`} onClick={() => handleFlip(i)}>
            {(card.flipped || card.matched) ? card.s : ''}
          </div>
        ))}
      </div>
      <button className="btn" onClick={reset} style={{ marginTop: '1rem' }}>Reset</button>
    </div>
  );
};

const Fun: React.FC = () => {
  return (
    <div className="section" style={{ marginTop: '70px' }}>
      <div className="container reveal active">
        <h1 className="section-title">Fun Zone</h1>
        <p>Take a break and play some simple games I've built using JavaScript (now in React!).</p>
        
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginTop: '3rem' }}>
          <TicTacToe />
          <RockPaperScissors />
          <MemoryGame />
        </div>

        <div style={{ marginTop: '3rem' }}>
          <Link to="/" className="btn">&larr; Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Fun;
