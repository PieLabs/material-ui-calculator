import debug from 'debug';

import { insertAt } from './utils';

const log = debug('@pie-labs:material-ui-calculator:math-input');
const map = {
  0: '⁰',
  1: '¹',
  2: '²',
  3: '³',
  4: '⁴',
  5: '⁵',
  6: '⁶',
  7: '⁷',
  8: '⁸',
  9: '⁹',
};

const INPUTS = [
  {
    match: /[\+\-\(\)]/,
    passthrough: true
  },
  {
    match: /e/,
    passthrough: true
  },
  {
    match: /[0-9]/,
    passthrough: true
  },
  {
    match: 'π',
    emit: 'π'
  },
  {
    match: '*',
    emit: '×'
  },
  {
    //there is no input string?
    match: ['sqrt', '√'],
    emit: '√(|)'
  },
  {
    match: '^',
    emit: '[ʸ]',
    superscript: /[0-9]/
  },
  {
    match: 'sin',
    emit: 'sin(|)'
  },
  {
    match: 'cos',
    emit: 'cos(|)'
  },
  {
    match: 'tan',
    emit: 'tan(|)'
  },
  {
    match: 'log',
    emit: 'log(|)'
  },
  {
    match: 'ln',
    emit: 'ln(|)'
  },
  {
    match: 'abs',
    emit: 'abs(|)'
  },
  {
    match: '!',
    emit: '!'
  },
  {
    match: 'ʸ√x',
    emit: '[ʸ]√',
    superscript: /[0-9]/
  },
  {
    match: '/',
    emit: '÷'
  }
];


const getSuperscript = char => map[char];

const cleanEmit = (e) => e.replace('|', '');

const buildUpdate = (value, start, end, emit) => {

  const emitValue = cleanEmit(emit);
  log('[buildUpdate] emitValue: ', emitValue);
  const relativeCaret = emit.indexOf('|') > 0 ? emit.indexOf('|') : emitValue.length;
  const valueUpdate = insertAt(value, { start, end }, emitValue);
  return {
    update: valueUpdate,
    start: start + relativeCaret,
    end: start + relativeCaret
  }
}

const isMatch = (match, input) => {

  const m = Array.isArray(match) ? match : [match];

  const matches = m => {
    if (m instanceof RegExp) {
      log('test input: ', input, ' with regex:', m.toString());
      return m.test(input);
    } else {
      return m === input;
    }
  }
  return m.some(matches);
}

export const handleInput = (input, value, superscript, selectionStart, selectionEnd) => {

  if (superscript) {
    if (superscript.test(e.key)) {
      const sv = getSuperscript(e.key);
      if (sv) {
        const update = insertAt(value, { start: selectionStart, end: selectionEnd }, sv);

        return {
          value: update,
          selectionStart: update.length,
          selectionEnd: update.length,
          superscript
        };
      }
    }
  }

  const handler = INPUTS.find(v => isMatch(v.match, input));

  log('handler: ', handler);
  if (handler) {

    if (handler.passthrough) {
      return {
        passthrough: true
      }
    } else {
      log('handler: ', handler);
      const { update, start, end } = buildUpdate(value, selectionStart, selectionEnd, handler.emit);
      // const update = insertAt(value, { start: selectionStart, end: selectionEnd }, emitValue);
      return {
        value: update,
        selectionStart: start,
        // (selectionStart + value.length),
        selectionEnd: end,
        //(selectionEnd + value.length),
        superscript
      }

    }
  }

}