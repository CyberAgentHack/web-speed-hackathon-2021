import React from 'react';

/**
 * @typedef {object} Props
 * @property {string} label
 * @property {React.ChangeEventHandler<HTMLInputElement>} onChange
 */

/** @type {React.VFC<Props>} */
const AuthInput = ({ label, onChange }) => {
  return (
    <label className="block">
      <p>{label}</p>
      <p className="mt-2">
        <input
          className="border-b focus:border-b-2 border-green-300 focus:border-green-600 focus:outline-none"
          type="text"
          onChange={onChange}
        />
      </p>
    </label>
  );
};

export { AuthInput };
