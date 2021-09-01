import args from 'args';
import JiraApi from 'jira-client';
import { isOk, parseIssueNumber } from './helpers';

args
  .option('issue', 'Issue to transition', null, parseIssueNumber)
  .option('transition', 'Which transition to execute', null, parseInt);

const client = new JiraApi({
  protocol: 'https',
  host: process.env.HOSTNAME,
  bearer: process.env.TOKEN,
});

async function transitionIssue(issueNumber, transitionId) {
  const response = await client.transitionIssue(issueNumber, { transition: { id: transitionId } });
  if (isOk(response.status) && process.env.VERSION) {
    await client.updateIssue(issueNumber, { fixVersions: [{ add: { id: process.env.VERSION } }] });
    console.log(`Successfully transitioned ${issueNumber} with transition ${transitionId}. Added fix version ${process.env.VERSION}`);
  }
  throw new Error(JSON.stringify(response));
}

const { issue, transition } = args.parse(process.argv);

await transitionIssue(issue, transition);
