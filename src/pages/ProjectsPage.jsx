import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProjectsFromSupabase, fetchCategoriesFromSupabase } from '../utils/supabase';

const DEFAULT_PROJECTS = [
  { id: 'proj_1', client: 'Vishwaraj Environment Ltd', location: 'Agra', capacity: '2315 KW', sector_or_type: 'STP', category_slug: 'epc' },
  { id: 'proj_2', client: 'Rana Bai Marble & Granite', location: 'Kishangarh, Ajmer', capacity: '324 KW', sector_or_type: 'Marble', category_slug: 'epc' },
  { id: 'proj_3', client: 'KGK Dia Processing', location: 'Jasdan, Rajkot', capacity: '250 KW', sector_or_type: 'Diamond', category_slug: 'epc' },
  { id: 'proj_4', client: 'Arihant Oil & Mills Ltd', location: 'Sri Ganganagar', capacity: '240 KW', sector_or_type: 'Oil', category_slug: 'epc' },
  { id: 'proj_5', client: 'Quality Marble Export', location: 'Jalore', capacity: '200 KW', sector_or_type: 'Marble', category_slug: 'epc' },
  { id: 'proj_6', client: 'Shreej Solar Solution', location: 'Surat', capacity: '1300 KW', sector_or_type: 'I&C', category_slug: 'ic_om' },
  { id: 'proj_7', client: 'Yutaka Autoparts Pvt Ltd', location: 'Bhiwadi', capacity: '736 KW', sector_or_type: 'I&C', category_slug: 'ic_om' },
  { id: 'proj_8', client: 'Krishna Ishizaki Auto Ltd', location: 'Binola', capacity: '514 KW', sector_or_type: 'I&C', category_slug: 'ic_om' },
  { id: 'proj_9', client: 'Fine Vibes Pvt Ltd', location: 'Raipur, C.G.', capacity: '500 KW', sector_or_type: 'I&C', category_slug: 'ic_om' },
  { id: 'proj_10', client: 'Green Energy', location: 'Kishangarh, Ajmer', capacity: '420 KW', sector_or_type: 'O&M', category_slug: 'ic_om' }
];

const DEFAULT_CATEGORIES = [
  { id: 'cat_1', name: 'Select EPC Clients', slug: 'epc', eyebrow: 'EPC Portfolio', description: 'A snapshot of Engineering, Procurement & Construction projects completed for industrial clients across multiple sectors.' },
  { id: 'cat_2', name: 'Select I&C / O&M Clients', slug: 'ic_om', eyebrow: 'I&C / O&M Portfolio', description: 'Industrial & Commercial installations and ongoing operation & maintenance accounts currently managed by our field teams.' }
];

