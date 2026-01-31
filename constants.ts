
import { Level } from './types';

export const ADMIN_EMAIL = 'nikita.forumbarvixa@mail.ru';
export const CREATOR_NAME = 'Nurib';
export const AVATAR_URL = 'https://input.fyi/images/v1/4f242551e18820c754687d7b30903328.jpg';

export const LEVELS: Level[] = [
  {
    id: 'moscow-winter',
    name: 'Зимняя Москва',
    description: 'Паркур по заснеженным крышам столицы.',
    difficulty: 'Easy',
    color: '#38bdf8',
    thumbnail: 'https://picsum.photos/id/234/400/225'
  },
  {
    id: 'red-square',
    name: 'Красная Площадь',
    description: 'Легендарный обби в самом сердце России.',
    difficulty: 'Medium',
    color: '#ef4444',
    thumbnail: 'https://picsum.photos/id/235/400/225'
  },
  {
    id: 'cyber-russia',
    name: 'Кибер Россия 2077',
    description: 'Паркур будущего в неоновых огнях.',
    difficulty: 'Hard',
    color: '#a855f7',
    thumbnail: 'https://picsum.photos/id/236/400/225'
  }
];
