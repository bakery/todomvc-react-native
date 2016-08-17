/* eslint comma-dangle: "off", prefer-template: "off", eol-last: "off" */
import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';
import assert from 'assert';

const queries = {};
const mutations = [];

// XX: check for duplicate mutation declarations
// accross different models
function checkForDuplicates(listOfMutations) {
  const existingMutations = [];
  listOfMutations.forEach(ms => Object.keys(ms).forEach(m => {
    assert(existingMutations.indexOf(m) === -1, 'Duplicate mutation declaration:' + m);
    existingMutations.push(m);
  }));
}
checkForDuplicates(mutations);

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: queries
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: Object.assign.apply(this, [
      {},
      ...mutations
    ])
  })
});
