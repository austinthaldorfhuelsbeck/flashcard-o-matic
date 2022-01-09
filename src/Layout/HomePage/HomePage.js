import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { listDecks } from "../../utils/api";
import Deck from "./Deck";

export default function HomePage() {
  // LOAD DECKS
  const [decks, setDecks] = useState([]);
  useEffect(() => {
    async function loadDecks() {
      const response = await listDecks();
      setDecks(response.data);
    }
    loadDecks();
  }, []);

  // CREATE DECK BUTTON
  const createDeckButton = (
    <Link to={`/decks/new`}>
      <button type="button" className="btn btn-secondary">
        <span className="oi oi-plus mr-1"></span>Create Deck
      </button>
    </Link>
  );

  // LIST OF DECKS
  const renderDecks = (decks) => {
    return decks.map((deck) => <Deck key={deck.deck_id} deck={deck} />);
  };

  return (
    <div className="container home">
      {createDeckButton}
      <div className="col col-md-6 mx-auto my-4">
        <h2>Decks:</h2>
        {renderDecks(decks)}
      </div>
    </div>
  );
}
