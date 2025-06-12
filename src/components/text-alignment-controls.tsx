import React from 'react';
import { useAtom } from 'jotai';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { textAlignmentAtom, TextAlignment } from '../atoms/slide-atoms';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface TextAlignmentControlsProps {
  currentAlignment: TextAlignment;
}

export const TextAlignmentControls: React.FC<TextAlignmentControlsProps> = ({
  currentAlignment,
}) => {
  const [textAlignment, setTextAlignment] = useAtom(textAlignmentAtom);

  const handleAlignmentChange = (alignment: TextAlignment) => {
    setTextAlignment(alignment);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>Alignment</Label>
      <div className="flex gap-1">
        <Button
          variant={currentAlignment === 'left' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleAlignmentChange('left')}
          className="flex-1"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant={currentAlignment === 'center' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleAlignmentChange('center')}
          className="flex-1"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant={currentAlignment === 'right' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleAlignmentChange('right')}
          className="flex-1"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}; 