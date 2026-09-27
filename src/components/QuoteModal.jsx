import React from 'react';
import ContactForm from './ContactForm';

export default function QuoteModal({ isOpen, onClose, title, subtitle }) {
  if (!isOpen) return null;

  return (
    <div 
      className="quote-modal-overlay active" 
      role="dialog" 
      aria-modal="true"
      onClick={(e) => {
        if (e.target.classList.contains('quote-modal-overlay')) {
          onClose();
        }
      }}
    >
      <div className="quote-modal-container">
        <button 
          type="button" 
          className="quote-modal-close" 
          aria-label="Close modal"
          onClick={onClose}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
        
        <div className="quote-modal-header">
          <div className="quote-modal-badge">⚡ Instant Solar Assessment</div>
          <h3 className="quote-modal-title">{title || 'Get a Free Solar Quote'}</h3>
          <p className="quote-modal-desc">
            {subtitle || 'Share your details and monthly bill. Our engineers will prepare a customized zero-cost feasibility study and subsidy estimate.'}
          </p>
        </div>

        <ContactForm 
          formId="quote-modal-form"
          buttonText="Get Free Proposal"
          onSuccess={() => {
            setTimeout(() => {
              onClose();
            }, 2500);
          }}
        />
      </div>
    </div>
  );
}
