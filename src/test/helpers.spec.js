import { isOk, parseIssueNumber } from '../helpers';

const ORIGINAL_ENV = { ...process.env };

describe('Testing parseIssueNumber', () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });
  test('Should not change anything if full issue number is provided', () => {
    const issue = 'PROJECT-1337';

    const result = parseIssueNumber(issue);

    expect(result).toBe(issue);
  });

  test('Should append project from environment if not provided [string]', () => {
    const issue = '1337';
    process.env.PROJECT = 'PROJECT';

    const result = parseIssueNumber(issue);

    expect(result).toBe(`PROJECT-${issue}`);
  });

  test('Should append project from environment if not provided [number]', () => {
    const issue = 1337;
    process.env.PROJECT = 'PROJECT';

    const result = parseIssueNumber(issue);

    expect(result).toBe(`PROJECT-${issue}`);
  });

  test('Will throw if it cant parse the number', () => {
    const issue = 'Some issue 1337';

    expect(() => parseIssueNumber(issue)).toThrowError(`Can't parse issue ${issue}`);
  });
});

describe('isOk tests', () => {
  const cases = [
    { status: 200, result: true },
    { status: 204, result: true },
    { status: 301, result: false },
    { status: 404, result: false },
  ];

  test.each(cases)(
    'If passed $status, isOk returns $result',
    ({ status, result: expected }) => {
      expect(isOk(status)).toBe(expected);
    },
  );
});
