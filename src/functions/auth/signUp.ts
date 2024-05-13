import {
  InvalidPasswordException,
  SignUpCommand,
  UsernameExistsException,
} from '@aws-sdk/client-cognito-identity-provider';
import { cognitoClient } from '@libs/cognitoClient';
import { bodyParser } from '@utils/bodyParser';
import { response } from '@utils/response';
import { APIGatewayProxyEventV2 } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEventV2) {
  try {
    const body = bodyParser(event.body);

    const command = new SignUpCommand({
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: body.email,
      Password: body.password,
      UserAttributes: [
        {
          Name: 'given_name',
          Value: body.firstName,
        },
        {
          Name: 'family_name',
          Value: body.lastName,
        },
      ],
    });

    await cognitoClient.send(command);

    return response(201, { message: 'User created sucessfully!' });
  } catch (error) {
    if (error instanceof UsernameExistsException) {
      return response(409, { Error: 'This e-mail is already in use.' });
    }

    if (error instanceof InvalidPasswordException) {
      return response(400, { Error: 'Invalid password' });
    }
    return response(500, { Error: 'ERROR: Try again later.' });
  }
}
