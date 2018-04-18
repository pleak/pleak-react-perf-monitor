import { PleakContext } from './PleakContext';

describe('PleakContext', () => {
  const context = new PleakContext();

  beforeEach(() => {
    context.resetContext();
    context.resetGlobalContext();
  });

  it('should have its context and globalContext be a base context', () => {
    expect(context.getContext()).toEqual({});
    expect(context.getGlobalContext()).toEqual({});
  });

  it('should be possible to set context and global context and get a context payload', () => {
    context.setContext({ user: 'Bob' });
    expect(context.getContext()).toEqual({ user: 'Bob' });
    expect(context.getGlobalContext()).toEqual({});
    expect(context.getContextPayload()).toEqual({ user: 'Bob' });

    context.setGlobalContext({ locale: 'en' });

    expect(context.getContext()).toEqual({ user: 'Bob' });
    expect(context.getGlobalContext()).toEqual({ locale: 'en' });
    expect(context.getContextPayload()).toEqual({ user: 'Bob', locale: 'en' });
  });

  it('should be possible to reset context and global context', () => {
    context.setContext({ user: 'Bob' });
    context.resetContext();
    expect(context.getContext()).toEqual({});
    expect(context.getContextPayload()).toEqual({});

    context.setGlobalContext({ locale: 'en' });
    context.resetGlobalContext();
    expect(context.getGlobalContext()).toEqual({});
    expect(context.getContextPayload()).toEqual({});
  });
});
