import { Lokka } from 'lokka';
import { Transport } from 'lokka-transport-http';

const {
  SERVER_PORT,
  SERVER_HOST,
  PROTOCOL,
} = process.env;

const client = new Lokka({
  transport: new Transport(`${PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/graphql`)
});

export default {
  loadAllTodos() {
    return client.query(`
      {
        todos {
          id, text, isComplete
        }
      }
    `);
  }
};
