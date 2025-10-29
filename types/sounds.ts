
export interface Sound {
  id: string;
  name: string;
  icon: string;
  urls: string[]; // Changed to array to support multiple loops
  color: string;
}

export const RELAXATION_SOUNDS: Sound[] = [
  {
    id: 'rain',
    name: 'Pioggia',
    icon: '🌧️',
    urls: [
      'https://cdn.pixabay.com/download/audio/2022/03/10/audio_4a465d533f.mp3',
      'https://cdn.pixabay.com/download/audio/2022/03/24/audio_1808fbf07a.mp3',
    ],
    color: '#5C6BC0',
  },
  {
    id: 'ocean',
    name: 'Mare',
    icon: '🌊',
    urls: [
      'https://cdn.pixabay.com/download/audio/2022/06/07/audio_9c0f8e5e5f.mp3',
      'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    ],
    color: '#42A5F5',
  },
  {
    id: 'fire',
    name: 'Fuoco',
    icon: '🔥',
    urls: [
      'https://cdn.pixabay.com/download/audio/2022/03/15/audio_4037a6c6e5.mp3',
      'https://cdn.pixabay.com/download/audio/2022/03/10/audio_4a465d533f.mp3',
    ],
    color: '#FF7043',
  },
  {
    id: 'wind',
    name: 'Vento',
    icon: '💨',
    urls: [
      'https://cdn.pixabay.com/download/audio/2022/03/24/audio_c8e4c9e7e7.mp3',
      'https://cdn.pixabay.com/download/audio/2022/06/07/audio_9c0f8e5e5f.mp3',
    ],
    color: '#78909C',
  },
  {
    id: 'waterfall',
    name: 'Cascata',
    icon: '💧',
    urls: [
      'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
      'https://cdn.pixabay.com/download/audio/2022/03/24/audio_1808fbf07a.mp3',
    ],
    color: '#26C6DA',
  },
  {
    id: 'crickets',
    name: 'Grilli',
    icon: '🦗',
    urls: [
      'https://cdn.pixabay.com/download/audio/2022/03/10/audio_4a465d533f.mp3',
      'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    ],
    color: '#66BB6A',
  },
  {
    id: 'cicadas',
    name: 'Cicale',
    icon: '🪰',
    urls: [
      'https://cdn.pixabay.com/download/audio/2022/06/07/audio_9c0f8e5e5f.mp3',
      'https://cdn.pixabay.com/download/audio/2022/03/15/audio_4037a6c6e5.mp3',
    ],
    color: '#9CCC65',
  },
];
