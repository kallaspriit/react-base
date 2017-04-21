import { buildSchema } from 'graphql';
import { mergeStrings } from 'gql-merge';
import path from 'path';
import fs from 'fs';
import glob from 'glob';
import paths from '../build/paths';

// find type definitions, read their contents and merge them into one
const typeFilenames = glob.sync(path.join(paths.server, 'types', '**/*.gql'));
const typeDefinitions = typeFilenames.map(filename => fs.readFileSync(filename, 'utf8'));
const mergedTypes = mergeStrings(typeDefinitions);

// return schema
export default buildSchema(mergedTypes);
