exports.getUserId = (request) => {
    return request.auth.payload.sub
}