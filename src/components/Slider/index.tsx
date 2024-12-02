import React, { useState, useEffect, useRef } from "react";
import "./index.css";

export interface ISliderProps {
  minValue?: number;
  maxValue?: number;
  initialValue?: number;
  onChange?: (value: number) => void;
  title?: string;
  showValue?: boolean;
  renderValue?: (value: number) => string;
  className: string;
}

const Slider = (props: ISliderProps) => {
  const {
    minValue = 0,
    maxValue = 100,
    initialValue = 25,
    onChange,
    title,
    showValue = false,
    renderValue = (value: number) => value.toString(),
    className,
  } = props;

  const [value, setValue] = useState(initialValue);
  const [sliding, setSliding] = useState(false);

  const slideBarRef = useRef<HTMLDivElement | null>(null);
  const slideButtonRef = useRef<HTMLDivElement | null>(null);
  const slideActiveBarRef = useRef<HTMLDivElement | null>(null);

  const updateSlider = (newValue: number) => {
    const slidedValue = Math.max(minValue, Math.min(maxValue, newValue));
    setValue(slidedValue);

    const position = (slidedValue - minValue) / (maxValue - minValue);
    if (
      slideButtonRef.current &&
      slideBarRef.current &&
      slideActiveBarRef.current
    ) {
      slideButtonRef.current.style.left = `${
        position * slideBarRef.current.offsetWidth
      }px`;
      slideButtonRef.current.style.backgroundColor = "aliceblue";
      slideButtonRef.current.style.border = "3px solid #2292f9";

      slideActiveBarRef.current.style.width = `${
        position * slideBarRef.current.offsetWidth
      }px`;
    }
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    setSliding(true);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (sliding && slideBarRef.current) {
        const rect = slideBarRef.current.getBoundingClientRect();
        const newPosition = (event.clientX - rect.left) / rect.width;
        const newValue = newPosition * (maxValue - minValue) + minValue;
        updateSlider(newValue);
      }
    };

    const handleMouseUp = (event: MouseEvent) => {
      if (sliding && slideBarRef.current) {
        const rect = slideBarRef.current.getBoundingClientRect();
        const newPosition = (event.clientX - rect.left) / rect.width;
        let newValue = newPosition * (maxValue - minValue) + minValue;

        if (newValue > maxValue) newValue = maxValue;
        if (newValue < minValue) newValue = minValue;

        if (onChange) onChange(newValue);
      }

      setSliding(false);
    };

    if (sliding) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliding, maxValue, minValue]);

  useEffect(() => {
    updateSlider(initialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);

  return (
    <div className={`Slider ${className}`}>
      {title && <div className="SliderTitle">{title}</div>}
      <div className="SliderContainer" ref={slideBarRef}>
        <div className="SliderBar"></div>
        <div className="SliderActiveBar" ref={slideActiveBarRef}></div>
        <div
          className="SliderButton"
          ref={slideButtonRef}
          onMouseDown={handleMouseDown}
        ></div>
      </div>
      {showValue && <div className="SliderValue">{renderValue(value)}</div>}
    </div>
  );
};

export default Slider;
