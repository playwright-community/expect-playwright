import matchers from './matchers';

// @ts-ignore
const jestExpect = global.expect;

jestExpect.extend(matchers);
