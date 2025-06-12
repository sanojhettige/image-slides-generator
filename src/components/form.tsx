import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useAtom } from 'jotai';
import { selectedAvatarsAtom, avatarPositionsAtom, selectedFontAtom, fonts, textPositionAtom, fontSizeAtom, textAlignmentAtom } from '../atoms/slide-atoms';
import { PositionControls } from './position-controls';
import { TextPositionControls } from './text-position-controls';
import { FontSizeControls } from './font-size-controls';
import { TextAlignmentControls } from './text-alignment-controls';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Image1 from "../assets/avatars/1.png";
import Image2 from "../assets/avatars/2.png";
import Image3 from "../assets/avatars/3.png";
import { MarkdownEditor } from './markdown-editor';
import { Upload } from 'lucide-react';

interface Avatar {
  id: number;
  url: string;
}

interface FormProps {
  caption: string;
  onCaptionChange: (value: string) => void;
  color1: string;
  onColor1Change: (value: string) => void;
  color2: string;
  onColor2Change: (value: string) => void;
}

const sampleAvatars = [
  { id: 1, url: Image1 },
  { id: 2, url: Image2 },
  { id: 3, url: Image3 },
];

export const Form = ({
  caption,
  color1,
  color2,
  onCaptionChange,
  onColor1Change,
  onColor2Change,
}: FormProps) => {
  const [selectedAvatars, setSelectedAvatars] = useAtom(selectedAvatarsAtom);
  const [avatarPositions, setAvatarPositions] = useAtom(avatarPositionsAtom);
  const [selectedFont, setSelectedFont] = useAtom(selectedFontAtom);
  const [textPosition] = useAtom(textPositionAtom);
  const [fontSize] = useAtom(fontSizeAtom);
  const [textAlignment] = useAtom(textAlignmentAtom);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const hasAvatarSelected = (avatarID: number) => selectedAvatars.some(avatar => avatar.id === avatarID);

  const toggleAvatar = (avatar: Avatar) => {
    if (selectedAvatars.length >= 8 && !hasAvatarSelected(avatar.id)) {
      alert('You can only select up to 8 photos');
      return;
    }
    
    setSelectedAvatars(prev => {
      const isSelected = prev.find(a => a.id === avatar.id);
      if (isSelected) {
        setAvatarPositions(prev => prev.filter(pos => pos.id !== avatar.id));
        return prev.filter(a => a.id !== avatar.id);
      } else {
        setAvatarPositions(prev => [...prev, { id: avatar.id, x: 0, y: 0, scale: 100 }]);
        return [...prev, avatar];
      }
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    if (selectedAvatars.length + files.length > 8) {
      alert('You can only select up to 8 photos in total');
      return;
    }

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newId = Date.now() + index;
        const newAvatar = {
          id: newId,
          url: e.target?.result as string
        };
        setSelectedAvatars(prev => [...prev, newAvatar]);
        setAvatarPositions(prev => [...prev, { id: newId, x: 0, y: 0, scale: 100 }]);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="flex flex-row gap-2 justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 p-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Photos (Max 3)
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              multiple
              className="hidden"
            />
          </div>
          <div className="grid grid-cols-8 gap-2 p-2 h-[240px] overflow-y-auto">
            {/* Display uploaded photos first */}
            {selectedAvatars
              .filter(avatar => !sampleAvatars.some(sample => sample.id === avatar.id))
              .map(avatar => (
                <div key={avatar.id} className="flex flex-col gap-2">
                  <Button 
                    onClick={() => toggleAvatar(avatar)} 
                    variant="ghost" 
                    className="p-2 h-[100px] border-2 border-primary"
                  >
                    <img 
                      src={avatar.url} 
                      alt={`Uploaded photo ${avatar.id}`} 
                      className="max-h-20" 
                    />
                  </Button>
                  <div className="flex">
                    <PositionControls
                      avatarId={avatar.id}
                      currentX={avatarPositions.find(pos => pos.id === avatar.id)?.x || 0}
                      currentY={avatarPositions.find(pos => pos.id === avatar.id)?.y || 0}
                      currentScale={avatarPositions.find(pos => pos.id === avatar.id)?.scale || 100}
                    />
                    </div>
                </div>
              ))}
            {/* Then display sample avatars */}
            {/* {sampleAvatars.map(avatar => (
              <div key={avatar.id} className="flex flex-col gap-2">
                <Button 
                  onClick={() => toggleAvatar(avatar)} 
                  variant="ghost" 
                  className="p-2 h-[100px]"
                >
                  <img 
                    src={avatar.url} 
                    alt={`Avatar ${avatar.id}`} 
                    className={hasAvatarSelected(avatar.id) ? "border-2 border-primary" : ""} 
                  />
                </Button>
                {hasAvatarSelected(avatar.id) && (
                  <PositionControls
                    avatarId={avatar.id}
                    currentX={avatarPositions.find(pos => pos.id === avatar.id)?.x || 0}
                    currentY={avatarPositions.find(pos => pos.id === avatar.id)?.y || 0}
                    currentScale={avatarPositions.find(pos => pos.id === avatar.id)?.scale || 100}
                  />
                )}
              </div>
            ))} */}
          </div>
        </div>

        <div className="flex flex-col gap-2 p-2">
          <div className="flex items-center gap-2">
            <div className="w-[400px]">
              <MarkdownEditor
                value={caption}
                onChange={onCaptionChange}
                className="min-h-[100px]"
              />
            </div>
            <div className='flex flex-row gap-2'>
              <div className="flex flex-col gap-2">
            <div className="w-48">
              <Label>Font</Label>
              <Select
                value={selectedFont.value}
                onValueChange={(value) => {
                  const font = fonts.find(f => f.value === value);
                  if (font) setSelectedFont(font);
                }}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  {fonts.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      <span className={font.className}>{font.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
                <div className="w-48">
                  <TextAlignmentControls
                    currentAlignment={textAlignment}
                  />
                </div>
            </div>
              <div className="w-48">
              <Label>Text Position</Label>
              <div className="mt-2">
                <TextPositionControls
                  currentX={textPosition.x}
                  currentY={textPosition.y}
                />
              </div>
            </div>
            <div className="w-48">
              <Label>Font Size</Label>
              <div className="mt-2">
                <FontSizeControls
                  currentSize={fontSize}
                />
              </div>
            </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2 p-2">
          <div>
            <Label>Color 1</Label>
            <Input
              type="color"
              value={color1}
              onChange={(e) => onColor1Change(e.target.value)}
              className="mt-2 h-10"
            />
          </div>
          <div>
            <Label>Color 2</Label>
            <Input
              type="color"
              value={color2}
              onChange={(e) => onColor2Change(e.target.value)}
              className="mt-2 h-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 