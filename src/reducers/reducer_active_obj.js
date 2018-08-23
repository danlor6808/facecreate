import {SELECT_OBJ} from './index';

export default function(state=false, action) {
    switch (action.type) {
        case SELECT_OBJ:
            return action.payload;

    default:
        return state;
    }
}