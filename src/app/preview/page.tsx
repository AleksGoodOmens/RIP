import { InputField } from '@/components';
import { Button } from '@/components/ui';

const PreviewPage = () => {
  return (
    <div>
      <h1>Preview page h1 </h1>
      <h2>Preview page h2 </h2>
      <h3>Preview page h3 </h3>
      <h4>Preview page h4 </h4>
      <Button variant={'default'}>default</Button>
      <Button variant={'link'}>link</Button>
      <Button variant={'destructive'}>destructive</Button>
      <Button variant={'ghost'}>ghost</Button>
      <Button variant={'outline'}>outline</Button>
      <Button variant={'secondary'}>secondary</Button>
      <InputField label="default state" />
      <InputField label="disabled state" disabled />
      <InputField label="with helper text" helperText="this is helper text" />
      <InputField label="error state" error="this is error" />
      <InputField type="email" placeholder="Email" label="Email" />
      <InputField type="password" placeholder="password" label="Password" />
    </div>
  );
};
export default PreviewPage;
