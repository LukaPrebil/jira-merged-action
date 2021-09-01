/**
 * @param {string | number} issueNumber either PROJECT-1234 or 1234
 * @param {string?} project
 */
export function parseIssueNumber(issueNumber, project) {
  if (typeof issueNumber === 'string' && /^[A-Z]+-\d+$/.test(issueNumber)) {
    return issueNumber;
  }
  if (typeof issueNumber === 'number' || /^\d+$/.test(issueNumber)) {
    return `${project.toLocaleUpperCase()}-${issueNumber}`;
  }

  throw new Error(`Can't parse issue ${issueNumber}`);
}

export function isOk(httpStatus) {
  const status = parseInt(httpStatus);
  return status >= 200 && status < 300;
}
