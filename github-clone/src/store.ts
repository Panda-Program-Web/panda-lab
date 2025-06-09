import {
  User,
  Repository,
  CommitWithDiff,
  File,
  CommitChange,
} from './types';
import { randomUUID } from 'crypto';

const users = new Map<string, User>();
const repositories = new Map<string, Repository>();

const generateDiff = (oldStr: string | undefined, newStr: string): string => {
  const oldLines = (oldStr ?? '').split('\n');
  const newLines = newStr.split('\n');
  let diff = '';
  const max = Math.max(oldLines.length, newLines.length);
  for (let i = 0; i < max; i++) {
    const o = oldLines[i];
    const n = newLines[i];
    if (o === n) {
      diff += ` ${o ?? ''}\n`;
    } else {
      if (o !== undefined) diff += `- ${o}\n`;
      if (n !== undefined) diff += `+ ${n}\n`;
    }
  }
  return diff.trimEnd();
};

export const createUser = (username: string): User => {
  const user: User = { id: randomUUID(), username };
  users.set(user.id, user);
  return user;
};

export const listUsers = (): User[] => Array.from(users.values());

export const createRepository = (
  ownerId: string,
  name: string,
  description?: string
): Repository => {
  const repo: Repository = {
    id: randomUUID(),
    name,
    ownerId,
    description,
    commits: [],
    files: new Map<string, File>(),
  };
  repositories.set(repo.id, repo);
  return repo;
};

export const listRepositories = (): Repository[] => Array.from(repositories.values());

export const getRepository = (id: string): Repository | undefined => repositories.get(id);

export const createFile = (
  repoId: string,
  path: string,
  content: string
): File | undefined => {
  const repo = repositories.get(repoId);
  if (!repo) return undefined;
  const file: File = { path, content };
  repo.files.set(path, file);
  return file;
};

export const updateFile = (
  repoId: string,
  path: string,
  content: string
): File | undefined => {
  const repo = repositories.get(repoId);
  if (!repo) return undefined;
  const file = repo.files.get(path);
  if (!file) return undefined;
  file.content = content;
  return file;
};

export const getFile = (repoId: string, path: string): File | undefined => {
  const repo = repositories.get(repoId);
  return repo?.files.get(path);
};

export const listFiles = (repoId: string): File[] => {
  const repo = repositories.get(repoId);
  return repo ? Array.from(repo.files.values()) : [];
};

export const createCommit = (
  repoId: string,
  message: string,
  changes: Record<string, string>
): CommitWithDiff | undefined => {
  const repo = repositories.get(repoId);
  if (!repo) return undefined;
  const commitChanges: CommitChange[] = [];
  for (const [path, newContent] of Object.entries(changes)) {
    const file = repo.files.get(path);
    const diff = generateDiff(file?.content, newContent);
    commitChanges.push({ filePath: path, diff });
    repo.files.set(path, { path, content: newContent });
  }
  const commit: CommitWithDiff = {
    id: randomUUID(),
    message,
    timestamp: new Date().toISOString(),
    changes: commitChanges,
  };
  repo.commits.push(commit);
  return commit;
};

export const listCommits = (repoId: string): CommitWithDiff[] => {
  const repo = repositories.get(repoId);
  return repo ? repo.commits : [];
};
