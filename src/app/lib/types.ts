// lib/types.ts
import { RowDataPacket } from 'mysql2';

export interface User extends RowDataPacket {
  id: number;
  name: string;
}

export interface Material extends RowDataPacket {
  id: number;
  category: string;
  title: string;
  description: string;
}

export interface Achievement extends RowDataPacket {
  user_id: number;
  material_id: number;
}
