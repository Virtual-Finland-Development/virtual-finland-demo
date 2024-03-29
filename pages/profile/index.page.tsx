import { useAuth } from '@/context/auth-context';
import Page from '@/components/layout/page';
import ProfileAuthenticated from './components/authenticated';
import ProfileNotAuthenticated from './components/not-authenticated';

export default function ProfilePage() {
  const { isAuthenticated } = useAuth();

  return (
    <Page title="Profile">
      {!isAuthenticated ? (
        <ProfileNotAuthenticated />
      ) : (
        <ProfileAuthenticated />
      )}
    </Page>
  );
}
