import { useEffect } from 'react';
import '../styles/Modal.scss';

// Modal component - reusable dialog overlay
const Modal = ({ isOpen, onClose, title, children, type = 'info', actions }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Don't render if modal is closed
  if (!isOpen) return null;

  return (
    // Overlay - closes modal when clicked
    <div className="modal-overlay" onClick={onClose}>
      {/* Modal content - prevents close on click */}
      <div className={`modal ${type}`} onClick={e => e.stopPropagation()}>
        {/* Modal title (optional) */}
        {title && <h3 className="modal-title">{title}</h3>}
        
        {/* Modal body content (supports HTML) */}
        <div className="modal-content" dangerouslySetInnerHTML={{ __html: children }} />
        
        {/* Action buttons */}
        <div className="modal-actions">
          {actions ? (
            // Custom action buttons if provided
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
            // Default close button
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