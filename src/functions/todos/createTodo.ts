import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@libs/dynamoClient';
import { bodyParser } from '@utils/bodyParser';
import { response } from '@utils/response';
import { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';
import { randomUUID } from 'crypto';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
  try {
    const { description } = bodyParser(event.body);
    const userId = event.requestContext.authorizer.jwt.claims.sub as string;

    const id = randomUUID();
    const command = new PutCommand({
      TableName: 'TodosTable',
      Item: {
        id,
        description,
        userId,
        isDone: false,
      },
    });

    await dynamoClient.send(command);
    return response(201, { message: 'To-Do created successfully' });
  } catch (error) {
    return response(500, { message: 'Error creating the to-do' });
  }
}
