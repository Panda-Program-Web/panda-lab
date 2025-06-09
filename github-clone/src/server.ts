import { Hono } from 'hono';
import {
  createUser,
  listUsers,
  createRepository,
  listRepositories,
  getRepository,
  createFile,
  updateFile,
  getFile,
  listFiles,
  createCommit,
  listCommits,
} from './store';

const app = new Hono();

app.post('/users', async (c) => {
  const { username } = await c.req.json();
  const user = createUser(username);
  return c.json(user, 201);
});

app.get('/users', (c) => c.json(listUsers()));

app.post('/repos', async (c) => {
  const { ownerId, name, description } = await c.req.json();
  const repo = createRepository(ownerId, name, description);
  return c.json(repo, 201);
});

app.get('/repos', (c) => {
  const repos = listRepositories().map((r) => ({
    ...r,
    files: listFiles(r.id),
  }));
  return c.json(repos);
});

app.get('/repos/:id', (c) => {
  const repo = getRepository(c.req.param('id'));
  if (!repo) return c.notFound();
  const files = listFiles(repo.id);
  return c.json({ ...repo, files });
});

app.post('/repos/:id/files', async (c) => {
  const repoId = c.req.param('id');
  const { path, content } = await c.req.json();
  const file = createFile(repoId, path, content);
  if (!file) return c.notFound();
  return c.json(file, 201);
});

app.put('/repos/:id/files/*', async (c) => {
  const repoId = c.req.param('id');
  const filePath = c.req.param('*');
  const { content } = await c.req.json();
  const file = updateFile(repoId, filePath, content);
  if (!file) return c.notFound();
  return c.json(file);
});

app.get('/repos/:id/files', (c) => {
  const files = listFiles(c.req.param('id'));
  return c.json(files);
});

app.get('/repos/:id/files/*', (c) => {
  const file = getFile(c.req.param('id'), c.req.param('*'));
  if (!file) return c.notFound();
  return c.json(file);
});

app.post('/repos/:id/commits', async (c) => {
  const { message, changes } = await c.req.json();
  const commit = createCommit(c.req.param('id'), message, changes || {});
  if (!commit) return c.notFound();
  return c.json(commit, 201);
});

app.get('/repos/:id/commits', (c) => {
  const commits = listCommits(c.req.param('id'));
  return c.json(commits);
});

export default app;
