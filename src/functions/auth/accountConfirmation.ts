import {
  CodeMismatchException,
  ConfirmSignUpCommand,
  UserNotFoundException,
} from '@aws-sdk/client-cognito-identity-provider';
import { cognitoClient } from '@libs/cognitoClient';
import { bodyParser } from '@utils/bodyParser';
import { response } from '@utils/response';
import { APIGatewayProxyEventV2 } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEventV2) {
  try {
    const { email, code } = bodyParser(event.body);

    const command = new ConfirmSignUpCommand({
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: email,
      ConfirmationCode: code,
    });

    await cognitoClient.send(command);

    return response(200, { message: 'Account confirmed.' });
  } catch (error) {
    if (error instanceof CodeMismatchException) {
      return response(406, { message: 'Invalid code' });
    }

    if (error instanceof UserNotFoundException) {
      return response(404, { message: 'User not found' });
    }

    return response(500, { message: 'ERROR: Try again' });
  }
}
