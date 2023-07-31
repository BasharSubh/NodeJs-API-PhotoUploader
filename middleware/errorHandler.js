const errorHandler = (err, req, res, next) => {
    const state = res.statusCode ?? 500;

    switch (state) {
        case 400:
            res.json({Title: "bad request", Error: err.message })
            break;
        case 404:
            res.json({ Title: "not found", Error: err.message })
            break;
        case 500:
            res.json({ Title: "server error", Error: err.message })
            break;
        case 401:
            res.json({ Title: "unauthorized", Error: err.message })
            break;
        case 403:
            res.json({ Title: "forbidden", Error: err.message })
            break;
        default:
            console.log(err)
            break;
    }

    if (err) {
        return res.status(400).json({Title: "bad request", Error: err.message || null });
      }

}

module.exports = errorHandler

