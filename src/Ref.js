import React from 'react';
import SimpleMarkdown from 'simple-markdown';

// https://github.com/facebook/react/issues/10649
const rules = SimpleMarkdown.defaultRules
const reactOutput = SimpleMarkdown.reactFor(SimpleMarkdown.ruleOutput(rules, 'react'));

var rawBuiltParser = SimpleMarkdown.parserFor(rules);
var parse = function(source) {
    const blockSource = source + "\n\n";
    return rawBuiltParser(blockSource, {inline: false});
};

class Ref extends React.Component {

  componentWillMount() {
    this.createEl = React.createElement("div", {ref: undefined},
      React.createElement("p", {dangerouslySetInnerHTML: {__html: 'TEXT'}})
    )

    // 15 / 16 -> TypeError: Cannot set property 'ref' of undefined
    // this.el.ref = undefined

    // 15 -> setting undefined is ok
    // 16 -> setting undefined yields Uncaught Error: Expected ref to be a function or a string.
    this.mockEl = {
        ref: null,
        type: 'h1',
        key: null,
        props: {
          className: 'fake'
        },
        $$typeof: Symbol.for('react.element'),
        _owner: null,
        _store: {
            validated: true,
            originalProps: null
        }
    }

    const [ markdownEl ] =  reactOutput(parse("[link](https://reactjs.org/)"))
    this.markdownEl = markdownEl
    this.markdownEl.ref = null
  }

  render() {
    return (
      <div>
        <h3 ref={undefined}> Ref Component: {React.version} </h3>
        {this.createEl}
        <br />
        {this.mockEl}
        <br />
        {this.markdownEl}
      </div>
    )
  }
}

export default Ref;
