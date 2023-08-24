import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import {
    FilmStrip, 
    Flipper, 
    useStyleSetClassNames,
    useStyleOptions,
    useScrolling,
    useScrollBarWidth,
    useNumItems,
    useHeight,
    useDir,
} from 'react-film';

const BasicFilm = ({ children, className }) => {
  const [dir] = useDir();
  const [height] = useHeight();
  const [numItems] = useNumItems();
  const [scrollBarWidth] = useScrollBarWidth();
  const [scrolling] = useScrolling();
  const [{ root: rootClassName }] = useStyleSetClassNames();
  const [
    {
      flipperBlurFocusOnClick,
      leftFlipperAriaLabel,
      leftFlipperText,
      rightFlipperAriaLabel,
      rightFlipperText,
      showFlipper,
    }
  ] = useStyleOptions();

  const contentStyle = useMemo(() => ({ height: 48, width: 360 }), [height]);

  return (
    <div className={classNames(rootClassName, (className || '') + '')} dir={dir}>
      <div
        className={classNames('react-film__main', { 'react-film__main--scrolling': scrolling })}
        style={contentStyle}
      >
        {!!numItems && scrollBarWidth !== '100%' && !!showFlipper && (
          <Flipper aria-label={leftFlipperAriaLabel} blurFocusOnClick={flipperBlurFocusOnClick} mode="left">
            {leftFlipperText}
          </Flipper>
        )}
        <FilmStrip>{children}</FilmStrip>
        {!!numItems && scrollBarWidth !== '100%' && !!showFlipper && (
          <Flipper aria-label={rightFlipperAriaLabel} blurFocusOnClick={flipperBlurFocusOnClick} mode="right">
            {rightFlipperText}
          </Flipper>
        )}
      </div>
    </div>
  );
};

// TODO: Move from styleSet to styleSheet.

BasicFilm.defaultProps = {
  children: undefined,
  className: undefined
};

BasicFilm.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
};

export default BasicFilm;