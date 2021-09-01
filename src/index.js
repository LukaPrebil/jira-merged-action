import argsParser from 'args-parser';
import JiraApi from 'jira-client';
import { parseIssueNumber } from './helpers.js';

/**
 * @type {{
 *  hostname: string
 *  token: string
 *  project: string | null
 *  issue: string | number
 *  transition: number
 * }}
 */
const args = argsParser(process.argv);

const client = new JiraApi({
  protocol: 'https',
  host: args.hostname,
  bearer: args.token,
});

async function transitionIssue(issueNumber, transitionId, version) {
  await client.transitionIssue(issueNumber, { transition: { id: transitionId } });
  console.log(`Successfully transitioned ${issueNumber} with transition ${transitionId}.`);
  if (version) {
    await client.updateIssue(
      issueNumber,
      {
        update: {
          fixVersions: [{ add: { name: version } }],
        },
      },
    );
    console.log(`Added fix version ${version}`);
  }
}

await transitionIssue(
  parseIssueNumber(args.issue, args.project),
  args.transition,
  args.version,
);
