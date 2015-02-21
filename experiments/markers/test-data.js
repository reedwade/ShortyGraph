

var node_classes = {
    "Joey" : "male",
    "Chris" : "male",
    "Harry" : "male",

    "Claire" : "female",
    "Beth" : "female",
    "Bella" : "female",
    "Jay" : "female",
    "Brenda" : "female",
    "Rachel" : "female",
    "Lisa" : "female"
};

// Link types:
// A - generic - solid curved - 0.5
// B - red - solid curved - 0.5
// C - green solid no curve
// D - pink - dashed curve - 0.7

var inputs = [
    {"source":"moose",    "target":"bison",    "type":"C", "label":"related",       "starting":1, "ending":1},

    {"source":"ONE",    "target":"TWO",    "type":"C", "label":"related",       "starting":1, "ending":5},
    {"source":"ONE",    "target":"TWO",    "type":"A", "label":"partnered",     "starting":1, "ending":5},
    {"source":"ONE",    "target":"TWO",    "type":"A", "label":"cheated on",    "starting":1, "ending":5},
    {"source":"ONE",    "target":"TWO",    "type":"D", "label":"hooked up",      "starting":1, "ending":5},
    {"source":"ONE",    "target":"TWO",    "type":"A", "label":"assaulted",     "starting":1, "ending":5},
    {"source":"ONE",    "target":"TWO",    "type":"A", "label":"killed",        "starting":1, "ending":5},

    {"source":"THREE",  "target":"FOUR",   "type":"C", "label":"related",       "starting":1, "ending":5},
    {"source":"THREE",  "target":"FOUR",   "type":"A", "label":"partnered",     "starting":1, "ending":5},
    {"source":"THREE",  "target":"FOUR",   "type":"A", "label":"cheated on",    "starting":1, "ending":5},
    {"source":"THREE",  "target":"FOUR",   "type":"D", "label":"hooked up",      "starting":1, "ending":5},
    {"source":"THREE",  "target":"FOUR",   "type":"A", "label":"assaulted",     "starting":1, "ending":5},
    {"source":"THREE",  "target":"FOUR",   "type":"A", "label":"killed",        "starting":1, "ending":5},

    {"source":"FOUR",   "target":"THREE",  "type":"C", "label":"related",       "starting":1, "ending":5},
    {"source":"FOUR",   "target":"THREE",  "type":"A", "label":"partnered",     "starting":1, "ending":5},
    {"source":"FOUR",   "target":"THREE",  "type":"A", "label":"cheated on",    "starting":1, "ending":5},
    {"source":"FOUR",   "target":"THREE",  "type":"D", "label":"hooked up",      "starting":1, "ending":5},
    {"source":"FOUR",   "target":"THREE",  "type":"A", "label":"assaulted",     "starting":1, "ending":5},
    {"source":"FOUR",   "target":"THREE",  "type":"A", "label":"killed",        "starting":1, "ending":5},

    {"source":"Joey",   "target":"Claire",    "type":"B", "label":"murders",        "starting":1, "ending":5, "marker_end":"arrow1"},
    {"source":"Joey",   "target":"Beth",    "type":"B", "label":"murders",        "starting":2, "ending":5, "marker_end":"arrow1"},
    {"source":"Joey",   "target":"Jay",    "type":"B", "label":"murders",        "starting":3, "ending":5, "marker_end":"arrow1"},
    {"source":"Joey",   "target":"Brenda",    "type":"B", "label":"murders",        "starting":4, "ending":5, "marker_end":"arrow1"},
    {"source":"Joey",   "target":"Mark",    "type":"B", "label":"murders",        "starting":5, "ending":5, "marker_end":"arrow1"},
    // {"source":"Joey",   "target":"somebody""type":"A",,"label":"assaulted",     "starting":1, "ending":5},

    {"source":"Chris",  "target":"Harry",  "type":"C", "label":"related",       "starting":1, "ending":5},

    {"source":"Chris",  "target":"Rachel", "type":"C", "label":"partnered",     "starting":1, "ending":5},

    {"source":"Chris",  "target":"Rachel", "type":"A", "label":"cheated on",    "starting":1, "ending":5},
    {"source":"Rachel", "target":"Chris",  "type":"A", "label":"cheated on",    "starting":1, "ending":5},

    {"source":"Chris",  "target":"Jail",   "type":"A", "label":"goes to",    "starting":3, "ending":4, "marker_end":"arrow1"},

    {"source":"Rachel", "target":"Boyd",   "type":"D", "label":"hooked up",      "starting":1, "ending":5},
    {"source":"Chris",  "target":"Lisa",   "type":"D", "label":"hooked up",      "starting":1, "ending":5}
];