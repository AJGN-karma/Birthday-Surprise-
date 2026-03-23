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
  username_hint: "1. Favorite anime character calling your friend",
  password_hint: "2. Enter your firstname +Add your dob(ddyymm)",
  correct_username: "hinata",
  correct_password: "pavithra240503",
  how_we_met: "We met on the most random day, and somehow you became the most important person to me...",
  why_you_matter: "My bestie\nYou're not just a friend, \nyou're the chapter\nI never want to end.\nIn a world full of temporary people, \nyou stayed\nlike a promise whispered\nand never broken.\nYou know my silence, \nyou read my eyes, you fix my chaos without even trying If life is a journey,\nthen you're my favorite stop the place where I can rest, laugh loud. \nand be completely me\nBestie\nyou're not just part of my story...\nyou are the reason\nit feels beautiful.",
  things_never_said: "I'm grateful for you every single day. You're my forever.",
  final_message: "Thank you for being my best friend. Forever.",
  photo_message: "These 7 photos capture moments that mean everything to me. Each one is a memory of how special you are, and how lucky I am to have you in my life."
};
