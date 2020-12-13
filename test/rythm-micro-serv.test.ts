import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as RythmMicroServ from '../lib/rythm-micro-serv-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new RythmMicroServ.RythmMicroServStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
