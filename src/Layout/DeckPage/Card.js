import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../../utils/api";

export default function Card({ card }) {
  const history = useHistory();
  const { url } = useRouteMatch();

  const handleEdit = () => {
    history.push(`${url}/cards/${card.card_id}/edit`);
  };
  const handleDelete = () => {
    if (
      window.confirm("Delete this card? You will not be able to recover it.")
    ) {
      async function loadDelete() {
        await deleteCard(card.card_id);
      }
      loadDelete();
      history.go(0);
    }
  };

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col col-6">{card.front}</div>
        <div className="col col-6">
          {card.back}
          <br />
          <button
            type="button"
            className="btn btn-secondary mx-2 my-3"
            onClick={handleEdit}
          >
            <span className="oi oi-pencil mr-1"></span>Edit
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            <span className="oi oi-trash"></span>
          </button>
        </div>
      </div>
    </li>
  );
}
