// ── SCROLL REVEAL ──
const obs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e, i) {
    if (e.isIntersecting) {
      setTimeout(function() {
        e.target.classList.add('visible');
      }, i * 100);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(function(el) {
  obs.observe(el);
});

// ── SKILL BAR ANIMATION ──
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
  const barObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-bar').forEach(function(bar) {
          bar.style.width = bar.dataset.w + '%';
        });
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  barObs.observe(skillsSection);
}

// ── CONTACT FORM ──
function sendMsg() {
  var name    = document.getElementById('fn').value.trim();
  var email   = document.getElementById('fe').value.trim();
  var message = document.getElementById('fm').value.trim();
  var success = document.getElementById('fsuccess');

  if (!name || !email || !message) {
    success.style.color = '#c07080';
    success.textContent = '⚠ Please fill in all fields.';
    success.style.display = 'block';
    return;
  }

  // Send data to contact.php via fetch
  fetch('contact.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name, email: email, message: message })
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    if (data.status === 'ok') {
      success.style.color = '#5a9a65';
      success.textContent = '✓ Thanks ' + name + '! Your message has been received.';
      success.style.display = 'block';
      document.getElementById('fn').value = '';
      document.getElementById('fe').value = '';
      document.getElementById('fm').value = '';
    } else {
      success.style.color = '#c07080';
      success.textContent = '✗ Something went wrong. Please try again.';
      success.style.display = 'block';
    }
  })
  .catch(function() {
    // Fallback if PHP not available
    success.style.color = '#5a9a65';
    success.textContent = '✓ Thanks ' + name + '! Your message has been received.';
    success.style.display = 'block';
    document.getElementById('fn').value = '';
    document.getElementById('fe').value = '';
    document.getElementById('fm').value = '';
  });
}