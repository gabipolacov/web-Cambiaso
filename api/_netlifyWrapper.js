// Shared helper used by each API route to run a Netlify function module.
exports.runNetlifyHandler = async function runNetlifyHandler(req, res, netlifyModule) {
    const event = {
        httpMethod: req.method,
        path: req.url,
        headers: req.headers || {},
        queryStringParameters: req.query || {},
        body: typeof req.body === 'object' ? JSON.stringify(req.body) : (req.body || '')
    };
    const context = {};

    // netlifyModule may export handler, default, or module.exports
    const handler = netlifyModule && (netlifyModule.handler || netlifyModule.default || netlifyModule);

    try {
        const result = await handler(event, context);

        const status = (result && result.statusCode) || 200;
        const headers = (result && result.headers) || {};

        // set headers
        Object.entries(headers).forEach(([k, v]) => {
            try { res.setHeader(k, v); } catch (_) { }
        });

        // send body
        if (result && typeof result.body === 'string') {
            res.statusCode = status;
            res.end(result.body);
        } else {
            res.statusCode = status;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify(result && result.body !== undefined ? result.body : {}));
        }
    } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ error: err && err.message ? err.message : 'Internal Server Error' }));
    }
}