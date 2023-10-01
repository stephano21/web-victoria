import React from 'react';

interface AlertProps {
  type: 'success' | 'warning' | 'error';
  message: string;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const alertClassName = `alert alert-${type}`;

  return (
    <div className={alertClassName} role="alert">
      {message}
      {onClose && (
        <button
          type="button"
          className="btn-close"
          onClick={onClose}
          aria-label="Cerrar"
        ></button>
      )}
    </div>
  );
};
