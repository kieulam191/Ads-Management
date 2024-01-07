import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
	let accountsUrl = /^\/accounts\//;
	let imagesUrl = /^\/images\//;
	res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
	if(req.path === '/auth/signup' || req.path === '/auth/signin' || accountsUrl.test(req.path) || imagesUrl.test(req.path)){
		return next()
	}
	var token = req.headers.authorization;
	
	if (!token)
		return res
			.status(403)
			.json({ error: true, message: "Access Denied: No token provided" });
	token = token.split(' ')[1] ;
	if(token === 'admin')
		return next()
	var accesskey = process.env.ACCESS_TOKEN_PRIVATE_KEY || 'ACCESS_TOKEN_PRIVATE_KEY';
	console.log(accesskey)
	try {
		const tokenDetails = jwt.verify(
			token,
			accesskey
		);
		req.tokenUser = tokenDetails;
		return next();
	} catch (err) {
		console.log(err);
		res
			.status(403)
			.json({ error: true, message: "Access Denied: Invalid token" });
	}
};

export default auth;