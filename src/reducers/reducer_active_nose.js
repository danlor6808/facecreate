import {SELECT_NOSE} from './index';

export default function(state=null, action) {
    switch (action.type) {
        case SELECT_NOSE:
            return action.payload;

    default:
        return state;
    }
}