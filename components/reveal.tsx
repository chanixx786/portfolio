"use client";

import {
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
} from "react";

type Props = {
  children: ReactElement;
  delay?: number; // ms, for staggering
  duration?: number; // ms
  distance?: number; // px it travels up
};

export function Reveal({
  children,
  delay = 0,
  duration = 1500,
  distance = 40,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect(); // animate once
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!isValidElement(children)) return <>{children}</>;

  const child = children as ReactElement<{ style?: CSSProperties }>;

  const style: CSSProperties = {
    ...child.props.style,
    opacity: shown ? 1 : 0,
    transform: shown ? "translateY(0)" : `translateY(${distance}px)`,
    transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
  };

  return cloneElement(child as ReactElement<any>, { ref, style });
}