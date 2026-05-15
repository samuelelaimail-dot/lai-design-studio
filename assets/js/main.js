
(function () {
  const root = document.documentElement;
  const body = document.body;
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const dyslexiaToggle = document.querySelector('[data-dyslexia-toggle]');
  const menuButton = document.querySelector('[data-menu-button]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  const copyEmail = document.querySelectorAll('[data-copy-email]');
  const form = document.querySelector('[data-mail-form]');

  const savedTheme = localStorage.getItem('site-theme');
  const savedDyslexia = localStorage.getItem('site-dyslexia');
  if (savedTheme === 'dark' || savedTheme === 'light') root.setAttribute('data-theme', savedTheme);
  if (savedDyslexia === 'true') {
    body.classList.add('dyslexia-mode');
    if (dyslexiaToggle) dyslexiaToggle.setAttribute('aria-pressed', 'true');
  }

  const updateThemeText = () => {
    if (!themeToggle) return;
    themeToggle.textContent = root.getAttribute('data-theme') === 'dark' ? 'Light' : 'Dark';
  };
  updateThemeText();

  themeToggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('site-theme', next);
    updateThemeText();
    if (window.applySiteLanguage) window.applySiteLanguage(localStorage.getItem('site-lang') || document.documentElement.lang || 'en');
  });

  dyslexiaToggle?.addEventListener('click', () => {
    const active = body.classList.toggle('dyslexia-mode');
    dyslexiaToggle.setAttribute('aria-pressed', active ? 'true' : 'false');
    localStorage.setItem('site-dyslexia', String(active));
  });

  menuButton?.addEventListener('click', () => {
    const isOpen = mobileNav?.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  copyEmail.forEach((button) => {
    button.addEventListener('click', async () => {
      const email = 'samuelelai@laidesign.studio';
      try {
        await navigator.clipboard.writeText(email);
        const previous = button.textContent;
        button.textContent = 'Copied';
        setTimeout(() => button.textContent = previous, 1200);
      } catch {
        window.location.href = 'mailto:' + email;
      }
    });
  });

  document.querySelectorAll('[data-filter-button]').forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter-button');
      document.querySelectorAll('[data-filter-button]').forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
      document.querySelectorAll('[data-filter-item]').forEach((item) => {
        const categories = item.getAttribute('data-filter-item').split(' ');
        item.classList.toggle('is-hidden', filter !== 'all' && !categories.includes(filter));
      });
    });
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const subject = form.querySelector('[name="subject"]').value.trim() || 'Professional enquiry';
    const message = form.querySelector('[name="message"]').value.trim();
    const bodyText = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:samuelelai@laidesign.studio?subject=${encodeURIComponent(subject)}&body=${bodyText}`;
  });

  document.querySelectorAll('.stagger').forEach((group) => {
    Array.from(group.children).forEach((child, index) => child.style.setProperty('--i', index));
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal, .stagger > *').forEach((item) => observer.observe(item));

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('pointermove', (event) => {
      const x = (event.clientX / window.innerWidth - 0.5).toFixed(3);
      const y = (event.clientY / window.innerHeight - 0.5).toFixed(3);
      root.style.setProperty('--mx', x);
      root.style.setProperty('--my', y);
    }, { passive: true });
  }
})();


// Bilingual language system: English / Italian.
(function () {
  const translations = {
    en: {
      "nav.home": "Home",
      "nav.profile": "Profile",
      "nav.work": "Work",
      "nav.psychology": "Psychology",
      "nav.contact": "Contact",
      "ui.dyslexia": "Dyslexia",
      "ui.dark": "Dark",
      "ui.light": "Light",
      "ui.menu": "Menu",

      "home.kicker": "Creative systems / professional digital work",
      "home.title": "Clear digital work with a human edge.",
      "home.lead": "I connect creative direction, computing, design and psychology to build digital experiences that feel refined, usable and strategically precise.",
      "home.meta1": "Asia for Animals",
      "home.meta2": "Catalina Film Festival",
      "home.meta3": "Web systems",
      "home.meta4": "Psychology informed UX",
      "home.ctaWork": "View work",
      "home.ctaAfa": "Strategic UX work",
      "home.note": "The practice combines four professional sides: creative direction, computing, design systems and psychology informed digital judgement.",
      "home.portraitNote": "Creative direction · Computing · Design · Psychology",

      "home.four.kicker": "Practice framework",
      "home.four.title": "A studio practice built around strategy, systems and judgement.",
      "home.four.text": "I do not separate design from implementation or research from delivery. Each engagement is shaped through four capabilities that turn complexity into a clear digital outcome.",
      "home.cap1.label": "01 / Strategic UX",
      "home.cap1.title": "Strategic UX systems",
      "home.cap1.text": "Mission clarity, journey architecture and design system thinking for organisations with complex audiences.",
      "home.cap2.label": "02 / Technical delivery",
      "home.cap2.title": "Custom coded websites",
      "home.cap2.text": "Lean front end systems, responsive interfaces and build structures designed for control, speed and maintainability.",
      "home.cap3.label": "03 / Visual systems",
      "home.cap3.title": "Identity and editorial direction",
      "home.cap3.text": "Typography, hierarchy, imagery and interface rules that make organisations feel coherent, premium and credible.",
      "home.cap4.label": "04 / Research judgement",
      "home.cap4.title": "Psychology, media and attention",
      "home.cap4.text": "Analysis of attention, audience interpretation and animation evaluation used to make digital decisions more precise.",

      "home.working.kicker": "Working environment",
      "home.working.title": "Design decisions happen inside the system, not around it.",
      "home.working.text": "The work is practical: testing structure, reading the interface as a user, refining content routes and reducing the number of things that can distract or break.",
      "home.working.cta": "View Catalina case",

      "home.featured.kicker": "Featured work",
      "home.featured.title": "Case studies with different strengths.",
      "home.featured.text": "AFA demonstrates UI/UX, no code development, user journey mapping and design systems. Catalina demonstrates creative direction and lightweight web architecture.",
      "home.afa.title": "Asia for Animals: donation focused digital platform",
      "home.afa.text": "A visually arresting and culturally fluent platform designed to clarify the coalition’s mission, simplify navigation and support donor action.",
      "home.catalina.title": "Catalina Film Festival: creative web direction",
      "home.catalina.text": "Festival website direction combining cinematic atmosphere, editorial layout, clearer content routes and lighter infrastructure.",
      "home.openCase": "Open case",

      "home.style.kicker": "Working style",
      "home.style.title": "Beautiful, but not decorative.",
      "home.style.text": "The work uses visual identity, systems thinking and psychological judgement to reduce friction and make digital experiences more persuasive.",
      "home.profileCta": "Read profile",
      "home.contact.kicker": "Contact",
      "home.contact.title": "For focused project conversations.",
      "home.contact.text": "Contact me for UI/UX, digital direction, web systems, creative site concepts, professional identity or psychology informed analysis.",
      "home.copy": "Copy email",

      "profile.kicker": "Profile",
      "profile.title": "A digital practice shaped by systems and people.",
      "profile.lead": "I work across creative direction, computing, design and psychology informed analysis. The common thread is clarity: making digital spaces easier to understand, trust and use.",
      "profile.side": "I approach websites as working systems, not as online posters. Structure, code, writing, visual rhythm and human interpretation all affect whether a project feels credible.",
      "profile.focus.title": "Professional focus",
      "profile.focus.p1": "I build and direct clean digital experiences for projects that need to feel serious without becoming cold. My work combines front end implementation, content structure, visual judgement and a psychology informed view of how people read, scan and decide.",
      "profile.focus.p2": "The aim is simple: a digital presence that is beautiful enough to be remembered and clear enough to be useful.",
      "profile.principles.kicker": "Principles",
      "profile.principles.title": "The work is designed to feel controlled.",
      "profile.principles.text": "Visual confidence comes from hierarchy, movement, space and precision, not from adding boxes to every section.",

      "work.kicker": "Work",
      "work.title": "Creative, technical and strategic work.",
      "work.lead": "A focused archive of project directions across UI/UX, no code development, computing, design and psychology informed communication.",
      "work.side": "The work is organised by capability rather than by decoration: creative direction, front end systems, visual identity and human centred reasoning.",
      "work.filter.all": "All",
      "work.filter.creative": "Creative",
      "work.filter.computing": "Computing",
      "work.filter.design": "Design",
      "work.filter.psychology": "Psychology",
      "work.afa.title": "Asia for Animals: digital platform and donation focused UX",
      "work.afa.text": "UI/UX and no code development for a global animal advocacy coalition: mission clarity, stronger user journeys, design system, donation focus and culturally fluent visuals.",
      "work.computing.title": "Static first and no code web systems",
      "work.computing.text": "Professional websites structured for speed, accessibility, portability and reduced operational dependency.",
      "work.design.title": "Professional identity and editorial interfaces",
      "work.design.text": "Visual systems that use atmosphere, typography, spacing and motion without turning every section into a card or sales block.",
      "work.psych.title": "Psychology informed digital judgement",
      "work.psych.text": "Analysis of attention, trust, evidence and cognitive load applied to communication, media and interface decisions.",
      "work.discuss": "Discuss",

      "psych.kicker": "Psychology",
      "psych.title": "Psychology applied to attention, trust and evidence.",
      "psych.lead": "Psychology informs how I think about digital work: how people read, what they notice, what they trust and where interfaces create cognitive friction.",
      "psych.side": "This side of the practice supports design and communication decisions. It is evidence aware, careful with claims and focused on interpretation rather than decoration.",
      "psych.human.kicker": "Human factors",
      "psych.human.title": "The interface is also a psychological environment.",
      "psych.human.text": "People do not read digital spaces neutrally. They scan, infer, judge, avoid friction and decide whether a page feels credible. That is why psychology belongs inside the design process.",
      "psych.attention.title": "Stimulation density and visual rhythm",
      "psych.attention.text": "One working idea concerns animation and modern media: attention may not simply be weaker today; contemporary visual systems often concentrate movement, colour, pacing and reward more densely.",
      "psych.evidence.title": "Better claims require better framing.",
      "psych.evidence.text": "Psychological work trains careful reasoning: separate fact from inference, avoid overclaiming, consider confounds and evaluate the strength of evidence. That mindset also improves professional communication.",

      "afa.kicker": "Case study / Asia for Animals",
      "afa.title": "A donation focused digital presence for a global coalition.",
      "afa.lead": "Asia for Animals needed more than a website refresh. The project required a unifying digital presence that could clarify the coalition’s mission, support global donors and give Network Member Organisations a stronger shared platform.",
      "afa.side": "The goal was to create a platform that feels visually arresting, culturally fluent and emotionally direct, while making the path to learning, joining, donating and engaging significantly easier to understand.",
      "afa.visit": "Visit website",
      "afa.next": "Next project",
      "afa.outcome.kicker": "Outcome",
      "afa.outcome.title": "Clearer journeys, stronger narrative and measurable growth.",
      "afa.outcome.text": "The redesign connected emotional storytelling with practical UX: clearer navigation, stronger mission visibility and more direct calls to action.",
      "afa.research.kicker": "Research",
      "afa.research.title": "The problem was mission clarity and navigation depth.",
      "afa.research.p1": "The research phase examined established advocacy organisations such as WWF and ASPCA to identify effective donation flows, high impact messaging and credibility patterns. Existing metrics highlighted opportunities for traffic growth, regional reach and engagement improvement.",
      "afa.research.p2": "User surveys pointed to repeated friction: visitors found navigation too complex and the mission was not visible quickly enough. For a cause driven organisation, that delay matters. AfA’s story needed to surface in seconds.",
      "afa.process.kicker": "Process",
      "afa.process.title": "From research to a clearer action system.",
      "afa.process.text": "The project moved from evidence gathering to journey mapping, then into visual design and prototype validation.",
      "afa.design.title": "Bold, compassionate and clear.",
      "afa.design.p1": "The visual system uses strong red accents for urgency and action, black for authority, white for clarity and calm neutrals to let mission focused imagery carry emotional weight.",
      "afa.design.p2": "Subtle East Asian visual references create cultural familiarity without turning the design into cliché. The goal was a confident advocacy identity: direct enough to convert, refined enough to build trust.",
      "afa.interface.title": "Emotion first, action close behind.",
      "afa.interface.p1": "The homepage was designed to communicate scale, urgency and credibility immediately. Large hero messaging explains the network’s role, while donation and coalition prompts remain visible without overwhelming the user.",
      "afa.interface.p2": "Decluttered sections guide attention toward the organisation’s core actions: learn, donate, volunteer, join and engage with the wider coalition.",
      "afa.conclusion.title": "Design empathy turned complexity into momentum.",
      "afa.conclusion.p1": "AfA’s digital transformation shows how a cause driven website can become clearer, more emotionally resonant and more action oriented when UX, visual identity and organisational goals are treated as one system.",
      "afa.conclusion.p2": "The result is a platform that makes the coalition easier to understand, easier to join and easier to support.",

      "catalina.kicker": "Case study / Catalina Film Festival",
      "catalina.title": "Catalina Film Festival: creative direction and lighter web systems.",
      "catalina.lead": "A website direction for a film festival that needs visual atmosphere, clearer journeys and a more maintainable operating model.",
      "catalina.side": "Catalina is the creative anchor of the portfolio: cinema, island identity, editorial rhythm and practical digital infrastructure working together.",


      "catalina.kicker": "Case study / Catalina Film Institute",
      "catalina.title": "Rebuilding a cinematic digital presence to recover momentum.",
      "catalina.lead": "Catalina needed a website direction that could feel premium, clarify the festival journey and support a commercial recovery after the disruption of the COVID period.",
      "catalina.side": "The project connected the Institute’s cinematic identity with a cleaner content system, stronger calls to action and a more confident visual language across desktop and mobile.",
      "catalina.outcome.kicker": "Commercial outcome",
      "catalina.outcome.title": "The redesign helped bring the numbers back up and restore pre COVID sales momentum.",
      "catalina.outcome.text": "The site was not treated as a visual refresh only. It became part of the commercial recovery: clearer routes, stronger presentation, more confidence and easier access to the actions that matter.",
      "catalina.kpi1.title": "Sales recovery",
      "catalina.kpi1.text": "Sales returned to pre COVID levels after the digital direction and public facing experience improved.",
      "catalina.kpi2.title": "Higher numbers",
      "catalina.kpi2.text": "The project contributed to stronger engagement and commercially meaningful growth.",
      "catalina.kpi3.title": "Clearer journeys",
      "catalina.kpi3.text": "Visitors could move more easily from festival atmosphere to submissions, support, cart and information.",
      "catalina.kpi4.title": "Stronger identity",
      "catalina.kpi4.text": "The Institute’s heritage became more visible through typography, colour, imagery and editorial rhythm.",
      "catalina.problem.kicker": "Problem",
      "catalina.problem.title": "The festival needed more than a beautiful homepage.",
      "catalina.problem.p1": "The old experience had to support several audiences at once: festival visitors, filmmakers, donors, partners and merchandise buyers. The challenge was to make Catalina feel cinematic while keeping the system practical and easy to navigate.",
      "catalina.problem.p2": "The priority was commercial as well as aesthetic: rebuild confidence, make the offer clearer and help the festival return to stronger pre COVID levels of performance.",
      "catalina.design.kicker": "Design system",
      "catalina.design.title": "A visual language based on cinema, heritage and restraint.",
      "catalina.design.p1": "The system uses deep navy, warm gold, ivory and restrained neutrals to create a premium cinematic tone. Trajan Pro gives the brand a film institution quality, while Montserrat keeps longer content readable and practical.",
      "catalina.design.p2": "The design system defines buttons, typography, form elements, cards, spacing and imagery rules so the site can remain elegant without becoming inconsistent as it grows.",
      "catalina.process.kicker": "Process",
      "catalina.process.title": "From atmosphere to action.",
      "catalina.process.text": "The design moved from cinematic impression to practical conversion: users needed to understand the festival, find the right pathway and act without unnecessary friction.",
      "catalina.step1.title": "Editorial identity",
      "catalina.step1.text": "A richer cinematic language was introduced through Avalon imagery, dark overlays, refined type and warm gold accents.",
      "catalina.step2.title": "User pathways",
      "catalina.step2.text": "The experience was structured around the routes that matter: discover the festival, submit, support, shop, learn and contact.",
      "catalina.step3.title": "Responsive experience",
      "catalina.step3.text": "Mobile layouts were treated as a core experience, not a reduced version of desktop.",
      "catalina.step4.title": "Commercial focus",
      "catalina.step4.text": "Calls to action around support, cart, submissions and discovery were made more visible and easier to follow.",
      "catalina.mobile.kicker": "Mobile",
      "catalina.mobile.title": "A premium experience had to work in the hand.",
      "catalina.mobile.p1": "The mobile design keeps the Institute’s cinematic tone while prioritising reading clarity, simpler controls and stronger vertical rhythm.",
      "catalina.mobile.p2": "This matters because festival discovery, sharing and return visits often happen on mobile before a user commits to a larger action.",
      "catalina.conclusion.kicker": "Conclusion",
      "catalina.conclusion.title": "The site became a recovery tool, not just a brand surface.",
      "catalina.conclusion.p1": "The Catalina work shows how design, computing and commercial strategy can support one another. A stronger visual identity made the festival feel more premium; clearer journeys made action easier; and the improved experience helped bring numbers and sales back toward pre COVID strength.",
      "catalina.conclusion.p2": "The result is a more confident digital presence: cinematic enough for a film institution, practical enough for a working festival.",
      "catalina.next.kicker": "Next project",
      "catalina.next.text": "Donation focused UX and design system for a global animal advocacy coalition.",
      "catalina.next.cta": "Open AFA case",


      "catalina.results.kicker": "Verified results",
      "catalina.results.title": "August returned to 2019 level performance.",
      "catalina.results.text": "The August web report showed that the recent work on the site was helping Catalina return to peak performance: traffic reached the strongest level since 2019, with the month still not finished.",
      "catalina.result1.value": "≈4,800",
      "catalina.result1.label": "views already reached in August: the best result since 2019.",
      "catalina.result2.value": "184/day",
      "catalina.result2.label": "average daily views, putting August on track to match or surpass the 2019 peak.",
      "catalina.result3.value": "542",
      "catalina.result3.label": "referrals from Google, the strongest individual referral source.",
      "catalina.result4.value": "65%",
      "catalina.result4.label": "desktop usage, with smartphones contributing a further 32% of device traffic.",
      "catalina.breakdown1.title": "Geography",
      "catalina.breakdown1.text": "North America represented around 93% of visitors, followed by Europe at 5.5% and Asia at 1.6%.",
      "catalina.breakdown2.title": "Devices and browsers",
      "catalina.breakdown2.text": "Desktop remained dominant, while Chrome led browser usage at roughly 54%, followed by Mobile Safari at about 22%.",
      "catalina.breakdown3.title": "Acquisition",
      "catalina.breakdown3.text": "Search was the major driver, with Google generating 542 referrals and Facebook plus Instagram adding further reach.",


      "catalina.code.kicker": "Current build",
      "catalina.code.title": "A new version is being written completely in code.",
      "catalina.code.text": "Beyond visual direction and no code iteration, the Catalina project is moving into a custom coded website build. This makes the work stronger technically: cleaner structure, more control over performance, fewer platform constraints and a clearer foundation for future festival operations.",
      "catalina.code1.title": "Code ownership",
      "catalina.code1.text": "A custom front end gives the project more control over layout, interaction and long term maintainability.",
      "catalina.code2.title": "Performance logic",
      "catalina.code2.text": "The new build can be structured around lightweight assets, responsive images and simpler public pages.",
      "catalina.code3.title": "Festival scalability",
      "catalina.code3.text": "Programme pages, partners, editorial content and commerce links can be organised as reusable systems.",
      "catalina.magazine.kicker": "Editorial magazine",
      "catalina.magazine.title": "A published editorial object for programme, style and partner visibility.",
      "catalina.magazine.text": "The magazine extends the website direction into a premium editorial format: full bleed imagery, restrained copy, sponsor hierarchy and a luxury island weekend rhythm.",
      "catalina.magazine.open": "Open magazine PDF",


      "home.identity.kicker": "Professional identity",
      "home.identity.title": "Design, code, film judgement and research sit in the same practice.",
      "home.identity.text": "The site now reflects the work more accurately: digital products, editorial systems, festival projects, animation evaluation and a research baseline on attention and media design.",
      "home.identity1.label": "Judge",
      "home.identity1.title": "Script and animation film judging",
      "home.identity1.text": "I judge scripts and animated films for Catalina Film Festival, reading story, rhythm, visual craft, audience clarity and emotional coherence as evaluative systems.",
      "home.identity2.label": "Research",
      "home.identity2.title": "Children’s animation and attention",
      "home.identity2.text": "My research baseline studies how audiovisual stimulation, platform expectations, viewing context and genre shape children’s attention.",
      "home.identity3.label": "Build",
      "home.identity3.title": "Digital systems in code",
      "home.identity3.text": "The Catalina work now includes a new full code website build, extending the project from visual direction into technical ownership.",
      "profile.media.kicker": "Media judgement",
      "profile.media.title": "Film evaluation is part of the practice.",
      "profile.media.text": "My work with Catalina also includes judging scripts and animated films. That role connects creative evaluation with the same concerns that shape my digital work: structure, pacing, visual clarity, audience engagement and emotional logic.",
      "profile.media1.label": "Story",
      "profile.media1.title": "Narrative structure",
      "profile.media1.text": "I look at premise, development, rhythm, clarity, stakes and whether the story earns attention.",
      "profile.media2.label": "Animation",
      "profile.media2.title": "Visual and emotional craft",
      "profile.media2.text": "Animation is assessed through visual rhythm, emotional coherence, tone, world building and audience fit.",
      "profile.media3.label": "Digital",
      "profile.media3.title": "From judging to interface work",
      "profile.media3.text": "The same evaluative discipline helps me read websites as experiences with pacing, hierarchy, friction and narrative flow.",
      "work.judge.title": "Script and animation film judging",
      "work.judge.text": "Judging scripts and animated films for Catalina Film Festival, with attention to story logic, visual craft, pacing, audience clarity and emotional coherence.",
      "work.research.title": "Children’s animation, attention and stimulation",
      "work.research.text": "A research baseline on whether children’s attention should be understood through media design, audiovisual density, platform expectations and viewing context, rather than through attention span alone.",
      "work.open": "Open",
      "research.kicker": "Research baseline",
      "research.title": "Children’s animation, attention and audiovisual stimulation.",
      "research.p1": "The research questions the simple claim that children are less attentive. The stronger frame is that attention is shaped by media design, viewing context, platform expectations, genre, age group and environmental distraction.",
      "research.p2": "The project compares different attentional strategies in animation. Some content uses sensory density and rapid pacing. Other content remains deliberately slower, regulated and educational. The question is what assumptions about attention are built into the media environment.",
      "research.measure1": "Average shot length, cuts per minute and frequency of scene changes.",
      "research.measure2": "On screen movement, colour saturation, background density and sound cues.",
      "research.measure3": "Silence, stillness, emotional complexity and scenes without dialogue.",
      "research.measure4": "Differences between film, television, streaming and short form platform content.",
      "judge.kicker": "Festival judging",
      "judge.title": "Judging animation sharpens the research question.",
      "judge.p1": "Judging animated films for Catalina Film Festival gives the research a practical evaluative layer. It means looking at how story, pacing, visual rhythm, emotional coherence and audience fit work together.",
      "judge.criteria.title": "Evaluation criteria",
      "judge.criteria1": "Narrative clarity and emotional development.",
      "judge.criteria2": "Visual craft, rhythm and world building.",
      "judge.criteria3": "Audience engagement without reducing attention to speed.",
      "judge.criteria4": "Balance between sensory intensity and narrative patience.",

      "profile.principle1.label": "Creative",
      "profile.principle1.title": "Atmosphere with purpose",
      "profile.principle1.text": "Visual language should create identity, but it must still serve navigation, comprehension and trust.",
      "profile.principle2.label": "Computing",
      "profile.principle2.title": "Simple code, lower burden",
      "profile.principle2.text": "Efficient front end systems are easier to maintain, faster to load and less fragile over time.",
      "profile.principle3.label": "Design",
      "profile.principle3.title": "Editorial restraint",
      "profile.principle3.text": "Smaller readable fonts, balanced spacing and subtle motion create a more mature interface.",
      "profile.principle4.label": "Psychology",
      "profile.principle4.title": "Human interpretation matters",
      "profile.principle4.text": "People judge credibility quickly. Cognitive load, tone, evidence and clarity shape that judgement.",
      "work.catalina.title": "Catalina Film Festival: creative web direction",
      "work.catalina.text": "Creative direction, design system, responsive UX, magazine concept and full code rebuild for a film institution, with August traffic reaching about 4,800 views, the best result since 2019.",
      "work.tag.creativeDirection": "Creative direction",
      "work.tag.festival": "Festival",
      "work.tag.editorialUx": "Editorial UX",
      "psych.use.title": "Use in digital work",
      "psych.use1": "Motion should guide attention, not compete with content.",
      "psych.use2": "Visual intensity needs pacing and contrast.",
      "psych.use3": "Interfaces should reduce cognitive load at decision points.",
      "psych.applied.title": "Applied principles",
      "psych.applied1": "Do not invent outcomes.",
      "psych.applied2": "Make claims proportionate to evidence.",
      "psych.applied3": "Use structure to make complex ideas easier to evaluate.",
      "contact.kicker": "Contact",
      "contact.title": "For focused project conversations.",
      "contact.lead": "Contact me for digital direction, web systems, creative website concepts, professional identity or psychology informed analysis.",
      "contact.side": "A useful first message includes the project type, current material if available, main problem, timeline and whether you need strategy, design direction, implementation or writing.",
      "contact.emailText": "Use email for serious enquiries. I do not need a long brief at the first step; clear context is enough.",
      "contact.openEmail": "Open email",
      "contact.name": "Name",
      "contact.email": "Email",
      "contact.subject": "Subject",
      "contact.message": "Message",
      "contact.write": "Write email",
      "contact.note": "The form opens your email application. The site does not store the message.",

      "privacy.kicker": "Privacy",
      "privacy.title": "Minimal by default.",
      "privacy.lead": "The website avoids unnecessary data collection.",
      "privacy.side": "There are no analytics scripts, advertising scripts or server side contact form storage included by default.",
      "privacy.local.title": "Local preferences",
      "privacy.local.text": "Theme choice and dyslexia friendly mode are saved locally in the visitor’s browser so the selected reading environment can persist.",
      "privacy.data.title": "Data approach"
    },
    it: {
      "nav.home": "Home",
      "nav.profile": "Profilo",
      "nav.work": "Lavori",
      "nav.psychology": "Psicologia",
      "nav.contact": "Contatti",
      "ui.dyslexia": "Dyslexia",
      "ui.dark": "Scuro",
      "ui.light": "Chiaro",
      "ui.menu": "Menu",

      "home.kicker": "Sistemi creativi / lavoro digitale professionale",
      "home.title": "Lavoro digitale chiaro, con un lato umano.",
      "home.lead": "Unisco direzione creativa, computing, design e psicologia per costruire esperienze digitali raffinate, usabili e strategicamente precise.",
      "home.meta1": "Asia for Animals",
      "home.meta2": "Catalina Film Festival",
      "home.meta3": "Sistemi web",
      "home.meta4": "UX informata dalla psicologia",
      "home.ctaWork": "Vedi lavori",
      "home.ctaAfa": "Lavori di UX strategica",
      "home.note": "La pratica unisce quattro lati professionali: direzione creativa, computing, sistemi di design e giudizio digitale informato dalla psicologia.",
      "home.portraitNote": "Direzione creativa · Computing · Design · Psicologia",

      "home.four.kicker": "Framework di pratica",
      "home.four.title": "Una pratica di studio costruita su strategia, sistemi e giudizio.",
      "home.four.text": "Non separo il design dall’implementazione né la ricerca dalla consegna. Ogni progetto prende forma attraverso quattro capacità che trasformano la complessità in un risultato digitale chiaro.",
      "home.cap1.label": "01 / UX strategica",
      "home.cap1.title": "Sistemi di UX strategica",
      "home.cap1.text": "Chiarezza della missione, architettura dei journey e pensiero da design system per organizzazioni con pubblici complessi.",
      "home.cap2.label": "02 / Delivery tecnica",
      "home.cap2.title": "Siti custom coded",
      "home.cap2.text": "Sistemi front end leggeri, interfacce responsive e strutture di build pensate per controllo, velocità e manutenibilità.",
      "home.cap3.label": "03 / Sistemi visivi",
      "home.cap3.title": "Identità e direzione editoriale",
      "home.cap3.text": "Tipografia, gerarchia, immagini e regole di interfaccia che fanno percepire le organizzazioni come coerenti, premium e credibili.",
      "home.cap4.label": "04 / Giudizio di ricerca",
      "home.cap4.title": "Psicologia, media e attenzione",
      "home.cap4.text": "Analisi di attenzione, interpretazione del pubblico e valutazione dell’animazione usate per rendere più precise le decisioni digitali.",

      "home.working.kicker": "Ambiente di lavoro",
      "home.working.title": "Le decisioni di design nascono dentro il sistema, non attorno ad esso.",
      "home.working.text": "Il lavoro è pratico: testare la struttura, leggere l’interfaccia come un utente, rifinire i percorsi di contenuto e ridurre ciò che può distrarre o rompersi.",
      "home.working.cta": "Vedi il case Catalina",

      "home.featured.kicker": "Lavori in evidenza",
      "home.featured.title": "Case study con punti di forza diversi.",
      "home.featured.text": "AFA mostra UI/UX, no code development, user journey mapping e design system. Catalina mostra direzione creativa e architettura web leggera.",
      "home.afa.title": "Asia for Animals: piattaforma digitale orientata alla donazione",
      "home.afa.text": "Una piattaforma visivamente forte e culturalmente fluida, progettata per chiarire la missione della coalizione, semplificare la navigazione e sostenere l’azione dei donatori.",
      "home.catalina.title": "Catalina Film Festival: direzione web creativa",
      "home.catalina.text": "Direzione per un sito festival che combina atmosfera cinematografica, layout editoriale, percorsi di contenuto più chiari e infrastruttura più leggera.",
      "home.openCase": "Apri case",

      "home.style.kicker": "Stile di lavoro",
      "home.style.title": "Bello, ma non decorativo.",
      "home.style.text": "Il lavoro usa identità visiva, pensiero sistemico e giudizio psicologico per ridurre l’attrito e rendere le esperienze digitali più persuasive.",
      "home.profileCta": "Leggi profilo",
      "home.contact.kicker": "Contatti",
      "home.contact.title": "Per conversazioni di progetto mirate.",
      "home.contact.text": "Contattami per UI/UX, direzione digitale, sistemi web, concept creativi, identità professionale o analisi informata dalla psicologia.",
      "home.copy": "Copia email",

      "profile.kicker": "Profilo",
      "profile.title": "Una pratica digitale modellata da sistemi e persone.",
      "profile.lead": "Lavoro tra direzione creativa, computing, design e analisi informata dalla psicologia. Il filo conduttore è la chiarezza: rendere gli spazi digitali più comprensibili, credibili e usabili.",
      "profile.side": "Tratto i siti come sistemi funzionanti, non come poster online. Struttura, codice, scrittura, ritmo visivo e interpretazione umana influenzano la credibilità di un progetto.",
      "profile.focus.title": "Focus professionale",
      "profile.focus.p1": "Costruisco e dirigo esperienze digitali pulite per progetti che devono sentirsi seri senza diventare freddi. Il mio lavoro combina implementazione front end, struttura dei contenuti, giudizio visivo e una lettura psicologica di come le persone leggono, scansionano e decidono.",
      "profile.focus.p2": "L’obiettivo è semplice: una presenza digitale abbastanza bella da essere ricordata e abbastanza chiara da essere utile.",
      "profile.principles.kicker": "Principi",
      "profile.principles.title": "Il lavoro è progettato per sembrare controllato.",
      "profile.principles.text": "La sicurezza visiva nasce da gerarchia, movimento, spazio e precisione, non dall’aggiungere box a ogni sezione.",

      "work.kicker": "Lavori",
      "work.title": "Lavoro creativo, tecnico e strategico.",
      "work.lead": "Un archivio mirato di direzioni progettuali tra UI/UX, no code development, computing, design e comunicazione informata dalla psicologia.",
      "work.side": "Il lavoro è organizzato per competenze, non per decorazione: direzione creativa, sistemi front end, identità visiva e ragionamento human centred.",
      "work.filter.all": "Tutti",
      "work.filter.creative": "Creativo",
      "work.filter.computing": "Computing",
      "work.filter.design": "Design",
      "work.filter.psychology": "Psicologia",
      "work.afa.title": "Asia for Animals: piattaforma digitale e UX orientata alla donazione",
      "work.afa.text": "UI/UX e no code development per una coalizione globale di animal advocacy: chiarezza della missione, user journey più forti, design system, focus donazioni e visual culturalmente fluenti.",
      "work.computing.title": "Sistemi web static first e no code",
      "work.computing.text": "Siti professionali strutturati per velocità, accessibilità, portabilità e minore dipendenza operativa.",
      "work.design.title": "Identità professionale e interfacce editoriali",
      "work.design.text": "Sistemi visivi che usano atmosfera, tipografia, spaziatura e movimento senza trasformare ogni sezione in una card commerciale.",
      "work.psych.title": "Giudizio digitale informato dalla psicologia",
      "work.psych.text": "Analisi di attenzione, fiducia, evidenza e carico cognitivo applicata a comunicazione, media e decisioni d’interfaccia.",
      "work.discuss": "Parliamone",

      "psych.kicker": "Psicologia",
      "psych.title": "Psicologia applicata ad attenzione, fiducia ed evidenza.",
      "psych.lead": "La psicologia informa il modo in cui penso il lavoro digitale: come le persone leggono, cosa notano, cosa reputano credibile e dove le interfacce generano attrito cognitivo.",
      "psych.side": "Questo lato della pratica sostiene decisioni di design e comunicazione. È attento all’evidenza, cauto nei claim e focalizzato sull’interpretazione, non sulla decorazione.",
      "psych.human.kicker": "Fattori umani",
      "psych.human.title": "L’interfaccia è anche un ambiente psicologico.",
      "psych.human.text": "Le persone non leggono gli spazi digitali in modo neutrale. Scansionano, inferiscono, giudicano, evitano attrito e decidono se una pagina appare credibile. Per questo la psicologia appartiene al processo di design.",
      "psych.attention.title": "Densità di stimolazione e ritmo visivo",
      "psych.attention.text": "Una linea di lavoro riguarda animazione e media contemporanei: l’attenzione potrebbe non essere semplicemente più debole; spesso i sistemi visivi contemporanei concentrano movimento, colore, ritmo e ricompensa in modo più denso.",
      "psych.evidence.title": "Claim migliori richiedono framing migliore.",
      "psych.evidence.text": "Il lavoro psicologico allena un ragionamento accurato: separare fatto e inferenza, evitare overclaiming, considerare confound e valutare la forza dell’evidenza. Questo migliora anche la comunicazione professionale.",

      "afa.kicker": "Case study / Asia for Animals",
      "afa.title": "Una presenza digitale orientata alla donazione per una coalizione globale.",
      "afa.lead": "Asia for Animals aveva bisogno di più di un refresh del sito. Il progetto richiedeva una presenza digitale unificante, capace di chiarire la missione della coalizione, sostenere donatori globali e offrire alle Network Member Organisations una piattaforma condivisa più forte.",
      "afa.side": "L’obiettivo era creare una piattaforma visivamente forte, culturalmente fluida ed emotivamente diretta, rendendo più semplice il percorso verso apprendimento, adesione, donazione e partecipazione.",
      "afa.visit": "Visita sito",
      "afa.next": "Prossimo progetto",
      "afa.outcome.kicker": "Risultato",
      "afa.outcome.title": "Percorsi più chiari, narrativa più forte e crescita misurabile.",
      "afa.outcome.text": "Il redesign ha collegato storytelling emotivo e UX pratica: navigazione più chiara, maggiore visibilità della missione e call to action più dirette.",
      "afa.research.kicker": "Ricerca",
      "afa.research.title": "Il problema era chiarezza della missione e profondità della navigazione.",
      "afa.research.p1": "La fase di ricerca ha esaminato organizzazioni consolidate come WWF e ASPCA per identificare donation flow efficaci, messaging ad alto impatto e pattern di credibilità. Le metriche esistenti hanno evidenziato opportunità di crescita del traffico, reach regionale e miglioramento dell’engagement.",
      "afa.research.p2": "I survey utenti indicavano frizioni ripetute: navigazione troppo complessa e missione non visibile abbastanza rapidamente. Per un’organizzazione cause driven, quel ritardo pesa. La storia di AfA doveva emergere in pochi secondi.",
      "afa.process.kicker": "Processo",
      "afa.process.title": "Dalla ricerca a un sistema d’azione più chiaro.",
      "afa.process.text": "Il progetto è passato dalla raccolta di evidenze alla mappatura dei journey, poi al design visivo e alla validazione del prototipo.",
      "afa.design.title": "Audace, compassionevole e chiaro.",
      "afa.design.p1": "Il sistema visivo usa accenti rossi per urgenza e azione, nero per autorevolezza, bianco per chiarezza e neutri calmi per lasciare alle immagini mission focused il peso emotivo.",
      "afa.design.p2": "Riferimenti visivi est asiatici sottili creano familiarità culturale senza trasformarsi in cliché. L’obiettivo era un’identità advocacy sicura: abbastanza diretta da convertire, abbastanza raffinata da costruire fiducia.",
      "afa.interface.title": "Prima l’emozione, subito dopo l’azione.",
      "afa.interface.p1": "La homepage è stata progettata per comunicare immediatamente scala, urgenza e credibilità. Il messaggio hero spiega il ruolo del network, mentre donation e coalition prompts restano visibili senza sovraccaricare l’utente.",
      "afa.interface.p2": "Sezioni più pulite guidano l’attenzione verso le azioni centrali dell’organizzazione: learn, donate, volunteer, join e partecipazione alla coalition.",
      "afa.conclusion.title": "L’empatia nel design ha trasformato complessità in slancio.",
      "afa.conclusion.p1": "La trasformazione digitale di AfA mostra come un sito cause driven possa diventare più chiaro, emotivamente risonante e orientato all’azione quando UX, identità visiva e obiettivi organizzativi vengono trattati come un unico sistema.",
      "afa.conclusion.p2": "Il risultato è una piattaforma che rende la coalizione più facile da capire, più facile da raggiungere e più facile da sostenere.",

      "catalina.kicker": "Case study / Catalina Film Festival",
      "catalina.title": "Catalina Film Festival: direzione creativa e sistemi web più leggeri.",
      "catalina.lead": "Una direzione web per un festival cinematografico che richiede atmosfera visiva, percorsi più chiari e un modello operativo più manutenibile.",
      "catalina.side": "Catalina è l’ancora creativa del portfolio: cinema, identità dell’isola, ritmo editoriale e infrastruttura digitale pratica che lavorano insieme.",


      "catalina.kicker": "Case study / Catalina Film Institute",
      "catalina.title": "Ricostruire una presenza digitale cinematografica per recuperare slancio.",
      "catalina.lead": "Catalina aveva bisogno di una direzione web capace di sembrare premium, chiarire il percorso festival e sostenere la ripresa commerciale dopo la discontinuità del periodo COVID.",
      "catalina.side": "Il progetto ha collegato l’identità cinematografica dell’Institute a un sistema di contenuti più pulito, call to action più forti e un linguaggio visivo più sicuro su desktop e mobile.",
      "catalina.outcome.kicker": "Risultato commerciale",
      "catalina.outcome.title": "Il redesign ha aiutato a riportare i numeri in alto e a recuperare il ritmo di vendita pre COVID.",
      "catalina.outcome.text": "Il sito non è stato trattato come un semplice refresh visivo. È diventato parte della ripresa commerciale: percorsi più chiari, presentazione più forte, maggiore fiducia e accesso più semplice alle azioni importanti.",
      "catalina.kpi1.title": "Recupero vendite",
      "catalina.kpi1.text": "Le vendite sono tornate a livelli pre COVID dopo il miglioramento della direzione digitale e dell’esperienza pubblica.",
      "catalina.kpi2.title": "Numeri più alti",
      "catalina.kpi2.text": "Il progetto ha contribuito a maggiore engagement e crescita commercialmente significativa.",
      "catalina.kpi3.title": "Journey più chiari",
      "catalina.kpi3.text": "I visitatori potevano passare più facilmente dall’atmosfera festival a submissions, supporto, carrello e informazioni.",
      "catalina.kpi4.title": "Identità più forte",
      "catalina.kpi4.text": "L’eredità dell’Institute è diventata più visibile attraverso tipografia, colore, immagini e ritmo editoriale.",
      "catalina.problem.kicker": "Problema",
      "catalina.problem.title": "Il festival aveva bisogno di più di una bella homepage.",
      "catalina.problem.p1": "La vecchia esperienza doveva servire più pubblici contemporaneamente: visitatori, filmmaker, donatori, partner e acquirenti merchandise. La sfida era far sembrare Catalina cinematografica mantenendo il sistema pratico e facile da navigare.",
      "catalina.problem.p2": "La priorità era commerciale oltre che estetica: ricostruire fiducia, rendere l’offerta più chiara e aiutare il festival a tornare a livelli di performance più vicini al pre COVID.",
      "catalina.design.kicker": "Design system",
      "catalina.design.title": "Un linguaggio visivo basato su cinema, heritage e controllo.",
      "catalina.design.p1": "Il sistema usa navy profondo, oro caldo, ivory e neutri controllati per creare un tono cinematografico premium. Trajan Pro dà qualità istituzionale al brand, mentre Montserrat mantiene leggibili i contenuti lunghi.",
      "catalina.design.p2": "Il design system definisce bottoni, tipografia, form, card, spacing e regole immagini, così il sito può crescere restando elegante e coerente.",
      "catalina.process.kicker": "Processo",
      "catalina.process.title": "Dall’atmosfera all’azione.",
      "catalina.process.text": "Il design è passato dall’impressione cinematografica alla conversione pratica: gli utenti dovevano capire il festival, trovare il percorso giusto e agire senza attrito inutile.",
      "catalina.step1.title": "Identità editoriale",
      "catalina.step1.text": "È stato introdotto un linguaggio più cinematografico attraverso immagini di Avalon, overlay scuri, tipografia raffinata e accenti oro.",
      "catalina.step2.title": "Percorsi utente",
      "catalina.step2.text": "L’esperienza è stata strutturata attorno ai percorsi che contano: scoprire il festival, inviare, sostenere, acquistare, informarsi e contattare.",
      "catalina.step3.title": "Esperienza responsive",
      "catalina.step3.text": "Il mobile è stato trattato come esperienza centrale, non come versione ridotta del desktop.",
      "catalina.step4.title": "Focus commerciale",
      "catalina.step4.text": "Le call to action su supporto, carrello, submissions e discovery sono state rese più visibili e facili da seguire.",
      "catalina.mobile.kicker": "Mobile",
      "catalina.mobile.title": "Un’esperienza premium doveva funzionare anche in mano.",
      "catalina.mobile.p1": "Il design mobile mantiene il tono cinematografico dell’Institute dando priorità a leggibilità, controlli semplici e ritmo verticale più forte.",
      "catalina.mobile.p2": "Questo conta perché discovery, condivisione e visite di ritorno spesso avvengono su mobile prima che l’utente compia un’azione più grande.",
      "catalina.conclusion.kicker": "Conclusione",
      "catalina.conclusion.title": "Il sito è diventato uno strumento di recupero, non solo una superficie di brand.",
      "catalina.conclusion.p1": "Il lavoro su Catalina mostra come design, computing e strategia commerciale possano sostenersi a vicenda. Un’identità visiva più forte ha reso il festival più premium; journey più chiari hanno reso l’azione più facile; e l’esperienza migliorata ha aiutato numeri e vendite a tornare verso la forza pre COVID.",
      "catalina.conclusion.p2": "Il risultato è una presenza digitale più sicura: abbastanza cinematografica per un istituto di cinema, abbastanza pratica per un festival operativo.",
      "catalina.next.kicker": "Prossimo progetto",
      "catalina.next.text": "UX orientata alla donazione e design system per una coalizione globale di animal advocacy.",
      "catalina.next.cta": "Apri il case AFA",


      "catalina.results.kicker": "Risultati verificati",
      "catalina.results.title": "Agosto è tornato a livelli di performance del 2019.",
      "catalina.results.text": "Il report web di agosto mostra che il lavoro recente sul sito stava aiutando Catalina a tornare a una performance di picco: il traffico ha raggiunto il livello più forte dal 2019, con il mese non ancora concluso.",
      "catalina.result1.value": "≈4.800",
      "catalina.result1.label": "visualizzazioni già raggiunte ad agosto: il miglior risultato dal 2019.",
      "catalina.result2.value": "184/giorno",
      "catalina.result2.label": "visualizzazioni medie giornaliere, con agosto in traiettoria per eguagliare o superare il picco del 2019.",
      "catalina.result3.value": "542",
      "catalina.result3.label": "referral da Google, la fonte individuale più forte.",
      "catalina.result4.value": "65%",
      "catalina.result4.label": "uso desktop, con smartphone responsabili di un ulteriore 32% del traffico device.",
      "catalina.breakdown1.title": "Geografia",
      "catalina.breakdown1.text": "Il Nord America rappresentava circa il 93% dei visitatori, seguito dall’Europa al 5,5% e dall’Asia all’1,6%.",
      "catalina.breakdown2.title": "Device e browser",
      "catalina.breakdown2.text": "Il desktop è rimasto dominante, mentre Chrome guidava l’uso browser con circa il 54%, seguito da Mobile Safari con circa il 22%.",
      "catalina.breakdown3.title": "Acquisizione",
      "catalina.breakdown3.text": "La ricerca è stata il driver principale, con Google a 542 referral e Facebook più Instagram come reach aggiuntiva.",


      "catalina.code.kicker": "Build attuale",
      "catalina.code.title": "La nuova versione viene scritta completamente in codice.",
      "catalina.code.text": "Oltre alla direzione visiva e all’iterazione no code, il progetto Catalina si sta spostando verso un sito custom coded. Questo rafforza il lavoro sul piano tecnico: struttura più pulita, maggiore controllo sulle performance, meno vincoli di piattaforma e una base più chiara per le future operazioni del festival.",
      "catalina.code1.title": "Controllo del codice",
      "catalina.code1.text": "Un front end custom dà al progetto più controllo su layout, interazione e manutenibilità a lungo termine.",
      "catalina.code2.title": "Logica di performance",
      "catalina.code2.text": "Il nuovo build può essere strutturato attorno ad asset leggeri, immagini responsive e pagine pubbliche più semplici.",
      "catalina.code3.title": "Scalabilità festival",
      "catalina.code3.text": "Programma, partner, contenuti editoriali e link commerciali possono essere organizzati come sistemi riutilizzabili.",
      "catalina.magazine.kicker": "Magazine editoriale",
      "catalina.magazine.title": "Un oggetto editoriale pubblicato per programma, stile e visibilità partner.",
      "catalina.magazine.text": "Il magazine estende la direzione del sito in un formato editoriale premium: immagini full bleed, copy controllato, gerarchia sponsor e ritmo da luxury island weekend.",
      "catalina.magazine.open": "Apri PDF magazine",


      "home.identity.kicker": "Identità professionale",
      "home.identity.title": "Design, codice, giudizio filmico e ricerca fanno parte della stessa pratica.",
      "home.identity.text": "Il sito ora riflette meglio il lavoro reale: prodotti digitali, sistemi editoriali, progetti festival, valutazione di animazione e una baseline di ricerca su attenzione e media design.",
      "home.identity1.label": "Giudice",
      "home.identity1.title": "Giudizio di script e film di animazione",
      "home.identity1.text": "Sono giudice di script e film di animazione per Catalina Film Festival, valutando storia, ritmo, qualità visiva, chiarezza per il pubblico e coerenza emotiva come sistemi.",
      "home.identity2.label": "Ricerca",
      "home.identity2.title": "Animazione per bambini e attenzione",
      "home.identity2.text": "La mia baseline di ricerca studia come stimolazione audiovisiva, aspettative di piattaforma, contesto di visione e genere modellino l’attenzione dei bambini.",
      "home.identity3.label": "Build",
      "home.identity3.title": "Sistemi digitali in codice",
      "home.identity3.text": "Il lavoro Catalina include ora un nuovo sito scritto completamente in codice, estendendo il progetto dalla direzione visiva al controllo tecnico.",
      "profile.media.kicker": "Giudizio mediale",
      "profile.media.title": "La valutazione filmica fa parte della pratica.",
      "profile.media.text": "Il mio lavoro con Catalina include anche il giudizio di script e film di animazione. Questo ruolo collega valutazione creativa e lavoro digitale: struttura, ritmo, chiarezza visiva, coinvolgimento del pubblico e logica emotiva.",
      "profile.media1.label": "Storia",
      "profile.media1.title": "Struttura narrativa",
      "profile.media1.text": "Valuto premessa, sviluppo, ritmo, chiarezza, posta in gioco e capacità della storia di meritare attenzione.",
      "profile.media2.label": "Animazione",
      "profile.media2.title": "Qualità visiva ed emotiva",
      "profile.media2.text": "L’animazione viene valutata attraverso ritmo visivo, coerenza emotiva, tono, world building e adeguatezza al pubblico.",
      "profile.media3.label": "Digitale",
      "profile.media3.title": "Dal giudizio all’interfaccia",
      "profile.media3.text": "La stessa disciplina valutativa mi aiuta a leggere i siti come esperienze con ritmo, gerarchia, attrito e flusso narrativo.",
      "work.judge.title": "Giudizio di script e film di animazione",
      "work.judge.text": "Giudico script e film di animazione per Catalina Film Festival, con attenzione a logica narrativa, qualità visiva, ritmo, chiarezza per il pubblico e coerenza emotiva.",
      "work.research.title": "Animazione per bambini, attenzione e stimolazione",
      "work.research.text": "Una baseline di ricerca su come l’attenzione dei bambini possa essere letta attraverso media design, densità audiovisiva, aspettative di piattaforma e contesto di visione, non solo attraverso l’attention span.",
      "work.open": "Apri",
      "research.kicker": "Baseline di ricerca",
      "research.title": "Animazione per bambini, attenzione e stimolazione audiovisiva.",
      "research.p1": "La ricerca mette in discussione l’idea semplice che i bambini siano meno attenti. Il frame più forte è che l’attenzione è modellata da media design, contesto di visione, aspettative di piattaforma, genere, fascia d’età e distrazione ambientale.",
      "research.p2": "Il progetto confronta diverse strategie attentive nell’animazione. Alcuni contenuti usano densità sensoriale e ritmo rapido. Altri restano volutamente più lenti, regolati ed educativi. La domanda è quali assunzioni sull’attenzione siano costruite dentro l’ambiente mediale.",
      "research.measure1": "Durata media delle inquadrature, tagli al minuto e frequenza dei cambi scena.",
      "research.measure2": "Movimento sullo schermo, saturazione colore, densità dello sfondo e cue sonori.",
      "research.measure3": "Silenzio, immobilità, complessità emotiva e scene senza dialogo.",
      "research.measure4": "Differenze tra film, televisione, streaming e contenuti brevi di piattaforma.",
      "judge.kicker": "Giudizio festival",
      "judge.title": "Giudicare animazione rende più precisa la domanda di ricerca.",
      "judge.p1": "Giudicare film di animazione per Catalina Film Festival dà alla ricerca uno strato valutativo pratico. Significa osservare come storia, ritmo, andamento visivo, coerenza emotiva e pubblico lavorino insieme.",
      "judge.criteria.title": "Criteri di valutazione",
      "judge.criteria1": "Chiarezza narrativa e sviluppo emotivo.",
      "judge.criteria2": "Qualità visiva, ritmo e world building.",
      "judge.criteria3": "Coinvolgimento del pubblico senza ridurre l’attenzione alla velocità.",
      "judge.criteria4": "Equilibrio tra intensità sensoriale e pazienza narrativa.",

      "profile.principle1.label": "Creativo",
      "profile.principle1.title": "Atmosfera con uno scopo",
      "profile.principle1.text": "Il linguaggio visivo deve creare identità, ma deve anche servire navigazione, comprensione e fiducia.",
      "profile.principle2.label": "Computing",
      "profile.principle2.title": "Codice semplice, minore carico operativo",
      "profile.principle2.text": "Sistemi front end efficienti sono più facili da mantenere, più veloci da caricare e meno fragili nel tempo.",
      "profile.principle3.label": "Design",
      "profile.principle3.title": "Controllo editoriale",
      "profile.principle3.text": "Font leggibili, spaziatura bilanciata e movimento sottile creano un’interfaccia più matura.",
      "profile.principle4.label": "Psicologia",
      "profile.principle4.title": "L’interpretazione umana conta",
      "profile.principle4.text": "Le persone giudicano rapidamente la credibilità. Carico cognitivo, tono, evidenza e chiarezza modellano quel giudizio.",
      "work.catalina.title": "Catalina Film Festival: direzione web creativa",
      "work.catalina.text": "Direzione creativa, design system, UX responsive, concept magazine e sito scritto completamente in codice per un istituto cinematografico, con circa 4.800 visualizzazioni ad agosto, il miglior risultato dal 2019.",
      "work.tag.creativeDirection": "Direzione creativa",
      "work.tag.festival": "Festival",
      "work.tag.editorialUx": "UX editoriale",
      "psych.use.title": "Uso nel lavoro digitale",
      "psych.use1": "Il movimento deve guidare l’attenzione, non competere con il contenuto.",
      "psych.use2": "L’intensità visiva ha bisogno di ritmo e contrasto.",
      "psych.use3": "Le interfacce devono ridurre il carico cognitivo nei punti decisionali.",
      "psych.applied.title": "Principi applicati",
      "psych.applied1": "Non inventare risultati.",
      "psych.applied2": "Rendere i claim proporzionati all’evidenza.",
      "psych.applied3": "Usare la struttura per rendere le idee complesse più facili da valutare.",
      "contact.kicker": "Contatti",
      "contact.title": "Per conversazioni di progetto mirate.",
      "contact.lead": "Contattami per direzione digitale, sistemi web, concept creativi, identità professionale o analisi informata dalla psicologia.",
      "contact.side": "Un primo messaggio utile include tipo di progetto, materiali disponibili, problema principale, timeline e se serve strategia, design direction, implementazione o scrittura.",
      "contact.emailText": "Usa l’email per richieste serie. Al primo passaggio non serve un brief lunghissimo; basta un contesto chiaro.",
      "contact.openEmail": "Apri email",
      "contact.name": "Nome",
      "contact.email": "Email",
      "contact.subject": "Oggetto",
      "contact.message": "Messaggio",
      "contact.write": "Scrivi email",
      "contact.note": "Il form apre la tua app email. Il sito non archivia il messaggio.",

      "privacy.kicker": "Privacy",
      "privacy.title": "Minimale di default.",
      "privacy.lead": "Il sito evita raccolte dati non necessarie.",
      "privacy.side": "Di default non include script analytics, pubblicità o archiviazione server side del form contatti.",
      "privacy.local.title": "Preferenze locali",
      "privacy.local.text": "La scelta del tema e la modalità dyslexia friendly vengono salvate localmente nel browser del visitatore.",
      "privacy.data.title": "Approccio ai dati"
    }
  };

  const langButtons = document.querySelectorAll("[data-lang]");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const dyslexiaToggle = document.querySelector("[data-dyslexia-toggle]");

  window.applySiteLanguage = applyLanguage;

  function applyLanguage(lang) {
    const dictionary = translations[lang] || translations.en;
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (dictionary[key]) element.textContent = dictionary[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const key = element.getAttribute("data-i18n-placeholder");
      if (dictionary[key]) element.setAttribute("placeholder", dictionary[key]);
    });

    langButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.getAttribute("data-lang") === lang));
    });

    localStorage.setItem("site-lang", lang);

    if (themeToggle) {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      themeToggle.textContent = isDark ? dictionary["ui.light"] : dictionary["ui.dark"];
    }
    if (dyslexiaToggle) dyslexiaToggle.textContent = dictionary["ui.dyslexia"];
    document.querySelectorAll("[data-menu-button]").forEach((button) => button.textContent = dictionary["ui.menu"]);
  }

  langButtons.forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.getAttribute("data-lang")));
  });

  const saved = localStorage.getItem("site-lang");
  const browser = navigator.language && navigator.language.toLowerCase().startsWith("it") ? "it" : "en";
  applyLanguage(saved || browser);
})();




// Mobile hamburger aria labels.
(function () {
  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }
  ready(function () {
    const body = document.body;
    const button = document.querySelector("[data-sl-menu-open]");
    const menu = document.querySelector("[data-sl-mobile-menu]");
    if (!button || !menu) return;
    const update = () => {
      const isOpen = menu.classList.contains("is-open") || body.classList.contains("sl-menu-open");
      button.setAttribute("aria-label", isOpen ? "Close mobile menu" : "Open mobile menu");
      button.setAttribute("aria-expanded", String(isOpen));
    };
    new MutationObserver(update).observe(menu, { attributes: true, attributeFilter: ["class"] });
    new MutationObserver(update).observe(body, { attributes: true, attributeFilter: ["class"] });
    update();
  });
})();
