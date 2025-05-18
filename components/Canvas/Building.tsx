"use client";

import React, {
  memo,
  ReactNode,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Cloud,
  Environment,
  Scroll,
  ScrollControls,
  useScroll as useDreiScroll,
  Clouds,
} from "@react-three/drei";
import * as THREE from "three";
import Model from "./Model";
import { cn } from "@/lib/utils";
import { useScroll } from "@/app/lib/use-scroll";

const CameraController = ({
  onAnimationComplete,
  setInvokeBtn,
  hasStartedExperience,
  resetStartedExperience,
}: {
  onAnimationComplete: () => void;
  setInvokeBtn: (invokeBtn: boolean) => void;
  hasStartedExperience: boolean;
  resetStartedExperience: () => void;
}) => {
  const { camera } = useThree();
  const scroll = useDreiScroll();
  const targetPosition = useRef({ x: 0, y: 2, z: 100 });
  const {
    setState,
    state,
    scrolling,
    setScrolling,
    scrollingThreshold,
    setScrollingThreshold,
  } = useScroll();
  const hasAnimationCompletedRef = useRef(false);
  const SCROLL_UP_THRESHOLD = 0.1;
  const SCROLL_THRESHOLD = 0.98;
  const lastScrollPos = useRef(0);
  const enteredFromBelow = useRef(false);
  const resetStateRef = useRef(false);
  const hasSetInvokeBtnRef = useRef(false);
  const wasAtTopRef = useRef(false);
  const hasMovedAwayFromTop = useRef(false);

  useEffect(() => {
    camera.position.set(0, 2, -300);
    camera.lookAt(0, 2, 100);

    if (state === "before-3d") {
      hasAnimationCompletedRef.current = false;
      enteredFromBelow.current = false;
      resetStateRef.current = true;
    } else if (state === "after-3d") {
      enteredFromBelow.current = true;
    } else if (state === "3d") {
      hasAnimationCompletedRef.current = false;
    }
  }, [camera, state]);

  useEffect(() => {
    if (hasStartedExperience) {
      hasSetInvokeBtnRef.current = true;
    } else {
      hasSetInvokeBtnRef.current = false;
    }
  }, [hasStartedExperience]);

  useFrame(() => {
    const scrollProgress = scroll.offset;
    setScrollingThreshold(scrollProgress);
    if (scrollProgress > lastScrollPos.current) {
      setScrolling("down");
    } else if (scrollProgress < lastScrollPos.current) {
      setScrolling("up");
    }
    lastScrollPos.current = scrollProgress;

    if (scrollProgress > 0.05) {
      hasMovedAwayFromTop.current = true;
      wasAtTopRef.current = false;
    }

    if (scrollProgress === 0) {
      if (hasMovedAwayFromTop.current && !wasAtTopRef.current) {
        wasAtTopRef.current = true;
        resetStartedExperience();
        // setInvokeBtn(true);
        hasSetInvokeBtnRef.current = false;
        hasMovedAwayFromTop.current = false;
      }

      // If scrolling up and reached the top, always set to before-3d
      if (scrolling === "up") {
        setState("before-3d");
      } else if (enteredFromBelow.current) {
        setState("after-3d");
        onAnimationComplete();
        setInvokeBtn(true);

        if (!hasStartedExperience && !hasSetInvokeBtnRef.current) {
          setInvokeBtn(true);
          hasSetInvokeBtnRef.current = true;
        }
      } else {
        setState("before-3d");
      }
      hasAnimationCompletedRef.current = false;
      resetStateRef.current = true;
    } else if (scrollProgress !== 0 && scrollProgress < SCROLL_THRESHOLD) {
      setState("3d");
      if (resetStateRef.current && scrolling === "down") {
        hasAnimationCompletedRef.current = false;
        resetStateRef.current = false;
      }
    }

    const targetX = 0;
    let targetY = 2;
    let targetZ = 100;

    if (scrollProgress < 0.5) {
      const t = scrollProgress / 0.5;
      camera.position.z = THREE.MathUtils.lerp(-300, 20, t);
      targetY = THREE.MathUtils.lerp(2, 40, t);
      targetZ = THREE.MathUtils.lerp(100, 120, t);
    } else if (scrollProgress < 0.7) {
      const t = (scrollProgress - 0.5) / 0.2;
      camera.position.y = THREE.MathUtils.lerp(2, 8, t);
      targetY = THREE.MathUtils.lerp(40, 90, t);
      targetZ = THREE.MathUtils.lerp(120, 140, t);
    } else {
      const t = (scrollProgress - 0.7) / 0.3;
      camera.position.z = THREE.MathUtils.lerp(20, 160, t);
      camera.position.y = THREE.MathUtils.lerp(8, 40, t);
      targetY = THREE.MathUtils.lerp(120, 40, t);
      targetZ = THREE.MathUtils.lerp(140, 180, t);
    }

    targetPosition.current.x = THREE.MathUtils.lerp(
      targetPosition.current.x,
      targetX,
      0.1
    );
    targetPosition.current.y = THREE.MathUtils.lerp(
      targetPosition.current.y,
      targetY,
      0.1
    );
    targetPosition.current.z = THREE.MathUtils.lerp(
      targetPosition.current.z,
      targetZ,
      0.1
    );

    camera.lookAt(
      targetPosition.current.x,
      targetPosition.current.y,
      targetPosition.current.z
    );

    if (
      scrollProgress >= SCROLL_THRESHOLD &&
      !hasAnimationCompletedRef.current
    ) {
      hasAnimationCompletedRef.current = true;

      setState("after-3d");
      onAnimationComplete();

      setTimeout(() => {
        setInvokeBtn(true);
      }, 1000);
    }
  });

  return null;
};

