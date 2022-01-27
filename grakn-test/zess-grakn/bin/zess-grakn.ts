#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ZessGraknNew } from '../lib/zess-grakn-stack';

const app = new cdk.App();
// Include the stackProps to pass region & account ID to the application
const stackProps = {
    env: {
        region: process.env.REGION,
        account: process.env.ACCOUNT_ID,
    },
};

new ZessGraknNew(app, "ZessGraknNew", stackProps);