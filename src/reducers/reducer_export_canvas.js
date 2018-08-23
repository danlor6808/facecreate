import {EXPORT_CANVAS} from './index';

export default function(state=null, action) {
    switch (action.type) {
        case EXPORT_CANVAS:
            return action.payload;

    default:
        return state;
    }
}