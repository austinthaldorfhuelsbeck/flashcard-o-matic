import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./Header";
import HomePage from "./HomePage/HomePage";
import DeckForm from "./Forms/DeckForm";
import DeckPage from "./DeckPage/DeckPage";
import NotFound from "./NotFound";

export default function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/decks/new">
            <div className="col col-md-6 mx-auto my-4">
              <h2>Create Deck</h2>
              <DeckForm />
            </div>
          </Route>
          <Route path="/decks/:deckId">
            <DeckPage />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
