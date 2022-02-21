const allowedOrigins = [
    "http://localhost:3000"
]

const corsOptions = {
    credentials: true,
    // origin: (origin, callback) => {
    //     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
    //         callback(null, true)
    //     } else {
    //         callback(new Error('Not allowed by CORS'));
    //     }
    // },
    origin: allowedOrigins,
    optionsSuccessStatus: 200
}

export {corsOptions}