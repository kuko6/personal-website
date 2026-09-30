import { getContext, onMount, setContext } from "svelte";

const chickenContext = Symbol("chicken-easter-egg");

type ChickenState = "hidden" | "peeking" | "jumping" | "following";

export function createChickenEasterEgg() {
  const chickenSize = 40;
  const cursorGap = 36;
  const followStrength = 6;
  const maxSpeed = 280;

  const state = $state({
    phase: "hidden" as ChickenState,
    sprite: "/images/chicken.png",
    position: { x: 0, y: 0 },
    facing: 1,
    moving: false,
  });
  const elements: {
    link?: HTMLAnchorElement;
    follower?: HTMLButtonElement;
  } = {};
  let reducedMotion = false;
  let cursor: { x: number; y: number } | null = null;
  let animationFrame: number | null = null;
  let previousFrameTime = 0;
  let jumpStartedAt = 0;

  onMount(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      reducedMotion = motionPreference.matches;
      if (reducedMotion) {
        stopFollowing();
        if (state.phase === "jumping") state.phase = "following";
      } else {
        followCursor();
      }
    };

    updateMotionPreference();
    motionPreference.addEventListener("change", updateMotionPreference);

    return () => {
      stopFollowing();
      motionPreference.removeEventListener("change", updateMotionPreference);
    };
  });

  function peekChicken(event: PointerEvent | FocusEvent) {
    if (state.phase !== "hidden") return;
    if (event instanceof PointerEvent && event.pointerType === "touch") return;

    state.sprite = `/images/${Math.random() < 0.7 ? "chicken" : "imro"}.png`;
    state.phase = "peeking";
  }

  function hidePeek(event: PointerEvent | FocusEvent) {
    if (state.phase !== "peeking") return;

    const projectLink = event.currentTarget as HTMLElement;
    const focusTarget = event instanceof FocusEvent
      ? event.relatedTarget as Node | null
      : document.activeElement;

    if (projectLink.contains(focusTarget) || projectLink.matches(":hover")) return;
    state.phase = "hidden";
  }

  function releaseChicken(event: MouseEvent) {
    const button = event.currentTarget as HTMLButtonElement;
    const sprite = button.querySelector<HTMLElement>(".chicken-sprite");
    if (!sprite) return;

    const { left, top } = sprite.getBoundingClientRect();
    state.position = { x: left, y: top };
    state.facing = 1;
    jumpStartedAt = performance.now();
    state.phase = reducedMotion ? "following" : "jumping";

    if (event.detail > 0) cursor = { x: event.clientX, y: event.clientY };
    if (event.detail === 0) {
      elements.link?.focus();
    }

    followCursor();
  }

  function trackCursor(event: PointerEvent) {
    if (event.pointerType === "touch") return;
    cursor = { x: event.clientX, y: event.clientY };
    followCursor();
  }

  function followCursor() {
    if (reducedMotion || animationFrame !== null) return;
    if (state.phase !== "jumping" && state.phase !== "following") return;

    previousFrameTime = performance.now();
    animationFrame = requestAnimationFrame(moveChicken);
  }

  function moveChicken(now: number) {
    animationFrame = null;
    const elapsed = Math.min((now - previousFrameTime) / 1000, 0.05);
    previousFrameTime = now;
    state.moving = false;

    if (cursor) {
      const dx = cursor.x - (state.position.x + chickenSize / 2);
      const dy = cursor.y - (state.position.y + chickenSize / 2);
      const distance = Math.hypot(dx, dy);
      const step = Math.min(
        Math.max(0, distance - cursorGap) * (1 - Math.exp(-followStrength * elapsed)),
        maxSpeed * elapsed,
      );

      if (step > 0.1) {
        const x = Math.max(0, Math.min(
          window.innerWidth - chickenSize,
          state.position.x + dx / distance * step,
        ));
        const y = Math.max(0, Math.min(
          window.innerHeight - chickenSize,
          state.position.y + dy / distance * step,
        ));

        state.moving = Math.hypot(x - state.position.x, y - state.position.y) > 0.1;
        if (state.moving) {
          state.position = { x, y };
          if (Math.abs(dx) > 2) state.facing = dx < 0 ? -1 : 1;
        }
      }
    }

    if (state.phase === "jumping" && now - jumpStartedAt >= 420) {
      state.phase = "following";
    }

    if (state.moving || state.phase === "jumping") {
      animationFrame = requestAnimationFrame(moveChicken);
    }
  }

  function stopFollowing() {
    if (animationFrame !== null) cancelAnimationFrame(animationFrame);
    animationFrame = null;
    state.moving = false;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key !== "Escape") return;
    hideChicken();
  }

  function hideChicken() {
    stopFollowing();
    if (document.activeElement === elements.follower) {
      elements.link?.focus({ preventScroll: true });
    }
    state.phase = "hidden";
  }

  function forgetCursor() {
    cursor = null;
    stopFollowing();
    if (state.phase === "jumping") state.phase = "following";
  }

  const chicken = {
    state,
    elements,
    peekChicken,
    hidePeek,
    releaseChicken,
    trackCursor,
    handleKeydown,
    hideChicken,
    forgetCursor,
  };

  setContext(chickenContext, chicken);
  return chicken;
}

export function getChickenEasterEgg() {
  return getContext<ReturnType<typeof createChickenEasterEgg>>(chickenContext);
}
