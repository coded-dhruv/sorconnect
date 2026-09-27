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
  { id: 'cat_1', name: 'EPC Portfolio', slug: 'epc', eyebrow: 'EPC Portfolio', description: 'A snapshot of Engineering, Procurement & Construction projects completed for industrial clients across multiple sectors.' },
  { id: 'cat_2', name: 'I&C / O&M Portfolio', slug: 'ic_om', eyebrow: 'I&C / O&M Portfolio', description: 'Industrial & Commercial installations and ongoing operation & maintenance accounts currently managed by our field teams.' }
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
            name: c.name,
            slug: c.slug,
            eyebrow: c.name,
            description: c.slug === 'epc' ? 'A snapshot of Engineering, Procurement & Construction projects completed for industrial clients across multiple sectors.' : 'Industrial & Commercial installations and ongoing operation & maintenance accounts currently managed by our field teams.'
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
    <main className="projects-page-main">
      
      {/* Page Hero */}
      <section className="page-hero">
        <video autoPlay loop muted playsInline className="page-hero-video">
          <source src="/assets/covervideo.mp4" type="video/mp4" />
        </video>
        <div className="page-hero-overlay"></div>
        <div className="container">
          <div className="breadcrumb"><Link to="/home">Home</Link> / Projects</div>
          <span className="eyebrow on-dark">Track Record of Excellence</span>
          <h1>Our EPC &amp; I&amp;C Projects</h1>
          <p>500+ EPC projects and 150+ Industrial &amp; Commercial / O&amp;M projects, spanning marble, oil, diamond processing, automotive, STP and renewable sectors across India.</p>
        </div>
      </section>

      {/* Portfolio Stats Strip */}
      <section className="section section-tight section-sage">
        <div className="container">
          <div className="stats-row center">
            <div className="stat-card">
              <span className="stat-num">500+</span>
              <span className="stat-label">EPC Projects</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">150+</span>
              <span className="stat-label">I&amp;C / O&amp;M Projects</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">150+</span>
              <span className="stat-label">MW Portfolio</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">13</span>
              <span className="stat-label">States Across India</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Tables & Filters */}
      <section className="section">
        <div className="container">
          
          {/* Controls Bar */}
          <div className="admin-control-bar" style={{ marginBottom: '32px' }}>
            <div className="control-bar-left">
              <div className="search-input-box" style={{ maxWidth: '340px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input 
                  type="text" 
                  placeholder="Search client, location, or sector..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <select 
                className="admin-filter-select"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(c => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="control-bar-right">
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={onOpenQuoteModal}
              >
                Request Custom Proposal
              </button>
            </div>
          </div>

          {/* Grouped by Categories */}
          {categories
            .filter(cat => activeCategory === 'all' || cat.slug === activeCategory)
            .map(cat => {
              const catProjects = filteredProjects.filter(p => p.category_slug === cat.slug);
              if (catProjects.length === 0 && activeCategory !== 'all') return null;

              return (
                <div key={cat.id} className="category-project-block" style={{ marginBottom: '56px' }}>
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
                            <th>Sector / Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {catProjects.length > 0 ? (
                            catProjects.map(p => (
                              <tr key={p.id}>
                                <td style={{ fontWeight: 600 }}>{p.client}</td>
                                <td>{p.location}</td>
                                <td className="cap-col">{p.capacity}</td>
                                <td><span className="bill-badge">{p.sector_or_type}</span></td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4" style={{ textAlign: 'center', color: 'var(--ink-soft)', padding: '24px' }}>
                                No matching projects found in this category.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })}

        </div>
      </section>

      {/* CTA Band */}
      <section className="section section-tight">
        <div className="container">
          <div className="cta-band">
            <div>
              <h3>Want your project on this list?</h3>
              <p>Join 650+ industrial, commercial and agricultural clients who already trust Sor Connect with their solar investment.</p>
            </div>
            <div className="cta-band-actions">
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={onOpenQuoteModal}
              >
                Start Your Project
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
