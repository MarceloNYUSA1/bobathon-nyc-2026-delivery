// src/journey/parentChecklist.js
// buildParentChecklist(inputs) → { beforeHome: Item[], perStage: Item[], notes: string }

/**
 * @typedef {Object} Item
 * @property {string}  id
 * @property {string}  label
 * @property {boolean} checked
 */

/**
 * @typedef {Object} IfItGetsHardSection
 * @property {string}  note
 * @property {Item[]}  items
 */

/**
 * @param {import('./story.js').Inputs} inputs
 * @returns {{ beforeHome: Item[], perStage: Item[], ifItGetsHard: IfItGetsHardSection, notes: string }}
 */
export function buildParentChecklist(inputs) {
  const s = inputs.sensitivities || [];
  const noise       = s.includes('noise');
  const crowds      = s.includes('crowds');
  const transitions = s.includes('transitions');
  const firstFlight = inputs.firstFlight;

  // ── Before Leaving Home ────────────────────────────────────────────────
  const beforeHome = [
    { id: 'docs',      label: 'Check the travel documents your trip requires (adults\' ID; passports for international trips)', checked: false },
    { id: 'boarding',  label: 'Print or download boarding passes', checked: false },
    { id: 'tsa-cares', label: 'Contact TSA Cares before the trip if you\'d like assistance at security (recommended about 72 hours ahead)', checked: false },
    { id: 'pack',      label: 'Pack carry-on with comfort items, snacks, charger and change of clothes', checked: false },
    { id: 'story',     label: 'Read My Flight Story with your child the night before', checked: false },
    { id: 'journey',   label: 'Walk through My Airport Journey step by step', checked: false },
    { id: 'depart',    label: 'Plan to leave home with plenty of extra time — rushing adds stress', checked: false },
  ];

  if (noise) {
    beforeHome.push({ id: 'headphones-charged', label: 'Charge noise-cancelling headphones', checked: false });
  }

  if (transitions) {
    beforeHome.push({ id: 'print-journey', label: 'Print the Airport Journey sequence for your child to carry', checked: false });
  }

  if (firstFlight) {
    beforeHome.push({ id: 'first-flight-talk', label: 'Have a calm conversation about what to expect on a first flight', checked: false });
  }

  // ── At Each Stage ──────────────────────────────────────────────────────
  const perStage = [
    { id: 'preview',     label: 'Tell your child the next step before you get there', checked: false },
    { id: 'sensory',     label: 'Watch for sensory overload signals and respond early', checked: false },
    { id: 'reassure',    label: 'Reassure your child that staff can be asked for help', checked: false },
    { id: 'quiet-space', label: 'Locate quiet / sensory rooms if available at your airport', checked: false },
    { id: 'favorite',    label: 'Check that your child\'s favorite comfort item is easily accessible', checked: false },
  ];

  if (crowds) {
    perStage.push({ id: 'sunflower', label: 'Consider using a Hidden Disabilities Sunflower lanyard for discreet support', checked: false });
  }

  // ── If it gets hard (R13, A.J. Aronoff requirement) ───────────────────
  const ifItGetsHard = {
    note: 'Ideas from families\' experience — not medical advice. Every child is different.',
    items: [
      { id: 'quieter-spot',   label: 'Move to a quieter spot if you can', checked: false },
      { id: 'fewer-words',    label: 'Use fewer words and a calm voice', checked: false },
      { id: 'comfort-first',  label: 'Offer the comfort item first', checked: false },
      { id: 'rest-no-blame',  label: 'Afterwards: rest first, no blame — note what helped for next time', checked: false },
    ],
  };

  // ── Notes (echoes the free-text concern) ──────────────────────────────
  const notes = inputs.concern ? inputs.concern.trim() : '';

  return { beforeHome, perStage, ifItGetsHard, notes };
}
