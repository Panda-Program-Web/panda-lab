import { Hono } from 'hono';
import type { GameResult } from '@baseball-daily/types';
import cheerio from 'cheerio';

const app = new Hono();

interface Env {
  BASEBALL_KV: KVNamespace;
}

// Utility to fetch and parse the latest game data
async function fetchLatestGame(): Promise<GameResult | null> {
  // Placeholder fetch - you need to implement real scraping logic.
  const res = await fetch('https://baseball.yahoo.co.jp/npb/');
  const html = await res.text();
  const $ = cheerio.load(html);
  // TODO: parse the DOM to extract the required data
  // Example return with mock data
  return {
    date: new Date().toISOString().split('T')[0],
    opponent: '阪神タイガース',
    score: '5 - 3',
    result: 'win',
  };
}

app.get('/api/latest-game', async (c) => {
  const kv = c.env.BASEBALL_KV;
  const today = new Date().toISOString().split('T')[0];
  const data = await kv.get<GameResult>(today, { type: 'json' });
  if (!data) {
    return c.json({ success: false, error: 'No game data found.' }, 404);
  }
  return c.json({ success: true, data });
});

app.post('/cron/fetch', async (c) => {
  const kv = c.env.BASEBALL_KV;
  const game = await fetchLatestGame();
  if (game) {
    await kv.put(game.date, JSON.stringify(game));
  }
  return c.json({ ok: true });
});

export default app;
