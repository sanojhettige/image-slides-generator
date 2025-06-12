import { atom } from 'jotai';

export interface Avatar {
  id: number;
  url: string;
}

export interface AvatarPosition {
  id: number;
  x: number;
  y: number;
  scale: number;
}

export interface Font {
  name: string;
  value: string;
  className: string;
}

export interface TextPosition {
  x: number;
  y: number;
}

export const selectedAvatarsAtom = atom<Avatar[]>([]);
export const avatarPositionsAtom = atom<AvatarPosition[]>([]);

export const fonts: Font[] = [
  { name: 'Inter', value: 'inter', className: 'font-inter' },
  { name: 'Roboto', value: 'roboto', className: 'font-roboto' },
  { name: 'Poppins', value: 'poppins', className: 'font-poppins' },
  { name: 'Montserrat', value: 'montserrat', className: 'font-montserrat' },
  { name: 'Playfair Display', value: 'playfair', className: 'font-playfair' },
  { name: 'Lato', value: 'lato', className: 'font-lato' },
  { name: 'Raleway', value: 'raleway', className: 'font-raleway' },
];

export const selectedFontAtom = atom<Font>(fonts[0]);

// Derived atom to get position for a specific avatar
export const getAvatarPositionAtom = (id: number) => atom(
  (get) => get(avatarPositionsAtom).find(pos => pos.id === id)
);

// Atom to update position for a specific avatar
export const updateAvatarPositionAtom = (id: number) => atom(
  null,
  (get, set, { x, y }: { x: number; y: number }) => {
    const positions = get(avatarPositionsAtom);
    const newPositions = positions.map(pos => 
      pos.id === id ? { ...pos, x, y } : pos
    );
    set(avatarPositionsAtom, newPositions);
  }
);

export const textPositionAtom = atom<TextPosition>({ x: 0, y: 0 });
export const fontSizeAtom = atom<number>(24); // Default font size of 24px

export type TextAlignment = 'left' | 'center' | 'right';
export const textAlignmentAtom = atom<TextAlignment>('center'); 