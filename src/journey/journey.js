// src/journey/journey.js
// buildJourney(inputs) → Step[]
// Returns exactly 10 steps for the Airport Journey navigator.

/**
 * @typedef {Object} Step
 * @property {string} label       Short name shown as heading
 * @property {string} description Plain text description of this stage
 * @property {string} tip         Adapted tip based on sensitivities (always non-empty)
 * @property {string} symbol      Unicode symbol for 'pictures' communication preference
 */

const STEPS_BASE = [
  {
    key: 'home',
    label: 'Home',
    description: 'We start at home. We pack our bags and make sure we have everything we need.',
    defaultTip: 'Have your bag ready the night before so the morning is calm.',
    symbol: '🏠',
    symbolLabel: 'House',
    noiseTip: null,
    crowdTip: null,
    transitionTip: 'After home, the next step is travelling to the airport.',
    waitingTip: null,
  },
  {
    key: 'airport-arrival',
    label: 'Airport Arrival',
    description: 'We arrive at the airport. Airports are big buildings with lots of signs.',
    defaultTip: 'Look for the signs — they show where check-in, security and gates are.',
    symbol: '✈️',
    symbolLabel: 'Airplane',
    noiseTip: 'Airports can be loud. You can wear your headphones as soon as we arrive.',
    crowdTip: 'Airports can be busy. Stay close to your grown-up and follow the signs.',
    transitionTip: 'After arriving, the next step is check-in.',
    waitingTip: null,
  },
  {
    key: 'check-in',
    label: 'Check-in',
    description: 'At check-in we give our bags to the airline and get a boarding pass. The boarding pass is our ticket to get on the airplane.',
    defaultTip: 'Keep your boarding pass safe — you need it at the gate.',
    symbol: '🎫',
    symbolLabel: 'Ticket',
    noiseTip: null,
    crowdTip: 'Check-in can be busy. We might wait in a short line — that is normal.',
    transitionTip: 'After check-in, the next step is security.',
    waitingTip: null,
  },
  {
    key: 'security',
    label: 'Security',
    description: 'At security, grown-ups may put bags and some things on a tray. We walk through a scanner. The people there check everything is safe — they do this for everyone.',
    defaultTip: 'Listen to what the security staff ask. You can put things back in your bag after.',
    symbol: '🔍',
    symbolLabel: 'Magnifying glass',
    noiseTip: 'The scanner can make a beeping sound. You can wear your headphones through this part.',
    crowdTip: 'Security can feel crowded. Tell your grown-up if you need more space.',
    transitionTip: 'After security, the next step is the gate.',
    waitingTip: null,
  },
  {
    key: 'gate',
    label: 'Gate',
    description: 'The gate is a waiting area with seats. We sit here until it is time to get on the airplane.',
    defaultTip: 'Check the screen near the gate to see when boarding starts.',
    symbol: '🪑',
    symbolLabel: 'Chair',
    noiseTip: 'The gate area can have loud announcements. Headphones can help here.',
    crowdTip: 'The gate can be busy. Find a seat a little away from the busiest area if that feels better.',
    transitionTip: 'After the gate, the next step is boarding.',
    waitingTip: 'We may wait here for a while. Bring something you enjoy — a book, tablet or toy.',
  },
  {
    key: 'boarding',
    label: 'Boarding',
    description: 'When our row or group is called, we walk down the jetway and onto the airplane. We show our boarding pass and find our seat.',
    defaultTip: 'Sit down, put on your seatbelt, and you are ready for take-off.',
    symbol: '🚶',
    symbolLabel: 'Person walking',
    noiseTip: 'Boarding can be noisy. Headphones are fine to wear while you board.',
    crowdTip: 'Boarding can feel crowded. We can ask the gate agent about boarding early, or wait until it is quieter.',
    transitionTip: 'After boarding, the next step is the flight.',
    waitingTip: null,
  },
  {
    key: 'flight',
    label: 'Flight',
    description: 'The airplane takes off and flies through the sky. Flight attendants may bring drinks and snacks. You can look out the window, read or relax.',
    defaultTip: 'The seatbelt sign will turn off when it is safe to move around.',
    symbol: '🌤️',
    symbolLabel: 'Sun behind cloud',
    noiseTip: 'Take-off is the loudest part. My headphones can help.',
    crowdTip: 'The airplane has assigned seats so everyone knows where to sit.',
    transitionTip: null,
    waitingTip: 'The flight takes some time. Bring activities you enjoy to help the time pass.',
  },
  {
    key: 'landing',
    label: 'Landing',
    description: 'The airplane comes down to land. There is a bumpy feeling as it touches the runway — that is completely normal. The airplane slows down and stops.',
    defaultTip: 'Put your seatbelt back on for landing. You will hear the wheels touch the ground.',
    symbol: '🛬',
    symbolLabel: 'Airplane landing',
    noiseTip: 'Landing can be louder than the flight. Headphones or covering your ears is fine.',
    crowdTip: null,
    transitionTip: 'After landing, the next step is baggage claim.',
    waitingTip: null,
  },
  {
    key: 'baggage',
    label: 'Baggage Claim',
    description: 'We walk to baggage claim and wait for our bags to come around on a moving belt. When we see our bag we take it off.',
    defaultTip: 'Look for a tag or ribbon on your bag so you can spot it easily.',
    symbol: '🧳',
    symbolLabel: 'Luggage',
    noiseTip: null,
    crowdTip: 'Baggage claim can be busy. Stand back a little and step forward when your bag arrives.',
    transitionTip: 'After baggage claim, the next step is the exit.',
    waitingTip: 'Bags take a few minutes to arrive. Watch the belt and look for your bag.',
  },
  {
    key: 'exit',
    label: 'Exit',
    description: 'We walk out of the airport with our bags. We have arrived!',
    defaultTip: 'Follow the exit signs.',
    symbol: '🎉',
    symbolLabel: 'Celebration',
    noiseTip: null,
    crowdTip: null,
    transitionTip: null,
    waitingTip: null,
  },
];

/**
 * Build the My Airport Journey step array.
 * @param {import('./story.js').Inputs} inputs
 * @returns {Step[]}
 */
export function buildJourney(inputs) {
  const s    = inputs.sensitivities || [];
  const noise       = s.includes('noise');
  const crowds      = s.includes('crowds');
  const transitions = s.includes('transitions');
  const waiting     = s.includes('waiting');
  const pictures    = inputs.commPref === 'pictures';

  return STEPS_BASE.map(base => {
    // Build tip: prefer sensitivity tip over default, chain them if multiple match.
    const parts = [];
    if (noise && base.noiseTip)       parts.push(base.noiseTip);
    if (crowds && base.crowdTip)      parts.push(base.crowdTip);
    if (transitions && base.transitionTip) parts.push(base.transitionTip);
    if (waiting && base.waitingTip)   parts.push(base.waitingTip);
    const tip = parts.length > 0 ? parts.join(' ') : base.defaultTip;

    return {
      label:       base.label,
      description: base.description,
      tip,
      symbol:      pictures ? base.symbol : '',
      symbolLabel: pictures ? base.symbolLabel : '',
    };
  });
}
