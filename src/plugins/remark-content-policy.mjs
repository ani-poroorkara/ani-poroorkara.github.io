export function safeMarkdownUrl(value) {
  if (/[\u0000-\u0020\\]/.test(value) || value.startsWith('//')) return false;
  try {
    const decoded = decodeURIComponent(value);
    if (decoded.startsWith('//') || /[\u0000-\u001f\\]/.test(decoded)) return false;
    return ['https:', 'mailto:'].includes(new URL(decoded, 'https://ani-poroorkara.github.io').protocol);
  } catch { return false; }
}
export function inspectMarkdown(tree) {
  const errors = []; const images = [];
  const definitions = new Map();
  const walk = (node, visit) => { visit(node); for (const child of node.children || []) walk(child, visit); };
  walk(tree, node => { if (node.type === 'definition') definitions.set(node.identifier, node.url); });
  walk(tree, node => {
    if (node.type === 'html') errors.push('Raw HTML is not supported; use Markdown or a fenced code block');
    if (['link', 'image', 'definition'].includes(node.type) && !safeMarkdownUrl(node.url)) errors.push(`Unsafe URL: ${node.url}`);
    if (node.type === 'image' || node.type === 'imageReference') {
      if (!node.alt?.trim()) errors.push('Image requires a description');
      const url = node.url || definitions.get(node.identifier);
      if (!url) errors.push('Image reference has no definition');
      else if (!url.startsWith('/uploads/images/')) errors.push('Article images must use /uploads/images/ uploads');
      else images.push(url);
    }
  });
  return { errors, images };
}
export default function remarkContentPolicy() {
  return tree => { const { errors } = inspectMarkdown(tree); if (errors.length) throw new Error(errors.join('\n')); };
}
