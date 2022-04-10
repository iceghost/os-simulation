// Generated automatically by nearley, version undefined
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["wschar", "_$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["wschar", "__$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/, "unsigned_int$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "unsigned_int", "symbols": ["unsigned_int$ebnf$1"], "postprocess":
        function(d) {
            return parseInt(d[0].join(""));
        }
        },
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "int$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "int$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$2", "symbols": [/[0-9]/, "int$ebnf$2"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "int", "symbols": ["int$ebnf$1", "int$ebnf$2"], "postprocess":
        function(d) {
            if (d[0]) {
                return parseInt(d[0][0]+d[1].join(""));
            } else {
                return parseInt(d[1].join(""));
            }
        }
        },
    {"name": "unsigned_decimal$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$1", "symbols": [/[0-9]/, "unsigned_decimal$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/, "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "unsigned_decimal$ebnf$2", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "unsigned_decimal$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "unsigned_decimal", "symbols": ["unsigned_decimal$ebnf$1", "unsigned_decimal$ebnf$2"], "postprocess":
        function(d) {
            return parseFloat(
                d[0].join("") +
                (d[1] ? "."+d[1][1].join("") : "")
            );
        }
        },
    {"name": "decimal$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "decimal$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$2", "symbols": [/[0-9]/, "decimal$ebnf$2"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/, "decimal$ebnf$3$subexpression$1$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "decimal$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "decimal$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "decimal$ebnf$3", "symbols": ["decimal$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "decimal$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal", "symbols": ["decimal$ebnf$1", "decimal$ebnf$2", "decimal$ebnf$3"], "postprocess":
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "")
            );
        }
        },
    {"name": "percentage", "symbols": ["decimal", {"literal":"%"}], "postprocess":
        function(d) {
            return d[0]/100;
        }
        },
    {"name": "jsonfloat$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "jsonfloat$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$2", "symbols": [/[0-9]/, "jsonfloat$ebnf$2"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "jsonfloat$ebnf$3", "symbols": ["jsonfloat$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [/[+-]/], "postprocess": id},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": [/[0-9]/, "jsonfloat$ebnf$4$subexpression$1$ebnf$2"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "jsonfloat$ebnf$4$subexpression$1", "symbols": [/[eE]/, "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "jsonfloat$ebnf$4$subexpression$1$ebnf$2"]},
    {"name": "jsonfloat$ebnf$4", "symbols": ["jsonfloat$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat", "symbols": ["jsonfloat$ebnf$1", "jsonfloat$ebnf$2", "jsonfloat$ebnf$3", "jsonfloat$ebnf$4"], "postprocess":
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "") +
                (d[3] ? "e" + (d[3][1] || "+") + d[3][2].join("") : "")
            );
        }
        },
    {"name": "MAIN$string$1", "symbols": [{"literal":"\n"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "MAIN", "symbols": ["SCHEDULE", "MAIN$string$1", "MEMORY"], "postprocess": function(d) { return { schedule: d[0], memory: d[2] } }},
    {"name": "SCHEDULE$ebnf$1", "symbols": ["TIMESLOT"], "postprocess": id},
    {"name": "SCHEDULE$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "SCHEDULE$ebnf$2", "symbols": []},
    {"name": "SCHEDULE$ebnf$2$subexpression$1", "symbols": [{"literal":"\n","pos":28}, "TIMESLOT"]},
    {"name": "SCHEDULE$ebnf$2", "symbols": ["SCHEDULE$ebnf$2$subexpression$1", "SCHEDULE$ebnf$2"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "SCHEDULE", "symbols": ["SCHEDULE$ebnf$1", "SCHEDULE$ebnf$2"], "postprocess": function(d) { return [d[0], ...d[1].map(e => e[1])] }},
    {"name": "MEMORY$string$1", "symbols": [{"literal":"M"}, {"literal":"E"}, {"literal":"M"}, {"literal":"O"}, {"literal":"R"}, {"literal":"Y"}, {"literal":" "}, {"literal":"C"}, {"literal":"O"}, {"literal":"N"}, {"literal":"T"}, {"literal":"E"}, {"literal":"N"}, {"literal":"T"}, {"literal":":"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "MEMORY$ebnf$1", "symbols": []},
    {"name": "MEMORY$ebnf$1$subexpression$1", "symbols": [{"literal":"\n","pos":43}, "PAGE"]},
    {"name": "MEMORY$ebnf$1", "symbols": ["MEMORY$ebnf$1$subexpression$1", "MEMORY$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "MEMORY", "symbols": ["MEMORY$string$1", "MEMORY$ebnf$1"], "postprocess": function(d) { return d[1].map(e => e[1]) }},
    {"name": "TIMESLOT$string$1", "symbols": [{"literal":"T"}, {"literal":"i"}, {"literal":"m"}, {"literal":"e"}, {"literal":" "}, {"literal":"s"}, {"literal":"l"}, {"literal":"o"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TIMESLOT$ebnf$1", "symbols": []},
    {"name": "TIMESLOT$ebnf$1$subexpression$1$string$1", "symbols": [{"literal":"\n"}, {"literal":"\t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TIMESLOT$ebnf$1$subexpression$1", "symbols": ["TIMESLOT$ebnf$1$subexpression$1$string$1", "EVENT"]},
    {"name": "TIMESLOT$ebnf$1", "symbols": ["TIMESLOT$ebnf$1$subexpression$1", "TIMESLOT$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "TIMESLOT", "symbols": ["TIMESLOT$string$1", "__", "int", "TIMESLOT$ebnf$1"], "postprocess": function(d) { return { timeslot: d[2], events: d[3].map(e => e[1]) }; }},
    {"name": "EVENT$string$1", "symbols": [{"literal":"L"}, {"literal":"o"}, {"literal":"a"}, {"literal":"d"}, {"literal":"e"}, {"literal":"d"}, {"literal":" "}, {"literal":"a"}, {"literal":" "}, {"literal":"p"}, {"literal":"r"}, {"literal":"o"}, {"literal":"c"}, {"literal":"e"}, {"literal":"s"}, {"literal":"s"}, {"literal":" "}, {"literal":"a"}, {"literal":"t"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "EVENT$ebnf$1", "symbols": [/[^,]/]},
    {"name": "EVENT$ebnf$1", "symbols": [/[^,]/, "EVENT$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "EVENT$string$2", "symbols": [{"literal":","}, {"literal":" "}, {"literal":"P"}, {"literal":"I"}, {"literal":"D"}, {"literal":":"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "EVENT", "symbols": ["EVENT$string$1", "EVENT$ebnf$1", "EVENT$string$2", "int"], "postprocess": function(d) { return { event:     "load",            pid: d[3] }; }},
    {"name": "EVENT$string$3", "symbols": [{"literal":"C"}, {"literal":"P"}, {"literal":"U"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "EVENT$string$4", "symbols": [{"literal":":"}, {"literal":" "}, {"literal":"D"}, {"literal":"i"}, {"literal":"s"}, {"literal":"p"}, {"literal":"a"}, {"literal":"t"}, {"literal":"c"}, {"literal":"h"}, {"literal":"e"}, {"literal":"d"}, {"literal":" "}, {"literal":"p"}, {"literal":"r"}, {"literal":"o"}, {"literal":"c"}, {"literal":"e"}, {"literal":"s"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "EVENT", "symbols": ["EVENT$string$3", "int", "EVENT$string$4", "__", "int"], "postprocess": function(d) { return { event: "dispatch", cpu: d[1], pid: d[4] }; }},
    {"name": "EVENT$string$5", "symbols": [{"literal":"C"}, {"literal":"P"}, {"literal":"U"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "EVENT$string$6", "symbols": [{"literal":":"}, {"literal":" "}, {"literal":"P"}, {"literal":"u"}, {"literal":"t"}, {"literal":" "}, {"literal":"p"}, {"literal":"r"}, {"literal":"o"}, {"literal":"c"}, {"literal":"e"}, {"literal":"s"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "EVENT$string$7", "symbols": [{"literal":" "}, {"literal":"t"}, {"literal":"o"}, {"literal":" "}, {"literal":"r"}, {"literal":"u"}, {"literal":"n"}, {"literal":" "}, {"literal":"q"}, {"literal":"u"}, {"literal":"e"}, {"literal":"u"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "EVENT", "symbols": ["EVENT$string$5", "int", "EVENT$string$6", "__", "int", "EVENT$string$7"], "postprocess": function(d) { return { event:      "put", cpu: d[1], pid: d[4] }; }},
    {"name": "EVENT$string$8", "symbols": [{"literal":"C"}, {"literal":"P"}, {"literal":"U"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "EVENT$string$9", "symbols": [{"literal":":"}, {"literal":" "}, {"literal":"P"}, {"literal":"r"}, {"literal":"o"}, {"literal":"c"}, {"literal":"e"}, {"literal":"s"}, {"literal":"s"}, {"literal":"e"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "EVENT$string$10", "symbols": [{"literal":" "}, {"literal":"h"}, {"literal":"a"}, {"literal":"s"}, {"literal":" "}, {"literal":"f"}, {"literal":"i"}, {"literal":"n"}, {"literal":"i"}, {"literal":"s"}, {"literal":"h"}, {"literal":"e"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "EVENT", "symbols": ["EVENT$string$8", "int", "EVENT$string$9", "__", "int", "EVENT$string$10"], "postprocess": function(d) { return { event:   "finish", cpu: d[1], pid: d[4] }; }},
    {"name": "EVENT$string$11", "symbols": [{"literal":"C"}, {"literal":"P"}, {"literal":"U"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "EVENT$string$12", "symbols": [{"literal":" "}, {"literal":"s"}, {"literal":"t"}, {"literal":"o"}, {"literal":"p"}, {"literal":"p"}, {"literal":"e"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "EVENT", "symbols": ["EVENT$string$11", "int", "EVENT$string$12"], "postprocess": function(d) { return { event:  "stopped", cpu: d[1],           }; }},
    {"name": "PAGE$string$1", "symbols": [{"literal":":"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "PAGE$string$2", "symbols": [{"literal":" "}, {"literal":"-"}, {"literal":" "}, {"literal":"P"}, {"literal":"I"}, {"literal":"D"}, {"literal":":"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "PAGE$string$3", "symbols": [{"literal":" "}, {"literal":"("}, {"literal":"i"}, {"literal":"d"}, {"literal":"x"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "PAGE$string$4", "symbols": [{"literal":","}, {"literal":" "}, {"literal":"n"}, {"literal":"x"}, {"literal":"t"}, {"literal":":"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "PAGE$ebnf$1", "symbols": []},
    {"name": "PAGE$ebnf$1$subexpression$1$string$1", "symbols": [{"literal":"\n"}, {"literal":"\t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "PAGE$ebnf$1$subexpression$1", "symbols": ["PAGE$ebnf$1$subexpression$1$string$1", "BYTE"]},
    {"name": "PAGE$ebnf$1", "symbols": ["PAGE$ebnf$1$subexpression$1", "PAGE$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "PAGE", "symbols": ["int", "PAGE$string$1", "hex", {"literal":"-","pos":151}, "hex", "PAGE$string$2", "int", "PAGE$string$3", "int", "PAGE$string$4", "int", {"literal":")","pos":167}, "PAGE$ebnf$1"], "postprocess":  function(d) {
        	return {
        		page: d[0],
        		from: d[2], to: d[4],
        		pid: d[6],
        		idx: d[8], nxt: d[10],
        		bytes: d[12].map(e => e[1])
        	}
        } },
    {"name": "BYTE$string$1", "symbols": [{"literal":":"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BYTE", "symbols": ["hex", "BYTE$string$1", "hex"], "postprocess": function(d) { return { address: d[0], value: d[2] } }},
    {"name": "hex$ebnf$1", "symbols": [/[0-9a-f]/]},
    {"name": "hex$ebnf$1", "symbols": [/[0-9a-f]/, "hex$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "hex", "symbols": ["hex$ebnf$1"], "postprocess": function(d) { return d[0].join(""); }}
]
  , ParserStart: "MAIN"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.output_grammar = grammar;
}
})();
