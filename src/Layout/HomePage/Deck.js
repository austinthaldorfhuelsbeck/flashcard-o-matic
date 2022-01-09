import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api";

export default function Deck({ deck }) {
  const history = useHistory();

  // HANDLE DELETE
  const handleDelete = () => {
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      deleteDeck(deck.deck_id).then(history.go(0));
    }
  };

  return (
    <div className="row my-4">
      <div className="card" data-aos="fade-up">
        <div className="card-body">
          <h4 className="card-title">{deck.name}</h4>
          <p>
            <em>{deck.cards.length} cards</em>
          </p>
          <h6 className="card-subtitle mb-3 text-muted">{deck.description}</h6>
          <div className="row button-row">
            <div className="col-9 view-col">
              <Link to={`/decks/${deck.deck_id}`}>
                <button type="button" className="btn btn-secondary mx-1">
                  <span className="oi oi-eye mr-1"></span>View
                </button>
              </Link>
              <Link to={`/decks/${deck.deck_id}/study`}>
                <button type="button" className="btn btn-primary mx-1">
                  <span className="oi oi-book mr-1"></span>Study
                </button>
              </Link>
            </div>
            <div className="col-3 del-col">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                <span className="oi oi-trash"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
