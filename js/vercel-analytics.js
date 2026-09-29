/**
 * Vercel Web Analytics Integration
 * This script initializes Vercel Analytics for tracking page views and web vitals
 */

(function() {
  // Initialize the Vercel Analytics queue
  window.va = window.va || function () {
    (window.vaq = window.vaq || []).push(arguments);
  };
})();
