#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { AwsCdkAwsCodePipelineAkaCdkPipelineAssignment2Stack } from '../lib/aws-cdk-aws-code_pipeline-aka-cdk-pipeline---assignment-2-stack';

const app = new cdk.App();

new AwsCdkAwsCodePipelineAkaCdkPipelineAssignment2Stack(app, 'assignment2-9062297-pipeline-stack', {
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
