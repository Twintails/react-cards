/* eslint-disable no-unused-vars */
import "./player-hand.scss"

import React from "react"
import Card from "./card"

export default function PlayerHand(props) {
  const {hand, opSelectCard, selectCard, toggle, isOpen} = props
  const caretClass = isOpen ? "fa-caret-down" : "fa-caret-up"
  return (
    <div className={`c-player-hand ${isOpen ? "is-open" : "is-closed"}`}>
      <div className={`title ${opSelectCard.can ? "is-active" : ""}`} onClick={toggle}>
        <i className={`fa ${caretClass}`}  />
        {opSelectCard.error}
        Your Hand
        <i className={`fa ${caretClass}`} />
        {isOpen ? <div className="small">Double click or tap a card to play</div> : null }
      </div>
      <div className="cards">
        {hand.map(card =>
          <Card
            key={card.id}
            isSelectable={opSelectCard.can && !opSelectCard.inProgress}
            isPlayable={opSelectCard.can && !opSelectCard.inProgress && !selectCard}
            onClick={() => selectCard(card, hand)}
            type="bg-white"
            card={card}
            style="small"
            canZoom />
        )}
      </div>
    </div>
  )
}
