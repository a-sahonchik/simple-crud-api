import { Router } from './Router';
import { HttpRequestMethod } from '../components/constants/HttpRequestMethod';
import { getHomePageAction } from '../controller/getHomePageAction';
import { getUsersAction } from '../controller/getUsersAction';
import { getUserAction } from '../controller/getUserAction';
import { createUserAction } from '../controller/createUserAction';
import { deleteUserAction } from '../controller/deleteUserAction';
import { updateUserAction } from '../controller/updateUserAction';

const userRouter = new Router([
    {
        path: '/',
        method: HttpRequestMethod.GET,
        handler: getHomePageAction,
    },
    {
        path: '/users',
        method: HttpRequestMethod.GET,
        handler: getUsersAction,
    },
    {
        path: '/users/:id',
        method: HttpRequestMethod.GET,
        handler: getUserAction,
    },
    {
        path: '/users',
        method: HttpRequestMethod.POST,
        handler: createUserAction,
    },
    {
        path: '/users/:id',
        method: HttpRequestMethod.PUT,
        handler: updateUserAction,
    },
    {
        path: '/users/:id',
        method: HttpRequestMethod.DELETE,
        handler: deleteUserAction,
    },
]);

export { userRouter };
