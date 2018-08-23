import {SELECT_EYES, SELECT_HAIR, SELECT_HEAD, SELECT_MOUTH, SELECT_NOSE, SELECT_OBJ, EXPORT_CANVAS} from '../reducers/index';

export const selectHair = (data) => {
    return {
        type: SELECT_HAIR,
        payload: data
    }
}

export const selectHead = (data) => {
    return {
        type: SELECT_HEAD,
        payload: data
    }
}

export const selectEyes = (data) => {
    return {
        type: SELECT_EYES,
        payload: data
    }
}

export const selectNose = (data) => {
    return {
        type: SELECT_NOSE,
        payload: data
    }
}

export const selectMouth = (data) => {
    return {
        type: SELECT_MOUTH,
        payload: data
    }
}

export const selectedObj = (data) => {
    return {
        type: SELECT_OBJ,
        payload: data
    }
}

export const exportCanvas = (data) => {
    return {
        type: EXPORT_CANVAS,
        payload: data
    }
}