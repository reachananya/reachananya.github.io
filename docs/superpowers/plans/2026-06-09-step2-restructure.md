# Step 2 — Site Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split index.html into a hero-only landing page and a new about.html with bio + scrollable timeline, connected by clicking the name.

**Architecture:** index.html becomes a pure fullscreen hero (particle canvas + hover nav arrows). Clicking "Ananya Singhal" navigates to about.html. about.html has a sticky minimal top nav, a fixed 420px bio column on the left, and a flex timeline column on the right that auto-scrolls.

**Tech Stack:** Plain HTML, CSS custom properties, vanilla JS. No Bootstrap. particles.js (already loaded) for canvas animation.

---

### Task 1: Strip index.html to hero-only

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Remove the about-me section**

Delete everything between (and including) these tags from `index.html`:
```html
<div class="about-me-section" id="aboutme">
  ...
</div>
```

- [ ] **Step 2: Remove the content-showcase section**

Delete everything between (and including):
```html
<section class="content-showcase" ...>
  ...
</section>
```
Note: also delete the stray `</div>` closing tag that follows the section (currently line ~624).

- [ ] **Step 3: Remove the footer**

Delete:
```html
<footer class="footer">
  <p>Designed & Built with <i class="fas fa-heart pulse"></i> by Ananya Singhal</p>
  <p>&copy; 2025 All Rights Reserved</p>
</footer>
```

- [ ] **Step 4: Remove the scroll-down button**

Delete:
```html
<div class="scroll-down-container">
  ...
</div>
```

- [ ] **Step 5: Remove Bootstrap CSS and JS**

Remove these two tags from `<head>`:
```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
  crossorigin="anonymous"
/>
```
```html
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0"
  crossorigin="anonymous"
></script>
```

- [ ] **Step 6: Make the name a link to about.html**

Change:
```html
<h1 class="main-title-header"><strong><span>Ananya</span> <span>Singhal</span></strong></h1>
```
To:
```html
<h1 class="main-title-header"><a href="about.html" class="name-link"><strong><span>Ananya</span> <span>Singhal</span></strong></a></h1>
```

- [ ] **Step 7: Verify in browser**

Run `python3 -m http.server 8000` from project root. Open `http://localhost:8000`.
Expected: fullscreen hero with particles, name visible, clicking name navigates to about.html (404 for now — fine), no content below hero, no scroll.

- [ ] **Step 8: Commit**

```bash
git add index.html
git commit -m "refactor: strip index.html to hero-only landing page"
```

---

### Task 2: Clean up style5.css

**Files:**
- Modify: `style5.css`

- [ ] **Step 1: Remove global Orbitron**

Change:
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Orbitron;
  letter-spacing: 1px;
}
```
To:
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

- [ ] **Step 2: Add name-link style**

Add after `.main-title-header` rule:
```css
.name-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.name-link:hover {
  opacity: 0.8;
}
```

- [ ] **Step 3: Remove unused CSS blocks**

Delete these entire blocks — they are only used by sections removed in Task 1:
- `.about-me-section` and all nested rules (`.about-me-container`, `.about-me-bio`, `.about-me-social`, `.description`, `.education-box`, `.highlight`, `.social-links`, `.resume-btn-container`, `.resume-btn`)
- `.content-showcase`, `.showcase-container`, `.updates-section`, `.updates-header`, `.updates-wrapper`, `.updates-timeline`, `.update-item`, `.update-date`, `.update-content`
- `.vertical-navigation`, `.nav-item`, `.nav-number`, `.nav-text`
- `.section-header`
- `.scroll-down-container`, `.scroll-down-link`, `.scroll-down-content`, `.scroll-text`, `.scroll-arrow`
- `.footer`
- All `@media` blocks that only contain rules for those removed classes

- [ ] **Step 4: Verify hero still looks correct**

Open `http://localhost:8000`. Particles, name, hover arrows should all work. No visual regressions.

