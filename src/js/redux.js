import { createStore, combineReducers } from 'redux';

const userReducer = (state={name: ''}, action) => {
    switch (action.type) {
        case 'CHANGE_NAME':
            return state = {...state, name: action.payload};
            break;
    }
    return state;
};

const tweetReducer = (state={}, action) => {

    return state;
};

const reducers = combineReducers({
    user: userReducer,
    tweets: tweetReducer
});

const store = createStore(reducers);

store.dispatch({type: 'CHANGE_NAME', payload: "Will"});