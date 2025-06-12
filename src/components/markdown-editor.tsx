import React from 'react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Bold, Italic, List, ListOrdered, Heading1, Heading2 } from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  className,
}) => {
  const insertMarkdown = (prefix: string, suffix: string = '') => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + prefix + selectedText + suffix + value.substring(end);
    
    onChange(newText);
    
    // Set cursor position after the inserted markdown
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        end + prefix.length
      );
    }, 0);
  };

  const toolbarItems = [
    {
      icon: <Bold className="h-4 w-4" />,
      label: 'Bold',
      action: () => insertMarkdown('**', '**'),
    },
    {
      icon: <Italic className="h-4 w-4" />,
      label: 'Italic',
      action: () => insertMarkdown('*', '*'),
    },
    // {
    //   icon: <Heading1 className="h-4 w-4" />,
    //   label: 'Heading 1',
    //   action: () => insertMarkdown('# '),
    // },
    // {
    //   icon: <Heading2 className="h-4 w-4" />,
    //   label: 'Heading 2',
    //   action: () => insertMarkdown('## '),
    // },
    // {
    //   icon: <List className="h-4 w-4" />,
    //   label: 'Bullet List',
    //   action: () => insertMarkdown('- '),
    // },
    // {
    //   icon: <ListOrdered className="h-4 w-4" />,
    //   label: 'Numbered List',
    //   action: () => insertMarkdown('1. '),
    // },
  ];

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex gap-1 p-1 bg-secondary/20 rounded-lg">
        {toolbarItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            size="sm"
            onClick={item.action}
            title={item.label}
            className="h-8 w-8 p-0"
          >
            {item.icon}
          </Button>
        ))}
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your caption here... (Markdown supported)"
        className="min-h-[100px] font-mono"
      />
    </div>
  );
}; 