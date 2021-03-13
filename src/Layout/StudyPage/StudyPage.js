import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

export default function StudyPage({ cards }) {
  const history = useHistory();
  const { deckId } = useParams();
  const [currentCard, setCurrentCard] = useState(1);
  const [isCardFront, setIsCardFront] = useState(true);

  const card = cards[currentCard - 1];

  // HELPER FUNCTIONS //
  const flipState = () => setIsCardFront(!isCardFront);
  const handleRestart = () => {
    if (
      window.confirm(
        "Restart cards? Click 'cancel' to return to the home page."
      )
    ) {
      setCurrentCard(1);
      flipState();
    } else {
      history.push("/");
    }
  };
  const incrementCard = () => {
    if (currentCard < cards.length) {
      setCurrentCard(currentCard + 1);
      flipState();
    } else {
      handleRestart();
    }
  };

  if (cards.length > 2) {
    return (
      <div className="card study-card px-3 my-4" data-aos="fade-up">
        <div className="card-body">
          <div className="row my-1">
            <h4 className="card-title">
              Card {currentCard} of {cards.length}
            </h4>
          </div>
          <div className="row my-1">{isCardFront ? card.front : card.back}</div>
          <div className="row my-3">
            <button
              type="button"
              className="btn btn-secondary mx-2 my-3"
              onClick={flipState}
            >
              <span className="oi oi-action-redo mr-1"></span>Flip
            </button>
            {!isCardFront && (
              <button
                type="button"
                className="btn btn-primary mx-2 my-3"
                onClick={incrementCard}
              >
                <span className="oi oi-arrow-right mr-1"></span>Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h3>Not enough cards.</h3>
      <p>
        You need at least 3 cards to study. There are {cards.length} cards in
        this deck.
      </p>
      <button
        type="button"
        className="btn btn-primary mx-1"
        onClick={() => history.push(`/decks/${deckId}/cards/new`)}
      >
        <span className="oi oi-plus mr-1"></span>Add Cards
      </button>
    </div>
  );
}
