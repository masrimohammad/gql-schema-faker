import { generateFakeResponse } from './src/faker';

const yargs = require('yargs');

// Define the command and its options
const { argv } = yargs
  .option('schema', {
    demandOption: true,
    type: 'string',
    describe: 'path of the graphql schema',
  })
  .option('endpoint', {
    demandOption: true,
    type: 'string',
    describe: 'graphql schema endpoint to fake response data for',
  })
  .help();

const {
  schema,
  endpoint,
} = argv;

generateFakeResponse(schema, endpoint);
