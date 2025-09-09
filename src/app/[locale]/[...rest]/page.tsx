import { notFound } from 'next/navigation';

const RedirectToNotFound = () => {
  notFound();
  return null;
};

export default RedirectToNotFound;
