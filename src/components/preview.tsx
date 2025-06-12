import React, { memo, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Button } from './ui/button';
import { useAtom } from 'jotai';
import { selectedAvatarsAtom, avatarPositionsAtom, selectedFontAtom, textPositionAtom, fontSizeAtom, textAlignmentAtom, AvatarPosition, Avatar } from '../atoms/slide-atoms';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { Components } from 'react-markdown';

interface PreviewProps {
  caption: string;
  color1: string;
  color2: string;
}

const Preview = memo(({
  caption,
  color1,
  color2,
}: PreviewProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [selectedAvatars] = useAtom(selectedAvatarsAtom);
  const [avatarPositions] = useAtom(avatarPositionsAtom);
  const [selectedFont] = useAtom(selectedFontAtom);
  const [textPosition] = useAtom(textPositionAtom);
  const [fontSize] = useAtom(fontSizeAtom);
  const [textAlignment] = useAtom(textAlignmentAtom);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, avatarId: number) => {
    e.dataTransfer.setData('text/plain', avatarId.toString());
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = '1';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const avatarId = parseInt(e.dataTransfer.getData('text/plain'));
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 200 - 100; // Convert to percentage (-100 to 100)
    const y = ((e.clientY - rect.top) / rect.height) * 200 - 100; // Convert to percentage (-100 to 100)

    const position = avatarPositions.find(pos => pos.id === avatarId);
    if (position) {
      position.x = x;
      position.y = y;
    }
  };

  const handleDownload = async () => {
    if (!canvasRef.current) return;
    try {
      const canvas = await html2canvas(canvasRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      });
      const link = document.createElement('a');
      link.download = 'tiktok-slide.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const gradient = `linear-gradient(135deg, ${color1}, ${color2})`;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[300px] h-[600px] bg-black rounded-[40px] p-4">
        <div className="relative w-full h-full overflow-hidden rounded-[32px]">
          <div
            ref={canvasRef}
            className="w-full h-full relative"
            style={{ background: gradient, width: "100%", height: "100%", position: 'relative' }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div 
                className={`z-20 absolute text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] px-4 py-4 ${selectedFont.className}`}
                style={{
                  transform: `translate(${textPosition.x}%, ${textPosition.y}%)`,
                  fontSize: `${fontSize}px`,
                  textAlign: textAlignment,
                }}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    p: ({ children, ...props }) => (
                      <p 
                        className={`text-[${fontSize}px] whitespace-pre-wrap p-1`} 
                        {...props}
                      >
                        {children}
                      </p>
                    ),
                    strong: ({ ...props }) => <strong className="font-bold" {...props} />,
                    em: ({ ...props }) => <em className="italic" {...props} />,
                    br: () => <br />,
                  }}
                >
                  {caption}
                </ReactMarkdown>
              </div>

              <div className="relative w-full h-full" style={{ width: '100%', height: '100%' }}>
                {selectedAvatars.map(avatar => {
                  const position = avatarPositions.find(pos => pos.id === avatar.id);
                  return (
                    <div
                      key={avatar.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, avatar.id)}
                      onDragEnd={handleDragEnd}
                    >
                      <img
                        src={avatar.url}
                        alt={`Avatar ${avatar.id}`}
                        className={`absolute overflow-hidden cursor-move z-10 w-[280px] h-auto -translate-[50%]`}
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `translate(${position?.x ?? 0}%, ${position?.y ?? 0}%) scale(${(position?.scale ?? 100) / 100})`,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl"></div>
      </div>

      <div className="mt-8 text-center flex flex-row gap-1">
        <Button onClick={handleDownload} size="lg">
          Download Slide
        </Button>
      </div>
    </div>
  );
});

Preview.displayName = 'Preview';

export { Preview }; 