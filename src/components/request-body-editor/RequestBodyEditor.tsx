'use client';
import { useTranslations } from 'next-intl';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css';
import Editor from 'react-simple-code-editor';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function RequestBodyEditor({ value, onChange }: Props) {
  const t = useTranslations('rest-client');
  return (
    <div className="border-2 border-destructive rounded-2xl p-4 dark:bg-[#1d1f21]">
      <Editor
        value={value}
        onValueChange={onChange}
        highlight={(code) => highlight(code, languages.json, 'json')}
        padding={8}
        placeholder={t('body-editor-placeholder')}
        style={{
          fontFamily: '"Fira Code", "Monaco", "Consolas", monospace',
          fontSize: 14,
          minHeight: '120px',
          width: '100%',
          backgroundColor: ``,
          borderRadius: '16px',
        }}
        textareaClassName="outline-none focus:outline-none"
        className="min-h-[120px]"
      />
    </div>
  );
}
