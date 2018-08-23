import {SELECT_MOUTH} from './index';

export default function(state=null, action) {
    switch (action.type) {
        case SELECT_MOUTH:
            return action.payload;

    default:
        return state;
    }
}