import React from 'react';

/**
 * @typedef {object} Props
 * @property {string} [autoComplete]
 * @property {string} label
 * @property {React.ChangeEventHandler<HTMLInputElement>} onChange
 * @property {string} type
 */

/** @type {React.VFC<Props>} */
const AuthInput = ({ autoComplete, label, onChange, type }) => {
  return (
    <label className="block">
      <p>{label}</p>
      <p className="mt-2">
        <input
          autoComplete={autoComplete}
          className="border-b focus:border-b-2 border-green-300 focus:border-green-600 focus:outline-none"
          onChange={onChange}
          type={type}
        />
      </p>
    </label>
  );
};

export { AuthInput };
