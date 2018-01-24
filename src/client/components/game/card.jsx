/* eslint-disable no-unused-vars */
import "./card.scss"

import React from "react"

function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}

function resetPlayableCards(elem) {
  elem = elem.parentNode.firstChild;
  do {
    if (elem.nodeType === 3) continue; // text node
    if (hasClass(elem, "is-playable")) {
      removeClass(elem, "is-playable")
    }
  } while (elem = elem.nextSibling) // eslint-disable-line no-cond-assign
  return;
}

function sibfilter(elem) {
  switch (elem.nodeName.toUpperCase()) {
    case 'DIV':
      return true;
    case 'SPAN':
      return true;
    default:
      return false;
  }
}

export default function Card(props) {
  const {isSelectable = false, isPlayable = false, onClick, type, card, style = "default", canZoom = false} = props
  const classes = [
    "c-card",
    type,
    card ? "front" : "back",
    `style-${style}`,
    canZoom ? "can-zoom" : "",
    isSelectable ? "is-selectable" : "",
    isPlayable ? "is-playable" : ""
  ]

  const click = (e) => {
    e.preventDefault();
    if (!isSelectable) return
    onClick(card)
  }

  const tapp = (e) => {
    e.preventDefault();

    let classes = e.currentTarget.classList
    if (!isSelectable) return
    if (!isPlayable) {
      if ( hasClass(e.currentTarget, "is-playable") ) {
        return onClick(card)
      }
      resetPlayableCards(e.currentTarget)
      addClass(e.currentTarget, "is-playable")
      return
    }

    onClick(card)
  }

  return (
    <div className={classes.join(" ")} onDoubleClick={click} onTouchEnd={(e) => tapp(e)}>
      {!card
        ? <div className="inner">Cards</div>
        : <div className="inner">
          <span className="text">{card.text}</span>
          <span className="set">{card.set}</span>
          {!card.whiteCardCount ? null :
            <span className="white-count">pick <span>{card.whiteCardCount}</span></span>
          }
        </div>
      }
    </div>
  )
}