export default function ProjectsPage({ onOpenQuoteModal }) {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    async function loadData() {
      // 1. Try server API
      try {
        const [projRes, catRes] = await Promise.all([
          fetch('/api/projects').catch(() => null),
          fetch('/api/categories').catch(() => null)
        ]);

        if (projRes && projRes.ok && catRes && catRes.ok) {
          const pData = await projRes.json();
          const cData = await catRes.json();
          if (pData.projects && pData.projects.length > 0) {
            setProjects(pData.projects);
          }
          if (cData.categories && cData.categories.length > 0) {
            setCategories(cData.categories);
          }
          return;
        }
      } catch (e) {}

      // 2. Try Supabase direct
      try {
        const [supCats, supProjs] = await Promise.all([
          fetchCategoriesFromSupabase().catch(() => null),
          fetchProjectsFromSupabase().catch(() => null)
        ]);

        if (supCats && supCats.length > 0) {
          setCategories(supCats.map(c => ({
            id: 'cat_' + c.id,
            name: c.name || (c.slug === 'epc' ? 'Select EPC Clients' : 'Select I&C / O&M Clients'),
            slug: c.slug,
            eyebrow: (c.name || '').includes('Portfolio') ? c.name : (c.slug === 'epc' ? 'EPC Portfolio' : 'I&C / O&M Portfolio'),
            description: c.description || (c.slug === 'epc' 
              ? 'A snapshot of Engineering, Procurement & Construction projects completed for industrial clients across multiple sectors.' 
              : 'Industrial & Commercial installations and ongoing operation & maintenance accounts currently managed by our field teams.')
          })));
        }

        if (supProjs && supProjs.length > 0) {
          setProjects(supProjs.map(p => ({
            id: 'proj_' + p.id,
            client: p.client,
            location: p.location,
            capacity: p.capacity,
            sector_or_type: p.sector_or_type,
            category_slug: (p.categories && p.categories.slug) ? p.categories.slug : (p.category_id === 1 ? 'epc' : 'ic_om')
          })));
        }
      } catch (err) {}
    }

    loadData();
  }, []);

  const filteredProjects = projects.filter(p => {
    const matchesSearch = !search || 
      p.client.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.capacity.toLowerCase().includes(search.toLowerCase()) ||
      p.sector_or_type.toLowerCase().includes(search.toLowerCase());

    const matchesCat = activeCategory === 'all' || p.category_slug === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <main>
      
      {/* ============ PAGE HERO ============ */}
      <section className="page-hero">
        <video autoPlay loop muted playsInline className="page-hero-video">
          <source src="/assets/covervideo.mp4" type="video/mp4" />
        </video>
        <div className="page-hero-overlay"></div>
        <div className="container">
          <div className="breadcrumb"><Link to="/home">Home</Link> / Projects</div>
          <span className="eyebrow on-dark">Portfolio</span>
          <h1>Our EPC &amp; I&amp;C Projects</h1>
          <p>
            500+ EPC projects and 150+ Industrial &amp; Commercial / O&amp;M projects, spanning marble, oil, diamond processing, automotive, STP and renewable sectors across India.
          </p>
        </div>
      </section>

      {/* ============ PORTFOLIO NUMBERS ============ */}
      <section className="section">
        <div className="container">
          <div className="stats-strip">
            <div className="stat-block">
              <div className="num">500<span>+</span></div>
              <div className="cap">EPC Projects</div>
              <div className="sub">Engineering, Procurement &amp; Construction projects delivered nationwide.</div>
            </div>
            <div className="stat-block">
              <div className="num">150<span>+</span></div>
              <div className="cap">I&amp;C / O&amp;M Projects</div>
              <div className="sub">Industrial &amp; Commercial installations under active operation &amp; maintenance.</div>
            </div>
            <div className="stat-block">
              <div className="num">150<span>+</span></div>
              <div className="cap">MW Managed</div>
              <div className="sub">Total solar capacity under management across 13 Indian states.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SEARCH & FILTER BAR ============ */}
      <div className="container" style={{ marginBottom: '24px' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#FFFFFF',
          border: '1px solid var(--sage-line)',
          borderRadius: '6px',
          padding: '16px 20px',
          boxShadow: '0 2px 8px rgba(14,44,34,0.04)'
        }}>
          <div style={{ display: 'flex', gap: '12px', flex: '1 1 300px', alignItems: 'center' }}>
            <input 
              type="text" 
              placeholder="Search by client, location, or sector..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: '1',
                padding: '10px 14px',
                border: '1px solid var(--sage-line)',
                borderRadius: '4px',
                fontSize: '14px',
                outline: 'none',
                fontFamily: 'var(--body)'
              }}
            />
            <select 
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              style={{
                padding: '10px 14px',
                border: '1px solid var(--sage-line)',
                borderRadius: '4px',
                fontSize: '14px',
                outline: 'none',
                background: '#FFFFFF',
                fontFamily: 'var(--body)',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Categories</option>
              {categories.map(c => (
                <option key={c.id} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            style={{ padding: '10px 22px', fontSize: '13.5px' }}
            onClick={() => onOpenQuoteModal(
              "Project Feasibility Inquiry",
              "Request an engineering assessment for your upcoming solar project."
            )}
          >
            Request Custom Proposal
          </button>
        </div>
      </div>

      {/* ============ CLIENT TABLES BY CATEGORY ============ */}
      {categories
        .filter(cat => activeCategory === 'all' || cat.slug === activeCategory)
        .map((cat, idx) => {
          const catProjects = filteredProjects.filter(p => p.category_slug === cat.slug);
          if (catProjects.length === 0 && activeCategory !== 'all') return null;

          return (
            <section key={cat.id} className={`section ${idx % 2 === 0 ? 'section-sage' : ''}`}>
              <div className="container">
                <div className="section-head">
                  <span className="eyebrow">{cat.eyebrow || cat.name}</span>
                  <h2>{cat.name}</h2>
                  <p>{cat.description}</p>
                </div>

                <div className="table-wrap">
                  <div className="table-scroll">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Client</th>
                          <th>Location</th>
                          <th>Capacity</th>
                          <th>Sector</th>
                        </tr>
                      </thead>
                      <tbody>
                        {catProjects.length > 0 ? (
                          catProjects.map(proj => (
                            <tr key={proj.id}>
                              <td><strong>{proj.client}</strong></td>
                              <td>{proj.location}</td>
                              <td className="cap-col">{proj.capacity}</td>
                              <td>{proj.sector_or_type}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" style={{ textAlign: 'center', padding: '32px', color: 'var(--ink-soft)' }}>
                              No matching projects found in this category.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

      {/* ============ CTA BAND ============ */}
      <section className="section section-tight section-sage">
        <div className="container">
          <div className="cta-band">
            <div>
              <h3>Have a solar project in mind?</h3>
              <p>Speak with our senior solar engineers for a zero-cost feasibility study and subsidy calculation.</p>
            </div>
            <div className="cta-band-actions">
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => onOpenQuoteModal(
                  "Get a Free Project Quote",
                  "Share your facility details. Our engineering team will prepare a customized proposal."
                )}
              >
                Get a Free Quote
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
