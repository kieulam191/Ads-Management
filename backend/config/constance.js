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

const REPORT_STATE = {
    IN_PROCESS: 0,
    DONE: 1
};

const USER_REPORT_FIELDS = ["report_id", "location_id", "fullname", "report_content", "report_type", "state", "report_handler", "created_at"];
const BOARD_DETAIL_FIELDS = ["board_id", "image_url", "expiration_date"];

export {
    ADVERTISE_ACTION,
    VERIFY_STATE,
    REPORT_STATE,
    USER_REPORT_FIELDS,
    BOARD_DETAIL_FIELDS,
};