import React from 'react';
import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false
});

const CustomMarkdownEditor = ({ value, onChange }: any) => {
  const editorOptions = {
    autofocus: false,
    spellChecker: false,
    placeholder: 'Enter your Markdown here...',
    status: false,
    toolbar: [
      'bold',
      'italic',
      'heading',
      '|',
      'quote',
      'unordered-list',
      'ordered-list',
      '|',
      'link',
      'image',
      '|',
      'preview'
    ]
  };

  return (
    <div className="markdown-editor">
      <SimpleMDE value={value} onChange={onChange} options={editorOptions} />
      <style jsx global>{`
        .markdown-editor .EasyMDEContainer {
          background-color: hsl(var(--background));
          color: hsl(var(--foreground));
        }
        .markdown-editor .CodeMirror {
          background-color: hsl(var(--background));
          color: hsl(var(--foreground));
          border: 1px solid hsl(var(--border));
          border-radius: var(--radius);
        }
        .markdown-editor .editor-toolbar {
          border: none;
          background-color: hsl(var(--secondary));
        }
        .markdown-editor .editor-toolbar button {
          color: hsl(var(--secondary-foreground));
        }
        .markdown-editor .editor-toolbar button:hover,
        .markdown-editor .editor-toolbar button.active {
          background-color: hsl(var(--accent));
          border-color: hsl(var(--accent));
        }
        .markdown-editor .editor-preview {
          background-color: hsl(var(--background));
          color: hsl(var(--foreground));
        }
        .markdown-editor .cm-s-easymde .CodeMirror-cursor {
          border-color: hsl(var(--foreground));
        }
      `}</style>
    </div>
  );
};

export default CustomMarkdownEditor;
