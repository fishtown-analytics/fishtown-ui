const { readdirSync, writeFileSync } = require('fs');
const { resolve } = require('path');

const COMPONENT_DIRECTORY = 'components';

const components = readdirSync(resolve(`${COMPONENT_DIRECTORY}`), { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => `export * from './${COMPONENT_DIRECTORY}/${dir.name}'`);

console.log(`Discovered ${components.length} component directories`, '\n');
console.log(components.join('\n'),'\n');
console.log('Creating index.ts file');
writeFileSync(resolve('./index.ts'), `${components.join('\n')}\n`);