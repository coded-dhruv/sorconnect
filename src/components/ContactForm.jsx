import React, { useState } from 'react';
import { saveSubmissionToSupabase } from '../utils/supabase';

export default function ContactForm({ 
  formId = 'contact-form', 
  title, 
  subtitle, 
  buttonText = 'Get Free Proposal',
  subject = 'New Solar Quote Inquiry - Sor Connect',
  onSuccess 
}) {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    monthly_bill: '',
    pincode: '',
    note: '',
    agree_terms: true
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setStatus({ submitting: false, success: false, error: 'Please enter your full name.' });
      return;
    }

    const waDigits = formData.whatsapp.replace(/\D/g, '');
    if (waDigits.length < 10) {
      setStatus({ submitting: false, success: false, error: 'Please enter a valid 10-digit WhatsApp number.' });
      return;
    }

    if (!formData.monthly_bill) {
      setStatus({ submitting: false, success: false, error: 'Please select your average monthly electricity bill.' });
      return;
    }

    const pinDigits = formData.pincode.replace(/\D/g, '');
    if (pinDigits.length !== 6) {
      setStatus({ submitting: false, success: false, error: 'Please enter a valid 6-digit PIN code.' });
      return;
    }

    setStatus({ submitting: true, success: false, error: '' });

    const submissionPayload = {
      ...formData,
      subject: subject,
      source_url: typeof window !== 'undefined' ? window.location.href : ''
    };

    // 1. Post to local server API if running
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionPayload)
      });
    } catch (err) {
      // Backend optional
    }

    // 2. Post to Supabase database
    await saveSubmissionToSupabase(submissionPayload);

    setStatus({
      submitting: false,
      success: true,
      error: ''
    });

    setFormData({
      name: '',
      whatsapp: '',
      monthly_bill: '',
      pincode: '',
      note: '',
      agree_terms: true
    });

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form className="contact-form" id={formId} onSubmit={handleSubmit} style={{ padding: 0, border: 'none' }}>
      {title && <h3 style={{ fontSize: '22px', marginBottom: '6px' }}>{title}</h3>}
      {subtitle && <p style={{ fontSize: '14px', color: 'var(--ink-soft)', marginBottom: '24px' }}>{subtitle}</p>}

      <div className="form-two">
        <div className="form-row">
          <label htmlFor={`${formId}-name`}>Name <span className="req">*</span></label>
          <input 
            type="text" 
            id={`${formId}-name`} 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name" 
            required 
          />
        </div>
        <div className="form-row">
          <label htmlFor={`${formId}-whatsapp`}>WhatsApp Number <span className="req">*</span></label>
          <input 
            type="tel" 
            id={`${formId}-whatsapp`} 
            name="whatsapp" 
            value={formData.whatsapp}
            onChange={handleChange}
            placeholder="10-digit WhatsApp number" 
            required 
            pattern="[0-9]{10}" 
            maxLength="10" 
          />
        </div>
      </div>

      <div className="form-two">
        <div className="form-row">
          <label htmlFor={`${formId}-bill`}>Monthly Electricity Bill <span className="req">*</span></label>
          <select 
            id={`${formId}-bill`} 
            name="monthly_bill" 
            value={formData.monthly_bill}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Monthly Bill</option>
            <option value="Under ₹1500">Under ₹1500</option>
            <option value="₹1500-₹2000">₹1500 - ₹2000</option>
            <option value="₹2500-₹4000">₹2500 - ₹4000</option>
            <option value="₹4000-₹8000">₹4000 - ₹8000</option>
            <option value="More than ₹8000">More than ₹8000</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor={`${formId}-pincode`}>PIN Code <span className="req">*</span></label>
          <input 
            type="text" 
            id={`${formId}-pincode`} 
            name="pincode" 
            value={formData.pincode}
            onChange={handleChange}
            placeholder="6-digit PIN code" 
            required 
            pattern="[0-9]{6}" 
            maxLength="6" 
          />
        </div>
      </div>

      <div className="form-row">
        <label htmlFor={`${formId}-note`}>Additional Note <span className="opt">(Optional)</span></label>
        <textarea 
          id={`${formId}-note`} 
          name="note" 
          rows="2" 
          value={formData.note}
          onChange={handleChange}
          placeholder="Tell us about your rooftop area, connection type, or any specific questions..."
        ></textarea>
      </div>

      <div className="form-terms-row">
        <label className="terms-label">
          <input 
            type="checkbox" 
            name="agree_terms" 
            checked={formData.agree_terms} 
            required 
            onChange={() => {}} 
            onClick={(e) => e.preventDefault()} 
          />
          <span className="terms-text">
            I agree to the <a href="/terms" target="_blank" rel="noreferrer" className="terms-link">Terms of Use</a> &amp; <a href="/privacy" target="_blank" rel="noreferrer" className="terms-link">Privacy Policy</a> and authorize Sor Connect to contact me via WhatsApp/Call.
          </span>
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-block" disabled={status.submitting}>
        {status.submitting ? 'Sending...' : (status.success ? '✓ Inquiry Sent' : buttonText)}
      </button>

      {status.error && (
        <p className="form-note" style={{ display: 'block', marginTop: '14px', fontSize: '13.5px', color: '#D90429', fontWeight: '600' }}>
          {status.error}
        </p>
      )}

      {status.success && (
        <p className="form-note" style={{ display: 'block', marginTop: '14px', fontSize: '13.5px', color: 'var(--leaf)', fontWeight: '600' }}>
          ✓ Thank you! We received your request. An engineer will reach out on WhatsApp within 24 hours.
        </p>
      )}
    </form>
  );
}
