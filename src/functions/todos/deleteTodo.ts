import { DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@libs/dynamoClient';
import { response } from '@utils/response';
import { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
  try {
    const { todoId } = event.pathParameters!;
    if (!todoId) {
      return response(404, { message: 'Product ID is required' });
    }
    const command = new DeleteCommand({
      TableName: 'TodosTable',
      Key: {
        id: todoId,
      },
    });
    await dynamoClient.send(command);

    return response(200, { message: 'To-Do deleted successfully' });
  } catch (error) {
    return response(500, { message: 'Try again' });
  }
}
