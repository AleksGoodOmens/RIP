'use client';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

import SelectMethod from '../select-method/SelectMethod';
import { Button, Input } from '../ui';

export default function RestClient() {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const url = formData.get('url-input') as string;
    const method = formData.get('select') as string;
    if (!url) return console.log(formData.get('select'));
    const encodedUrl = btoa(url);
    const path = `/${method}/${encodedUrl}`;
    router.push(path);
  };
  return (
    <div>
      <form className="flex gap-1" onSubmit={handleSubmit}>
        <SelectMethod name="select" />
        <Input name="url-input" placeholder="Enter URL or paste text" />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
