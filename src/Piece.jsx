import React from 'react';

import BlackPawn from './assets/pawn-black.png'
import WhitePawn from './assets/pawn-white.png'
import BlackRook from './assets/rook-black.png'
import WhiteRook from './assets/rook-white.png'
import BlackKnight from './assets/knight-black.png'
import WhiteKnight from './assets/knight-white.png'
import BlackBishop from './assets/bishop-black.png'
import WhiteBishop from './assets/bishop-white.png'
import BlackQueen from './assets/queen-black.png'
import WhiteQueen from './assets/queen-white.png'
import BlackKing from './assets/king-black.png'
import WhiteKing from './assets/king-white.png'

const PIECES = {
    BLACK_PAWN: BlackPawn,
    BLACK_ROOK: BlackRook,
    BLACK_KNIGHT: BlackKnight,
    BLACK_BISHOP: BlackBishop,
    BLACK_QUEEN: BlackQueen,
    BLACK_KING: BlackKing,

    WHITE_PAWN: WhitePawn,
    WHITE_ROOK: WhiteRook,
    WHITE_KNIGHT: WhiteKnight,
    WHITE_BISHOP: WhiteBishop,
    WHITE_QUEEN: WhiteQueen,
    WHITE_KING: WhiteKing,
}

const Piece = ({piece}) => {
  return (
    <img src={PIECES[`${piece.side.name.toUpperCase()}_${piece.type.toUpperCase()}`]}/>
  )
}

export default Piece