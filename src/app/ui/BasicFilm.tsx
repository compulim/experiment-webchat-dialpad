import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {
    FilmStrip, 
    Flipper, 
    useStyleOptions,
    useScrolling,
    Composer
} from 'react-film';

const BasicFilm = ({ children, className }) => {
  const [scrolling] = useScrolling();
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

  const contentStyle = { height: 100 };

  return (
    <Composer numItems={ React.Children.count(children) }>
      <div
        className={classNames('react-film__main', { 'react-film__main--scrolling': scrolling })}
        style={contentStyle}
      >
        <Flipper aria-label={leftFlipperAriaLabel} blurFocusOnClick={flipperBlurFocusOnClick} mode="left">
          {leftFlipperText}
        </Flipper>
        <FilmStrip>{children}</FilmStrip>
        <Flipper aria-label={rightFlipperAriaLabel} blurFocusOnClick={flipperBlurFocusOnClick} mode="right">
          {rightFlipperText}
        </Flipper>
      </div>
    </Composer>
  );
};

BasicFilm.defaultProps = {
  children: undefined,
  className: undefined
};

BasicFilm.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
};

export default BasicFilm;