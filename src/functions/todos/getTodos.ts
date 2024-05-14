import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@libs/dynamoClient';
import { response } from '@utils/response';
import { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
  try {
    const userId = event.requestContext.authorizer.jwt.claims.sub as string;
    const command = new ScanCommand({
      TableName: 'TodosTable',
      ScanFilter: {
        userId: {
          ComparisonOperator: 'EQ',
          AttributeValueList: [userId],
        },
      },
    });

    const { Items } = await dynamoClient.send(command);
    await dynamoClient.send(command);
    return response(200, { Items });
  } catch (error) {
    return response(500, { message: 'Error creating the to-do' });
  }
}
