import React, { useState } from "react";
import { Collection } from "../interfaces/Collection";

interface CollectionFormProps {
  collection: Collection;
  onSave: (collection: Collection) => void;
  onCancel: () => void;
}

const CollectionForm: React.FC<CollectionFormProps> = ({
  collection,
  onSave,
  onCancel,
}) => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCollection: Collection = {
      invoice_number: collection.invoice_number,
      collection_number: `COL${Date.now()}`,
      date_of_collection: date,
      status: "Valid",
      amount: parseFloat(amount),
    };
    onSave(newCollection);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default CollectionForm;
