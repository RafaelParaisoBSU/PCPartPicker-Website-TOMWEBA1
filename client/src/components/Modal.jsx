import { useEffect } from 'react';
import '../styles/Modal.scss';

const Modal = ({ isOpen, onClose, title, children, type = 'info', actions }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal ${type}`} onClick={e => e.stopPropagation()}>
        {title && <h3 className="modal-title">{title}</h3>}
        <div className="modal-content" dangerouslySetInnerHTML={{ __html: children }} />
        <div className="modal-actions">
          {actions ? (
            actions.map((action, index) => (
              <button
                key={index}
                className={`modal-button ${action.primary ? 'primary' : 'secondary'}`}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ))
          ) : (
            <button className="modal-button secondary" onClick={onClose}>
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;