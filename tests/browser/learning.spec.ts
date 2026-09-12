import { test, expect } from '@playwright/test';
import express from 'express';
import type { AddressInfo } from 'node:net';
import { resolve } from 'node:path';
import { Store } from '../../server/store';
import { createApp } from '../../server/app';
import { parseCallResult } from '../../server/calle';
import { defaultTask } from '../../src/domain/templates';
import type { CaseRecord } from '../../src/domain/model';

test('a correction review changes durable account memory, and rejection pauses it', async ({
  page,
}) => {
  // This test owns its server/store; it never seeds or mutates the regular app database.
  const store = new Store(':memory:');
  const gateway = express();
  const server = gateway.listen(0, '127.0.0.1');
  let providerRequests = 0;
  await new Promise<void>((done) => server.once('listening', done));
  const origin = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  const { app } = createApp({
    store,
    origin,
    config: {
      apiKey: '',
      enabled: false,
      users: [],
      recipients: [],
      maxPerDay: 0,
      maxPerUserDay: 0,
      callStart: 0,
      callEnd: 24,
      retentionDays: 30,
    },
    transport: {
      create: async () => {
        providerRequests++;
        throw Error('No calls in browser tests');
      },
      read: async () => {
        providerRequests++;
        throw Error('No reads in browser tests');
      },
    },
  });
  gateway.use(app);
  gateway.use(express.static(resolve('dist')));
  gateway.get('/', (_req, res) => res.sendFile(resolve('dist/index.html')));
  try {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(origin);
    await expect(page.getByRole('button', { name: 'Open navigation', exact: true })).toBeVisible();
    const session = await page.evaluate(async () => (await fetch('/api/session')).json());
    const task = defaultTask('repair');
    const now = new Date().toISOString();
    const result = parseCallResult(
      {
        recipients: [
          {
            structured_result: {
              disposition: 'answered',
              facts: [
                {
                  field: 'budget',
                  value_json: '38',
                  quote: 'The total is $38.',
                  turn_index: 0,
                  certainty: 'confirmed',
                  conditions: [],
                  unit: 'USD',
                  price_basis: 'all_in',
                },
              ],
            },
            attempts: [{ transcript_turns: [{ speaker: 'user', text: 'The total is $38.' }] }],
          },
        ],
      },
      task,
      {
        id: 'test',
        name: 'Synthetic repair shop',
        phone: '+12025550101',
        consentRef: 'fixture',
        timezone: 'UTC',
      },
      'synthetic-browser-call',
      now,
    );
    const record: CaseRecord = {
      id: 'synthetic-learning-case',
      title: task.title,
      mode: 'live',
      createdAt: now,
      updatedAt: now,
      currentVersion: 1,
      revisions: [{ version: 1, task, createdAt: now, results: [result] }],
      outcomes: [],
      stopped: false,
    };
    store.saveCase(session.user.id, record);
    await page.goto(`${origin}/?case=${record.id}`);
    await page.getByRole('button', { name: 'View evidence' }).click();
    await expect(page.getByText('Automatic correction · needs your review')).toBeVisible();
    await expect(page.getByRole('dialog')).toContainText('The provider interpreted this as $0.38');
    await page.getByRole('button', { name: 'Confirm evidence', exact: true }).click();
    await expect(page.getByText('Automatic correction · reviewed')).toBeVisible();
    expect(store.db.prepare('SELECT outcome FROM correction_feedback').get()!.outcome).toBe(
      'accepted',
    );
    await page.reload();
    await page.getByRole('button', { name: 'View evidence' }).click();
    await expect(page.getByText('Automatic correction · reviewed')).toBeVisible();
    await page.getByRole('button', { name: 'Correct interpretation', exact: true }).click();
    await page.getByLabel('Amount in dollars').fill('39');
    await page
      .getByLabel('Reason', { exact: true })
      .fill('Synthetic rejection exercise; this edit is not supported by the quote.');
    await page.getByRole('button', { name: 'Save correction', exact: true }).click();
    await expect
      .poll(() => store.db.prepare('SELECT outcome FROM correction_feedback').get()!.outcome)
      .toBe('rejected');
    await page.getByRole('button', { name: 'Close dialog' }).click();
    await page.getByRole('button', { name: 'Open navigation' }).click();
    await page.getByRole('button', { name: 'Connection', exact: true }).click();
    const learning = page.getByRole('region', { name: 'Learning from your reviews' });
    await expect(learning).toContainText('Paused after a rejected correction');
    expect(await page.getByRole('dialog').evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(
      true,
    );
    await page.screenshot({ path: 'artifacts/learning-mobile.png', fullPage: true });
    await learning.getByRole('button', { name: 'Reset dollar amount corrections' }).click();
    await expect(learning).not.toContainText('Paused after a rejected correction');
    expect(store.db.prepare('SELECT COUNT(*) AS n FROM correction_feedback').get()!.n).toBe(0);
    expect(providerRequests).toBe(0);
  } finally {
    await new Promise<void>((done, reject) =>
      server.close((error) => (error ? reject(error) : done())),
    );
    store.close();
  }
});
