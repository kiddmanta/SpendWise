import React from 'react';

const Labels = ({ data, totalExpenses }) => {
    const percentage = Math.round((data.value / totalExpenses) * 100);

  return (
    <div className="labels d-flex justify-content-between">
      <div className="d-flex gap-2">
        <div className="label-badge" style={{ background: data.color }}></div>
        <h4 className="label-font">{data.name}</h4>
      </div>
      <p className="my-1">{percentage}%</p>
    </div>
  );
};

export default Labels;