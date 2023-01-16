import { constants as httpConstants } from 'http2';
import { v4 as uuid } from 'uuid';
import supertest from 'supertest';
import { startServer } from '../src/http/handler/singleProcessModeHandler';
import { usersDataStorage } from '../src/components/dataStorage/UsersDataStorage';

const request = supertest(startServer(4001));

afterEach(async () => {
    await usersDataStorage.clearAll();
});

describe('User CRUD', () => {
    describe('POST /users', () => {
        it('should create user and return his data in response', async () => {
            const userRequest = {
                username: 'user 1',
                age: 15,
                hobbies: ['reading'],
            };

            const response = await request.post('/api/users').send(userRequest);

            expect(response.status).toBe(httpConstants.HTTP_STATUS_CREATED);

            const user = await usersDataStorage.findUserById(response.body.id);

            expect(response.body).toEqual(user);

            const allUsers = await usersDataStorage.findAllUsers();

            expect(allUsers.length).toEqual(1);
        });

        it('should return validation error if request body contains extra fields', async () => {
            const userRequest = {
                username: 'user 1',
                age: 15,
                hobbies: ['reading'],
                aa: 'aa',
            };

            const response = await request.post('/api/users').send(userRequest);

            expect(response.status).toBe(httpConstants.HTTP_STATUS_BAD_REQUEST);

            expect(response.body).toEqual('Request has extra or less keys. Valid ones are: username, age, hobbies.');

            const allUsers = await usersDataStorage.findAllUsers();

            expect(allUsers.length).toEqual(0);
        });

        it('should return validation error if request body contains not all required fields', async () => {
            const userRequest = {
                username: 'user 1',
                age: 15,
            };

            const response = await request.post('/api/users').send(userRequest);

            expect(response.status).toBe(httpConstants.HTTP_STATUS_BAD_REQUEST);

            expect(response.body).toEqual('Request has extra or less keys. Valid ones are: username, age, hobbies.');

            const allUsers = await usersDataStorage.findAllUsers();

            expect(allUsers.length).toEqual(0);
        });

        it('should return validation error if fields have wrong data type', async () => {
            const userRequest = {
                username: 123,
                age: [15],
                hobbies: 'no',
            };

            const response = await request.post('/api/users').send(userRequest);

            expect(response.status).toBe(httpConstants.HTTP_STATUS_BAD_REQUEST);

            expect(response.body).toEqual(
                'Property "username" must be of type string; '
                + 'Property "age" must be of type number; '
                + 'Property "hobbies" must be of type array',
            );

            const allUsers = await usersDataStorage.findAllUsers();

            expect(allUsers.length).toEqual(0);
        });
    });

    describe('GET /users', () => {
        it('should return empty list of all users when db is empty', async () => {
            const response = await request.get('/api/users');

            expect(response.status).toBe(httpConstants.HTTP_STATUS_OK);
            expect(response.body).toEqual([]);
        });

        it('should return list of all users', async () => {
            const userRequest = {
                username: 'user 1',
                age: 15,
                hobbies: ['reading'],
            };

            const response1 = await request.post('/api/users').send(userRequest);

            expect(response1.status).toBe(httpConstants.HTTP_STATUS_CREATED);
            const createdUserId = response1.body.id;
            const createdUser = await usersDataStorage.findUserById(createdUserId);

            const response2 = await request.get('/api/users');

            expect(response2.status).toBe(httpConstants.HTTP_STATUS_OK);
            expect(response2.body).toEqual([createdUser]);

            const allUsers = await usersDataStorage.findAllUsers();

            expect(allUsers.length).toEqual(1);
        });
    });

    describe('GET /user/:id', () => {
        it('should return user', async () => {
            const userRequest = {
                username: 'user 1',
                age: 15,
                hobbies: ['reading'],
            };

            const response1 = await request.post('/api/users').send(userRequest);

            expect(response1.status).toBe(httpConstants.HTTP_STATUS_CREATED);

            const createdUserId = response1.body.id;
            const createdUser = await usersDataStorage.findUserById(createdUserId);

            const response2 = await request.get(`/users/${createdUserId}`);

            expect(response2.status).toBe(httpConstants.HTTP_STATUS_OK);
            expect(response2.body).toEqual(createdUser);
        });

        it('should return 404 error if user not found', async () => {
            const response = await request.get(`/users/${uuid()}`);

            expect(response.status).toBe(httpConstants.HTTP_STATUS_NOT_FOUND);
            expect(response.body).toEqual('User with this uuid does not exist.');
        });

        it('should return error if uuid is not valid', async () => {
            const response = await request.get('/api/users/1234567890');

            expect(response.status).toBe(httpConstants.HTTP_STATUS_BAD_REQUEST);
            expect(response.body).toEqual('User\'s uuid is not valid.');
        });
    });

    describe('PUT /users/:id', () => {
        it('should update user and return his data in response', async () => {
            const userRequest = {
                username: 'user 1',
                age: 15,
                hobbies: ['reading'],
            };

            const response1 = await request.post('/api/users').send(userRequest);

            expect(response1.status).toBe(httpConstants.HTTP_STATUS_CREATED);

            const createdUserId = response1.body.id;

            const userUpdateRequest = {
                username: 'user 2',
                age: 33,
                hobbies: ['reading', 'writing'],
            };

            const response2 = await request.put(`/users/${createdUserId}`).send(userUpdateRequest);

            expect(response2.status).toBe(httpConstants.HTTP_STATUS_OK);

            const updatedUserId = response2.body.id;
            const updatedUser = await usersDataStorage.findUserById(updatedUserId);

            expect(response2.body).toEqual(updatedUser);

            expect(createdUserId).toEqual(updatedUserId);
        });

        it('should return validation error if update request body contains extra fields', async () => {
            const userRequest = {
                username: 'user 1',
                age: 15,
                hobbies: ['reading'],
            };

            const response1 = await request.post('/api/users').send(userRequest);

            expect(response1.status).toBe(httpConstants.HTTP_STATUS_CREATED);

            const createdUserId = response1.body.id;
            const createdUser = await usersDataStorage.findUserById(createdUserId);

            const userUpdateRequest = {
                username: 'user 2',
                age: 33,
                hobbies: ['reading', 'writing'],
                aa: 'aa',
            };

            const response2 = await request.put(`/users/${createdUserId}`).send(userUpdateRequest);

            expect(response2.status).toBe(httpConstants.HTTP_STATUS_BAD_REQUEST);

            expect(response2.body).toEqual('Request has extra or less keys. Valid ones are: username, age, hobbies.');

            const currentUser = await usersDataStorage.findUserById(createdUserId);

            expect(createdUser).toEqual(currentUser);
        });

        it('should return validation error if update request body contains not all required fields', async () => {
            const userRequest = {
                username: 'user 1',
                age: 15,
                hobbies: ['reading'],
            };

            const response1 = await request.post('/api/users').send(userRequest);

            expect(response1.status).toBe(httpConstants.HTTP_STATUS_CREATED);

            const createdUserId = response1.body.id;
            const createdUser = await usersDataStorage.findUserById(createdUserId);

            const userUpdateRequest = {
                username: 'user 2',
            };

            const response2 = await request.put(`/users/${createdUserId}`).send(userUpdateRequest);

            expect(response2.status).toBe(httpConstants.HTTP_STATUS_BAD_REQUEST);

            expect(response2.body).toEqual('Request has extra or less keys. Valid ones are: username, age, hobbies.');

            const currentUser = await usersDataStorage.findUserById(createdUserId);

            expect(createdUser).toEqual(currentUser);
        });

        it('should return validation error if update request fields have wrong data type', async () => {
            const userRequest = {
                username: 'user 1',
                age: 15,
                hobbies: ['reading'],
            };

            const response1 = await request.post('/api/users').send(userRequest);

            expect(response1.status).toBe(httpConstants.HTTP_STATUS_CREATED);

            const createdUserId = response1.body.id;
            const createdUser = await usersDataStorage.findUserById(createdUserId);

            const userUpdateRequest = {
                username: 123,
                age: [15],
                hobbies: 'no',
            };

            const response2 = await request.put(`/users/${createdUserId}`).send(userUpdateRequest);

            expect(response2.status).toBe(httpConstants.HTTP_STATUS_BAD_REQUEST);

            expect(response2.body).toEqual(
                'Property "username" must be of type string; '
                + 'Property "age" must be of type number; '
                + 'Property "hobbies" must be of type array',
            );

            const currentUser = await usersDataStorage.findUserById(createdUserId);

            expect(createdUser).toEqual(currentUser);
        });

        it('should return 404 error if user not found', async () => {
            const response = await request.put(`/users/${uuid()}`);

            expect(response.status).toBe(httpConstants.HTTP_STATUS_NOT_FOUND);
            expect(response.body).toEqual('User with this uuid does not exist.');
        });

        it('should return error if uuid is not valid', async () => {
            const response = await request.put('/api/users/1234567890');

            expect(response.status).toBe(httpConstants.HTTP_STATUS_BAD_REQUEST);
            expect(response.body).toEqual('User\'s uuid is not valid.');
        });
    });

    describe('DELETE /users/:id', () => {
        it('should delete user', async () => {
            const userRequest = {
                username: 'user 1',
                age: 15,
                hobbies: ['reading'],
            };

            const response1 = await request.post('/api/users').send(userRequest);

            expect(response1.status).toBe(httpConstants.HTTP_STATUS_CREATED);

            const createdUserId = response1.body.id;

            const response2 = await request.delete(`/users/${createdUserId}`);

            expect(response2.status).toBe(httpConstants.HTTP_STATUS_NO_CONTENT);

            const allUsers = await usersDataStorage.findAllUsers();

            expect(allUsers.length).toEqual(0);
        });

        it('should return 404 error if user not found', async () => {
            const response = await request.delete(`/users/${uuid()}`);

            expect(response.status).toBe(httpConstants.HTTP_STATUS_NOT_FOUND);
            expect(response.body).toEqual('User with this uuid does not exist.');
        });

        it('should return error if uuid is not valid', async () => {
            const response = await request.delete('/api/users/1234567890');

            expect(response.status).toBe(httpConstants.HTTP_STATUS_BAD_REQUEST);
            expect(response.body).toEqual('User\'s uuid is not valid.');
        });
    });
});
