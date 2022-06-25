import directiveRegister from './directives'

export default () => {
  const visitor = {
    JSXElement: directiveRegister,
  }

  return {
    name: 'react-directive',
    visitor,
  }
}
