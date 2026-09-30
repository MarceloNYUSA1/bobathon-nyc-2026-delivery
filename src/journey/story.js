// src/journey/story.js
// buildStory(inputs) → string
// Returns a plain-text first-person narrative (not HTML).
// The caller (render.js) must escape user text before inserting into HTML.

/**
 * @typedef {Object} Inputs
 * @property {string}   childName
 * @property {string}   ageRange
 * @property {boolean}  firstFlight
 * @property {string}   departure
 * @property {string}   destination
 * @property {string[]} sensitivities
 * @property {string}   commPref
 * @property {string}   concern
 */

const NOISE_TIPS = {
  security:  'The security scanner can make beeping sounds. My headphones can help.',
  gate:      'The gate area can have loud announcements. I can find a quieter seat or use my headphones.',
  boarding:  'Boarding can be noisy. My headphones can help me feel calmer.',
  flight:    'The airplane can be loud when it takes off. My headphones can help a lot with this.',
};

const CROWD_TIPS = {
  'check-in': 'The check-in area can be busy. We can look for a shorter line.',
  security:   'Security can be crowded. We can let someone know if I need extra space.',
  gate:       'The gate can be busy. I can find a seat a little away from the busiest area.',
  boarding:   'Boarding can feel crowded. We can ask the gate agent about boarding early, or we can wait until it is quieter.',
};

const TRANSITION_TIPS = {
  'check-in': 'After check-in, the next step is security. I know what is coming next.',
  security:   'After security, the next step is the gate. I know what is coming next.',
  gate:       'After the gate, the next step is boarding the airplane. I know what is coming next.',
  landing:    'After landing, the next step is baggage claim, then we leave. I know what is coming next.',
};

const WAITING_TIPS = {
  gate:    'I may wait at the gate for a while. I can bring something I enjoy to do while I wait.',
  flight:  'The flight takes some time. I can listen to music, watch something, or look out the window.',
  baggage: 'Bags take a few minutes to arrive. I can watch the belt and look for our bag.',
};

/**
 * Build the My Flight Story narrative.
 * @param {Inputs} inputs
 * @returns {string}  Plain text paragraphs separated by double newlines.
 */
export function buildStory(inputs) {
  const name          = inputs.childName ? inputs.childName.trim() : '';
  const from          = inputs.departure  || 'home';
  const to            = inputs.destination || 'our destination';
  const comfortItem   = (inputs.comfortItem || '').trim();
  const visiting      = (inputs.visiting || '').trim();
  const calmStrategy  = (inputs.calmStrategy || '').trim();
  const excitingDetail = (inputs.excitingDetail || '').trim();
  const s             = inputs.sensitivities || [];
  const noise       = s.includes('noise');
  const crowds      = s.includes('crowds');
  const transitions = s.includes('transitions');
  const waiting     = s.includes('waiting');

  const steps = [];

  // Step 1 — Introduction
  let intro;
  if (name) {
    intro = `My name is ${name} and today is a travel day!`;
  } else {
    intro = `Today is a travel day!`;
  }
  if (inputs.firstFlight) {
    intro += ` This is my first time on an airplane and that is okay — I know what is going to happen.`;
  } else {
    intro += ` I know what is going to happen because I have read my travel story.`;
  }
  steps.push(intro);

  // Step 2 — Leaving home
  let home = `First, I leave home with my family. We have packed everything I need in my bag.`;
  if (inputs.firstFlight) {
    intro; // already handled above
    home += ` It is normal to feel excited or a little nervous about a first flight.`;
  }
  steps.push(home);

  // Step 3 — Travelling to the airport
  let toAirport = `We travel to the airport at ${from}.`;
  if (transitions) {
    toAirport += ` I know we will go from home to the airport, and then inside to check in.`;
  }
  steps.push(toAirport);

  // Step 4 — Check-in
  let checkIn = `At the airport we go to the check-in desk or a kiosk. We check in and get a boarding pass.`;
  if (crowds) checkIn += ` ${CROWD_TIPS['check-in']}`;
  if (transitions) checkIn += ` ${TRANSITION_TIPS['check-in']}`;
  steps.push(checkIn);

  // Step 5 — Security
  let security = `Next we go through security. Grown-ups may put bags and some things on a tray. We walk through a scanner. The people there are just checking everything is safe.`;
  if (noise) security += ` ${NOISE_TIPS.security}`;
  if (crowds) security += ` ${CROWD_TIPS.security}`;
  if (transitions) security += ` ${TRANSITION_TIPS.security}`;
  steps.push(security);

  // Step 6 — Gate
  let gate = `After security we find our gate. The gate is a waiting area where we sit until it is time to board.`;
  if (noise) gate += ` ${NOISE_TIPS.gate}`;
  if (crowds) gate += ` ${CROWD_TIPS.gate}`;
  if (transitions) gate += ` ${TRANSITION_TIPS.gate}`;
  if (waiting) gate += ` ${WAITING_TIPS.gate}`;
  steps.push(gate);

  // Step 7 — Boarding
  let boarding = `When it is time to board, we walk down the jetway and onto the airplane. I find my seat and put on my seatbelt.`;
  if (noise) boarding += ` ${NOISE_TIPS.boarding}`;
  if (crowds) boarding += ` ${CROWD_TIPS.boarding}`;
  if (comfortItem) boarding += ` I will hold my ${comfortItem}.`;
  if (calmStrategy) boarding += ` If I feel worried, I can ${calmStrategy}.`;
  steps.push(boarding);

  // Step 8 — Flight
  let flight = `The airplane moves to the runway and then flies into the sky. We are on our way to ${to}!`;
  if (noise) flight += ` ${NOISE_TIPS.flight}`;
  if (waiting) flight += ` ${WAITING_TIPS.flight}`;
  steps.push(flight);

  // Step 9 — Landing
  let landing = `When the airplane comes down to land, there is a bumpy feeling — that is normal. The airplane slows down on the runway.`;
  if (transitions) landing += ` ${TRANSITION_TIPS.landing}`;
  steps.push(landing);

  // Step 10 — Arrival
  let arrival = `We get off the airplane and collect our bags at baggage claim.`;
  if (waiting) arrival += ` ${WAITING_TIPS.baggage}`;
  arrival += ` Then we leave the airport. We have arrived at ${to}!`;
  if (excitingDetail) arrival = arrival + ` I am excited about ${excitingDetail}.`;
  if (visiting) arrival += ` Then I will see ${visiting}.`;
  steps.push(arrival);

  return steps.join('\n\n');
}
