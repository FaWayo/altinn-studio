import { queriesMock, renderHookWithMockStore } from '../../testing/mocks';
import { useRuleConfigMutation } from './useRuleConfigMutation';
import { RuleConfig } from '../../types/RuleConfig';

// Test data:
const org = 'org';
const app = 'app';
const newRuleConfig: RuleConfig = {
  ruleConnection: {
    ruleConnection1: {
      selectedFunction: 'selectedFunction1',
      inputParams: {},
      outParams: {}
    }
  },
  conditionalRendering: {}
};

describe('useRuleConfigMutation', () => {
  afterEach(jest.clearAllMocks);

  it('Calls saveRuleConfig with correct arguments and payload', async () => {
    const { result } = await render();
    await result.current.mutateAsync(newRuleConfig);
    expect(queriesMock.saveRuleConfig).toHaveBeenCalledTimes(1);
    expect(queriesMock.saveRuleConfig).toHaveBeenCalledWith(org, app, newRuleConfig);
  });
});

const render = async () => renderHookWithMockStore()(() => useRuleConfigMutation(org, app)).renderHookResult;
