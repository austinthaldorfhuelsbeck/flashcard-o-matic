import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck, updateDeck } from "../../utils/api";

export default function DeckForm(props = { name: "", description: "" }) {
  // LOAD INITIAL DATA
  // (BLANK UNLESS GIVEN PROPS)
  const [formData, setFormData] = useState({});
  useEffect(() => setFormData(props), [props]);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    async function loadUpdate() {
      const updatedDeck = await updateDeck({ ...formData });
      history.push(`/decks/${updatedDeck.id}`);
    }
    async function loadCreate() {
      const newDeck = await createDeck({ ...formData });
      history.push(`/decks/${newDeck.id}`);
    }
    history.location.pathname.includes("edit") ? loadUpdate() : loadCreate();
  };
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };
  const handleCancel = (event) => {
    event.preventDefault();
    history.push("/");
  };

  return (
    <form className="py-3" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          className="form-control"
          type="text"
          placeholder="Deck name"
          name="name"
          onChange={handleChange}
          value={formData.name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          rows="3"
          placeholder="Brief description of the deck"
          name="description"
          onChange={handleChange}
          value={formData.description}
        />
      </div>
      <button onClick={handleCancel} className="btn btn-secondary mx-1">
        Cancel
      </button>
      <button type="submit" className="btn btn-primary mx-1">
        Submit
      </button>
    </form>
  );
}
