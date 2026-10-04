import { expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
it('keeps deployment gated and uploads only fully verified static output', () => {
  const workflow = parse(readFileSync('.github/workflows/pages.yml', 'utf8'));
  expect(workflow.on.pull_request).toBeUndefined();
  expect(workflow.on.push.branches).toEqual(['9.0v']);
  expect(workflow.jobs.build.if).toContain("vars.PAGES_DEPLOY_ENABLED == 'true'");
  expect(workflow.jobs.build.if).toContain("github.ref == 'refs/heads/9.0v'");
  expect(workflow.jobs.build.env.SHOW_DRAFTS).toBe('false');
  const steps = workflow.jobs.build.steps;
  const verify = steps.findIndex((step: any) => step.run === 'npm run verify');
  const upload = steps.findIndex((step: any) => step.uses?.startsWith('actions/upload-pages-artifact@'));
  expect(verify).toBeGreaterThan(-1); expect(upload).toBeGreaterThan(verify);
  expect(steps[upload].with.path).toBe('dist');
  expect(workflow.jobs.deploy.needs).toBe('build');
  expect(workflow.jobs.build.permissions?.pages).toBeUndefined();
  expect(workflow.jobs.deploy.permissions.pages).toBe('write');
});
