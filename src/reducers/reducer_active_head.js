import {SELECT_HEAD} from './index';

export default function(state=null, action) {
    switch (action.type) {
        case SELECT_HEAD:
            return action.payload;

    default:
        return state;
    }
}