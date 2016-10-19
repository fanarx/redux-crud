import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Home from './pages/Home';
import UserEdit from './pages/UserEdit';
import NotFound from './pages/NotFound';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { reducers } from './reducers/index';
import { sagas } from './sagas/index';
import { Provider } from 'react-redux';
import './stylesheets/main.scss';

// let users = [];
// for (let i = 1; i < 35; ++i) {
//     users.push({
//         id: i,
//         username: 'John ' + i,
//         job: 'Employee ' + i
//     });
// }

// const initialState = {
//     users: {
//         list: users
//     }
// }


const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(routerMiddleware(browserHistory), sagaMiddleware)
));
const history = syncHistoryWithStore(browserHistory, store);
sagaMiddleware.run(sagas);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="user-edit(/:id)" component={UserEdit}/>
                <Route path="*" component={NotFound} />
            </Route>
        </Router>
    </Provider>, 
    document.getElementById('app')
);