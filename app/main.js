// app/main.js — thin DOM layer
// Reads the form, builds InputObject, calls journey functions, delegates to render.js.

import { renderAll } from './render.js';
import { buildStory }           from '../src/journey/story.js';
import { buildJourney }         from '../src/journey/journey.js';
import { buildCalmKit }         from '../src/journey/calmKit.js';
import { buildParentChecklist } from '../src/journey/parentChecklist.js';
import { RESOURCES }            from '../src/journey/resources.js';

/**
 * Read the form and return a plain InputObject.
 * @param {HTMLFormElement} form
 * @returns {object}
 */
function readInputs(form) {
  const data = new FormData(form);
  return {
    childName:    (data.get('childName') || '').trim(),
    ageRange:     data.get('ageRange') || '',
    firstFlight:  data.get('firstFlight') === 'yes',
    departure:    (data.get('departure') || '').trim(),
    destination:  (data.get('destination') || '').trim(),
    sensitivities: data.getAll('sensitivity'),
    commPref:     data.get('commPref') || 'spoken',
    concern:      (data.get('concern') || '').trim(),
    comfortItem:   (data.get('comfortItem') || '').trim(),
    visiting:      (data.get('visiting') || '').trim(),
    calmStrategy:  (data.get('calmStrategy') || '').trim(),
    excitingDetail:(data.get('excitingDetail') || '').trim(),
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('journey-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('#child-name');
    if (!nameInput.value.trim()) {
      nameInput.focus();
      return;
    }

    const inputs = readInputs(form);

    const outputs = {
      story:     buildStory(inputs),
      journey:   buildJourney(inputs),
      kit:       buildCalmKit(inputs),
      checklist: buildParentChecklist(inputs),
      resources: RESOURCES,
    };

    renderAll(outputs);

    // Scroll outputs into view
    const outputsEl = document.getElementById('outputs');
    if (outputsEl) outputsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
