const Responses = require('./API_Responses');
const S3 = require('./S3');

const bucket = process.env.bucketName;

exports.handler = async event => {
    console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.fileName) {
        // failed without an fileName
        return Responses._Error400({ message: 'File Not Fount, Sorry!!!' });
    }

    let fileName = event.pathParameters.fileName;

    const file = await S3.get(fileName, bucket).catch(err => {
        console.log('error in S3 get', err);
        return null;
    });

    if (!file) {
        return Responses._Error400({ message: 'Failed to read data by filename' });
    }

    return Responses._Ok200({ file });
};
