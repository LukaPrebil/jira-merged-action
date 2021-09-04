#!/usr/bin/env bash

output=$(npm start -- --hostname=${JIRA_HOSTNAME} --token=${JIRA_TOKEN} --issue=${ISSUE} --project=${PROJECT} --transition=${TRANSITION} --version=${VERSION} 2>&1)
exitCode=${?}

echo "${output}"
exit ${exitCode}