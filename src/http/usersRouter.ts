import { Router } from './Router';
import { HttpRequestMethod } from '../components/constants/HttpRequestMethod';
import { getHomePageAction } from '../controller/getHomePageAction';
import { getUsersAction } from '../controller/user/getUsersAction';
import { getUserAction } from '../controller/user/getUserAction';
import { createUserAction } from '../controller/user/createUserAction';
import { deleteUserAction } from '../controller/user/deleteUserAction';
import { updateUserAction } from '../controller/user/updateUserAction';

const userRouter = new Router([
    {
        path: '/api',
        method: HttpRequestMethod.GET,
        handler: getHomePageAction,
    },
    {
        path: '/api/users',
        method: HttpRequestMethod.GET,
        handler: getUsersAction,
    },
    {
        path: '/api/users/:id',
        method: HttpRequestMethod.GET,
        handler: getUserAction,
    },
    {
        path: '/api/users',
        method: HttpRequestMethod.POST,
        handler: createUserAction,
    },
    {
        path: '/api/users/:id',
        method: HttpRequestMethod.PUT,
        handler: updateUserAction,
    },
    {
        path: '/api/users/:id',
        method: HttpRequestMethod.DELETE,
        handler: deleteUserAction,
    },
]);

export { userRouter };
