import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Assignment2Stack9062297 } from './assignment2-9062297-stack';

export class Assignment2PipelineStack9062297 extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const prefix = 'assignment2-9062297';

    const pipeline = new CodePipeline(this, `${prefix}-pipeline`, {
      pipelineName: `${prefix}-pipeline`,
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection(
          'DhruvPatel-30/AWS-CDK-AWS-CodePipeline-aka-CDK-Pipeline---Assignment-2',
          'main',
          {
            connectionArn: 'arn:aws:codeconnections:us-east-2:954847476805:connection/f161276a-e4ba-4454-abca-367bcc294547'
          }
        ),
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
      }),
    });

    pipeline.addStage(
      new (class extends cdk.Stage {
        constructor(scope: Construct, id: string) {
          super(scope, id);
          new Assignment2Stack9062297(this, `${prefix}-app-stack`);
        }
      })(this, 'DeployStage')
    );
  }
}
