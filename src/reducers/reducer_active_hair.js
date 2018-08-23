import {SELECT_HAIR} from './index';

export default function(state=null, action) {
    switch (action.type) {
        case SELECT_HAIR:
            return action.payload;

    default:
        return state;
    }
}