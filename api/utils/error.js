export const createError = (status, message)=>{
    const err = new Error();
    err.status = status;
    err.messsage = message;
    return err;
};