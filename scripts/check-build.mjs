import { checkOutput } from './lib/output-links.mjs';
const errors = await checkOutput('dist');
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log('Generated pages, links, fragments, feeds, styles and media checked.');
