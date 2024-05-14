import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@libs/dynamoClient';
import { response } from '@utils/response';
import { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
  try {
    const { todoId } = event.pathParameters!;
    const command = new GetCommand({
      TableName: 'TodosTable',
      Key: {
        id: todoId,
      },
    });
    const { Item } = await dynamoClient.send(command);

    if (!Item) {
      return response(404, { message: 'To-do not found.' });
    }

    await dynamoClient.send(command);
    return response(200, { Item });
  } catch (error) {
    return response(500, { error });
  }
}
