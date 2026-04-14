export interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover: string;
  src: string;
  liked: boolean;
}

export interface Playlist {
  id: number;
  name: string;
  count: number;
  cover: string;
}

export const TRACKS: Track[] = [
  {
    id: 1,
    title: 'Последний поцелуй',
    artist: 'Кино',
    album: 'Звезда по имени Солнце',
    duration: 237,
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    liked: true,
  },
  {
    id: 2,
    title: 'Группа крови',
    artist: 'Кино',
    album: 'Группа крови',
    duration: 258,
    cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&q=80',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    liked: false,
  },
  {
    id: 3,
    title: 'Скованные одной цепью',
    artist: 'Nautilus Pompilius',
    album: 'Разлука',
    duration: 214,
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    liked: true,
  },
  {
    id: 4,
    title: 'Малиновый звон',
    artist: 'Ариэль',
    album: 'Золотые хиты',
    duration: 195,
    cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&q=80',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    liked: false,
  },
  {
    id: 5,
    title: 'Белые розы',
    artist: 'Ласковый май',
    album: 'Белые розы',
    duration: 223,
    cover: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=300&q=80',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    liked: true,
  },
  {
    id: 6,
    title: 'Мой рок-н-ролл',
    artist: 'БИ-2',
    album: 'Молоко',
    duration: 248,
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    liked: false,
  },
  {
    id: 7,
    title: 'Девочка-пай',
    artist: 'Сплин',
    album: 'Коллекция',
    duration: 202,
    cover: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=300&q=80',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    liked: false,
  },
  {
    id: 8,
    title: 'Звезда',
    artist: 'Земфира',
    album: 'Прости меня моя любовь',
    duration: 231,
    cover: 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=300&q=80',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    liked: true,
  },
];

export const PLAYLISTS: Playlist[] = [
  { id: 1, name: 'Моя волна', count: 42, cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=80' },
  { id: 2, name: 'Русский рок 90-х', count: 28, cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&q=80' },
  { id: 3, name: 'Хиты для настроения', count: 55, cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&q=80' },
  { id: 4, name: 'Вечерняя прогулка', count: 19, cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&q=80' },
];

export const CHARTS: { title: string; artist: string; cover: string; plays: string }[] = [
  { title: 'Привет', artist: 'Земфира', cover: 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=200&q=80', plays: '2.1 млн' },
  { title: 'Пьяная', artist: 'Сплин', cover: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=200&q=80', plays: '1.8 млн' },
  { title: 'Лёд', artist: 'БИ-2', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&q=80', plays: '1.5 млн' },
  { title: 'Звезда по имени Солнце', artist: 'Кино', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=80', plays: '3.2 млн' },
];

export function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}
