export const AVOIDED_PROPERTIES = [
  'props',
  'refs',
  'context',
  'updater',
  'state',
];

export const METHOD_TYPES = {
  COMPONENT_METHOD: 'COMPONENT_METHOD',
  RENDER: 'RENDER',
  LIFECYCLE: 'LIFECYCLE',
};

export const LIFECYCLES = [
  'componentWillMount',
  'UNSAFE_componentWillMount',
  'componentDidMount',
  'componentDidUpdate',
  'componentWillUpdate',
  'UNSAFE_componentWillUpdate',
  'componentWillReceiveProps',
  'UNSAFE_componentWillReceiveProps',
  'shouldComponentUpdate',
  'getSnapshotBeforeUpdate',
  'componentWillUnmount',
  'componentDidCatch',
];
export const RENDER_METHOD = 'render';
