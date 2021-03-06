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
      core.warning (
        `Event <${context.eventName}> is still WIP and will be available soon. Please submit an issue to the repo for quick delivery.`,
      );
      break;
    default:
      core.warning(
        `Event <${context.eventName}> is still WIP and will be available soon. Please submit an issue to the repo for quick delivery.`,
      );
     break;
  }
}
const pr = async () => {
  try {
    const { pull_request } = context.payload;
    octokit.rest.pulls.merge({
      owner: pull_request.head.repo.owner.login,
      repo: pull_request.head.repo.name,
      pull_number: pull_request.number,
    });
  } catch (e) {
    core.setFailed(e.message);
  }
};
run();
