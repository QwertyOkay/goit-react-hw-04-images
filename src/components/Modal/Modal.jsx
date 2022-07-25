import { BackDrop, ModalWindow } from './styled.module';
import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';

const Modal = ({ data: { tags, largeImageURL }, close }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        close();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    console.log();
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [close]);

  const handleBackdropclick = e => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  return (
    <BackDrop className="overlay" onClick={handleBackdropclick}>
      <ModalWindow className="modal">
        <img src={largeImageURL} alt={tags} width="1000" />
      </ModalWindow>
    </BackDrop>
  );
};

export default Modal;

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  data: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
