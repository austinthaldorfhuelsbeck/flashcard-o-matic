import React, { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch, useParams } from "react-router-dom";

import { readDeck } from "../../utils/api";
import DeckForm from "../Forms/DeckForm";
import NavBar from "../NavBar";
import DeckHeader from "./DeckHeader";
import Card from "./Card";
import CardForm from "../Forms/CardForm";
import StudyPage from "../StudyPage/StudyPage";

export default function DeckPage() {
  const params = useParams();
  const { url } = useRouteMatch();

  // LOAD DECK AND CARDS
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(params.deckId);
      setDeck(response);
      setCards(response.cards);
    }
    loadDeck();
  }, [params]);

  if (deck.id) {
    return (
      <Switch>
        <Route exact path={url}>
          <NavBar currentPage={deck.name} />
          <DeckHeader {...deck} />
          <h2>Cards</h2>
          <div className="card my-4" data-aos="fade-up">
            <ul className="list-group list-group-flush">
              {cards.map((card) => (
                <Card key={card.id} card={card} />
              ))}
            </ul>
          </div>
        </Route>

        <Route path={`${url}/edit`}>
          <NavBar
            pastPage={{ url: url, name: deck.name }}
            currentPage="Edit Deck"
          />
          <div className="col col-md-6 mx-auto my-4">
            <h2>Edit Deck</h2>
            <DeckForm {...deck} />
          </div>
        </Route>

        <Route path={"/decks/:deckId/study"}>
          <NavBar
            pastPage={{ url: url, name: deck.name }}
            currentPage="Study"
          />
          <div className="col col-md-6 mx-auto my-4">
            <h2>Study</h2>
            <h2>{deck.name}</h2>
            <StudyPage cards={deck.cards} />
          </div>
        </Route>

        <Route path={`/decks/:deckId/cards/new`}>
          <NavBar
            pastPage={{ url: url, name: deck.name }}
            currentPage="New Card"
          />
          <div className="col col-md-6 mx-auto my-4">
            <h2>{deck.name}</h2>
            <h2>Add Card</h2>
            <CardForm />
          </div>
        </Route>

        <Route path={`/decks/:deckId/cards/:cardId/edit`}>
          <NavBar
            pastPage={{ url: url, name: deck.name }}
            currentPage="Edit Card"
          />
          <div className="col col-md-6 mx-auto my-4">
            <h2>Edit Card</h2>
            <CardForm isEdit="true" />
          </div>
        </Route>
      </Switch>
    );
  }
  return "Loading...";
}
