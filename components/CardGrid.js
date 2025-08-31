import React from "react";

export default function CardGrid({ active }) {
  const cards = [
    `${active} Card 1`,
    `${active} Card 2`,
    `${active} Card 3`,
    `${active} Card 4`,
    `${active} Card 5`,
    `${active} Card 6`,
  ];

  return (
    <div className="card-grid">
      {cards.map((c, i) => (
        <div key={i} className="card">
          {c}
        </div>
      ))}
    </div>
  );
}
