// Generated automatically by nearley, version 2.19.6
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const toSentence = tokens => {
   const value = tokens[0][0];
   return (typeof value === 'string')
      ? { type: 'text', text: value }
      : { type: 'link', ...value };
};

const toLink = tokens => ({
   text: tokens[1],
   target: tokens[3]
});

const toHeader = tokens => {
   if (tokens[2].length > 0) {
      // # Introduction |intro
      return {
         text: tokens[1].join('').trim(),
         name: tokens[2][0].slice(1).join('').trim()
      };
   } else {
      // # Introduction
      const text = tokens[1].join('').trim();
      return {
         text,
         name: text.toLowerCase().replace(/ /g, '-')
      };
   }
};

const toPassage = tokens => {
   return {
      header: tokens[0],
      content: tokens[2]
   };
};

const toScene = tokens => {
   return {
      passages: flatten(tokens)
   };
};

const flatten = tokens => tokens.reduce((a, b) => a.concat(b), []);

const toText = tokens => tokens[0].join('').trim();
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "SCENE$ebnf$1", "symbols": ["PASSAGE"]},
    {"name": "SCENE$ebnf$1", "symbols": ["SCENE$ebnf$1", "PASSAGE"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "SCENE$ebnf$2", "symbols": []},
    {"name": "SCENE$ebnf$2", "symbols": ["SCENE$ebnf$2", {"literal":"\n"}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "SCENE", "symbols": ["SCENE$ebnf$1", "SCENE$ebnf$2"], "postprocess": toScene},
    {"name": "PASSAGE$ebnf$1", "symbols": [{"literal":"\n"}]},
    {"name": "PASSAGE$ebnf$1", "symbols": ["PASSAGE$ebnf$1", {"literal":"\n"}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "PASSAGE$ebnf$2", "symbols": ["SENTENCE"]},
    {"name": "PASSAGE$ebnf$2", "symbols": ["PASSAGE$ebnf$2", "SENTENCE"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "PASSAGE", "symbols": ["HEADER", "PASSAGE$ebnf$1", "PASSAGE$ebnf$2"], "postprocess": toPassage},
    {"name": "SENTENCE$subexpression$1", "symbols": ["LINK"]},
    {"name": "SENTENCE$subexpression$1", "symbols": ["PLAIN_TEXT"]},
    {"name": "SENTENCE$ebnf$1", "symbols": [{"literal":"\n"}]},
    {"name": "SENTENCE$ebnf$1", "symbols": ["SENTENCE$ebnf$1", {"literal":"\n"}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "SENTENCE", "symbols": ["SENTENCE$subexpression$1", "SENTENCE$ebnf$1"], "postprocess": toSentence},
    {"name": "PLAIN_TEXT$ebnf$1$subexpression$1", "symbols": ["ALPHANUMERIC"]},
    {"name": "PLAIN_TEXT$ebnf$1$subexpression$1", "symbols": ["_"]},
    {"name": "PLAIN_TEXT$ebnf$1$subexpression$1", "symbols": ["PUNCTUATION"]},
    {"name": "PLAIN_TEXT$ebnf$1", "symbols": ["PLAIN_TEXT$ebnf$1$subexpression$1"]},
    {"name": "PLAIN_TEXT$ebnf$1$subexpression$2", "symbols": ["ALPHANUMERIC"]},
    {"name": "PLAIN_TEXT$ebnf$1$subexpression$2", "symbols": ["_"]},
    {"name": "PLAIN_TEXT$ebnf$1$subexpression$2", "symbols": ["PUNCTUATION"]},
    {"name": "PLAIN_TEXT$ebnf$1", "symbols": ["PLAIN_TEXT$ebnf$1", "PLAIN_TEXT$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "PLAIN_TEXT", "symbols": ["PLAIN_TEXT$ebnf$1"], "postprocess": toText},
    {"name": "LINK$string$1", "symbols": [{"literal":"]"}, {"literal":"("}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "LINK", "symbols": [{"literal":"["}, "LINK_TEXT", "LINK$string$1", "LINK_TARGET", {"literal":")"}], "postprocess": toLink},
    {"name": "LINK_TEXT$ebnf$1$subexpression$1", "symbols": ["ALPHANUMERIC"]},
    {"name": "LINK_TEXT$ebnf$1$subexpression$1", "symbols": ["_"]},
    {"name": "LINK_TEXT$ebnf$1", "symbols": ["LINK_TEXT$ebnf$1$subexpression$1"]},
    {"name": "LINK_TEXT$ebnf$1$subexpression$2", "symbols": ["ALPHANUMERIC"]},
    {"name": "LINK_TEXT$ebnf$1$subexpression$2", "symbols": ["_"]},
    {"name": "LINK_TEXT$ebnf$1", "symbols": ["LINK_TEXT$ebnf$1", "LINK_TEXT$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "LINK_TEXT", "symbols": ["LINK_TEXT$ebnf$1"], "postprocess": toText},
    {"name": "LINK_TARGET$ebnf$1", "symbols": []},
    {"name": "LINK_TARGET$ebnf$1$subexpression$1", "symbols": ["ALPHANUMERIC"]},
    {"name": "LINK_TARGET$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "LINK_TARGET$ebnf$1", "symbols": ["LINK_TARGET$ebnf$1", "LINK_TARGET$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "LINK_TARGET$ebnf$2", "symbols": ["ALPHANUMERIC"]},
    {"name": "LINK_TARGET$ebnf$2", "symbols": ["LINK_TARGET$ebnf$2", "ALPHANUMERIC"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "LINK_TARGET", "symbols": ["ALPHANUMERIC", "LINK_TARGET$ebnf$1", "LINK_TARGET$ebnf$2"], "postprocess": tokens => flatten(tokens).join('')},
    {"name": "HEADER$ebnf$1$subexpression$1", "symbols": ["ALPHANUMERIC"]},
    {"name": "HEADER$ebnf$1$subexpression$1", "symbols": ["_"]},
    {"name": "HEADER$ebnf$1", "symbols": ["HEADER$ebnf$1$subexpression$1"]},
    {"name": "HEADER$ebnf$1$subexpression$2", "symbols": ["ALPHANUMERIC"]},
    {"name": "HEADER$ebnf$1$subexpression$2", "symbols": ["_"]},
    {"name": "HEADER$ebnf$1", "symbols": ["HEADER$ebnf$1", "HEADER$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "HEADER$ebnf$2", "symbols": []},
    {"name": "HEADER$ebnf$2$subexpression$1", "symbols": [{"literal":"|"}, "HEADER_NAME"]},
    {"name": "HEADER$ebnf$2", "symbols": ["HEADER$ebnf$2", "HEADER$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "HEADER", "symbols": [{"literal":"#"}, "HEADER$ebnf$1", "HEADER$ebnf$2"], "postprocess": toHeader},
    {"name": "HEADER_NAME$ebnf$1$subexpression$1", "symbols": ["ALPHANUMERIC"]},
    {"name": "HEADER_NAME$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "HEADER_NAME$ebnf$1$subexpression$1", "symbols": ["_"]},
    {"name": "HEADER_NAME$ebnf$1", "symbols": ["HEADER_NAME$ebnf$1$subexpression$1"]},
    {"name": "HEADER_NAME$ebnf$1$subexpression$2", "symbols": ["ALPHANUMERIC"]},
    {"name": "HEADER_NAME$ebnf$1$subexpression$2", "symbols": [{"literal":"-"}]},
    {"name": "HEADER_NAME$ebnf$1$subexpression$2", "symbols": ["_"]},
    {"name": "HEADER_NAME$ebnf$1", "symbols": ["HEADER_NAME$ebnf$1", "HEADER_NAME$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "HEADER_NAME", "symbols": ["HEADER_NAME$ebnf$1"], "postprocess": toText},
    {"name": "NUMBER", "symbols": [/[0-9]/], "postprocess": id},
    {"name": "LETTER", "symbols": [/[a-zA-Z]/], "postprocess": id},
    {"name": "ALPHANUMERIC", "symbols": ["LETTER"]},
    {"name": "ALPHANUMERIC", "symbols": ["NUMBER"], "postprocess": id},
    {"name": "PUNCTUATION", "symbols": [/[,\.'"\?!£$%&*\(\)\{\}\\]/], "postprocess": id},
    {"name": "_", "symbols": [/[ \t]/], "postprocess": id}
]
  , ParserStart: "SCENE"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
