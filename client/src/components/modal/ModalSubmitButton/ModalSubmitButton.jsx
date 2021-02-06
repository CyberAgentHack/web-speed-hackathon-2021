import classNames from 'classnames';
import React from 'react';
import { FontAwesomeIcon } from '../../foundation/FontAwesomeIcon';

/**
 * @typedef {object} Props
 * @property {boolean} disabled
 * @property {boolean} loading
 * @property {string} children
 * @property {React.MouseEventHandler<HTMLButtonElement>} onClick
 */

/** @type {React.VFC<Props>} */
const ModalSubmitButton = ({ disabled, loading, children, onClick }) => {
  return (
    <button
      className={classNames('block px-8 py-2 text-white bg-green-600 rounded', {
        'opacity-50 cursor-not-allowed': disabled,
      })}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      {loading ? (
        <span className="pr-2">
          <span className="inline-block animate-spin">
            <FontAwesomeIcon styleType="solid" iconType="circle-notch" />
          </span>
        </span>
      ) : null}
      <span>{children}</span>
    </button>
  );
};

export { ModalSubmitButton };
