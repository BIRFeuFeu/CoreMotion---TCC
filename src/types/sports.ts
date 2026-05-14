export type Sport = 'Judô' | 'Jiu-jitsu' | 'Basquete' | 'Futebol' | 'Vôlei';
export type UserRole = 'Atleta' | 'Técnico' | 'Civil';
export type Category = 'Calçados' | 'Vestuário' | 'Equipamentos' | 'Acessórios';

export interface UserProfile {
  name: string;
  role: UserRole;
  favoriteSports: Sport[];
  avatar?: string;
  medalBoard: string;
  championships: string;
  club: string;
  currentBelt?: string;
  contact: string;
  notificationsEnabled: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  sport: Sport;
  date: string;
  image: string;
  author: string;
}

export interface Event {
  id: string;
  title: string;
  type: 'Treino' | 'Amistoso';
  sport: Sport;
  date: string;
  location: string;
  coach: string;
  participants: string[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  sport: Sport;
  category: Category;
  image: string;
}