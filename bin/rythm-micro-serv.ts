#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { RythmMicroServStack } from '../lib/rythm-micro-serv-stack';

const app = new cdk.App();
new RythmMicroServStack(app, 'RythmMicroServStack');
