declare namespace Express {
  export interface Request {
    user_id: string;
    role: 'ADMIN' | 'MEMBER';
  }
}