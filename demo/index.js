const { h, render } = preact;
const html = htm.bind(h);

const outputParser = new nearley.Parser(
  nearley.Grammar.fromCompiled(output_grammar)
);
outputParser.feed(OUTPUT);
/** @type {import("./types").OutputParseResult} */
const output = outputParser.results[0];
// console.log(output);

const inputParser = new nearley.Parser(
  nearley.Grammar.fromCompiled(input_grammar)
);
inputParser.feed(INPUT);
/** @type {import("./types").InputParseResult} */
const input = inputParser.results[0];
// console.log(input);

/** @type {import("./types").CPU[]} */
const cpus = new Array(input.numCPUs).fill(undefined).map((_, id) => ({
  id,
  current: null,
  history: [],
}));

for (const timeslot of output.schedule) {
  for (const cpu of cpus) {
    cpu.history.push(cpu.current);
  }
  for (const event of timeslot.events) {
    switch (event.event) {
      case 'dispatch':
        cpus[event.cpu].current = event.pid;
        break;
      case 'put':
      case 'finish':
        cpus[event.cpu].current = null;
        break;
    }
  }
}

function App(props) {
  return html` ${cpus.map((cpu) => html` <${CPU} cpu=${cpu} /> `)} `;
}

/** @param {{cpu: import("./types").CPU}} props */
function CPU(props) {
  const cpu = props.cpu;
  console.log(cpu);
  return html`<h2>CPU ${cpu.id}:</h2>
    <pre>
    ${cpu.history.map((pid) => `${pid ?? ''}`.padStart(2)).join('')}</pre
    >`;
}

render(html`<${App} />`, document.querySelector('#app'));
