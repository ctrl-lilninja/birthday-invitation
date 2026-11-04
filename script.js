/* ==========================================================
   PERSONALIZE YOUR INVITATION
   Edit the values below. Keep the date format as YYYY-MM-DD
   and the time in 24-hour format, e.g. 17:30.
   ========================================================== */
const INVITATION = {
  celebrantName: "LYSANDER CIELO",
  occasion: "1ST BIRTHDAY CELEBRATION",
  dateText: "NOVEMBER 29, 2026",
  timeText: "11AM TO 1PM",
  // Local date/time for countdown. Example: "2027-05-16T17:30:00"
  eventDateTime: "2026-11-29T11:00:00",

  churchName: "ST. PETER THE FISHERMAN PARISH CHURCH",
  churchAddress: "ST. PETER THE FISHERMAN PARISH CHURCH, NAPINDAN, TAGUIG CITY",
  churchSchedule: "NOVEMBER 29, 2026 - 10AM",
  churchMaps: "https://maps.app.goo.gl/o6htNheSn4tZ2yar9?g_st=ac",

  receptionName: "JOLLIBEE SAN JUAQUIN",
  receptionAddress: "M. Concepcion Avenue, corner R. Jabson Street, Pasig, Metro Manila",
  receptionSchedule: "NOVEMBER 29, 2026 - 11AM TO 1PM",
  receptionMaps: "https://maps.app.goo.gl/iiYesDzuzdoecvpt9?g_st=ac",

  // Paste your Google Forms RSVP link here.
  
};

// Fill in invitation content from the settings above.
document.getElementById("celebrantName").textContent = INVITATION.celebrantName;
document.getElementById("occasion").textContent = INVITATION.occasion;
document.getElementById("eventDate").textContent = INVITATION.dateText;
document.getElementById("eventTime").textContent = INVITATION.timeText;

const churchCard = document.getElementById("churchMap").closest(".map-card");
churchCard.querySelector("h3").textContent = INVITATION.churchName;
churchCard.querySelector(".address").textContent = INVITATION.churchAddress;
churchCard.querySelector(".schedule").innerHTML = "<strong>DATE &amp; TIME</strong><br>" + INVITATION.churchSchedule;
document.getElementById("churchMap").href = INVITATION.churchMaps;

const receptionCard = document.getElementById("receptionMap").closest(".map-card");
receptionCard.querySelector("h3").textContent = INVITATION.receptionName;
receptionCard.querySelector(".address").textContent = INVITATION.receptionAddress;
receptionCard.querySelector(".schedule").innerHTML = "<strong>DATE &amp; TIME</strong><br>" + INVITATION.receptionSchedule;
document.getElementById("receptionMap").href = INVITATION.receptionMaps;

// Open the invitation.
document.getElementById("openInvitation").addEventListener("click", () => {
  document.getElementById("intro").classList.add("closed");
});

// Optional music: audio begins only after the visitor taps the music button.
// Open invitation and automatically play background music.
const music = document.getElementById("backgroundMusic");

document.getElementById("openInvitation").addEventListener("click", async () => {
  document.getElementById("intro").classList.add("closed");

  try {
    await music.play();
  } catch (error) {
    console.log("Music could not start:", error);
  }
});

// Countdown.
const targetDate = new Date(INVITATION.eventDateTime).getTime();
const countdownMessage = document.getElementById("countdownMessage");
function updateCountdown() {
  const now = Date.now();
  let remaining = targetDate - now;
  if (!Number.isFinite(targetDate)) {
    countdownMessage.textContent = "Please set a valid eventDateTime in script.js.";
    return;
  }
  if (remaining <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach(id => {
      document.getElementById(id).textContent = "00";
    });
    countdownMessage.textContent = "The adventure is happening now. Have a wonderful celebration!";
    return;
  }
  const days = Math.floor(remaining / 86400000);
  remaining %= 86400000;
  const hours = Math.floor(remaining / 3600000);
  remaining %= 3600000;
  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Reveal cards as they enter the viewport.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}