- [ ] **Step 5: Commit**

```bash
git add style5.css
git commit -m "refactor: remove unused CSS for stripped sections"
```

---

### Task 3: Create about.css

**Files:**
- Create: `about.css`

- [ ] **Step 1: Create the file with CSS custom properties and base**

Create `about.css`:
```css
:root {
  --bg: #111111;
  --bg-card: #1a1a1a;
  --bg-hover: #1e1e1e;
  --border: rgba(255, 255, 255, 0.07);
  --accent: #50d890;
  --accent-muted: rgba(80, 216, 144, 0.15);
  --text: #e0e0e0;
  --text-muted: #888888;
  --text-dim: rgba(255, 255, 255, 0.35);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
  font-size: 13px;
  overflow: hidden;
}
```

- [ ] **Step 2: Add top nav styles**

Append to `about.css`:
```css
/* ── TOP NAV ── */
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 48px;
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  background: var(--bg);
  z-index: 100;
  height: 61px;
}

.nav-back {
  color: var(--accent);
  text-decoration: none;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: 1.5px;
  font-family: 'Orbitron', sans-serif;
  transition: opacity 0.2s;
}

.nav-back::before {
  content: "←";
  font-size: 14px;
  font-family: sans-serif;
}

.nav-back:hover {
  opacity: 0.75;
}

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-links a {
  color: var(--text-dim);
  text-decoration: none;
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: var(--text);
}
```

- [ ] **Step 3: Add two-column layout styles**

Append to `about.css`:
```css
/* ── LAYOUT ── */
.page {
  display: flex;
  height: calc(100vh - 61px);
  overflow: hidden;
}

/* ── BIO COLUMN ── */
.bio-col {
  width: 420px;
  min-width: 340px;
  padding: 40px 36px;
  border-right: 1px solid var(--border);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 28px;
  scrollbar-width: thin;
  scrollbar-color: var(--accent) #1e1f22;
}

.bio-col::-webkit-scrollbar { width: 2px; }
.bio-col::-webkit-scrollbar-track { background: #1e1f22; }
.bio-col::-webkit-scrollbar-thumb { background-color: var(--accent); border-radius: 10px; }

.bio-name {
  font-size: 22px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 1px;
  font-family: 'Orbitron', sans-serif;
}

.bio-role {
  color: var(--accent);
  font-size: 11px;
  letter-spacing: 1.5px;
  margin-top: 6px;
  text-transform: uppercase;
}

.bio-text {
  color: var(--text-muted);
  line-height: 1.8;
  font-size: 12px;
}

.bio-text a {
  color: var(--accent);
  text-decoration: none;
  font-style: italic;
}

.bio-text a:hover { text-decoration: underline; }

.edu-box {
  border-left: 2px solid var(--accent);
  background: var(--accent-muted);
  padding: 14px 16px;
  border-radius: 0 4px 4px 0;
  font-size: 11px;
  line-height: 1.8;
  color: var(--text-muted);
}

.edu-box .label {
  color: var(--accent);
  font-size: 10px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 6px;
  display: block;
}

.edu-box strong { color: var(--text); }

.connect-label {
  font-size: 10px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 12px;
}

.social-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.social-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  font-size: 14px;
  text-decoration: none;
  border: 1px solid rgba(80, 216, 144, 0.2);
  transition: all 0.2s;
}

.social-icon:hover {
  background: var(--accent);
  color: #111;
  transform: translateY(-2px);
}

.resume-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 22px;
  border: 1px solid var(--accent);
  color: var(--accent);
  border-radius: 20px;
  font-size: 11px;
  text-decoration: none;
  letter-spacing: 1px;
  transition: all 0.2s;
  width: fit-content;
}

.resume-btn:hover {
  background: var(--accent);
  color: #111;
  transform: translateY(-2px);
}
```

- [ ] **Step 4: Add timeline column styles**

