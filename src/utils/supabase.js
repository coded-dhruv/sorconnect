export const SUPABASE_URL = 'https://znjpzipedsowuyrpotgb.supabase.co';
export const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuanB6aXBlZHNvd3V5cnBvdGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwODU5MzIsImV4cCI6MjEwMTY2MTkzMn0.CO9Bvyiio-b2_OFDTyTd1jzGZ13Ezjl7oPwgIVciJxs';

export async function fetchCategoriesFromSupabase() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/categories?select=*&order=id.asc`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });
  if (!res.ok) throw new Error('Failed to fetch categories from Supabase');
  return res.json();
}

export async function fetchProjectsFromSupabase() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/projects?select=*,categories(*)&order=id.asc`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });
  if (!res.ok) throw new Error('Failed to fetch projects from Supabase');
  return res.json();
}

export async function saveSubmissionToSupabase(submission) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/submissions`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify([{
        name: submission.name,
        whatsapp: submission.whatsapp,
        monthly_bill: submission.monthly_bill,
        pincode: submission.pincode,
        note: submission.note || '',
        status: submission.status || 'New',
        subject: submission.subject || 'Solar Inquiry',
        source_url: submission.source_url || window.location.href
      }])
    });
    return res.ok;
  } catch (err) {
    console.warn('Supabase submission error:', err);
    return false;
  }
}

export async function fetchSubmissionsFromSupabase() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/submissions?select=*&order=created_at.desc`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });
  if (!res.ok) throw new Error('Failed to fetch submissions from Supabase');
  return res.json();
}
