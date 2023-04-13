import { useAuth } from '@/context/auth-context';
import Page from '@/components/layout/page';
import CompanyAuthenticated from './components/authenticated';
import CompanyNotAuthenticated from './components/not-authenticated';

export default function CompanyPage() {
  const { isAuthenticated } = useAuth();

  return (
    <Page title="Company">
      {!isAuthenticated ? (
        <CompanyNotAuthenticated />
      ) : (
        <CompanyAuthenticated />
      )}
    </Page>
  );
}