Append to `about.css`:
```css
/* ── TIMELINE COLUMN ── */
.timeline-col {
  flex: 1;
  overflow-y: auto;
  padding: 40px 48px;
  scrollbar-width: thin;
  scrollbar-color: var(--accent) #1e1f22;
}

.timeline-col::-webkit-scrollbar { width: 2px; }
.timeline-col::-webkit-scrollbar-track { background: #1e1f22; }
.timeline-col::-webkit-scrollbar-thumb { background-color: var(--accent); border-radius: 10px; }

.section-label {
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 28px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border);
  font-family: 'Orbitron', sans-serif;
}

.update-item {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  position: relative;
  padding-left: 22px;
}

.update-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 5px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  z-index: 1;
}

.update-item::after {
  content: '';
  position: absolute;
  left: 3px;
  top: 13px;
  width: 1px;
  height: calc(100% + 16px);
  background: rgba(80, 216, 144, 0.2);
}

.update-item:last-child::after { display: none; }

.update-date {
  min-width: 72px;
  color: var(--accent);
  font-size: 10px;
  line-height: 1.7;
  letter-spacing: 0.5px;
  padding-top: 4px;
}

.update-card {
  flex: 1;
  background: var(--bg-card);
  border-left: 2px solid rgba(80, 216, 144, 0.25);
  padding: 12px 16px;
  border-radius: 0 4px 4px 0;
  transition: all 0.2s;
}

.update-card:hover {
  border-left-color: var(--accent);
  background: var(--bg-hover);
  transform: translateX(4px);
}

.update-card h3 {
  font-size: 12px;
  color: var(--text);
  margin-bottom: 5px;
  font-weight: 500;
}

.update-card p {
  font-size: 11px;
  color: var(--text-muted);
  line-height: 1.65;
}

.badge {
  display: inline-block;
  padding: 2px 8px;
  background: var(--accent-muted);
  color: var(--accent);
  border-radius: 10px;
  font-size: 9px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 6px;
}
```

- [ ] **Step 5: Add mobile responsive styles**

Append to `about.css`:
```css
/* ── MOBILE ── */
@media (max-width: 768px) {
  body { overflow: auto; }

  .top-nav {
    padding: 16px 20px;
    flex-wrap: wrap;
    gap: 12px;
    height: auto;
  }

  .nav-links { gap: 16px; }

  .page {
    flex-direction: column;
    height: auto;
    overflow: visible;
  }

  .bio-col {
    width: 100%;
    min-width: unset;
    border-right: none;
    border-bottom: 1px solid var(--border);
    padding: 28px 20px;
    overflow-y: visible;
    height: auto;
  }

  .timeline-col {
    padding: 28px 20px;
    overflow-y: visible;
    height: auto;
  }
}
```

- [ ] **Step 6: Commit**

```bash
git add about.css
git commit -m "feat: add about.css with two-column layout styles"
```

---

### Task 4: Create about.html

**Files:**
- Create: `about.html`

- [ ] **Step 1: Create the HTML skeleton**

Create `about.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ananya Singhal — About</title>
  <link rel="icon" href="img/a_favicon_1.png" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Orbitron&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="about.css" />
</head>
<body>

  <nav class="top-nav">
    <a href="index.html" class="nav-back">ananya singhal</a>
    <div class="nav-links">
      <a href="experience.html">experience</a>
      <a href="publications.html">publications</a>
      <a href="projects.html">projects</a>
      <a href="awards.html">awards</a>
    </div>
  </nav>

  <div class="page">
    <!-- BIO COLUMN -->
    <aside class="bio-col" id="bio-col">
    </aside>

    <!-- TIMELINE COLUMN -->
    <main class="timeline-col" id="timeline-col">
    </main>
  </div>

</body>
</html>
```

- [ ] **Step 2: Fill in the bio column**

