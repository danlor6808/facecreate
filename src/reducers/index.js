import {combineReducers} from 'redux';
import pieces from './reducer_pieces';
import active_hair from './reducer_active_hair';
import active_head from './reducer_active_head';
import active_eyes from './reducer_active_eyes';
import active_nose from './reducer_active_nose';
import active_mouth from './reducer_active_mouth';
import active_obj from './reducer_active_obj';
import export_canvas from './reducer_export_canvas';

export const FETCH_PIECES = 'FETCH_PIECES';
export const SELECT_HAIR = 'SELECT_HAIR';
export const SELECT_HEAD = 'SELECT_HEAD';
export const SELECT_EYES = 'SELECT_EYES';
export const SELECT_NOSE = 'SELECT_NOSE';
export const SELECT_MOUTH = 'SELECT_MOUTH';
export const SELECT_OBJ = 'SELECT_OBJ';
export const EXPORT_CANVAS = 'EXPORT_CANVAS';

export const Reducers = combineReducers({
    pieces,
    active_hair,
    active_head,
    active_eyes,
    active_nose,
    active_mouth,
    active_obj,
    export_canvas
});

