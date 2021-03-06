import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Pad from './pad';
import classNames from 'classnames';
import { AngleInput, UnaryInput, Inputs, LogInput } from '@pie-labs/calculator-reducer';

const items = [
  '(',
  ')',
  Inputs.PI,
  LogInput.LOG,
  AngleInput.SIN,
  AngleInput.COS,
  AngleInput.TAN,
  LogInput.NATURAL_LOG,
  AngleInput.ASIN,
  AngleInput.ACOS,
  AngleInput.ATAN,
  { label: 'n!', value: Inputs.FACTORIAL },
  { label: '√', value: UnaryInput.SQUARE_ROOT },
  { label: 'x²', value: UnaryInput.SQUARE },
  { label: 'x³', value: UnaryInput.CUBE },
  { label: 'x<sup>y</sup>', value: '^' },
  Inputs.FRACTION,
  Inputs.EXPONENT,
  UnaryInput.ABS,
]

export class Scientific extends React.Component {

  render() {
    const { onInput, classes, activeMode } = this.props;
    return (
      <div className={classes.scientific}>
        {items.map((i, index) => {
          const props = typeof i === 'string' ? { label: i, value: i } : i;
          const active = props.label === activeMode;
          return (
            <Pad
              theme={{
                root: classNames(classes.pad, i && classes[i.kind], active && classes.active)
              }}
              active={props.label === activeMode}
              onClick={onInput}
              key={index}
              {...props} />
          );
        })}
      </div>
    );
  }
}

Scientific.propTypes = {}

const styles = theme => ({
  scientific: {
    display: 'grid',
    gridGap: '1px',
    flex: 0.5,
    gridTemplateColumns: 'repeat(4, 1fr)'
  },
  pad: {
    backgroundColor: theme.palette.secondary[300]
  },
  'angle-mode': {
    backgroundColor: 'green'
  },
  active: {
    backgroundColor: 'lightgreen'
  }
});

export default withStyles(styles)(Scientific);