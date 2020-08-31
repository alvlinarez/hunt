// types: 1 -> Protected routes || 2 -> Auth routes || 3 -> Public routes
export const routes = [
  {
    path: '/',
    type: 3
  },
  {
    path: '/populars',
    type: 3
  },
  {
    path: '/search',
    type: 3
  },
  {
    path: '/products/[id]',
    type: 1
  },
  {
    path: '/new-product',
    type: 1
  },
  {
    path: '/signin',
    type: 2
  },
  {
    path: '/signup',
    type: 2
  }
];
