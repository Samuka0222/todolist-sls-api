import {
  AdminUpdateUserAttributesCommand,
  NotAuthorizedException,
  UserNotFoundException,
} from '@aws-sdk/client-cognito-identity-provider';
import { cognitoClient } from '@libs/cognitoClient';
import { bodyParser } from '@utils/bodyParser';
import { response } from '@utils/response';
import { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
  try {
    const { accountId } = event.pathParameters!;
    if (!accountId) {
      return response(404, { message: 'User ID is required' });
    }
    const { firstName, lastName } = bodyParser(event.body);

    const command = new AdminUpdateUserAttributesCommand({
      UserPoolId: process.env.COGNITO_POOL_ID,
      Username: accountId,
      UserAttributes: [
        {
          Name: 'given_name',
          Value: firstName,
        },
        {
          Name: 'family_name',
          Value: lastName,
        },
      ],
    });

    await cognitoClient.send(command);
    return response(200, { message: 'Account sucessfully updated.' });
  } catch (error) {
    if (error instanceof NotAuthorizedException) {
      return response(401, { message: 'Invalid token' });
    }
    if (error instanceof UserNotFoundException) {
      return response(404, { message: 'User not found' });
    }
    return response(500, { error });
  }
}
