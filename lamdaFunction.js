  
// DEPENDENCIES --------------------------------------------------------------
var aws = require('aws-sdk');
var ses = new aws.SES({region: 'us-west-2'});
const docClient = new aws.DynamoDB.DocumentClient({region: "us-west-2"});


// EXPORTS HANDLER ----------------------------------------------------------
  exports.handler = async (event, context, callback) => {
    
    // VARIABLES - collected from user 
    var nameData = event.key1.name
    var emailData = event.key2.email
    var messageData = event.key3.message

    //======================================================================
    // SENDING AN EMAIL ----------------------------------------------------

    // bestpractice suggestion - Base64
    const fromBase64 = Buffer.from("sender@email.com").toString('base64');

    // EMAIL TEMPLATE - with user message inserted into <p> 
    const htmlBody = `
      <!DOCTYPE html>
      <html>
        <head></head>
        <body><p> ${messageData} </p></body>
      </html>
    `;
  
    // SES EMAIL PARAMETERS - required for sending email
    const sesParams = {
      Destination: {
        ToAddresses: [emailData],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: htmlBody,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: nameData,
        },
      },
      ReplyToAddresses: ['sender@@email.com'],
      Source: `=?utf-8?B?${fromBase64}?= <sender@email.com>`,
    };
  
    // SES RESPONSE - after using sendEmail method to send email
    const emailResponse = await ses.sendEmail(sesParams).promise();

    //======================================================================
    // STORING MESSAGE IN DYNAMO ------------------------------------------

    // parameters required for sending data to Dynamo
        const dbParams = {
            Item: {
                date: Date.now(),
                message: [messageData]
                },
    
            TableName: 'usermsgs'
            };
    
    docClient.put(dbParams, function(err, data) {
        if(err){
            callback(err, null);
        } else {
            callback(null, data);
        }
    })


    // NETWORK RESPONSE ----------------------------------------------------------------
    const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // gives ability for CORS to run properly
          'Access-Control-Allow-Credentials': true,
    },
        body: JSON.stringify({nameData, emailData, messageData, emailResponse, })

    }; // END OF RESPONSE ---------------------------------------------------------------


    return response;
    
};
