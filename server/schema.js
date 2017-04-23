import { buildSchema } from 'graphql';
import { mergeStrings } from 'gql-merge';
import path from 'path';
import fs from 'fs';
import glob from 'glob';
import paths from '../build/paths';

// find type definitions, read their contents and merge them into one
const globPattern = path.join(paths.server, 'schemas', '**/*.gql');
const filenames = glob.sync(globPattern);
const typeDefinitions = filenames.map(filename => fs.readFileSync(filename, 'utf8'));
const mergedTypeDefinitions = mergeStrings(typeDefinitions);

// return schema
export default buildSchema(mergedTypeDefinitions);
