import esprima from 'esprima';

const escodegenOptions = {
  format: {
    indent: {
      style: '  ',
      base: 0,
      adjustMultilineComment: false,
      preserveBlankLines: true,
    },
    newline: '\n',
    space: ' ',
    json: false,
    renumber: false,
    hexadecimal: false,
    quotes: 'single',
    escapeless: false,
    compact: false,
    parentheses: true,
    semicolons: true,
    safeConcatenation: false,
  },
  moz: {
    starlessGenerator: false,
    parenthesizedComprehensionBlock: false,
    comprehensionExpressionStartsWithAssignment: false,
  },
  parse: esprima.parse,
  comment: true,
  sourceMap: undefined,
  sourceMapRoot: null,
  sourceMapWithCode: false,
  file: undefined,
  // sourceContent: originalSource,
  directive: false,
  verbatim: undefined,
};

export default escodegenOptions;
