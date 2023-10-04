import { lazy } from 'react';

const Profile = lazy(() => import('../pages/ProfilePage'));
const BooksPage = lazy(() => import('../pages/BooksPage'));
const LoansPage = lazy(() => import('../pages/LoansPage'));
const MakeLoansPage = lazy(() => import('../pages/MakeLoansPage'));

const coreRoutes = [
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/books',
    title: 'Books',
    component: BooksPage,
  },
  {
    path: '/loans',
    title: 'Loans',
    component: LoansPage,
  },
  {
    path: '/makeLoans',
    title: 'MakeLoans',
    component: MakeLoansPage,
  },
];

const routes = [...coreRoutes];
export default routes;