Replace `<aside class="bio-col" id="bio-col">` block with:
```html
    <aside class="bio-col" id="bio-col">
      <div>
        <div class="bio-name">Ananya Singhal</div>
        <div class="bio-role">AI Researcher · GE HealthCare</div>
      </div>

      <p class="bio-text">
        I'm currently an AI Researcher at <a href="https://www.gehealthcare.in/">GE HealthCare</a>
        in the Advanced Technology group, working on voxel-adaptive denoising for high b-value
        diffusion MRI and MRI acquisition parameter optimization.
      </p>

      <p class="bio-text">
        Prior to GE, I was an undergraduate at
        <a href="https://snu.edu.in/home/">Shiv Nadar Institute of Eminence</a>,
        pursuing a B.Tech in Computer Science with a minor in Mathematics.
        I closely collaborated with <a href="https://snu.edu.in/faculty/saurabh-janardan-shigwan/">Dr. Saurabh J. Shigwan</a>
        on diffusion MRI analysis for early diagnosis of neurodegenerative diseases.
        I also interned at <a href="https://www.dell.com/en-in">Dell Technologies</a>,
        <a href="https://www.nus.edu.sg/">National University of Singapore</a>,
        <a href="https://cvit.iiit.ac.in/">IIIT Hyderabad CVIT Lab</a>, and
        <a href="https://www.zkteco.com/en/">ZKTeco</a>.
      </p>

      <p class="bio-text">
        I've been recognised with the
        <a href="https://buildyourfuture.withgoogle.com/scholarships/generation-google-scholarship-apac">Generation Google Scholarship (APAC)</a>
        and the <a href="https://iccv2023.thecvf.com/diversity.equity.and.inclusion-363500-3-33-35.php">DEI Travel Grant at ICCV 2023</a>.
      </p>

      <div class="edu-box">
        <span class="label">Education</span>
        <strong>B.Tech, Computer Science &amp; Engineering</strong><br>
        Minor in Mathematics · Dean's List (2×)<br>
        Shiv Nadar Institute of Eminence<br>
        GPA: 8.41/10 · Aug 2020 – May 2024
      </div>

      <div>
        <div class="connect-label">Connect</div>
        <div class="social-row">
          <a href="mailto:reachananyasinghal9@gmail.com" class="social-icon" title="Email"><i class="fas fa-envelope"></i></a>
          <a href="https://github.com/reachananya" target="_blank" class="social-icon" title="GitHub"><i class="fab fa-github"></i></a>
          <a href="https://www.linkedin.com/in/ananya-singhal-0608/" target="_blank" class="social-icon" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
          <a href="https://x.com/Anna92085196" target="_blank" class="social-icon" title="Twitter"><i class="fab fa-twitter"></i></a>
          <a href="https://orcid.org/0009-0005-7311-5444" target="_blank" class="social-icon" title="ORCID"><i class="fab fa-orcid"></i></a>
          <a href="https://medium.com/@reach-ananya-singhal" target="_blank" class="social-icon" title="Medium"><i class="fab fa-medium"></i></a>
        </div>
      </div>

      <a href="https://drive.google.com/file/d/1x8v7rgt4UF26SBV9ZqP3VQzQWa8Fs20_/view?usp=sharing" target="_blank" class="resume-btn">
        <i class="fas fa-download"></i> Resume
      </a>
    </aside>
```

- [ ] **Step 3: Fill in the timeline column**

Replace `<main class="timeline-col" id="timeline-col">` block with the full timeline. Use this exact structure, one `.update-item` per entry. Entries newest-first:

