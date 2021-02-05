import React from 'react';
import { Link } from 'react-router-dom';

import { ModalErrorMessage } from '../../modal/ModalErrorMessage';
import { ModalSubmitButton } from '../../modal/ModalSubmitButton';
import { AuthInput } from '../AuthInput';

/**
 * @typedef {object} SubmitParams
 * @property {'signin' | 'signup'} type
 * @property {string} username
 * @property {string} name
 * @property {string} password
 */

/**
 * @typedef {object} Props
 * @property {(params: SubmitParams) => void} onSubmit
 * @property {() => void} onResetError
 * @property {boolean} isLoading
 * @property {boolean} hasError
 */

/** @type {React.VFC<Props>} */
const AuthModalPage = ({ onSubmit, onResetError, isLoading, hasError }) => {
  /** @type {[SubmitParams, (params: SubmitParams) => void] */
  const [params, setParams] = React.useState({ type: 'signin', username: '', name: '', password: '' });

  const handleToggleType = React.useCallback(() => {
    onResetError();
    setParams((params) => ({ ...params, type: params.type === 'signin' ? 'signup' : 'signin' }));
  }, [onResetError]);

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleChangeUsername = React.useCallback((ev) => {
    const value = ev.currentTarget.value;
    setParams((params) => ({ ...params, username: value }));
  }, []);

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleChangeName = React.useCallback((ev) => {
    const value = ev.currentTarget.value;
    setParams((params) => ({ ...params, name: value }));
  }, []);

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleChangePassword = React.useCallback((ev) => {
    const value = ev.currentTarget.value;
    setParams((params) => ({ ...params, password: value }));
  }, []);

  const handleSubmit = React.useCallback(() => {
    onResetError();
    onSubmit(params);
  }, [params, onSubmit, onResetError]);

  const isFilled = params.username && params.password && (params.type === 'signup' ? params.name : true);

  return (
    <section className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-bold">{params.type === 'signin' ? 'サインイン' : '新規登録'}</h2>
      <p className="mt-4">
        <button className="text-green-600 underline" type="button" onClick={handleToggleType}>
          {params.type === 'signin' ? '初めての方はこちら' : 'サインインはこちら'}
        </button>
      </p>
      <div className="mt-8">
        <AuthInput label="ユーザー名" onChange={handleChangeUsername} />
      </div>
      {params.type === 'signup' ? (
        <div className="mt-4">
          <AuthInput label="名前" onChange={handleChangeName} />
        </div>
      ) : null}
      <div className="mt-4">
        <AuthInput label="パスワード" onChange={handleChangePassword} />
      </div>
      {params.type === 'signup' ? (
        <p className="mt-4">
          <Link className="text-green-600 underline" to="/terms">
            利用規約
          </Link>
          に同意して
        </p>
      ) : null}
      <p className="mt-4">
        <ModalSubmitButton disabled={isLoading || !isFilled} loading={isLoading} onClick={handleSubmit}>
          {params.type === 'signin' ? 'サインイン' : '登録する'}
        </ModalSubmitButton>
      </p>
      <p className="mt-4">
        <ModalErrorMessage>
          {hasError ? (params.type === 'signin' ? 'パスワードが異なります' : 'ユーザー名が使われています') : null}
        </ModalErrorMessage>
      </p>
    </section>
  );
};

export { AuthModalPage };
