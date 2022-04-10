@builtin "number.ne"

MAIN -> int " " int " " int ("\n" PROCESS):*
	{% (d) => ({
		slotTime: d[0],
		numCPUs: d[2],
		numProcesses: d[4],
		processes: d[5].map(e => e[1])
	}) %}

PROCESS -> int " " [^ ]:+
	{% (d) => ({ arrival: d[0], name: d[2].join("") })%}