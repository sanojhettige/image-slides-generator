import React from 'react';
import { useAtom } from 'jotai';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { fontSizeAtom } from '../atoms/slide-atoms';

interface FontSizeControlsProps {
  currentSize: number;
}

export const FontSizeControls: React.FC<FontSizeControlsProps> = ({
  currentSize,
}) => {
  const [fontSize, setFontSize] = useAtom(fontSizeAtom);

  const handleSizeChange = (value: number) => {
    setFontSize(value);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-2">
        <Label>Size</Label>
        <Input
          type="range"
          min="12"
          max="72"
          value={currentSize}
          onChange={(e) => handleSizeChange(parseInt(e.target.value))}
          className="flex-1"
        />
        <span className="text-sm text-muted-foreground w-8">{currentSize}px</span>
      </div>
    </div>
  );
}; 