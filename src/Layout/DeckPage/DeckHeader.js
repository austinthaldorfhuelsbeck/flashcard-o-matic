import React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";

export default function DeckHeader(params) {
  const { url } = useRouteMatch();
  const history = useHistory();

  return (
    <div className="deck-header py-4">
      <h3>{params.name}</h3>
      <p>{params.description}</p>
      <div className="my-3">
        <button
          type="button"
          className="btn btn-secondary mx-1"
          onClick={() => history.push(`${url}/edit`)}
        >
          <span className="oi oi-pencil mr-1"></span>Edit
        </button>
        <button
          type="button"
          className="btn btn-primary mx-1"
          onClick={() => history.push(`${url}/study`)}
        >
          <span className="oi oi-book mr-1"></span>Study
        </button>
        <button
          type="button"
          className="btn btn-primary mx-1"
          onClick={() => history.push(`${url}/cards/new`)}
        >
          <span className="oi oi-plus mr-1"></span>Add Cards
        </button>
      </div>
    </div>
  );
}
