SCENE -> PASSAGE:+ "\n":*                      {% toScene %}
PASSAGE -> HEADER "\n":+ SENTENCE:+            {% toPassage %}
SENTENCE -> (LINK | PLAIN_TEXT) "\n":+         {% toSentence %}

PLAIN_TEXT ->
   (ALPHANUMERIC | _ | PUNCTUATION):+          {% toText %}

LINK -> "[" LINK_TEXT "](" LINK_TARGET ")"     {% toLink %}
LINK_TEXT -> (ALPHANUMERIC | _):+              {% toText %}
LINK_TARGET ->
   ALPHANUMERIC
   (ALPHANUMERIC | "-"):*
   ALPHANUMERIC:+                              {% tokens => flatten(tokens).join('') %}

HEADER ->
   "#"
   (ALPHANUMERIC | _):+
   ("|" HEADER_NAME):*                         {% toHeader %}
HEADER_NAME -> (ALPHANUMERIC | "-" | _):+      {% toText %}

NUMBER -> [0-9]                                {% id %}
LETTER -> [a-zA-Z]                             {% id %}
ALPHANUMERIC -> LETTER | NUMBER                {% id %}
PUNCTUATION -> [,\.'"\?!£$%&*\(\)\{\}\\]       {% id %}
_ -> [ \t]                                     {% id %}

@{%
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
%}
