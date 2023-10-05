import { lazy } from 'react';

const Profile = lazy(() => import('../pages/ProfilePage'));
const SignUpEmployee = lazy(() => import('../pages/Authentication/SignUpEmployee'));
const BooksPage = lazy(() => import('../pages/BooksPage'));
const AddBookPage = lazy(() => import('../pages/AddBookPage'));
const LoansPage = lazy(() => import('../pages/LoansPage'));
const LoansEmpPage = lazy(() => import('../pages/LoansEmpPage'));
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
        path: '/addbook',
        title: 'AddBook',
        component: AddBookPage,
    },
    {
        path: '/loans',
        title: 'Loans',
        component: LoansPage,
    },
    {
        path: '/loansEmp',
        title: 'LoansEmployee',
        component: LoansEmpPage,
    },
    {
        path: '/makeLoans',
        title: 'MakeLoans',
        component: MakeLoansPage,
    },
    {
        path: '/registerE',
        title: 'RegisterEmployee',
        component: SignUpEmployee,
    },
];

const routes = [...coreRoutes];
export default routes;
