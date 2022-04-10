'use strict';

const { h, render } = preact;
const html = htm.bind(h);

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

parser.feed(OUTPUT);

/** @type {import("./types").ParseResult} */
const results = parser.results[0];

function App(props) {
  return html`
    ${results.schedule.map(
      (timeslot) => html` <${Timeslot} timeslot=${timeslot} /> `
    )}
  `;
}

/** @param {{ timeslot: import("./types").Timeslot}} props */
function Timeslot(props) {
  const { timeslot, events } = props.timeslot;
  return html`
    <ul>
      ${events.map((event) => html`<${Event} event=${event} />`)}
    </ul>
  `;
}

/** @param {{ event: import("./types").Event }} props */
function Event(props) {
  const { event } = props.event;
  return html`<li>${event}</li>`;
}

render(html`<${App} />`, document.querySelector('#app'));
