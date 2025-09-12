import { Text } from '@/components';

import LoginForm from './components/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-start justify-center px-4 pt-32 bg-background">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-md">
        <Text size="sm" align="center" as="h4" className="mb-4">
          Please, sign in
        </Text>
        <LoginForm />
      </div>
    </div>
  );
}
