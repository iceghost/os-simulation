import {
  h,
  render,
  createContext,
} from 'https://unpkg.com/preact@latest?module';
import {
  useState,
  useContext,
} from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

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
  for (const cpu of cpus) {
    cpu.history.push(cpu.current);
  }
}

const SelectedSlot = createContext({ selected: 0, setSelected: () => {} });

function App(props) {
  const [selected, setSelected] = useState(0);
  return html`
    <${SelectedSlot.Provider} value=${{ selected, setSelected }}>
    <div class="font-smooch text-xl text-gray-900 mt-16 mb-56">
      <div class="max-w-xl w-full mx-auto">
        <h1 class="mb-2 font-bold text-5xl">Báo cáo kết quả</h1>
        <p class="mb-8">
          Thời gian chạy: ${new Date(TIMESTAMP * 1000).toLocaleString()}
        </p>
        <h2 class="font-bold text-3xl mt-8 mb-4">File input</h2>
        <pre class="mb-8 font-smooch bg-gray-50 text-gray-500 p-4 text-2xl">
          ${INPUT}
        </pre
        >
        <h2 class="mt-8 mb-4 font-bold text-3xl">Biểu đồ Gantt</h2>
        <p>Rê chuột vào timeslot để xem chi tiết các sự kiện diễn ra ở thời điểm đó.</p>
      </div>
      <div class="mb-8 mx-auto w-full overflow-scroll">
        <${Schedule} />
      </div>
      <div class="max-w-xl w-full mx-auto">
        <h2 class="mt-8 mb-4 font-bold text-3xl">Các sự kiện</h2>
        <ul>
      ${output.schedule[selected].events.map(
        (event) => html`<${Event} event=${event} />`
      )}
        </ul>
      </div>
    </div>
    </${SelectedSlot.Provider}>
  `;
}

/** @param {{event: import("./types").Event}} props */
function Event(props) {
  const event = props.event;
  switch (event.event) {
    case 'load':
      return html`<li>⬇️ Load process ${event.pid}</li>`;
    case 'dispatch':
      return html`<li>🟢 Chạy process ${event.pid} trên CPU ${event.cpu}</li>`;
    case 'put':
      return html`<li>
        🔴 Tạm bỏ process ${event.pid} từ CPU ${event.cpu} vô lại queue
      </li>`;
    case 'finish':
      return html`<li>
        🟥 Chạy xong process ${event.pid} trên CPU ${event.cpu}
      </li>`;
    case 'stopped':
      return html`<li>🏁 CPU ${event.cpu} đã chạy xong</li>`;
  }
}

const SelectedProcess = createContext([0, () => {}]);

function Schedule(props) {
  const slots = output.schedule.map((t) => ({ value: t.timeslot, span: 1 }));
  const [process, setProcess] = useState(null);
  let timer;
  const debounced = (val) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => setProcess(val), 50);
  };
  return html`<table class="w-full text-center relative table-fixed">
    <tr>
      <td class="w-16 sticky left-0 px-2 bg-gray-100 text-gray-800 font-bold">
        Slot
      </td>
      ${slots.map((data, i) => html`<${SlotIndex} data=${data} />`)}
    </tr>
    <${SelectedProcess.Provider} value=${[process, debounced]}>
      ${cpus.map((cpu) => html`<${CPU} cpu=${cpu} />`)}
    </${SelectedProcess.Provider}>
  </table>`;
}

/** @param {{cpu: import("./types").CPU}} props */
function CPU(props) {
  const cpu = props.cpu;
  const [process, setProcess] = useContext(SelectedProcess);
  const data = cpu.history.reduce((acc, cur) => {
    if (
      acc.length != 0 &&
      acc[acc.length - 1].value == cur &&
      acc[acc.length - 1].span < input.slotTime
    ) {
      acc[acc.length - 1].span += 1;
    } else {
      acc.push({ value: cur, span: 1 });
    }
    return acc;
  }, []);
  return html`<tr>
    <td class="sticky left-0 px-2 bg-gray-100 text-gray-800 font-bold">
      CPU ${cpu.id}
    </td>
    ${data.map(
      (data) => html`<td colspan=${data.span}>
        ${data.value !== null &&
        html` <div
          class="rounded-md py-1 px-4 ${process === null ||
          process == data.value
            ? colorMap[data.value % colorMap.length] + ' text-white'
            : 'bg-gray-300 text-gray-900'}"
          onMouseEnter=${() => setProcess(data.value)}
          onMouseLeave=${() => setProcess(null)}
        >
          ${data.value}
        </div>`}
      </td>`
    )}
  </tr>`;
}

function SlotIndex(props) {
  const { selected, setSelected } = useContext(SelectedSlot);
  return html`<td class="w-12" colspan=${props.data.span}>
    <button
      class="rounded-md my-2 px-4 py-1 ${selected == props.data.value
        ? 'bg-gray-200 shadow-sm'
        : 'bg-white'} hover:bg-gray-100"
      onMouseEnter=${() => setSelected(props.data.value)}
    >
      ${props.data.value}
    </button>
  </td>`;
}

const colorMap = [
  'bg-slate-500',
  'bg-red-500',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-lime-500',
  'bg-green-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-blue-500',
  'bg-indigo-500',
  'bg-violet-500',
  'bg-fuchsia-500',
];

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

shuffle(colorMap);

render(html`<${App} />`, document.querySelector('#app'));
