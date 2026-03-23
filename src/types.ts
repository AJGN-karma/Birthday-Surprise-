export interface AppConfig {
  birthday_person_name: string;
  username_hint: string;
  password_hint: string;
  correct_username: string;
  correct_password: string;
  how_we_met: string;
  why_you_matter: string;
  things_never_said: string;
  final_message: string;
  photo_message: string;
}

export type PageId = 
  | 'welcome' 
  | 'login' 
  | 'games' 
  | 'carousel' 
  | 'message' 
  | 'video' 
  | 'photo-rain' 
  | 'final';

export const DEFAULT_CONFIG: AppConfig = {
  birthday_person_name: "Bestie",
  username_hint: "What do I always call you?",
  password_hint: "Our favorite memory year/date",
  correct_username: "sanath",
  correct_password: "2025",
  how_we_met: "We met on the most random day, and somehow you became the most important person to me...",
  why_you_matter: "You make every ordinary moment extraordinary. Your laugh is my favorite sound, and your presence is my safe place.",
  things_never_said: "I'm grateful for you every single day. I love you so much, and I don't say it enough. You're my forever.",
  final_message: "Thank you for being my best friend. Forever.",
  photo_message: "These 7 photos capture moments that mean everything to me. Each one is a memory of how special you are, and how lucky I am to have you in my life."
};
