import { takeLatest } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { usersFetch, usersAdd, usersEdit, usersDelete } from './users';

export function* sagas() {
    yield [
        fork(takeLatest, 'usersFetch', usersFetch),
        fork(takeLatest, 'usersAdd', usersAdd),
        fork(takeLatest, 'usersEdit', usersEdit),
        fork(takeLatest, 'usersDelete', usersDelete)
    ];
}