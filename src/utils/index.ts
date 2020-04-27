export const VALUE = 'value';
export const ERROR = 'error';
export const REQUIRED_FIELD_ERROR = 'This is required field';

function is_bool(value: any) {
    return typeof value === 'boolean';
}

/**
 * Determines a value if it's an object
 *
 * @param {object} value
 */
export function is_object(value: any) {
    return typeof value === 'object' && value !== null;
}

/**
 *
 * @param {string} value
 * @param {boolean} isRequired
 */
export function is_required(value: any, isRequired: boolean) {
    if (!value && isRequired) return REQUIRED_FIELD_ERROR;
    return '';
}

export function get_prop_values(stateSchema: any, prop: any) {
    return Object.keys(stateSchema).reduce((field: Record<string, string>, key) => {
        field[key] = is_bool(prop) ? prop : stateSchema[key][prop];

        return field;
    }, {});
}
