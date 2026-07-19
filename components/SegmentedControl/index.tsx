'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SegmentedControlProps, SegmentedOption } from './types';

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  disabled = false,
  className = '',
  width,
  height,
  ...props
}) => {
  const isControlled = controlledValue !== undefined;

  const getInitialIndex = () => {
    let idx = 0;
    if (controlledValue !== undefined) {
      idx = options.findIndex(opt => opt.value === controlledValue);
    } else if (defaultValue !== undefined) {
      idx = options.findIndex(opt => opt.value === defaultValue);
    }
    return idx >= 0 ? idx : 0;
  };

  const [selectedIndex, setSelectedIndex] = useState(getInitialIndex);
  const [thumbPos, setThumbPos] = useState({ left: 0, width: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isDraggingRef = useRef(false);
  const hasMovedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const currentIndexRef = useRef(selectedIndex);
  const pendingClickIndexRef = useRef(-1);
  const clickHandledRef = useRef(false);

  const DRAG_THRESHOLD = 5;

  const updateThumbState = useCallback((index: number) => {
    const track = trackRef.current;
    const option = optionRefs.current[index];
    if (!track || !option) return;

    const trackRect = track.getBoundingClientRect();
    const optionRect = option.getBoundingClientRect();

    setThumbPos({
      left: optionRect.left - trackRect.left,
      width: optionRect.width,
    });
  }, []);

  const getHoverIndex = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return 0;

    const trackRect = track.getBoundingClientRect();
    const x = clientX - trackRect.left;

    if (x <= 0) return 0;
    if (x >= trackRect.width) return options.length - 1;

    for (let i = 0; i < optionRefs.current.length; i++) {
      const el = optionRefs.current[i];
      if (!el) continue;
      const elRect = el.getBoundingClientRect();
      const left = elRect.left - trackRect.left;
      const right = left + elRect.width;

      if (x >= left && x < right) {
        return i;
      }
    }
    return options.length - 1;
  }, [options.length]);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!isDraggingRef.current) return;

    const moveDelta = Math.abs(e.clientX - dragStartXRef.current);

    if (moveDelta > DRAG_THRESHOLD && !hasMovedRef.current) {
      hasMovedRef.current = true;
      clickHandledRef.current = true;
      containerRef.current?.classList.add('dragging');
    }

    if (!hasMovedRef.current) return;

    const hoverIndex = getHoverIndex(e.clientX);

    if (hoverIndex !== currentIndexRef.current) {
      currentIndexRef.current = hoverIndex;

      const track = trackRef.current;
      const thumb = thumbRef.current;
      const option = optionRefs.current[hoverIndex];

      if (track && thumb && option) {
        const trackRect = track.getBoundingClientRect();
        const optionRect = option.getBoundingClientRect();

        thumb.style.left = `${optionRect.left - trackRect.left}px`;
        thumb.style.width = `${optionRect.width}px`;
      }

      optionRefs.current.forEach((el, i) => {
        if (el) {
          if (i === hoverIndex) el.classList.add('active');
          else el.classList.remove('active');
        }
      });
    }
  }, [getHoverIndex]);

  const handlePointerUp = useCallback((e: PointerEvent) => {
    if (!isDraggingRef.current) return;

    const wasDragging = hasMovedRef.current;
    isDraggingRef.current = false;
    hasMovedRef.current = false;
    containerRef.current?.classList.remove('dragging');

    if (!wasDragging && pendingClickIndexRef.current >= 0 && !clickHandledRef.current) {
      clickHandledRef.current = true;
      const index = pendingClickIndexRef.current;
      if (index !== currentIndexRef.current) {
        currentIndexRef.current = index;
        setSelectedIndex(index);
        updateThumbState(index);
        onChange?.(options[index].value);
      }
    } else if (wasDragging) {
      const index = currentIndexRef.current;
      setSelectedIndex(index);

      const track = trackRef.current;
      const option = optionRefs.current[index];
      if (track && option) {
        const trackRect = track.getBoundingClientRect();
        const optionRect = option.getBoundingClientRect();
        setThumbPos({
          left: optionRect.left - trackRect.left,
          width: optionRect.width,
        });
      }
      onChange?.(options[index].value);
    }

    pendingClickIndexRef.current = -1;
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
    window.removeEventListener('pointercancel', handlePointerUp);
  }, [onChange, options, updateThumbState, handlePointerMove]);

  const handlePointerDown = useCallback((e: React.PointerEvent, index: number) => {
    if (disabled) return;

    e.preventDefault();
    pendingClickIndexRef.current = index;
    clickHandledRef.current = false;
    dragStartXRef.current = e.clientX;
    isDraggingRef.current = true;
    hasMovedRef.current = false;

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
  }, [disabled, handlePointerMove, handlePointerUp]);

  useEffect(() => {
    const targetValue = isControlled ? controlledValue : options[currentIndexRef.current]?.value;
    const index = Math.max(0, options.findIndex(opt => opt.value === targetValue));

    if (index !== currentIndexRef.current) {
      currentIndexRef.current = index;
      setSelectedIndex(index);
    }

    const raf = requestAnimationFrame(() => {
      updateThumbState(currentIndexRef.current);
    });

    return () => cancelAnimationFrame(raf);
  }, [controlledValue, options, isControlled, updateThumbState]);

  useEffect(() => {
    const handleResize = () => {
      updateThumbState(currentIndexRef.current);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateThumbState]);

  useEffect(() => {
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  const containerStyle: React.CSSProperties = {};
  if (width !== undefined) {
    containerStyle.width = typeof width === 'number' ? `${width}px` : width;
  }
  if (height !== undefined) {
    containerStyle.height = typeof height === 'number' ? `${height}px` : height;
  }

  const trackStyle: React.CSSProperties = {};
  if (height !== undefined) {
    trackStyle.height = typeof height === 'number' ? `${height}px` : height;
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div
        ref={containerRef}
        className={`relative flex min-w-[180px] min-h-[30px] items-center rounded-lg border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-card)] p-0.5 select-none transition-colors duration-200 ease leading-none ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-default'} ${className}`}
        style={containerStyle}
        {...props}
      >
        <div
          ref={trackRef}
          className="relative flex w-full min-h-[30px] items-center rounded-md bg-transparent isolate"
          style={trackStyle}
        >
          <div
            ref={thumbRef}
            className="absolute top-0 h-full rounded-md bg-[var(--color-bg-secondary)] z-[1] pointer-events-none will-change-[left,width] transition-[left,width] duration-[400ms] ease-[cubic-bezier(0.34,0.84,0.42,1.0)]"
            style={{
              left: `${thumbPos.left}px`,
              width: `${thumbPos.width}px`,
            }}
          />

          {options.map((option, index) => (
            <div
              key={option.value}
              ref={(el) => {
                if (el) optionRefs.current[index] = el;
              }}
              className={`flex-1 flex items-center justify-center z-[2] ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${index === selectedIndex ? 'font-semibold text-[var(--color-text)]' : 'font-medium text-[var(--color-text-secondary)]'} text-[15px] tracking-[0.2px] transition-colors duration-[250ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] rounded-md bg-transparent relative whitespace-nowrap h-full px-1 pointer-events-auto select-none`}
              data-index={index}
              data-value={option.value}
              onPointerDown={(e) => handlePointerDown(e, index)}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SegmentedControl;