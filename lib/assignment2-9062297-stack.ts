import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class Assignment2Stack9062297 extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const prefix = 'assignment2-9062297';

    // S3 Bucket
    const bucket = new s3.Bucket(this, `${prefix}-bucket`, {
      bucketName: `${prefix}-bucket`.toLowerCase(),
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // DynamoDB Table
    const table = new dynamodb.Table(this, `${prefix}-table`, {
      tableName: `${prefix}-table`,
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Lambda Function
    const fn = new lambda.Function(this, `${prefix}-lambda`, {
      functionName: `${prefix}-lambda`,
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async function(event) {
          console.log("Lambda Triggered!");
          return { statusCode: 200, body: "Hello from assignment2-9062297 Lambda!" };
        }
      `),
      environment: {
        TABLE_NAME: table.tableName,
        BUCKET_NAME: bucket.bucketName,
      },
    });

    bucket.grantReadWrite(fn);
    table.grantReadWriteData(fn);
  }
}
