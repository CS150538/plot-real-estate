import { useEffect, useState } from "react";

/* ── Local image assets (src/assets/) ── */
import img1 from "../assets/img1.jpeg"; // road inside layout with trees
import img10 from "../assets/img10.jpeg"; // green grass plots with large tree
import img11 from "../assets/img11.jpeg"; // fenced plots with trees at dusk
import img2 from "../assets/img2.jpeg"; // entrance gate from main road
import img3 from "../assets/img3.jpeg"; // gate close-up
import img4 from "../assets/img4.jpeg"; // Gardens signboard
import img5 from "../assets/img5.jpeg"; // demarcated plots – orange-top posts front
import img6 from "../assets/img6.jpeg"; // demarcated plots – wider view
import img7 from "../assets/img7.jpeg"; // plots side angle
import img8 from "../assets/img8.jpeg"; // long internal road at dusk
import img9 from "../assets/img9.jpeg"; // straight road through trees

/* ── DATA ── */
const NAV_LINKS = ["Properties", "Gallery", "Services", "About", "Locations", "Contact"];

/* NOTE: property img values are assigned after imports are in scope — see PROPERTIES_DATA below */

/* Properties use local asset imports — defined as a function so imports are in scope */
const getProperties = () => [
  { id:1, title:"Open Plot — Fortune City",  location:"Rachloor, Maheshwaram, Ranga Reddy", area:"Various Sizes", type:"Open Plot",  tag:"Available", highlight:"DTCP Approved",    img:img5  },
  { id:2, title:"Corner Plot — Fortune City",location:"Rachloor, Maheshwaram, Ranga Reddy", area:"Various Sizes", type:"Open Plot",  tag:"Hot",       highlight:"Corner Plot",       img:img6  },
  { id:3, title:"Villa Plot — Fortune City", location:"Rachloor, Maheshwaram, Ranga Reddy", area:"Various Sizes", type:"Villa Plot", tag:"New",       highlight:"Premium Layout",    img:img10 },
  { id:4, title:"Green View Plot",           location:"Rachloor, Maheshwaram",               area:"Various Sizes", type:"Villa Plot", tag:"Featured",  highlight:"Gated Community",   img:img11 },
  { id:5, title:"Road-Facing Open Plot",     location:"Kadthal, Maheshwaram",               area:"Various Sizes", type:"Open Plot",  tag:"Available", highlight:"Road Facing",       img:img2  },
  { id:6, title:"Layout Entry Plot",         location:"Rachloor, Ranga Reddy",              area:"Various Sizes", type:"Open Plot",  tag:"Hot",       highlight:"Near Entrance",     img:img3  },
];

const getGallery = () => [
  { img:img1,  caption:"Internal Roads — Fortune City Layout"  },
  { img:img2,  caption:"Main Entrance Gate — Rachloor"         },
  { img:img3,  caption:"Layout Gate View"                       },
  { img:img5,  caption:"Demarcated Open Plots"                  },
  { img:img6,  caption:"Plot Layout — Wide View"                },
  { img:img7,  caption:"Plot Layout — Side View"                },
  { img:img8,  caption:"Long Internal Road at Dusk"             },
  { img:img9,  caption:"Tree-Lined Internal Road"               },
  { img:img10, caption:"Green Plots with Mature Trees"          },
  { img:img11, caption:"Fenced Plots — Evening View"            },
  { img:img4,  caption:"Fortune City — Signboard"               },
];

const services = [
  { icon:"🏞", title:"Open Plot Sales & Purchase",  desc:"Specialists in sale and purchase of open plots in Rachloor and surrounding areas. Verified, legally clear, and ready for immediate registration." },
  { icon:"🏡", title:"Villa Plot Sales & Purchase", desc:"Premium villa plots in gated layouts with modern infrastructure and clear titles, available across all our active locations." },
  { icon:"🏠", title:"Villa Sales & Purchase",      desc:"Ready-to-move-in villas in Rachloor — beautifully constructed to suit every budget. Site visits arranged at your convenience." },
];

const highlights = [
  ["🕐","24/7 Availability"],["✅","Zero Brokerage"],["🛡","Trusted Team"],
  ["📋","Wide Range"],["💰","Affordable Pricing"],["🤝","Expert Guidance"],
];

const locations = ["Rachloor","Kadthal","Maheshwaram","Amangal","Tukuguda","Srisailam Highway"];
const FILTERS   = ["All","Open Plot","Villa Plot"];

