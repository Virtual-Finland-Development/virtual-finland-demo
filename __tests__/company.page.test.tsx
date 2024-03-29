import CompanyPage from '@/pages/company/index.page';
import { MOCK_AUTH_STATE } from '@/lib/testing/mocks/mock-values';
import {
  renderWithProviders,
  screen,
} from '@/lib/testing/utils/testing-library-utils';
import * as UtilsExports from '@/lib/utils';

describe('Company index page', () => {
  it('renders a identification button, if user is not authenticated', () => {
    renderWithProviders(<CompanyPage />);

    const loginButton = screen.getByRole('button', {
      name: /identification/i,
    });

    expect(loginButton).toBeInTheDocument();
  });

  it('renders a company establishment button, if user is authenticated', () => {
    jest
      .spyOn(UtilsExports, 'getValidAuthState')
      .mockImplementation(() => MOCK_AUTH_STATE);

    renderWithProviders(<CompanyPage />);

    const establishCompanyButton = screen.getByRole('button', {
      name: /establish company/i,
    });

    expect(establishCompanyButton).toBeInTheDocument();
  });
});