const Section = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <section className="h-screen w-full flex flex-col justify-center items-center text-center p-10">
        <div className="w-full flex items-center justify-center">
          {children}
        </div>
      </section>
    </>
  );
};

const ScrollContent = () => {
  return (
    <Scroll html style={{ width: "100%" }}>
      <div className="w-full">
        <Section>
          <div
            className="font-bold text-[3rem] md:text-[5rem] lg:text-[8rem] text-white"
            style={{ textShadow: "0px 0px 2px #000000" }}
          >
            7K+
            <p className="text-3xl lg:text-5xl font-light md:-mt-3 lg:-mt-10">
              Visits
            </p>
          </div>
        </Section>
        <Section>
          <div
            className="font-bold text-[3rem] md:text-[5rem] lg:text-[8rem] text-white"
            style={{ textShadow: "0px 0px 2px #000000" }}
          >
            17+
            <p className="text-3xl lg:text-5xl font-light md:-mt-3 lg:-mt-10">
              Years
            </p>
          </div>
        </Section>
        <Section>
          <div
            className="font-bold text-[3rem] md:text-[5rem] lg:text-[8rem] text-white"
            style={{ textShadow: "0px 0px 2px #000000" }}
          >
            7.2K+
            <p className="text-3xl lg:text-5xl font-light md:-mt-3 lg:-mt-10">
              Projects
            </p>
          </div>
        </Section>
        {/* <Section>
          <div
            className="font-bold text-[3rem] md:text-[5rem] lg:text-[8rem] text-white"
            style={{ textShadow: "0px 0px 2px #000000" }}
          >
            8.5K+
            <p className="text-3xl lg:text-5xl font-light md:-mt-3 lg:-mt-10">
              Likes
            </p>
          </div>
        </Section> */}
      </div>
    </Scroll>
  );
};

interface BuildingProps {
  containerRef: React.RefObject<HTMLDivElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const CloudsGroup = memo(() => {
  const clouds = useMemo(() => {
    return (
      <group position={[-15, 30, 180]} renderOrder={1}>
        <Clouds material={THREE.MeshBasicMaterial}>
          <Cloud
            concentrate="inside"
            segments={40}
            scale={10}
            volume={10}
            color="white"
          />
          <Cloud
            seed={5}
            scale={10}
            concentrate="inside"
            volume={5}
            color="white"
            fade={100}
          />
        </Clouds>
      </group>
    );
  }, []);

  return clouds;
});

CloudsGroup.displayName = "CloudsGroup";

const Building = ({ containerRef, canvasRef }: BuildingProps) => {
  const { state, setState } = useScroll();
  const [isSticky, setIsSticky] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const buildingRef = useRef<HTMLDivElement>(null);
  const [invokeBtn, setInvokeBtn] = useState(false);
  const [hasStartedExperience, setHasStartedExperience] = useState(false);

  useEffect(() => {
    if (state === "3d") {
      setIsAnimationComplete(false);
      setIsSticky(true);
    }
  }, [state]);

  const handleAnimationComplete = () => {
    setIsAnimationComplete(true);
    setIsSticky(false);

    setState("after-3d");
  };

  const handleInvokeBtn = () => {
    setInvokeBtn(false);
    setHasStartedExperience(true);
  };

  const resetStartedExperience = () => {
    setHasStartedExperience(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn(`relative w-full overflow-visible h-screen`)}
    >
      {/* {invokeBtn && (
        <div className="absolute inset-0 bg-black/50 h-full w-full z-30 flex justify-center items-center">
        <Button
          onClick={handleInvokeBtn}
          className="text-white border-white bg-transparent border-2 font-bold hover:bg-white/30"
        >
          Start Experience
        </Button>
      </div>
      )} */}
      <div
        ref={buildingRef}
        className={cn(
          `w-full transition-all duration-300 ease-in-out`,
          // isSticky ? "fixed top-0 left-0 z-50" : "relative",
          isAnimationComplete ? "static" : "h-screen",
          state === "3d" ? "pointer-events-none" : ""
        )}
      >
        <Canvas className="scroll-hide w-full h-full" shadows ref={canvasRef}>
          <ScrollControls pages={6} damping={0.2} style={{ width: "100%" }}>
            <CameraController
              onAnimationComplete={handleAnimationComplete}
              setInvokeBtn={setInvokeBtn}
              hasStartedExperience={hasStartedExperience}
              resetStartedExperience={resetStartedExperience}
            />

            <ScrollContent />

            <Environment preset="park" background />
            <ambientLight intensity={2} color="#ffffff" />

            <directionalLight
              position={[-100, 100, 100]}
              intensity={3}
              color="#ffffff"
              castShadow={false}
            />
            <directionalLight
              position={[100, 100, 100]}
              intensity={3}
              color="#ffffff"
              castShadow={false}
            />

            <hemisphereLight
              color="#ffffff"
              groundColor="#ffffff"
              intensity={1.5}
            />

            <CloudsGroup />
            <Suspense fallback={null}>
              <Model />
            </Suspense>
          </ScrollControls>
        </Canvas>
      </div>
    </div>
  );
};

export default Building;
