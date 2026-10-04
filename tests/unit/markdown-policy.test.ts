import { it, expect } from 'vitest';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import policy from '../../src/plugins/remark-content-policy.mjs';
function process(markdown: string) { const processor = unified().use(remarkParse).use(policy); return processor.runSync(processor.parse(markdown)); }
it.each(['<script>alert(1)</script>', '<iframe src="https://evil.test"></iframe>', '[bad](javascript:alert)', '[bad](data:text/html,hello)', '[bad](//evil.test)', '[bad][x]\n\n[x]: javascript:alert'])('rejects unsafe Markdown %s', markdown => { expect(() => process(markdown)).toThrow(); });
it('allows code samples and ordinary HTTPS/root/fragment links', () => { expect(() => process('```html\n<script>example</script>\n```\n[Good](https://example.com) [Local](/projects/) [Heading](#approach)')).not.toThrow(); });
it('requires image descriptions', () => { expect(() => process('![](/uploads/images/photo.png)')).toThrow(); });