```html
    <main class="timeline-col" id="timeline-col">
      <div class="section-label">Updates</div>

      <div class="update-item">
        <div class="update-date">May<br>2026</div>
        <div class="update-card">
          <span class="badge">Publication</span>
          <h3>Structure-aware Adaptive Kernel MPPCA Denoising — EMBC 2026</h3>
          <p>Accepted at Engineering in Medicine and Biology Society, Toronto. Also filed as Invention Disclosure at GE HealthCare.</p>
        </div>
      </div>

      <div class="update-item">
        <div class="update-date">Apr<br>2026</div>
        <div class="update-card">
          <span class="badge">Publication</span>
          <h3>ARMARecon: ARMA Convolutional Filter Based GNN — ISBI 2026</h3>
          <p>Accepted at International Symposium on Biomedical Imaging, London.</p>
        </div>
      </div>

      <div class="update-item">
        <div class="update-date">Nov<br>2024</div>
        <div class="update-card">
          <span class="badge">Award</span>
          <h3>Grace Hopper Celebration Scholarship — AnitaB.org</h3>
          <p>Advancing Inclusion Scholarship to attend GHCI, India's largest gathering of women and nonbinary technologists.</p>
        </div>
      </div>

      <div class="update-item">
        <div class="update-date">Aug<br>2024</div>
        <div class="update-card">
          <span class="badge">Role</span>
          <h3>AI Researcher at GE HealthCare — Advanced Technology Group</h3>
          <p>Working on voxel-adaptive denoising for high b-value diffusion MRI and FSE acquisition parameter optimization.</p>
        </div>
      </div>

      <div class="update-item">
        <div class="update-date">May<br>2024</div>
        <div class="update-card">
          <span class="badge">Teaching</span>
          <h3>Teaching Assistant — Image Processing (CSD357), SNIoE</h3>
          <p>Supported 60+ students across labs on spatial filtering, edge detection, morphological operations, and frequency-domain analysis.</p>
        </div>
      </div>

      <div class="update-item">
        <div class="update-date">Jan<br>2024</div>
        <div class="update-card">
          <span class="badge">Internship</span>
          <h3>SDE Winter Intern at Dell Technologies — Dell Digital</h3>
          <p>Built ML-driven order fulfillment forecasting pipeline processing 100K+ daily transactions. Reduced idle inventory by 15% in A/B testing.</p>
        </div>
      </div>

      <div class="update-item">
        <div class="update-date">Aug<br>2023</div>
        <div class="update-card">
          <span class="badge">Teaching</span>
          <h3>Teaching Assistant — Mathematical Methods I (MAT103), SNIoE</h3>
          <p>Supported 80+ students on linear algebra, differential equations, and vector calculus across weekly problem-solving sessions.</p>
        </div>
      </div>

      <div class="update-item">
        <div class="update-date">Nov<br>2023</div>
        <div class="update-card">
          <span class="badge">Conference</span>
          <h3>Attended ACML 2023, Istanbul</h3>
          <p>Presented "Early Diagnosis of Alzheimer through Swin-Transformer-Based DL Framework using Sparse Diffusion" at ACML 2023.</p>
        </div>
      </div>

      <div class="update-item">
        <div class="update-date">Sept<br>2023</div>
        <div class="update-card">
          <span class="badge">Conference</span>
          <h3>Attended ICCV 2023, Paris — DEI Scholar</h3>
          <p>Presented "Deep Learning Framework using Sparse Diffusion MRI for Diagnosis of FTD" at BioImage Computing Workshop. Awarded EUR 900 DEI Travel Grant.</p>
        </div>
      </div>

      <div class="update-item">
        <div class="update-date">May<br>2023</div>
        <div class="update-card">
          <span class="badge">Internship</span>
          <h3>SDE Summer Intern at Dell Technologies</h3>
          <p>Architected RAG pipeline with GPT4ALL, LangChain, and Pinecone over 10K+ internal documents. Adopted by 3 engineering teams.</p>
        </div>
      </div>

      <div class="update-item">
        <div class="update-date">Jul<br>2022</div>
        <div class="update-card">
          <span class="badge">Internship</span>
          <h3>Research Intern at ZKTeco Inc — Biometric Systems R&amp;D</h3>
          <p>Engineered multimodal biometric pipeline fusing finger vein and fingerprint via Siamese Networks. Achieved 95%+ verification accuracy.</p>
        </div>
      </div>

      <div class="update-item">
        <div class="update-date">May<br>2022</div>
        <div class="update-card">
          <span class="badge">Research</span>
          <h3>Academic Intern at National University of Singapore</h3>
          <p>Built real-time violence detection platform combining LRCN and ConvLSTM. Deployed with Streamlit + AWS Lambda + Firebase.</p>
        </div>
      </div>

      <div class="update-item">
        <div class="update-date">Feb<br>2022</div>
        <div class="update-card">
          <span class="badge">Award</span>
          <h3>Harvard WECode Scholarship</h3>
          <p>Merit-based scholarship covering conference ticket and $200 travel aid for Harvard WECode 2022.</p>
        </div>
      </div>

      <div class="update-item">
        <div class="update-date">May<br>2021</div>
        <div class="update-card">
          <span class="badge">Award</span>
          <h3>Generation Google Scholarship (APAC) — USD 1,000</h3>
          <p>One of three first-year students awarded across 14 Asia-Pacific countries.</p>
        </div>
      </div>

      <div class="update-item">
        <div class="update-date">Mar<br>2021</div>
        <div class="update-card">
          <span class="badge">Research</span>
          <h3>Research Intern at IIIT Hyderabad — CVIT Lab</h3>
          <p>Built 30K-image annotated dataset and benchmarked facial recognition bias across Indian demographics under Prof. Anoop Namboodiri.</p>
        </div>
      </div>

      <div class="update-item">
        <div class="update-date">Aug<br>2020</div>
        <div class="update-card">
          <span class="badge">Education</span>
          <h3>Started B.Tech at Shiv Nadar Institute of Eminence</h3>
          <p>Computer Science &amp; Engineering with a minor in Mathematics.</p>
        </div>
      </div>

    </main>
```

