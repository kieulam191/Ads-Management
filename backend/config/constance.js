const ADVERTISE_ACTION = {
    // action: [-1: delete, 0: modify, 1: add]
    DELETE: -1,
    UPDATE: 0,
    CREATE: 1  
};

const VERIFY_STATE = {
    // is_verified: [-1: undefined, 0: reject, 1: approve]
    UNVERIFIED: -1,
    REJECTED: 0,
    ACCEPTED: 1
};

export {
    ADVERTISE_ACTION,
    VERIFY_STATE,
};