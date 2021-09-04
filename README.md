# Jira After Merge Action

Github action that transitions a Jira issue when code has been merged. Optionally also assigns fix version. For inputs provide jira hostname, PAT to authenticate with, issue key, transition id. You can optionally provide a version name to set as fix version, and project key, if not provided as part of issue key.

## Usage

Can be used to easily automate jira processes, eg moving ticket to "Ready for release" status after it has been merged.

Example with project key as part of issue key, and setting fix version

```yaml
name: 'Jira GitHub Actions'
on:
  - push
jobs:
  jira_merged:
    name: 'Jira mark as merged'
    runs-on: ubuntu-latest
    steps:
      - name: 'Jira transition and fix version'
        uses: lukaprebil/jira-merged-action@v1
        with:
          jira_hostname: "jira.example.com"
          jira_token: ${{ secrets.JIRA_TOKEN }}
          issue: "PROJECT-1234"
          transition: 91
          version: "1.42.00"
```

Example with separate project key, no fix version being set

```yaml
name: 'Jira GitHub Actions'
on:
  - push
jobs:
  jira_merged:
    name: 'Jira mark as merged'
    runs-on: ubuntu-latest
    steps:
      - name: 'Jira transition and fix version'
        uses: lukaprebil/jira-merged-action@v1
        with:
          jira_hostname: "jira.example.com"
          jira_token: ${{ secrets.JIRA_TOKEN }}
          issue: "1234"
          project: "PROJECT"
          transition: 91
```

## Inputs

Inputs configure Terraform GitHub Actions to perform different actions.

* `jira_hostname` - (Required) Hostname of the Jira instance.
* `jira_token` - (Required) Token to authenticate with.
* `issue` - (Required) Issue key or number.
* `project` - (Optional) Project key, if not provided as part of issue key.
* `transition` - (Required) ID of the transistion to perform.
* `version` - (Optional) Name of the version to set as fix version.

## Outputs

There are no outputs of this action.
