import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    // 
    try {
        const {success} = await rateLimit.limit("my-rate-limit")
        // parameter .limit() bisa diisi userid, untuk ngasih limit per-orang.
        // karena belom ada sistem auth, jadinya make string my-rate-limit.
        // artinya, 100 request per menit dibagi SEMUA pengunjung web ini.

        if(!success){
            return res.status(429).json({
                message: "Too many requests, please try again later"
            });
        }

        next()

    } catch (error) {
        console.log("Rate limit error", error)
        next(error)
    } 
};

export default rateLimiter;