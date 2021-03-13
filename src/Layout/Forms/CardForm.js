import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createCard, readCard, updateCard } from "../../utils/api";

export default function CardForm({ isEdit = false }) {
  // LOAD INITIAL DATA
  // (BLANK UNLESS GIVEN PROPS)
  const params = useParams();
  const [formData, setFormData] = useState({});
  useEffect(() => {
    const init = { name: "", description: "" };
    setFormData(init);
    if (params.cardId) {
      async function loadCard() {
        const cardFromAPI = await readCard(params.cardId);
        setFormData(cardFromAPI);
      }
      loadCard();
    }
  }, [params.cardId]);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    async function loadUpdate() {
      const updatedCard = await updateCard({ ...formData });
      history.push(`/decks/${updatedCard.deckId}`);
    }
    async function loadCreate() {
      const newCard = await createCard(params.deckId, { ...formData });
      history.push(`/decks/${newCard.deckId}`);
    }
    isEdit ? loadUpdate() : loadCreate();
  };
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };
  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <form className="py-3" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea
          id="front"
          className="form-control"
          rows="3"
          placeholder="Front side of card"
          name="front"
          onChange={handleChange}
          value={formData.front}
        />
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
          id="back"
          className="form-control"
          rows="3"
          placeholder="Back side of card"
          name="back"
          onChange={handleChange}
          value={formData.back}
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
