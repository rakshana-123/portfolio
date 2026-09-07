import React, { useEffect, useLayoutEffect, useRef, useCallback, useState } from 'react';
import Lenis from 'lenis';
import { motion } from 'framer-motion';
import './ScrollStack.css';

export interface ScrollStackItemProps {
  children: React.ReactNode;
  itemClassName?: string;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = '',
}) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>
    {/* Inner reveal lives on a child so it never fights the pin/scale
        transform applied to the card itself. */}
    <motion.div
      className="scroll-stack-card-inner"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -48px 0px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  </div>
);

export interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const canStackScroll = () =>
  window.matchMedia('(min-width: 1024px)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 80,
  itemScale = 0.03,
  itemStackDistance = 32,
  stackPosition = '15%',
  scaleEndPosition = '8%',
  baseScale = 0.88,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete,
}) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const initialTopsRef = useRef<number[]>([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  // Pin-stacking only makes sense when cards fit the viewport (desktop layout).
  // On phones the single-column cards are taller than the screen, so pinning
  // locks their lower half off-screen — fall back to a plain list there.
  const [canStack, setCanStack] = useState(canStackScroll);

  useEffect(() => {
    const desktopMq = window.matchMedia('(min-width: 1024px)');
    const reducedMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setCanStack(desktopMq.matches && !reducedMq.matches);
    update();
    desktopMq.addEventListener('change', update);
    reducedMq.addEventListener('change', update);
    return () => {
      desktopMq.removeEventListener('change', update);
      reducedMq.removeEventListener('change', update);
    };
  }, []);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return typeof value === 'number' ? value : parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller ? scroller.scrollTop : 0,
        containerHeight: scroller ? scroller.clientHeight : 0,
      };
    }
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = useWindowScroll
      ? (document.querySelector('.scroll-stack-end') as HTMLElement)
      : (scrollerRef.current?.querySelector('.scroll-stack-end') as HTMLElement);

    const endElementTop = endElement
      ? endElement.getBoundingClientRect().top + window.scrollY
      : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = initialTopsRef.current[i] || 0;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = initialTopsRef.current[j] || 0;
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', handleScroll);

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
    return lenis;
  }, [handleScroll]);

  useLayoutEffect(() => {
    if (!canStack) {
      // Static list mode: strip any inline styles left over from a previous
      // desktop run so cards flow naturally.
      const cards = Array.from(
        document.querySelectorAll('.scroll-stack-card')
      ) as HTMLElement[];
      cards.forEach((card) => {
        card.style.transform = '';
        card.style.filter = '';
        card.style.zIndex = '';
        card.style.marginBottom = '';
        card.style.willChange = '';
      });
      lastTransformsRef.current.clear();
      return;
    }

    let disposed = false;
    let resizeRaf = 0;

    const cards = Array.from(
      document.querySelectorAll('.scroll-stack-card')
    ) as HTMLElement[];

    cardsRef.current = cards;

    // Record static natural top positions before any transforms are applied
    initialTopsRef.current = cards.map((card) => {
      const rect = card.getBoundingClientRect();
      return rect.top + window.scrollY;
    });

    cards.forEach((card, i) => {
      card.style.zIndex = `${i + 1}`;
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.perspective = '1000px';
    });

    // Re-measure when layout shifts (viewport resize, late webfont swap)
    const remeasure = () => {
      if (disposed) return;
      cards.forEach((card) => {
        card.style.transform = 'translateZ(0)';
      });
      initialTopsRef.current = cards.map((card) => {
        const rect = card.getBoundingClientRect();
        return rect.top + window.scrollY;
      });
      updateCardTransforms();
    };

    const handleResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(remeasure);
    };

    window.addEventListener('resize', handleResize);
    document.fonts?.ready?.then(remeasure);

    setupLenis();
    updateCardTransforms();

    return () => {
      disposed = true;
      cancelAnimationFrame(resizeRaf);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      initialTopsRef.current = [];
      lastTransformsRef.current.clear();
      isUpdatingRef.current = false;
    };
  }, [
    canStack,
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms,
  ]);

  return (
    <div
      className={`scroll-stack-scroller ${canStack ? '' : 'scroll-stack-static'} ${className}`.trim()}
      ref={scrollerRef}
    >
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
