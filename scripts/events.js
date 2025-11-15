document.addEventListener('DOMContentLoaded', () => {
  const events = [
    { date: '2025-11-15', title: 'Business Networking Mixer', desc: 'Sector tables and investor introductions.', link: '#' },
    { date: '2025-12-03', title: 'Export Opportunities Workshop', desc: 'SME market entry & logistics guidance.', link: '#' },
    { date: '2026-01-20', title: 'Annual Chamber Summit', desc: 'Keynotes, panels and member matchmaking.', link: '#' },
    { date: '2026-02-10', title: 'SME Digitalisation Clinic', desc: 'Practical clinics to build digital capabilities.', link: '#' },
    { date: '2026-03-05', title: 'Investor Pitch Day', desc: 'Member pitches to regional and international investors.', link: '#' }
  ];

  const today = new Date();

  // Find the next upcoming event
  const nextEvent = events.find(ev => new Date(ev.date) >= today) || events[0];

  document.getElementById('current-event-date').textContent = new Date(nextEvent.date).toDateString();
  document.getElementById('current-event-title').textContent = nextEvent.title;
  document.getElementById('current-event-desc').textContent = nextEvent.desc;
  document.getElementById('current-event-link').href = nextEvent.link;
});
