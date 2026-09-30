// src/journey/resources.js
// RESOURCES — static array of accessibility resources.
// Pure ES module: no fetch, no JSON file, no server calls (satisfies NF1).
// Each entry: { name, url?, description, source }
// url is optional — entries without a url are rendered as plain tips (no hyperlink).

/**
 * @typedef {Object} Resource
 * @property {string}  name        Display name of the resource
 * @property {string}  [url]       Full URL (https) — omit for tip-only entries
 * @property {string}  description One-sentence description shown to the user
 * @property {string}  source      Organization that maintains the resource
 */

/** @type {Resource[]} */
export const RESOURCES = [
  {
    name: 'Hidden Disabilities Sunflower',
    url: 'https://hdsunflower.com',
    description: 'The Hidden Disabilities Sunflower scheme uses a sunflower lanyard to discreetly signal to airport and airline staff that a passenger may need extra time, assistance or understanding.',
    source: 'Hidden Disabilities Sunflower',
    lastChecked: '2026-09-29',
  },
  {
    name: 'TSA Cares',
    url: 'https://www.tsa.gov/travel/tsa-cares',
    description: 'TSA Cares is a helpline and passenger support program for travelers with disabilities or medical conditions. You can call ahead to arrange extra support at U.S. airport security checkpoints.',
    source: 'U.S. Transportation Security Administration (TSA)',
    lastChecked: '2026-09-29',
  },
  {
    name: 'Passengers with Disabilities — Air Carrier Access Act',
    url: 'https://www.transportation.gov/airconsumer/passengers-disabilities',
    description: 'Overview of your rights as an air traveler with a disability under the Air Carrier Access Act, including what assistance airlines are required to provide.',
    source: 'U.S. Department of Transportation',
    lastChecked: '2026-09-29',
  },
  {
    name: 'Tip: Airport accessibility page',
    description: 'Check your departure airport\'s own website for its accessibility and special-assistance page — most major airports publish sensory room locations, wheelchair assistance contacts, and quiet routes.',
    source: 'Check your airport\'s website directly',
    lastChecked: '2026-09-29',
  },
  {
    name: 'Social Stories™ — understanding the concept',
    url: 'https://carolgraysocialstories.com',
    description: 'Social Stories™ are short, personalized stories that describe a situation or activity in a way that helps autistic individuals understand what to expect and how to respond.',
    source: 'Carol Gray — The Gray Center',
    lastChecked: '2026-09-29',
  },
  {
    name: 'Wings for Autism / Wings for All',
    url: 'https://thearc.org/our-initiatives/travel/',
    description: 'Wings for Autism and Wings for All are airport rehearsal programs that allow families of autistic children and adults with intellectual disabilities to practice the airport experience in a supported, low-pressure environment.',
    source: 'The Arc',
    lastChecked: '2026-09-29',
  },
];
