import React from 'react';
import { useAtom } from 'jotai';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { avatarPositionsAtom } from '../atoms/slide-atoms';

interface PositionControlsProps {
  avatarId: number;
  currentX: number;
  currentY: number;
  currentScale: number;
}

export const PositionControls: React.FC<PositionControlsProps> = ({
  avatarId,
  currentX,
  currentY,
  currentScale,
}) => {
  const [avatarPositions, setAvatarPositions] = useAtom(avatarPositionsAtom);
  const handlePositionChange = (axis: 'x' | 'y' | 'scale', value: number) => {
    setAvatarPositions(prev => prev.map(pos => 
      pos.id === avatarId ? { ...pos, [axis]: value } : pos
    ));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-2">
        <Label>X</Label>
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
        <Label>Y</Label>
        <Input
          type="range"
          min="-200"
          max="100"
          value={currentY}
          onChange={(e) => handlePositionChange('y', parseInt(e.target.value))}
          className="flex-1"
        />
      </div>
      <div className="flex flex-row items-center gap-2">
        <Label>Z</Label>
        <Input
          type="range"
          min="50"
          max="400"
          value={currentScale}
          onChange={(e) => handlePositionChange('scale', parseInt(e.target.value))}
          className="flex-1"
        />
      </div>
    </div>
  );
}; 