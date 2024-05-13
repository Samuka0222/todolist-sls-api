import {
  InitiateAuthCommand,
  UserNotConfirmedException,
  UserNotFoundException,
} from '@aws-sdk/client-cognito-identity-provider';
import { cognitoClient } from '@libs/cognitoClient';
import { bodyParser } from '@utils/bodyParser';
import { response } from '@utils/response';
import { APIGatewayProxyEventV2 } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEventV2) {
  try {
    const { email, password } = bodyParser(event.body);

    const command = new InitiateAuthCommand({
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    });

    const { AuthenticationResult } = await cognitoClient.send(command);

    if (!AuthenticationResult) {
      return response(401, { error: 'Invalid credentials' });
    }

    const { AccessToken, RefreshToken } = AuthenticationResult;

    return response(201, {
      AccessToken,
      RefreshToken,
    });
  } catch (error) {
    if (error instanceof UserNotFoundException) {
      return response(404, { message: 'User not found' });
    }

    if (error instanceof UserNotConfirmedException) {
      return response(401, { message: 'User not confirmed' });
    }
    return response(500, { message: 'ERROR: Try again later.' });
  }
}
