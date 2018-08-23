import {SELECT_EYES} from './index';

export default function(state=null, action) {
    switch (action.type) {
        case SELECT_EYES:
            return action.payload;

    default:
        return state;
    }
}