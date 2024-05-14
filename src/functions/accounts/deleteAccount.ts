import {
  AdminDeleteUserCommand,
  NotAuthorizedException,
  UserNotFoundException,
} from '@aws-sdk/client-cognito-identity-provider';
import { cognitoClient } from '@libs/cognitoClient';
import { response } from '@utils/response';
import { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
  try {
    const userId = event.requestContext.authorizer.jwt.claims.sub as string;
    const command = new AdminDeleteUserCommand({
      UserPoolId: process.env.COGNITO_POOL_ID,
      Username: userId,
    });

    await cognitoClient.send(command);

    return response(200, { message: 'Account sucessfully deleted.' });
  } catch (error) {
    if (error instanceof NotAuthorizedException) {
      return response(401, { message: 'Invalid token' });
    }
    if (error instanceof UserNotFoundException) {
      return response(404, { message: 'User not found' });
    }
    return response(500, { message: 'ERROR: Try again later.' });
  }
}
