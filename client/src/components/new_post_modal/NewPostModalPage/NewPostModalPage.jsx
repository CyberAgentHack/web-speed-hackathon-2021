import React from 'react';

import { FontAwesomeIcon } from '../../foundation/FontAwesomeIcon';
import { ModalErrorMessage } from '../../modal/ModalErrorMessage';
import { ModalSubmitButton } from '../../modal/ModalSubmitButton';
import { AttachFileInputButton } from '../AttachFileInputButton';

const MAX_UPLOAD_BYTES_LIMIT = 10 * 1024 * 1024;

/**
 * @typedef {object} SubmitParams
 * @property {Array<File>} images
 * @property {File | undefined} movie
 * @property {File | undefined} sound
 * @property {string} text
 */

/**
 * @typedef {object} Props
 * @property {boolean} hasError
 * @property {boolean} isLoading
 * @property {() => void} onResetError
 * @property {(params: SubmitParams) => void} onSubmit
 */

/** @type {React.VFC<Props>} */
const NewPostModalPage = ({ hasError, isLoading, onResetError, onSubmit }) => {
  /** @type {[SubmitParams, (params: SubmitParams) => SubmitParams]} */
  const [params, setParams] = React.useState({ images: [], movie: undefined, sound: undefined, text: '' });

  const [hasFileError, setHasFileError] = React.useState(false);

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleChangeText = React.useCallback((ev) => {
    const value = ev.currentTarget.value;
    setParams((params) => ({
      ...params,
      text: value,
    }));
  }, []);

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleChangeImages = React.useCallback((ev) => {
    const files = Array.from(ev.currentTarget.files).slice(0, 4);
    const isValid = files.every((file) => file.size <= MAX_UPLOAD_BYTES_LIMIT);

    setHasFileError(isValid !== true);
    if (isValid) {
      setParams((params) => ({
        ...params,
        images: files,
        movie: undefined,
        sound: undefined,
      }));
    }
  }, []);

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleChangeSound = React.useCallback((ev) => {
    const file = ev.currentTarget.files[0];
    const isValid = file?.size <= MAX_UPLOAD_BYTES_LIMIT;

    setHasFileError(isValid !== true);
    if (isValid) {
      setParams((params) => ({
        ...params,
        images: [],
        movie: undefined,
        sound: file,
      }));
    }
  }, []);

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleChangeMovie = React.useCallback((ev) => {
    const file = ev.currentTarget.files[0];
    const isValid = file?.size <= MAX_UPLOAD_BYTES_LIMIT;

    setHasFileError(isValid !== true);
    if (isValid) {
      setParams((params) => ({
        ...params,
        images: [],
        movie: file,
        sound: undefined,
      }));
    }
  }, []);

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleSubmit = React.useCallback(
    (ev) => {
      ev.preventDefault();
      onResetError();
      onSubmit(params);
    },
    [params, onSubmit, onResetError],
  );

  return (
    <section>
      <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
        <textarea
          className="placeholder-gray-300 p-4 w-full h-24 border border-gray-300 rounded resize-none"
          onChange={handleChangeText}
          placeholder="いまなにしてる？"
        />
        <p className="flex items-center justify-evenly mt-4 w-full text-gray-900">
          <AttachFileInputButton
            accept="image/*"
            active={params.images.length !== 0}
            icon={<FontAwesomeIcon iconType="images" styleType="solid" />}
            onChange={handleChangeImages}
          />
          <AttachFileInputButton
            accept="audio/*"
            active={params.sound !== undefined}
            icon={<FontAwesomeIcon iconType="music" styleType="solid" />}
            onChange={handleChangeSound}
          />
          <AttachFileInputButton
            accept="video/*"
            active={params.movie !== undefined}
            icon={<FontAwesomeIcon iconType="video" styleType="solid" />}
            onChange={handleChangeMovie}
          />
        </p>
        <p className="mt-4">
          <ModalSubmitButton disabled={isLoading || params.text === ''} loading={isLoading}>
            投稿する
          </ModalSubmitButton>
        </p>
        <p className="mt-4">
          <ModalErrorMessage>
            {hasFileError ? '10 MB より小さくしてください' : hasError ? '投稿ができませんでした' : null}
          </ModalErrorMessage>
        </p>
      </form>
    </section>
  );
};

export { NewPostModalPage };
