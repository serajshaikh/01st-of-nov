const Responses = require('./API_Responses');
const S3 = require('./S3');

const bucket = process.env.bucketName;

exports.handler = async event => {
    console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.fileName) {
        // if fileName not exist on url
        return Responses._400({ message: 'File not exist!!!' });
    }

    let fileName = event.pathParameters.fileName;
    const res = await S3.deleteFile(bucket, fileName).catch(err => {
        console.log('error deleting data in S3', err);
        return null;
    });

    if (!res) {
        return Responses._400({ message: 'Failed to delete data by filename' });
    }

    return Responses._200({ res });
};