import { call, put } from 'redux-saga/effects';
import ApiUsers from '../api/users';

export function* usersFetch(action) {
    const users = yield call(ApiUsers.getList);

    yield put({
        type: 'users.fetchListSuccess',
        users
    })
}

export function* usersAdd(action) {
    yield call(ApiUsers.add, action);
}

export function* usersEdit(action) {
    yield call(ApiUsers.edit, action);
}

export function* usersDelete(action) {
    yield call(ApiUsers.delete, action);
}

