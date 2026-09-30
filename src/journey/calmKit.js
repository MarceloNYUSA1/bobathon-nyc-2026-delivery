// src/journey/calmKit.js
// buildCalmKit(inputs) → { items: Item[], disclaimer: string }

/**
 * @typedef {Object} Item
 * @property {string}  id      Unique identifier
 * @property {string}  label   Display text
 * @property {boolean} checked Initial checked state (always false)
 */

const DISCLAIMER = 'Suggestions only — not medical advice. Check with your airline about what you can bring on board.';

/**
 * Build the My Calm Kit item list.
 * @param {import('./story.js').Inputs} inputs
 * @returns {{ items: Item[], disclaimer: string }}
 */
export function buildCalmKit(inputs) {
  const s           = inputs.sensitivities || [];
  const comfortItem = (inputs.comfortItem || '').trim();
  const noise       = s.includes('noise');
  const crowds      = s.includes('crowds');
  const transitions = s.includes('transitions');
  const waiting     = s.includes('waiting');
  const pictures    = inputs.commPref === 'pictures';

  // Base items — always included
  const comfortLabel = comfortItem
    ? `Comfort item — ${comfortItem}`
    : 'Comfort item (favorite toy, blanket or stuffed animal)';
  const items = [
    { id: 'boarding-pass', label: 'Boarding pass and ID documents', checked: false },
    { id: 'comfort-item',  label: comfortLabel, checked: false },
    { id: 'water',         label: 'Empty reusable water bottle (fill after security)', checked: false },
    { id: 'snacks',        label: 'Favorite snacks (check airline rules)', checked: false },
    { id: 'change-clothes',label: 'Change of clothes in carry-on', checked: false },
    { id: 'charger',       label: 'Charger for tablet or phone', checked: false },
    { id: 'activity',      label: 'Favorite book, puzzle or activity', checked: false },
    { id: 'sunglasses',    label: 'Sunglasses (helpful in bright terminals)', checked: false },
  ];

  // Sensitivity-specific additions
  if (noise) {
    items.push({ id: 'headphones', label: 'Noise-cancelling headphones or ear defenders', checked: false });
    items.push({ id: 'ear-plugs',  label: 'Ear plugs (backup option)', checked: false });
  }

  if (crowds) {
    items.push({ id: 'comfort-clothing', label: 'Comfortable, loose clothing (helps in crowded spaces)', checked: false });
  }

  if (transitions) {
    items.push({ id: 'journey-plan', label: 'Printed copy of My Airport Journey (visual sequence)', checked: false });
    items.push({ id: 'schedule',     label: 'Visual schedule or travel timer', checked: false });
  }

  if (waiting) {
    items.push({ id: 'fidget',   label: 'Fidget toy or sensory item', checked: false });
    items.push({ id: 'download', label: 'Downloaded videos or music (for offline use on the plane)', checked: false });
  }

  if (pictures) {
    items.push({ id: 'picture-cards', label: 'Picture communication cards', checked: false });
  }

  if (inputs.commPref === 'written') {
    items.push({ id: 'notepad', label: 'Small notepad and pen (for written communication)', checked: false });
  }

  // Always-included items (R12, A.J. Aronoff requirement)
  items.push({ id: 'chew-toy',    label: 'Chewable jewelry or chew toy (if your child uses one)', checked: false });
  items.push({ id: 'flight-story', label: 'Printed copy of My Flight Story', checked: false });
  items.push({ id: 'assist-id',   label: 'Autism or assistance ID card for staff (optional)', checked: false });

  return { items, disclaimer: DISCLAIMER };
}
