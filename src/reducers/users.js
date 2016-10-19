export default function users(state = {}, action) {
    let newState;

    switch(action.type) {
        case 'users.modalDeleteShow':
            newState = JSON.parse(JSON.stringify(state));
            newState.modal = newState.modal ? newState.modal : {};
            newState.modal.listDelete = {
                show: true,
                id: action.id,
                username: action.username
            }
            return newState;

        case 'users.modalDeleteHide':
            newState = JSON.parse(JSON.stringify(state));
            newState.modal.listDelete = {
                show: false,
                id: 0,
                username: ""
            }
            return newState;   

        case 'users.delete':
             return Object.assign({}, state, {
                 list: state.list.filter(user => user.id !== action.id)
             });
        
        case 'users.add': 
            return Object.assign({}, state, {
                list: [...state.list, {
                    id: Number((Math.random() * 1000000).toPrecision(6)),
                    username: action.username,
                    job: action.job
                }]
            });
        case 'users.edit': 
            // const users = state.list.filter(user => user.id !== action.id);
            // return Object.assign({}, state, {
            //     list: [...users, {
            //         id: Number((Math.random() * 1000000).toPrecision(6)),
            //         username: action.username,
            //         job: action.job
            //     }]
            // });
            const editedList = state.list.map(user => user.id === action.id ? 
               Object.assign(user, { username: action.username, job: action.job }) :
              user
            );
            return Object.assign({}, state, {
                list: editedList
            });

         case 'users.fetchListSuccess':
            return Object.assign({}, state, {
                list: action.users
            });
        default:
            return state;
    }
}