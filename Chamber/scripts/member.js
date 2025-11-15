document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('featured-members');
  
  // Show loading text
  container.innerHTML = '<p>Loading featured members...</p>';

  fetch('data/members.json')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      // Filter Silver & Gold members
      const filtered = data.members.filter(member => member.membershipLevel >= 2);
      if (filtered.length === 0) throw new Error('No Silver or Gold members found');

      // Shuffle & take 2–3 members
      const shuffled = filtered.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.min(3, shuffled.length));

      // Clear loading text
      container.innerHTML = '';

      // Add member cards
      selected.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card');

        card.innerHTML = `
          <img src="images/${member.image}" alt="${member.name}" width="100%" height="140"/>
          <h3>${member.name}</h3>
          <p>${member.address} | ${member.phone}</p>
          <a href="${member.website}" target="_blank" class="event-link">Visit Website</a>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error('Error loading members:', err);
      container.innerHTML = '<p>Unable to load featured members at this time.</p>';
    });
});



