import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { forwardRef, useImperativeHandle, useState } from 'react';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <Box m={2} style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.showLabel}</Button>
      </Box>
      <Box m={2} style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>{props.hideLabel}</Button>
      </Box>
    </div>
  );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  showLabel: PropTypes.string.isRequired,
  hideLabel: PropTypes.string.isRequired,
};

export default Togglable;
