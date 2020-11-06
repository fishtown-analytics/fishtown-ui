const { readdirSync, writeFileSync } = require('fs');
const { resolve, join } = require('path');

const COMPONENT_DIRECTORY = 'components';
const COMPONENT_PATH = `./${COMPONENT_DIRECTORY}`;


const [directory = COMPONENT_DIRECTORY, componentPath = COMPONENT_PATH]  = process.argv.slice(2);
const isDefaultDirectory = directory === COMPONENT_DIRECTORY;

console.log(`Scanning ${directory} for component directories`)
const components = readdirSync(resolve(directory), { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => `export * from './${isDefaultDirectory ? join(componentPath, dir.name) : dir.name}';`);

console.log(`Discovered ${components.length} component directories in ${directory}`, '\n');
console.log(components.join('\n'),'\n');
console.log(`Creating index.ts file in ${isDefaultDirectory ? './' : directory}`);
writeFileSync(resolve(isDefaultDirectory ? './index.ts' : `${directory}/index.ts`), `${components.join('\n')}\n`);