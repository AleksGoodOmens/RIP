'use client';
import { Braces, TypeOutline } from 'lucide-react';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css';
import { useEffect, useRef, useState } from 'react';
import Editor from 'react-simple-code-editor';

import { Button } from '../ui';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const isValidJSON = (str: string) => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

export function RequestBodyEditor({ value, onChange }: Props) {
  const [isPrettify, setPrettify] = useState(false);
  const isInternalChange = useRef(false);

  const handlePrettify = () => {
    if (isValidJSON(value)) {
      isInternalChange.current = true;
      if (isPrettify) {
        onChange(JSON.stringify(JSON.parse(value)));
      } else {
        onChange(JSON.stringify(JSON.parse(value), null, 2));
      }
      setPrettify(!isPrettify);
    }
  };

  useEffect(() => {
    if (isInternalChange.current) {
      isInternalChange.current = false;
    } else {
      setPrettify(false);
    }
  }, [value]);

  return (
    <>
      <section className="mb-4">
        <Button
          aria-label="make code pretty"
          variant={'secondary'}
          onClick={handlePrettify}
          disabled={!isValidJSON(value)}
        >
          {isPrettify ? <Braces /> : <TypeOutline />}
        </Button>
      </section>
      <div className="border-2 rounded-2xl text-xs p-4 min-h-20 dark:bg-[#1d1f21]">
        <Editor
          value={value}
          onValueChange={onChange}
          highlight={(code) => {
            try {
              return highlight(code, languages.json, 'json');
            } catch {
              return code;
            }
          }}
          padding={8}
          placeholder="Enter request body (JSON or plain text)..."
          style={{
            width: '100%',
            borderRadius: '16px',
          }}
          textareaClassName="outline-none focus:outline-none"
          className="min-h-[120px]"
        />
      </div>
    </>
  );
}
