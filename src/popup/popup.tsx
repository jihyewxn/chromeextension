import React, { useEffect } from 'react'
import {useState} from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'
import ComCard from './comCard'

const cardImages = [
  {"src": "/img/sion.png", matched: false},
  {"src": "/img/riku.png", matched: false},
  {"src": "/img/yushi.jpg", matched: false},
  {"src": "/img/jaehee.png", matched: false},
  {"src": "/img/ryo.png", matched: false},
  {"src": "/img/sakuya.png", matched: false}
]

const App: React.FC<{}> = () => {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choice1st, setChoice1st] = useState(null)
  const [choice2rd, setChoice2rd] = useState(null)

  const btnShuffle = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card_src) => ({id: Math.random(), ...card_src}))
    
    setCards(shuffledCards)
    setTurns(0)
    
  }
  //console.log(cards, turns)  //6가지 2개씩 12개 그림파일 배열

  const handleChoice = (card) => {
    console.log(card) //선택한 카드 로그로 확인
    choice1st ? setChoice2rd(card) : setChoice1st(card)
  }

  // compare 2 selected cards
  useEffect(() => {
    //console.log("둘중 하나 값 변경")
    if(choice1st && choice2rd) {  // 카드 두개가 선택되어 있으면
      //console.log("둘다 값이 있다.")
      if(choice1st.src === choice2rd.src) {
        console.log("선택한 카드는 같은 그림")
        setCards(prevCards => { //매치된 카드는 matched true로 변경시켜줌
          return prevCards.map(card => {
            if(card.src === choice1st.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        console.log("선택한 카드는 다른 그림")
        setTimeout(() => resetTurn(), 1000) //틀렸을때 타임아웃 1초
      }
    }
  }, [choice1st, choice2rd])

  //reset choices & increase turn
  const resetTurn = () => {
    setChoice1st(null)
    setChoice2rd(null)
    setTurns(prevTurns => prevTurns + 1)
  }

  const numStryle = { color: 'blue', fontSize: '1.2rem' }

  return (
    <div>
      <h1>메모리게임&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={numStryle}>Count : {turns}</span></h1>
      <button onClick={btnShuffle}>시작</button>

      <div className='card-grid'>
        {cards.map(card => (
          <ComCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choice1st || card === choice2rd || card.matched}
          />
        ))}
      </div>
    </div>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)