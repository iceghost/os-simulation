@builtin "whitespace.ne"
@builtin "number.ne"

MAIN -> SCHEDULE "\n\n" MEMORY
	{% d => ({ schedule: d[0], memory: d[2] }) %}

SCHEDULE -> TIMESLOT:? ("\n" TIMESLOT):*
	{% d => [d[0], ...d[1].map(e => e[1])] %}

MEMORY -> "MEMORY CONTENT:" ("\n" PAGE):*
	{% d => d[1].map(e => e[1]) %}

TIMESLOT -> "Time slot" __ int ("\n\t" EVENT):*
	{% d => ({ timeslot: d[2], events: d[3].map(e => e[1]) }) %}

EVENT ->
	  "Loaded a process at " [^,]:+ ", PID: " int
	  {% d => ({ event:     "load",            pid: d[3] }) %}

	| "CPU " int ": Dispatched process" __ int
	  {% d => ({ event: "dispatch", cpu: d[1], pid: d[4] }) %}

	| "CPU " int ": Put process" __ int " to run queue"
	  {% d => ({ event:      "put", cpu: d[1], pid: d[4] }) %}

	| "CPU " int ": Processed" __ int " has finished"
	  {% d => ({ event:   "finish", cpu: d[1], pid: d[4] }) %}

	| "CPU " int " stopped"
	  {% d => ({ event:  "stopped", cpu: d[1],           }) %}

PAGE -> int ": "  hex "-" hex " - PID: " int " (idx " int ", nxt: " int ")" ("\n\t" BYTE):*
	{% d => ({
		page: d[0],
		from: d[2], to: d[4],
		pid: d[6],
		idx: d[8], nxt: d[10],
		bytes: d[12].map(e => e[1])
	})%}

BYTE -> hex ": " hex
	{% d => ({ address: d[0], value: d[2] })%}

hex -> [0-9a-f]:+
	{% d => d[0].join("") %}
