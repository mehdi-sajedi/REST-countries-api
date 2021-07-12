import React from 'react';

const CountryDetailsItem = ({ className, title, property, column }) => {
  return (
    <p className={`details__info__facts__col-${column}__${className}`}>
      <span className="weight-600">{title}: </span>
      {property}
    </p>
  );
};

export default CountryDetailsItem;