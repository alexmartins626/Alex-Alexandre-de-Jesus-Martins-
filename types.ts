
export enum LanguageType {
  JAVA = 'Java',
  JAVASCRIPT = 'JavaScript',
  HTML_CSS = 'HTML & CSS',
  C = 'C',
  CPP = 'C++',
  CSHARP = 'C#'
}

export interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  description: string;
  duration: string;
  isCompleted: boolean;
}

export interface Course {
  id: string;
  language: LanguageType;
  title: string;
  thumbnail: string;
  description: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  lessons: Lesson[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
