export interface GameResult {
  date: string;
  opponent: string;
  score: string;
  result: 'win' | 'lose' | 'draw';
  heroUrl?: string;
  managerCommentUrl?: string;
}