/* ── MAIN COMPONENT ── */
export default function ChalapathiFortune() {
  const [dark,      setDark]      = useState(false);
  const [filter,    setFilter]    = useState("All");
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [lightbox,  setLightbox]  = useState(null);
  const [form,      setForm]      = useState({ name:"", phone:"", email:"" });
  const [submitted, setSubmitted] = useState(false);

  /* initialise data using asset imports */
  const properties = getProperties();
  const gallery    = getGallery();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = e => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const filtered  = filter === "All" ? properties : properties.filter(p => p.type === filter);

  /* ── theme ── */
  const G  = "#1e6b3c";
  const GL = dark ? "#1a3a28" : "#dcf5e7";
  const GT = dark ? "#4ade80" : "#166534";

  const T = {
    bg:      dark ? "#0d1610" : "#f2f6f3",
    surface: dark ? "#131e16" : "#ffffff",
    card:    dark ? "#182218" : "#ffffff",
    raised:  dark ? "#1e2d20" : "#f7faf8",
    text:    dark ? "#e2ece5" : "#0e1f12",
    sub:     dark ? "#74957d" : "#4a6655",
    border:  dark ? "#243427" : "#d5e6db",
    navBg:   dark ? "rgba(13,22,16,0.97)" : "rgba(242,246,243,0.97)",
    pill:    dark ? "#1e2d20" : "#e3ede7",
    tagMap: {
      Available:{ bg:dark?"#1a3a28":"#dcfce7", c:dark?"#4ade80":"#166534" },
      Hot:      { bg:dark?"#3a1a1a":"#fee2e2", c:dark?"#f87171":"#b91c1c" },
      New:      { bg:dark?"#1a2a4a":"#dbeafe", c:dark?"#60a5fa":"#1d4ed8" },
      Featured: { bg:dark?"#2a2010":"#fef3c7", c:dark?"#fbbf24":"#92400e" },
    },
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div style={{ background:T.bg, color:T.text, fontFamily:"'DM Sans','Helvetica Neue',sans-serif", minHeight:"100vh", overflowX:"hidden", transition:"background 0.3s,color 0.3s" }}>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lb-close" onClick={e => { e.stopPropagation(); setLightbox(null); }}>✕</button>
          <button className="lb-arrow lb-prev" onClick={e => { e.stopPropagation(); setLightbox((lightbox - 1 + gallery.length) % gallery.length); }}>‹</button>
          <div className="lb-img-wrap" onClick={e => e.stopPropagation()}>
            <img src={gallery[lightbox].img} alt={gallery[lightbox].caption} />
            <div style={{ color:"rgba(255,255,255,0.7)", fontSize:13, marginTop:10, textAlign:"center", fontFamily:"'DM Sans',sans-serif" }}>{gallery[lightbox].caption}</div>
            <div style={{ color:"rgba(255,255,255,0.38)", fontSize:11, marginTop:4, textAlign:"center" }}>{lightbox + 1} / {gallery.length}</div>
          </div>
          <button className="lb-arrow lb-next" onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % gallery.length); }}>›</button>
        </div>
      )}

      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet"/>

      <style>{`
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { overflow-x:hidden; }
        a    { text-decoration:none; color:inherit; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .a1{animation:fadeUp 0.55s 0.10s both}
        .a2{animation:fadeUp 0.55s 0.22s both}
        .a3{animation:fadeUp 0.55s 0.34s both}
        .a4{animation:fadeUp 0.55s 0.46s both}

        /* ── Universal image rule: NEVER overflow its container ── */
        img { display:block; max-width:100%; height:auto; }

        /* ── Property cards ── */
        .prop-card { transition:transform 0.22s,box-shadow 0.22s; }
        .prop-card:hover { transform:translateY(-5px); box-shadow:0 20px 48px rgba(0,0,0,0.13); }
        /* img wrapper inside card: fixed height, clips overflow */
        .prop-img-wrap {
          width:100%; height:210px;
          overflow:hidden; position:relative; flex-shrink:0;
        }
        .prop-img-wrap img {
          width:100%; height:100%;
          object-fit:cover; object-position:center;
          display:block; transition:transform 0.45s;
        }
        .prop-card:hover .prop-img-wrap img { transform:scale(1.07); }

        /* ── Hero collage cells ── */
        .collage-cell {
          position:relative; overflow:hidden; border-radius:18px; width:100%;
        }
        .collage-cell img {
          width:100%; height:100%;
          object-fit:cover; object-position:center; display:block;
        }

        /* ── About image ── */
        .about-img-wrap {
          position:relative; width:100%; border-radius:18px;
          overflow:hidden; height:420px;
        }
        .about-img-wrap img {
          width:100%; height:100%;
          object-fit:cover; object-position:center; display:block;
        }

        /* ── Gallery grid ── */
        .gal-cell {
          position:relative; overflow:hidden; border-radius:13px;
          cursor:pointer; transition:transform 0.2s,box-shadow 0.2s;
          background:#e8e8e8;
        }
        .gal-cell:hover { transform:scale(1.02); box-shadow:0 12px 32px rgba(0,0,0,0.18); }
        .gal-cell img {
          width:100%; height:100%;
          object-fit:cover; object-position:center; display:block;
          transition:transform 0.4s;
        }
        .gal-cell:hover img { transform:scale(1.06); }
        .gal-overlay {
          position:absolute; bottom:0; left:0; right:0;
          background:linear-gradient(transparent,rgba(0,0,0,0.55));
          padding:24px 12px 10px;
          opacity:0; transition:opacity 0.25s;
        }
        .gal-cell:hover .gal-overlay { opacity:1; }

        /* ── Lightbox ── */
        .lightbox {
          position:fixed; inset:0; background:rgba(0,0,0,0.93);
          z-index:1000; display:flex; align-items:center;
          justify-content:center; padding:20px;
        }
        .lb-img-wrap {
          max-width:90vw; max-height:86vh;
          display:flex; align-items:center; justify-content:center;
        }
        .lb-img-wrap img {
          max-width:90vw; max-height:82vh;
          width:auto; height:auto;
          object-fit:contain; border-radius:10px; display:block;
        }
        .lb-close {
          position:fixed; top:16px; right:20px;
          background:rgba(255,255,255,0.15); border:none; color:#fff;
          width:40px; height:40px; border-radius:50%; cursor:pointer;
          font-size:18px; display:flex; align-items:center; justify-content:center;
          transition:background 0.2s; z-index:1001;
        }
        .lb-close:hover { background:rgba(255,255,255,0.28); }
        .lb-arrow {
          position:fixed; top:50%; transform:translateY(-50%);
          background:rgba(255,255,255,0.15); border:none; color:#fff;
          width:46px; height:46px; border-radius:50%; cursor:pointer;
          font-size:22px; display:flex; align-items:center; justify-content:center;
          transition:background 0.2s; z-index:1001;
        }
        .lb-arrow:hover { background:rgba(255,255,255,0.28); }
        .lb-prev { left:16px; }
        .lb-next { right:16px; }

        /* ── Service cards ── */
        .svc-card { transition:transform 0.2s,box-shadow 0.2s; }
        .svc-card:hover { transform:translateY(-4px); box-shadow:0 14px 36px rgba(0,0,0,0.1); }

        /* ── Buttons ── */
        .btn-g { background:${G}; color:#fff; border:none; cursor:pointer; font-family:inherit; transition:background 0.2s,transform 0.1s; }
        .btn-g:hover { background:#155d33; }
        .btn-g:active { transform:scale(0.98); }
        .btn-outline { background:transparent; cursor:pointer; font-family:inherit; transition:all 0.2s; }
        .filter-pill { cursor:pointer; border:none; font-family:inherit; transition:all 0.18s; }
        .nav-lnk { transition:color 0.15s; }
        .nav-lnk:hover { color:${G} !important; }

        input,textarea,select { outline:none; font-family:inherit; transition:border-color 0.2s,box-shadow 0.2s; }
        input:focus,textarea:focus,select:focus { border-color:${G} !important; box-shadow:0 0 0 3px rgba(30,107,60,0.15); }

        /* ══ RESPONSIVE ══ */

        /* tablet ≤ 1024 */
        @media(max-width:1024px){
          .hero-grid    { grid-template-columns:1fr !important; }
          .hero-collage { display:none !important; }
          .about-grid   { grid-template-columns:1fr !important; }
          .about-float  { left:0 !important; bottom:-14px !important; }
          .contact-grid { grid-template-columns:1fr !important; }
          .footer-grid  { grid-template-columns:1fr 1fr !important; }
          .gal-grid     { grid-template-columns:repeat(2,1fr) !important; }
        }

        /* mobile ≤ 768 */
        @media(max-width:768px){
          .desktop-nav    { display:none !important; }
          .mobile-nav-btn { display:flex !important; }
          .stats-grid     { grid-template-columns:repeat(2,1fr) !important; }
          .stats-divider  { border-right:none !important; border-bottom:1px solid rgba(255,255,255,0.18) !important; }
          .services-grid  { grid-template-columns:1fr !important; }
          .hi-grid        { grid-template-columns:1fr 1fr !important; }
          .hero-actions   { flex-direction:column !important; }
          .props-grid     { grid-template-columns:1fr !important; }
          .footer-grid    { grid-template-columns:1fr !important; }
          .filter-row     { flex-direction:column !important; align-items:flex-start !important; }
          .form-row       { grid-template-columns:1fr !important; }
          .footer-bottom  { flex-direction:column !important; text-align:center !important; }
          .gal-grid       { grid-template-columns:1fr !important; }
        }

        /* small mobile ≤ 480 */
        @media(max-width:480px){
          .sec      { padding:52px 4% !important; }
          .hero-sec { padding-top:88px !important; padding-bottom:52px !important; padding-left:4% !important; padding-right:4% !important; }
          .hi-grid  { grid-template-columns:1fr !important; }
          .trust-row{ flex-direction:column !important; gap:8px !important; }
          .about-img-wrap { height:260px !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════
          FIXED HEADER / NAVBAR
      ══════════════════════════════════════════ */}
      <header style={{
        position:"fixed", top:0, left:0, right:0, zIndex:400,
        background:T.navBg, backdropFilter:"blur(18px)",
        borderBottom:`1px solid ${scrolled ? T.border : "transparent"}`,
        transition:"border-color 0.3s",
      }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 5%", height:66, display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>

          {/* ── Logo ── */}
          <a href="#" style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
            <div style={{ width:38, height:38, background:G, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:19, flexShrink:0 }}>C</div>
            <div>
              <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:16, color:T.text, lineHeight:1.15, whiteSpace:"nowrap", letterSpacing:-0.2 }}>Chalapathi Fortune City</div>
              <div style={{ fontSize:8, letterSpacing:2, color:T.sub, fontWeight:600 }}>RACHLOOR · REAL ESTATE</div>
            </div>
          </a>

          {/* ── Desktop navigation ── */}
          <nav className="desktop-nav" style={{ display:"flex", alignItems:"center", gap:2, flexShrink:0 }}>
            {NAV_LINKS.map(n => (
              <a key={n} href={`#${n.toLowerCase()}`} className="nav-lnk"
                style={{ color:T.sub, fontSize:14, padding:"6px 11px", borderRadius:7, fontWeight:500 }}>{n}</a>
            ))}
            <div style={{ width:1, height:18, background:T.border, margin:"0 6px" }}/>
            {/* Dark mode toggle */}
            <button onClick={() => setDark(d => !d)} aria-label="Toggle dark mode"
              style={{ width:50, height:27, borderRadius:14, background:dark?G:T.pill, border:"none", cursor:"pointer", position:"relative", transition:"background 0.3s", flexShrink:0 }}>
              <span style={{ width:21, height:21, borderRadius:"50%", background:"#fff", position:"absolute", top:3, left:dark?26:3, transition:"left 0.28s", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11 }}>{dark?"☀":"🌙"}</span>
            </button>
            <a href="tel:+919010871856" style={{ marginLeft:8 }}>
              <button className="btn-g" style={{ padding:"8px 16px", borderRadius:8, fontSize:13, fontWeight:600, whiteSpace:"nowrap" }}>📞 90108 71856</button>
            </a>
          </nav>

          {/* ── Mobile controls ── */}
          <div className="mobile-nav-btn" style={{ display:"none", alignItems:"center", gap:10, flexShrink:0 }}>
            <button onClick={() => setDark(d => !d)} aria-label="Toggle theme"
              style={{ background:"transparent", border:"none", cursor:"pointer", fontSize:18, color:T.sub, lineHeight:1 }}>{dark?"☀":"🌙"}</button>
            {/* Animated hamburger */}
            <button onClick={() => setMenuOpen(o => !o)} aria-label="Menu"
              style={{ background:"none", border:"none", cursor:"pointer", padding:"4px", display:"flex", flexDirection:"column", gap:5, justifyContent:"center" }}>
              <span style={{ display:"block", width:24, height:2, background:T.text, borderRadius:2, transition:"transform 0.25s, opacity 0.25s", transformOrigin:"center", transform:menuOpen?"rotate(45deg) translate(5px,5px)":"none" }}/>
              <span style={{ display:"block", width:24, height:2, background:T.text, borderRadius:2, transition:"opacity 0.25s", opacity:menuOpen?0:1 }}/>
              <span style={{ display:"block", width:24, height:2, background:T.text, borderRadius:2, transition:"transform 0.25s", transformOrigin:"center", transform:menuOpen?"rotate(-45deg) translate(5px,-5px)":"none" }}/>
            </button>
          </div>
        </div>

        {/* ── Mobile slide-down menu ── */}
        <div style={{ maxHeight:menuOpen?"520px":"0", overflow:"hidden", transition:"max-height 0.35s ease", background:T.surface, borderTop:menuOpen?`1px solid ${T.border}`:"none" }}>
          <div style={{ padding:"6px 5% 20px" }}>
            {NAV_LINKS.map(n => (
              <a key={n} href={`#${n.toLowerCase()}`} onClick={closeMenu}
                style={{ display:"flex", alignItems:"center", gap:10, padding:"13px 0", color:T.text, fontSize:15, fontWeight:500, borderBottom:`1px solid ${T.border}` }}>
                <span style={{ color:G, fontSize:11 }}>▸</span>{n}
              </a>
            ))}
            <a href="tel:+919010871856" onClick={closeMenu}>
              <button className="btn-g" style={{ marginTop:16, width:"100%", padding:"13px", borderRadius:9, fontSize:15, fontWeight:600 }}>📞 Call Now: 90108 71856</button>
            </a>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          HERO  — paddingTop = navbar height (66px) + breathing room
      ══════════════════════════════════════════ */}
      <section className="hero-sec" style={{ paddingTop:118, paddingBottom:72, paddingLeft:"5%", paddingRight:"5%" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div className="hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:52, alignItems:"center" }}>

            {/* Copy */}
            <div>
              <div className="a1" style={{ display:"inline-flex", alignItems:"center", gap:8, background:GL, color:GT, fontSize:12, fontWeight:600, padding:"6px 14px", borderRadius:20, marginBottom:20 }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:G, flexShrink:0 }}/>
                Rachloor · Maheshwaram · Kadthal
              </div>
              <h1 className="a2" style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(2rem,5vw,3.8rem)", lineHeight:1.1, letterSpacing:-0.8, marginBottom:16, color:T.text }}>
                Premium Plots &<br/>
                <em style={{ color:G }}>Villas in Rachloor</em>
              </h1>
              <p className="a3" style={{ color:T.sub, fontSize:16, lineHeight:1.8, marginBottom:12, maxWidth:480 }}>
                Welcome to <strong style={{ color:T.text }}>Chalapathi Fortune City</strong> — your trusted real estate partner in Rachloor, Maheshwaram, Kadthal, Amangal and Tukuguda.
              </p>
              <p className="a3" style={{ color:T.sub, fontSize:15, lineHeight:1.8, marginBottom:30, maxWidth:480 }}>
                Open plots, villa plots and ready villas — verified, legally clear, with <strong style={{ color:G }}>zero brokerage for new clients</strong>.
              </p>
              <div className="a4 hero-actions" style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:32 }}>
                <a href="#properties">
                  <button className="btn-g" style={{ padding:"13px 28px", borderRadius:9, fontSize:15, fontWeight:600, display:"block", width:"100%" }}>View Properties →</button>
                </a>
                <a href="tel:+919010871856">
                  <button className="btn-outline" style={{ padding:"13px 28px", borderRadius:9, fontSize:15, fontWeight:500, border:`1.5px solid ${T.border}`, color:T.text, display:"block", width:"100%" }}
                    onMouseEnter={e=>{ e.currentTarget.style.borderColor=G; e.currentTarget.style.color=G; }}
                    onMouseLeave={e=>{ e.currentTarget.style.borderColor=T.border; e.currentTarget.style.color=T.text; }}>
                    📞 90108 71856
                  </button>
                </a>
              </div>
              <div className="a4 trust-row" style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                {["✓ Zero Brokerage","✓ Clear Title","✓ Free Site Visit","✓ 24/7 Support"].map(b => (
                  <span key={b} style={{ fontSize:12, color:T.sub, fontWeight:500 }}>{b}</span>
                ))}
              </div>
            </div>

            {/* Photo collage — hidden on tablet/mobile */}
            <div className="hero-collage" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, height:480 }}>
              {/* Left tall cell */}
              <div className="collage-cell" style={{ height:"100%" }}>
                <img src={img8} alt="Internal road at dusk" />
              </div>
              {/* Right: two cells + badge */}
              <div style={{ display:"flex", flexDirection:"column", gap:14, height:"100%" }}>
                <div className="collage-cell" style={{ flex:1 }}>
                  <img src={img5} alt="Demarcated plots" />
                </div>
                <div style={{ borderRadius:14, background:T.surface, border:`1px solid ${T.border}`, padding:"14px 16px", display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
                  <div style={{ width:42, height:42, borderRadius:11, background:GL, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>🏆</div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:T.text }}>Trusted in Rachloor</div>
                    <div style={{ fontSize:11, color:T.sub, marginTop:2 }}>Zero brokerage · Clear titles</div>
                  </div>
                </div>
                <div className="collage-cell" style={{ flex:1 }}>
                  <img src={img10} alt="Green plots with trees" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════ */}
      <div style={{ background:G }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 5%" }}>
          <div className="stats-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
            {[["3","Property Types"],["6+","Active Locations"],["0%","Brokerage · New Clients"],["24/7","Support Available"]].map(([v,l],i) => (
              <div key={l} className={i<3?"stats-divider":""} style={{ textAlign:"center", padding:"26px 10px", borderRight:"1px solid rgba(255,255,255,0.2)" }}>
                <div style={{ fontSize:26, fontWeight:700, color:"#fff", fontFamily:"'DM Serif Display',serif" }}>{v}</div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,0.78)", letterSpacing:1.5, fontWeight:500, marginTop:5 }}>{l.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          PROPERTIES
      ══════════════════════════════════════════ */}
      <section id="properties" className="sec" style={{ padding:"80px 5%" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div className="filter-row" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:32, gap:16 }}>
            <div>
              <div style={{ fontSize:11, fontWeight:600, color:G, letterSpacing:2, marginBottom:8 }}>AVAILABLE PROPERTIES</div>
              <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(1.7rem,4vw,2.6rem)", letterSpacing:-0.4, color:T.text }}>Our Property Listings</h2>
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {FILTERS.map(f => (
                <button key={f} className="filter-pill" onClick={() => setFilter(f)}
                  style={{ background:filter===f?G:T.pill, color:filter===f?"#fff":T.sub, padding:"8px 16px", borderRadius:20, fontSize:12, fontWeight:600 }}>{f}</button>
              ))}
            </div>
          </div>
          <div className="props-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:22 }}>
            {filtered.map(p => {
              const tag = T.tagMap[p.tag] || T.tagMap.Available;
              return (
                <article key={p.id} className="prop-card" style={{ background:T.card, borderRadius:16, overflow:"hidden", border:`1px solid ${T.border}`, cursor:"pointer", display:"flex", flexDirection:"column" }}>
                  {/* Fixed-height image container — never overflows */}
                  <div className="prop-img-wrap">
                    <img src={p.img} alt={p.title} />
                    <span style={{ position:"absolute", top:12, left:12, background:tag.bg, color:tag.c, padding:"4px 11px", borderRadius:7, fontSize:11, fontWeight:700, zIndex:1 }}>{p.tag}</span>
                    <span style={{ position:"absolute", top:12, right:12, background:dark?"rgba(0,0,0,0.68)":"rgba(255,255,255,0.92)", color:T.text, padding:"4px 11px", borderRadius:7, fontSize:11, fontWeight:600, zIndex:1 }}>{p.type}</span>
                    <span style={{ position:"absolute", bottom:12, left:12, background:G, color:"#fff", padding:"4px 11px", borderRadius:7, fontSize:10, fontWeight:600, zIndex:1 }}>{p.highlight}</span>
                  </div>
                  <div style={{ padding:"18px 18px 16px" }}>
                    <div style={{ fontSize:12, color:T.sub, marginBottom:6, display:"flex", alignItems:"center", gap:5 }}>
                      <span style={{ color:G, fontSize:9 }}>●</span>{p.location}
                    </div>
                    <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:17, marginBottom:8, color:T.text, lineHeight:1.3 }}>{p.title}</h3>
                    <div style={{ fontSize:13, color:T.sub, marginBottom:14 }}>📐 {p.area}</div>
                    <div style={{ borderTop:`1px solid ${T.border}`, paddingTop:13, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ fontSize:13, fontWeight:600, color:G }}>Enquire for Price</span>
                      <a href="tel:+919010871856">
                        <button className="btn-g" style={{ padding:"7px 14px", borderRadius:7, fontSize:12, fontWeight:600 }}>Call Now</button>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          GALLERY
      ══════════════════════════════════════════ */}
      <section id="gallery" style={{ background:T.surface, borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}`, padding:"80px 5%" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:44 }}>
            <div style={{ fontSize:11, fontWeight:600, color:G, letterSpacing:2, marginBottom:10 }}>SITE PHOTOS</div>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(1.7rem,4vw,2.6rem)", letterSpacing:-0.4, color:T.text }}>Photos from the Layout</h2>
            <p style={{ color:T.sub, fontSize:14, marginTop:10 }}>Real photos from Chalapathi Fortune City, Rachloor. Click any photo to enlarge.</p>
          </div>

          {/* Uniform grid — every cell has a fixed height, no overflows */}
          <div className="gal-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
            {/* Row 1 — 4 equal squares */}
            {[img1, img2, img3, img5].map((src, i) => (
              <div key={`r1-${i}`} className="gal-cell" style={{ height:200 }} onClick={() => setLightbox(i)}>
                <img src={src} alt={gallery[i].caption} />
                <div className="gal-overlay"><span style={{ color:"#fff", fontSize:11, fontWeight:500 }}>{gallery[i].caption}</span></div>
              </div>
            ))}
            {/* Row 2 — 1 wide (span 2) + 2 normal */}
            <div className="gal-cell" style={{ height:240, gridColumn:"span 2" }} onClick={() => setLightbox(6)}>
              <img src={img8} alt={gallery[6].caption} />
              <div className="gal-overlay"><span style={{ color:"#fff", fontSize:11, fontWeight:500 }}>{gallery[6].caption}</span></div>
            </div>
            {[img6, img7].map((src, i) => (
              <div key={`r2b-${i}`} className="gal-cell" style={{ height:240 }} onClick={() => setLightbox(4 + i)}>
                <img src={src} alt={gallery[4+i].caption} />
                <div className="gal-overlay"><span style={{ color:"#fff", fontSize:11, fontWeight:500 }}>{gallery[4+i].caption}</span></div>
              </div>
            ))}
            {/* Row 3 — normal + wide (span 2) + normal */}
            <div className="gal-cell" style={{ height:210 }} onClick={() => setLightbox(7)}>
              <img src={img9} alt={gallery[7].caption} />
              <div className="gal-overlay"><span style={{ color:"#fff", fontSize:11, fontWeight:500 }}>{gallery[7].caption}</span></div>
            </div>
            <div className="gal-cell" style={{ height:210, gridColumn:"span 2" }} onClick={() => setLightbox(8)}>
              <img src={img10} alt={gallery[8].caption} />
              <div className="gal-overlay"><span style={{ color:"#fff", fontSize:11, fontWeight:500 }}>{gallery[8].caption}</span></div>
            </div>
            <div className="gal-cell" style={{ height:210 }} onClick={() => setLightbox(9)}>
              <img src={img11} alt={gallery[9].caption} />
              <div className="gal-overlay"><span style={{ color:"#fff", fontSize:11, fontWeight:500 }}>{gallery[9].caption}</span></div>
            </div>
          </div>

          <div style={{ textAlign:"center", marginTop:28 }}>
            <button className="btn-g" style={{ padding:"11px 28px", borderRadius:9, fontSize:13, fontWeight:600 }} onClick={() => setLightbox(0)}>
              View All Photos →
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════ */}
      <section id="services" className="sec" style={{ background:T.surface, borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}`, padding:"80px 5%" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ fontSize:11, fontWeight:600, color:G, letterSpacing:2, marginBottom:10 }}>WHAT WE OFFER</div>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(1.7rem,4vw,2.6rem)", letterSpacing:-0.4, color:T.text }}>Our Real Estate Services</h2>
          </div>
          <div className="services-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:22 }}>
            {services.map(s => (
              <div key={s.title} className="svc-card" style={{ background:T.card, borderRadius:16, padding:"28px 24px", border:`1px solid ${T.border}` }}>
                <div style={{ width:50, height:50, borderRadius:13, background:GL, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, marginBottom:16 }}>{s.icon}</div>
                <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, marginBottom:11, color:T.text }}>{s.title}</h3>
                <p style={{ color:T.sub, fontSize:14, lineHeight:1.8 }}>{s.desc}</p>
                <a href="#contact" style={{ display:"inline-flex", alignItems:"center", gap:5, marginTop:16, color:G, fontSize:13, fontWeight:600 }}>Enquire Now →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════ */}
      <section id="about" className="sec" style={{ padding:"80px 5%" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"center" }}>
            <div style={{ position:"relative" }}>
              <div className="about-img-wrap">
                <img src={img9} alt="Tree-lined road through Fortune City layout" />
              </div>
              <div className="about-float" style={{ position:"absolute", bottom:20, left:-10, background:T.card, border:`1px solid ${T.border}`, borderRadius:13, padding:"13px 17px", boxShadow:"0 8px 28px rgba(0,0,0,0.13)", maxWidth:260 }}>
                <div style={{ fontSize:10, color:T.sub, fontWeight:600, marginBottom:4, letterSpacing:1 }}>OUR OFFICE</div>
                <div style={{ fontSize:13, fontWeight:600, color:T.text, lineHeight:1.6 }}>1-210 Rachloor, Maheshwaram<br/>Ranga Reddy, Telangana 501359</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize:11, fontWeight:600, color:G, letterSpacing:2, marginBottom:12 }}>ABOUT US</div>
              <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(1.7rem,4vw,2.6rem)", letterSpacing:-0.4, marginBottom:18, color:T.text, lineHeight:1.2 }}>
                Trusted Real Estate<br/><em>Partner in Rachloor</em>
              </h2>
              <p style={{ color:T.sub, fontSize:15, lineHeight:1.85, marginBottom:16 }}>
                Welcome to <strong style={{ color:T.text }}>Chalapathi Fortune City Rachloor</strong> — where you can buy and sell open plots, villa plots, and villas. Our team is committed to helping you find the right property for your needs and budget.
              </p>
              <p style={{ color:T.sub, fontSize:15, lineHeight:1.85, marginBottom:26 }}>
                With deep expertise across Rachloor, Kadthal, Maheshwaram, Amangal and Tukuguda, we deliver excellent service and help our clients reach their real estate goals.
              </p>
              <div className="hi-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:28 }}>
                {highlights.map(([icon, label]) => (
                  <div key={label} style={{ background:T.raised, borderRadius:11, padding:"11px 12px", border:`1px solid ${T.border}`, display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:15, flexShrink:0 }}>{icon}</span>
                    <span style={{ fontSize:12, fontWeight:600, color:T.text, lineHeight:1.3 }}>{label}</span>
                  </div>
                ))}
              </div>
              <a href="tel:+919010871856">
                <button className="btn-g" style={{ padding:"12px 26px", borderRadius:9, fontSize:14, fontWeight:600 }}>📞 Call: 90108 71856</button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LOCATIONS
      ══════════════════════════════════════════ */}
      <section id="locations" className="sec" style={{ background:T.surface, borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}`, padding:"72px 5%" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", textAlign:"center" }}>
          <div style={{ fontSize:11, fontWeight:600, color:G, letterSpacing:2, marginBottom:10 }}>WE SERVE</div>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(1.6rem,4vw,2.4rem)", letterSpacing:-0.4, marginBottom:32, color:T.text }}>Our Active Locations</h2>
          <div style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap:12, marginBottom:28 }}>
            {locations.map(loc => (
              <div key={loc} style={{ background:T.card, border:`1.5px solid ${T.border}`, borderRadius:11, padding:"12px 22px", fontSize:14, fontWeight:600, color:T.text, display:"flex", alignItems:"center", gap:7, cursor:"pointer", transition:"all 0.2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor=G; e.currentTarget.style.color=G; e.currentTarget.style.background=GL; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor=T.border; e.currentTarget.style.color=T.text; e.currentTarget.style.background=T.card; }}>
                <span style={{ color:G }}>📍</span>{loc}
              </div>
            ))}
          </div>
          <a href="https://maps.google.com/?q=1-210+Rachloor+Maheshwaram+Ranga+Reddy+Telangana+501359" target="_blank" rel="noreferrer">
            <div style={{ display:"inline-flex", alignItems:"center", gap:14, background:T.card, borderRadius:14, border:`1px solid ${T.border}`, padding:"16px 24px", cursor:"pointer", transition:"border-color 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor=G} onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
              <span style={{ fontSize:22 }}>🗺</span>
              <div style={{ textAlign:"left" }}>
                <div style={{ fontSize:13, fontWeight:600, color:T.text }}>Visit our office</div>
                <div style={{ fontSize:12, color:G, marginTop:2 }}>1-210 Rachloor, Maheshwaram, Ranga Reddy, Telangana 501359 →</div>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════ */}
      <section id="contact" className="sec" style={{ padding:"80px 5%" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ fontSize:11, fontWeight:600, color:G, letterSpacing:2, marginBottom:10 }}>GET IN TOUCH</div>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(1.7rem,4vw,2.6rem)", letterSpacing:-0.4, color:T.text }}>Contact Chalapathi Fortune City</h2>
          </div>
          <div className="contact-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:28, alignItems:"start" }}>
            {/* Details */}
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div style={{ background:T.card, borderRadius:16, border:`1px solid ${T.border}`, padding:"24px 22px" }}>
                <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, marginBottom:20, color:T.text }}>Contact Details</h3>
                {[
                  ["📞","Phone",   "+91 90108 71856",                      "tel:+919010871856"],
                  ["📧","Email",   "chalapathifortunecity@gmail.com",       "mailto:chalapathifortunecity@gmail.com"],
                  ["🕘","Hours",  "By arrangement — 7 days a week",         ""],
                ].map(([icon,label,val,href]) => (
                  <div key={label} style={{ display:"flex", gap:13, marginBottom:15, alignItems:"flex-start" }}>
                    <div style={{ width:36, height:36, borderRadius:9, background:GL, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0 }}>{icon}</div>
                    <div style={{ minWidth:0 }}>
                      <div style={{ fontSize:10, color:T.sub, fontWeight:600, letterSpacing:1.5, marginBottom:3 }}>{label.toUpperCase()}</div>
                      {href
                        ? <a href={href} target={href.startsWith("http")?"_blank":"_self"} rel="noreferrer" style={{ fontSize:13, color:G, fontWeight:500, lineHeight:1.5, wordBreak:"break-all" }}>{val}</a>
                        : <div style={{ fontSize:13, color:T.text, lineHeight:1.5 }}>{val}</div>
                      }
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background:G, borderRadius:16, padding:"20px 22px", color:"#fff" }}>
                <div style={{ fontSize:15, fontWeight:700, marginBottom:6, fontFamily:"'DM Serif Display',serif" }}>🎁 Special Offer</div>
                <div style={{ fontSize:13, opacity:0.9, lineHeight:1.7 }}>Zero brokerage for all new clients! Call now to book your free site visit.</div>
              </div>
            </div>

            {/* Form */}
            <div style={{ background:T.card, borderRadius:16, border:`1px solid ${T.border}`, padding:"28px 24px" }}>
              {submitted ? (
                <div style={{ textAlign:"center", padding:"48px 0" }}>
                  <div style={{ fontSize:44, marginBottom:14 }}>✅</div>
                  <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:21, color:T.text, marginBottom:10 }}>Enquiry Sent!</div>
                  <div style={{ color:T.sub, fontSize:14, lineHeight:1.8 }}>
                    Thank you! Our team will contact you shortly.<br/>
                    Or call: <a href="tel:+919010871856" style={{ color:G, fontWeight:600 }}>90108 71856</a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:20, marginBottom:20, color:T.text }}>Send an Enquiry</h3>
                  <div className="form-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
                    <input type="text" placeholder="Full Name *" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
                      style={{ padding:"12px 13px", borderRadius:9, border:`1.5px solid ${T.border}`, background:T.raised, color:T.text, fontSize:14, width:"100%" }}/>
                    <input type="tel" placeholder="Phone Number *" required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}
                      style={{ padding:"12px 13px", borderRadius:9, border:`1.5px solid ${T.border}`, background:T.raised, color:T.text, fontSize:14, width:"100%" }}/>
                  </div>
                  <input type="email" placeholder="Email Address (optional)" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}
                    style={{ width:"100%", padding:"12px 13px", borderRadius:9, border:`1.5px solid ${T.border}`, background:T.raised, color:T.text, fontSize:14, marginBottom:20 }}/>
                  <button type="submit" className="btn-g" style={{ width:"100%", padding:"13px", borderRadius:9, fontSize:15, fontWeight:600 }}>Send Enquiry →</button>
                  <p style={{ textAlign:"center", color:T.sub, fontSize:12, marginTop:11 }}>
                    Or call: <a href="tel:+919010871856" style={{ color:G, fontWeight:600 }}>90108 71856</a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer style={{ background:dark?"#070e09":"#0e1a11", padding:"52px 5% 28px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div className="footer-grid" style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr 1fr", gap:36, marginBottom:44 }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                <div style={{ width:34, height:34, background:G, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:17, flexShrink:0 }}>C</div>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:16, color:"#fff", lineHeight:1.2 }}>Chalapathi Fortune City</div>
              </div>
              <p style={{ color:"rgba(255,255,255,0.38)", fontSize:13, lineHeight:1.9, maxWidth:210 }}>Trusted real estate partner in Rachloor, Maheshwaram, Kadthal &amp; surrounding areas.</p>
              <a href="tel:+919010871856" style={{ display:"inline-block", marginTop:14, color:"#4ade80", fontSize:14, fontWeight:600 }}>📞 90108 71856</a>
            </div>
            {[
              ["Properties",["Open Plots","Villa Plots","Villas","New Layouts"]],
              ["Locations", ["Rachloor","Kadthal","Maheshwaram","Amangal","Tukuguda"]],
              ["Company",   ["About Us","Our Services","Contact Us","YouTube Channel"]],
            ].map(([heading, items]) => (
              <div key={heading}>
                <div style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,0.38)", letterSpacing:2.5, marginBottom:14 }}>{heading.toUpperCase()}</div>
                {items.map(item => (
                  <div key={item} style={{ fontSize:13, color:"rgba(255,255,255,0.35)", marginBottom:10, cursor:"pointer", transition:"color 0.15s" }}
                    onMouseEnter={e=>e.target.style.color="rgba(255,255,255,0.82)"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.35)"}>
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="footer-bottom" style={{ borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:22, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
            <p style={{ color:"rgba(255,255,255,0.28)", fontSize:12 }}>© 2026 Chalapathi Fortune City Rachloor. All rights reserved.</p>
            <p style={{ color:"rgba(255,255,255,0.2)", fontSize:12 }}>1-210 Rachloor, Maheshwaram, Ranga Reddy, Telangana 501359</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
