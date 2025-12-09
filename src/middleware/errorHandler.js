export const errorHandler = (err, req, res, next) => {

    const status = err.status || 500;

    if (status === 500) {
        console.error(err);
    }

    res.status(status).json({
        status: status,
        message: err.message || "Internal server error",
    });
};
