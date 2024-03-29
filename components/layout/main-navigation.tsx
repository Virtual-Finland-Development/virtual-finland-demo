import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useRef, useState } from 'react';
import { Dialog, Popover, Transition } from '@headlessui/react';
import styled from 'styled-components';
import {
  Button,
  Icon,
  LanguageMenu,
  LanguageMenuItem,
  RouterLink,
  ServiceNavigation,
  ServiceNavigationItem,
  StaticIcon,
  Text,
} from 'suomifi-ui-components';
import api from '@/lib/api';
import { useAuth } from '@/context/auth-context';
import CustomHeading from '../ui/custom-heading';
import CustomLink from '../ui/custom-link';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Profile', href: '/profile' },
  { name: 'Company', href: '/company' },
];

const MobileMenuToggleButton = styled(Button).attrs({
  variant: 'secondaryNoBorder',
  className: 'p-0 px-2',
})`
  &:hover {
    background: transparent !important;
  }
`;

interface MobileLink extends LinkProps {
  children: ReactNode;
}

function MobileLink({ onClick, children, href }: MobileLink) {
  return (
    <Link href={href} passHref legacyBehavior>
      <RouterLink onClick={onClick} className="!normal-case">
        {children}
      </RouterLink>
    </Link>
  );
}

const DesktopNavItem = styled.li.attrs<{ isActive: boolean }>(
  ({ isActive }) => ({
    className: `border-b-4 py-2 px-4 mx-7 hover:border-b-suomifi-light ${
      isActive ? 'border-b-suomifi-light' : 'border-b-transparent'
    }`,
  })
)<{ isActive: boolean }>`
  a {
    font-weight: 700;
  }
`;

function DesktopMenuPopover() {
  return (
    <Popover as="div" className="hidden md:block ml-3">
      {({ open, close }) => (
        <>
          <Popover.Button as={MobileMenuToggleButton}>
            {open ? (
              <Icon icon="close" className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Icon icon="menu" className="block h-6 w-6" aria-hidden="true" />
            )}
          </Popover.Button>
          <Popover.Panel className="absolute right-0 z-10 mt-3 origin-top-right bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col px-4">
            {navigation.map(item => (
              <div
                key={item.href}
                className="flex flex-row items-center justify-start gap-4 w-80 border-b last:border-none border-b-gray-300 p-4"
              >
                <>
                  <StaticIcon
                    icon="archive"
                    className="flex-shrink-0 h-12 w-12"
                  />
                  <div className="flex flex-col">
                    <div onClick={() => close()}>
                      <CustomLink href={item.href} $bold>
                        {item.name}
                      </CustomLink>
                    </div>
                    <Text>Page info here.</Text>
                  </div>
                </>
              </div>
            ))}
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}

function DesktopNavigation() {
  const router = useRouter();

  return (
    <div className="hidden md:block border-t border-t-gray-300">
      <div className="container px-4">
        <ul className="hidden md:flex flex-wrap gap-4 -mx-7">
          {navigation.map(item => (
            <DesktopNavItem
              key={item.name}
              isActive={
                (item.href === '/' && router.pathname === item.href) ||
                (item.href !== '/' && router.pathname.includes(item.href))
              }
              role="button"
              onClick={() => router.push(item.href)}
            >
              <Text>{item.name}</Text>
            </DesktopNavItem>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileNavigationPanel({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const router = useRouter();
  const backdropRef = useRef(null);

  return (
    <Transition show={isOpen}>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="md:hidden absolute inset-0 top-[60px]"
        initialFocus={backdropRef}
      >
        <Transition.Child
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 top-[60px] bg-black/60"
            aria-hidden="true"
            ref={backdropRef}
          />
        </Transition.Child>
        <div className="fixed inset-x-0">
          <Dialog.Panel className="bg-white border-t border-solid border-gray-300 border-b border-b-suomifi-light">
            <ServiceNavigation aria-label="Mobile navigation">
              {navigation.map(item => (
                <div key={item.name} className="border-b">
                  <ServiceNavigationItem
                    key={item.name}
                    selected={
                      (item.href === '/' && router.pathname === item.href) ||
                      (item.href !== '/' && router.pathname.includes(item.href))
                    }
                  >
                    <MobileLink
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </MobileLink>
                  </ServiceNavigationItem>
                </div>
              ))}
            </ServiceNavigation>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}

function UserControl({ className }: { className: string }) {
  const { userEmail, setLoading } = useAuth();

  const logoutHandler = () => {
    setLoading();
    api.auth.directToAuthGwLogout();
  };

  return (
    <div className={className}>
      <Text className="!text-sm lg:!text-base !font-bold">{userEmail}</Text>
      <Button
        variant="secondaryNoBorder"
        className="!text-xs !min-h-0 !p-0"
        onClick={logoutHandler}
      >
        LOG OUT
      </Button>
    </div>
  );
}

export default function MainNavigation() {
  const { isAuthenticated } = useAuth();
  const [mobileNavPanelOpen, setMobileNavPanelOpen] = useState(false);

  return (
    <header>
      <nav className="bg-white border-b border-t-4 border-solid border-t-suomifi-dark border-b-suomifi-light relative">
        <div className="container px-4">
          <div className="relative flex h-14 items-center justify-between">
            {/* Main heading */}
            <Link href="/">
              <CustomHeading variant="h4" suomiFiBlue="light">
                VIRTUAL FINLAND
              </CustomHeading>
            </Link>

            {/* Controls */}
            <div className="flex flex-row items-center gap-6">
              {/* Language menu */}
              <LanguageMenu name="EN" className="!font-bold">
                <LanguageMenuItem onSelect={() => {}}>
                  Suomeksi (FI)
                </LanguageMenuItem>
                <LanguageMenuItem onSelect={() => {}}>
                  På Svenska (SV)
                </LanguageMenuItem>
                <LanguageMenuItem onSelect={() => {}} selected>
                  In English (EN)
                </LanguageMenuItem>
              </LanguageMenu>

              {/* Mobile menu toggle button */}
              <div className="md:hidden">
                <Button
                  as={MobileMenuToggleButton}
                  onClick={() => setMobileNavPanelOpen(isOpen => !isOpen)}
                >
                  {mobileNavPanelOpen ? (
                    <Icon
                      icon="close"
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  ) : (
                    <Icon
                      icon="menu"
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Button>
              </div>

              {/* Desktop user info / log out */}
              {isAuthenticated && (
                <UserControl className="hidden md:flex flex-col items-end" />
              )}

              {/* Desktop menu popover */}
              <DesktopMenuPopover />
            </div>
          </div>

          {/* Mobile user info / log out */}
          {isAuthenticated && (
            <UserControl className="md:hidden flex flex-row items-center justify-between pb-1 -mt-1" />
          )}
        </div>

        {/* Desktop navigation */}
        <DesktopNavigation />

        {/* Mobile navigation panel (dialog/modal) */}
        <MobileNavigationPanel
          isOpen={mobileNavPanelOpen}
          setIsOpen={setMobileNavPanelOpen}
        />
      </nav>
    </header>
  );
}
