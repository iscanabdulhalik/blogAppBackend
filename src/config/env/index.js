import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3003;

const env  = {
    development: process.env.NODE_ENV === 'development'
};
const uri = process.env.MONGO_URI;
const secret_key = process.env.SECRET_KEY;
const aws_key = process.env.AWS_ACCESS_KEY;
const aws_secret = process.env.AWS_SECRET_ACCESS_KEY;
const aws_region = process.env.AWS_REGION;
const aws_bucket = process.env.AWS_BUCKET_NAME;
const aws_config = process.env.AWS_CONFIG_SET;



export { port, env, uri, secret_key, aws_key, aws_secret, aws_region, aws_bucket, aws_config};