import React from 'react'
import './comCard.css'
//import {Card} from './type_card'

// 프롭스 타입 지정하는데 두가지 있다. type, interface
/*type CpCardProps = {
    id: string;
    src: string;
}*/

type Card = {
    id: string;
    src: string;
}

interface ComCardProps {
    card:Card
    handleChoice(card:Card):void
    flipped:boolean
}

const ComCard: React.FC<ComCardProps> = ({card, handleChoice, flipped }) => {

    const clickCard = () => {
        handleChoice(card)
    }
    return (
        <div className='card'>
            <div className={flipped ? "flipped" : ""}>
                <img className='front' src={card.src} alt='card front' />
                <img className='back' src='/img/back.png' onClick={clickCard} alt='card back' />
            </div>
        </div>
    )
}

export default ComCard