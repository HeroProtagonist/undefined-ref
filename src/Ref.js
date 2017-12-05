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
    this.r =  reactOutput(parse("[link](https://reactjs.org/)"))
    // this.r[0].ref = undefined
  }

  render() {
    return (
      <div>
        <h1> Ref Component </h1>
        {this.r}
      </div>
    )
  }
}

export default Ref;
