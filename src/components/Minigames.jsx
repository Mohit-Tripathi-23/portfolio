import React, { useState, useEffect } from 'react';
import { RefreshCw, Code, Brain, Trophy, Coffee, Gamepad2, Sparkles, Rocket } from 'lucide-react';
import './Minigames.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isAiTurn, setIsAiTurn] = useState(false);
  
  const calculateWinner = (squares) => {
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

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(Boolean);

  // AI Logic
  useEffect(() => {
    if (!xIsNext && !winner && !isDraw) {
      setIsAiTurn(true);
      const timer = setTimeout(() => {
        makeAiMove();
      }, 600); // Small delay for realism
      return () => clearTimeout(timer);
    }
  }, [xIsNext, winner, isDraw]);

  const makeAiMove = () => {
    const emptySquares = board.map((sq, i) => sq === null ? i : null).filter(val => val !== null);
    if (emptySquares.length === 0) return;

    // Simple AI: 1. Try to win, 2. Block X, 3. Random
    let moveToMake = -1;
    
    // 1. Try to win
    for (let i of emptySquares) {
      const testBoard = [...board];
      testBoard[i] = 'O';
      if (calculateWinner(testBoard) === 'O') {
        moveToMake = i; break;
      }
    }
    
    // 2. Block X
    if (moveToMake === -1) {
      for (let i of emptySquares) {
        const testBoard = [...board];
        testBoard[i] = 'X';
        if (calculateWinner(testBoard) === 'X') {
          moveToMake = i; break;
        }
      }
    }

    // 3. Take Center if available
    if (moveToMake === -1 && board[4] === null) {
      moveToMake = 4;
    }

    // 4. Random
    if (moveToMake === -1) {
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      moveToMake = emptySquares[randomIndex];
    }

    const newBoard = [...board];
    newBoard[moveToMake] = 'O';
    setBoard(newBoard);
    setXIsNext(true);
    setIsAiTurn(false);
  };

  const handleClick = (i) => {
    if (winner || board[i] || isAiTurn || !xIsNext) return;
    const newBoard = [...board];
    newBoard[i] = 'X';
    setBoard(newBoard);
    setXIsNext(false);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setIsAiTurn(false);
  };

  return (
    <div className="game-container glass">
      <h3>Tic-Tac-Toe (vs AI)</h3>
      <div className="game-status">
        {winner 
          ? (winner === 'X' ? "You Won!" : "AI Won!") 
          : isDraw 
            ? "It's a Draw!" 
            : `Next: ${xIsNext ? 'You (X)' : 'AI (O) thinking...'}`}
      </div>
      <div className={`tic-tac-toe-board ${isAiTurn ? 'ai-thinking' : ''}`}>
        {board.map((square, i) => (
          <button 
            key={i} 
            className={`board-square ${square ? 'filled' : ''} ${square === 'X' ? 'x-mark' : 'o-mark'}`} 
            onClick={() => handleClick(i)}
            disabled={isAiTurn || square !== null || winner}
          >
            {square}
          </button>
        ))}
      </div>
      <button className="btn btn-outline game-reset" onClick={resetGame}>
        <RefreshCw size={16} /> Restart
      </button>
    </div>
  );
};

// Memory Match Game
const cardIcons = [Code, Brain, Trophy, Coffee, Gamepad2, Sparkles, Rocket, RefreshCw];

const MemoryMatch = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Need 6 pairs for a 4x3 grid (12 cards)
    const selectedIcons = cardIcons.slice(0, 6);
    const shuffledCards = [...selectedIcons, ...selectedIcons]
      .sort(() => Math.random() - 0.5)
      .map((Icon, index) => ({ id: index, Icon }));
    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setDisabled(false);
  };

  const handleCardClick = (index) => {
    if (disabled || flipped.includes(index) || solved.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      const firstCard = cards[newFlipped[0]].Icon;
      const secondCard = cards[newFlipped[1]].Icon;

      if (firstCard === secondCard) {
        setSolved([...solved, ...newFlipped]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 800);
      }
    }
  };

  const isWon = solved.length === 12;

  return (
    <div className="game-container glass">
      <h3>Memory Match</h3>
      <div className="game-status">
        {isWon ? "You Won! Great Memory!" : `Matches: ${solved.length / 2} / 6`}
      </div>
      <div className="memory-board">
        {cards.map((card, i) => {
          const isFlipped = flipped.includes(i) || solved.includes(i);
          return (
            <button
              key={card.id}
              className={`memory-card ${isFlipped ? 'flipped' : ''} ${solved.includes(i) ? 'solved' : ''}`}
              onClick={() => handleCardClick(i)}
            >
              <div className="card-inner">
                <div className="card-front">?</div>
                <div className="card-back">
                  <card.Icon size={32} />
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <button className="btn btn-outline game-reset" onClick={initializeGame}>
        <RefreshCw size={16} /> Restart
      </button>
    </div>
  );
};

const Minigames = () => {
  return (
    <section id="minigames" className="section">
      <div className="container">
        <h2 className="section-title">
          Take a <span className="text-gradient">Break</span>
        </h2>
        <div className="games-grid">
          <TicTacToe />
          <MemoryMatch />
        </div>
      </div>
    </section>
  );
};

export default Minigames;
