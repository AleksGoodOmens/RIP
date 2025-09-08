import { InputField, Text } from '@/components';
import { Button } from '@/components/ui';

const PreviewPage = () => {
  return (
    <div>
      <div className="p-4">
        <Text size={'xl'} as={'h1'}>
          Text h1
        </Text>
        <Text size={'lg'}>Text h2</Text>
        <Text size={'md'} align={'center'} as={'h3'}>
          Text center md
        </Text>
        <Text size={'sm'} weight={'bold'} as={'h4'}>
          Text center sm bold
        </Text>
        <Text size={'xs'} align={'right'}>
          Text xs right{' '}
        </Text>
      </div>

      <div className="p-4">
        <Button variant={'default'}>default</Button>
        <Button variant={'link'}>link</Button>
        <Button variant={'destructive'}>destructive</Button>
        <Button variant={'ghost'}>ghost</Button>
        <Button variant={'outline'}>outline</Button>
        <Button variant={'secondary'}>secondary</Button>
      </div>
      <div className="p-4">
        <InputField label="default state" />
        <InputField label="disabled state" disabled />
        <InputField label="with helper text" helperText="this is helper text" />
        <InputField label="error state" error="this is error" />
        <InputField type="email" placeholder="Email" label="Email" />
      </div>
    </div>
  );
};
export default PreviewPage;
