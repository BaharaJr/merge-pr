/* eslint-disable camelcase */
const github = require('@actions/github');
const core = require('@actions/core');

const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
const octokit = github.getOctokit(GITHUB_TOKEN);
const { context = {} } = github;

async function run() {
  const eventName = context.eventName;
  switch (eventName) {
    case 'pull_request':
      return pr();
    case 'push':
      core.setFailed(
        `Event <${context.eventName}> is still WIP and will be available soon. Please submit an issue to the repo for quick delivery.`,
      );
      break;
    default:
      core.setFailed(
        `Event <${context.eventName}> is still WIP and will be available soon. Please submit an issue to the repo for quick delivery.`,
      );
  }
}
const pr = async () => {
  const { pull_request } = context.payload;
};
run();