- [ ] **Step 4: Add auto-scroll script before `</body>`**

```html
  <script>
    const timeline = document.getElementById('timeline-col');
    let paused = false;

    timeline.addEventListener('mouseenter', () => { paused = true; });
    timeline.addEventListener('mouseleave', () => { paused = false; });

    setInterval(() => {
      if (!paused) {
        timeline.scrollTop += 1;
        if (timeline.scrollTop + timeline.clientHeight >= timeline.scrollHeight) {
          timeline.scrollTop = 0;
        }
      }
    }, 40);
  </script>
```

- [ ] **Step 5: Verify in browser**

Open `http://localhost:8000/about.html`.
Expected:
- Sticky top nav with `← ananya singhal` on left, nav links on right
- Bio column on left (420px), timeline on right
- Timeline auto-scrolls, pauses on hover
- Social icons show Font Awesome icons, hover turns green
- Name in bio col uses Orbitron font
- Clicking `← ananya singhal` returns to `index.html`

- [ ] **Step 6: Verify index → about link**

Open `http://localhost:8000`. Click "Ananya Singhal" name.
Expected: navigates to `about.html`.

- [ ] **Step 7: Commit**

```bash
git add about.html about.css
git commit -m "feat: add about.html with bio + auto-scroll timeline"
```

---

### Task 5: Update mobile sidebar on index.html to include About

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add About link to mobile sidebar**

The mobile sidebar currently links to publications/experience/projects/awards but has no "about" link since the section was on the same page. Add it as the first item:

```html
        <a href="about.html" class="sidebar-item">
          <span class="nav-number">00</span>
          <span class="nav-text">About</span>
        </a>
```

Insert before the `publications.html` sidebar item.

- [ ] **Step 2: Verify on mobile viewport**

In browser DevTools, set viewport to 375px wide. Hamburger menu should appear, tapping it shows sidebar with About as first item.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add About link to mobile sidebar nav"
```
