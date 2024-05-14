import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@libs/dynamoClient';
import { bodyParser } from '@utils/bodyParser';
import { response } from '@utils/response';
import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
  try {
    const { todoId } = event.pathParameters!;
    if (!todoId) {
      return response(404, { Error: 'ID of the To-DO not found.' });
    }
    console.log(todoId);

    const body = bodyParser(event.body);
    if (!body) {
      return response(404, {
        Error: 'You must inform the changes for the update operations.',
      });
    }
    console.log(body);

    const command = new UpdateCommand({
      TableName: 'TodosTable',
      Key: {
        id: todoId,
      },
      UpdateExpression: 'set #description = :d, #isDone = :c',
      ExpressionAttributeNames: {
        '#description': 'description',
        '#isDone': 'isDone',
      },
      ExpressionAttributeValues: {
        ':d': body.description,
        ':c': body.isDone,
      },
    });
    await dynamoClient.send(command);
    return response(204);
  } catch (error) {
    console.log(error);
    return response(500, { error });
  }
}
