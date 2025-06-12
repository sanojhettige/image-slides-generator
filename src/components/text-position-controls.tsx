import React from 'react';
import { useAtom } from 'jotai';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { textPositionAtom } from '../atoms/slide-atoms';

interface TextPositionControlsProps {
  currentX: number;
  currentY: number;
}

export const TextPositionControls: React.FC<TextPositionControlsProps> = ({
  currentX,
  currentY,
}) => {
  const [textPosition, setTextPosition] = useAtom(textPositionAtom);

  const handlePositionChange = (axis: 'x' | 'y', value: number) => {
    setTextPosition(prev => ({ ...prev, [axis]: value }));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-2">
        <Label className="w-8">X</Label>
        <Input
          type="range"
          min="-100"
          max="100"
          value={currentX}
          onChange={(e) => handlePositionChange('x', parseInt(e.target.value))}
          className="flex-1"
        />
      </div>
      <div className="flex flex-row items-center gap-2">
        <Label className="w-8">Y</Label>
        <Input
          type="range"
          min="-400"
          max="400"
          value={currentY}
          onChange={(e) => handlePositionChange('y', parseInt(e.target.value))}
          className="flex-1"
        />
      </div>
    </div>
  );
}; 