#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Assignment2PipelineStack9062297 } from '../lib/assignment2-9062297-pipeline-stack';

const app = new cdk.App();

new Assignment2PipelineStack9062297(app, 'assignment2-9062297-pipeline-stack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
  },
});
