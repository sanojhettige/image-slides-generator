import { useState } from 'react';

interface Avatar {
  id: number;
  url: string;
}

interface SlideState {
  selectedAvatars: Avatar[];
  caption: string;
  color1: string;
  color2: string;
}

export const useSlide = () => {
  const [state, setState] = useState<SlideState>({
    selectedAvatars: [],
    caption: '',
    color1: '#ff0050',
    color2: '#00f2ea',
  });

  const toggleAvatar = (avatar: Avatar) => {
    setState(prev => {
      const isSelected = prev.selectedAvatars.find(a => a.id === avatar.id);
      return {
        ...prev,
        selectedAvatars: isSelected
          ? prev.selectedAvatars.filter(a => a.id !== avatar.id)
          : [...prev.selectedAvatars, avatar],
      };
    });
  };

  const setCaption = (caption: string) => {
    setState(prev => ({ ...prev, caption }));
  };

  const setColor1 = (color: string) => {
    setState(prev => ({ ...prev, color1: color }));
  };

  const setColor2 = (color: string) => {
    setState(prev => ({ ...prev, color2: color }));
  };

  console.log({state})

  return {
    ...state,
    toggleAvatar,
    setCaption,
    setColor1,
    setColor2,
  };
}; 