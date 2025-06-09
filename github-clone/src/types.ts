export type User = {
  id: string;
  username: string;
};

export type Commit = {
  id: string;
  message: string;
  timestamp: string;
};

export type File = {
  path: string;
  content: string;
};

export type CommitChange = {
  filePath: string;
  diff: string;
};

export type CommitWithDiff = Commit & {
  changes: CommitChange[];
};

export type Repository = {
  id: string;
  name: string;
  ownerId: string;
  description?: string;
  commits: CommitWithDiff[];
  files: Map<string, File>;
};
