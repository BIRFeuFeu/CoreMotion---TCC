export type Sport = 'Judô' | 'Jiu-jitsu' | 'Basquete' | 'Futebol' | 'Vôlei';
export type UserRole = 'Atleta' | 'Técnico' | 'Civil';

export interface UserProfile {
  name: string;
  role: UserRole;
  favoriteSports: Sport[];
  avatar?: string;
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
  image: string;
}