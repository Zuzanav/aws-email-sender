## Email Contact Form

### Description
This is a simple, serverless contact form. Fill out the information and it will send out an email to the email address provided. 

### Behind the Scenes
Upon submit, this contact form sends the user input data to the API Gateway using Axios. A Labmda function retrieves this
data and does two things with it. 1) An email is sent to the provided email address using SES 2) the message portion 
of the email is stored in DynamoDB. 

### Technologies Used:
- AWS 
  - Lambda
  - SES
  - API Gateway
  - DynamoDB
  - S3
- JavaScript
- Node.js
- React
- Material-UI
- React-material-ui-form-validator
- HTML/CSS
  