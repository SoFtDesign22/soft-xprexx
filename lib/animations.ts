type AnimationModules = {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
  MotionPathPlugin: typeof import("gsap/MotionPathPlugin").MotionPathPlugin;
};

let modules: Promise<AnimationModules> | undefined;

// Plugins load only in the browser, keeping the Next.js server render safe.
export function loadAnimations(): Promise<AnimationModules> {
  modules ??= Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
    import("gsap/MotionPathPlugin"),
  ]).then(([core, scroll, path]) => {
    core.gsap.registerPlugin(scroll.ScrollTrigger, path.MotionPathPlugin);
    return { gsap: core.gsap, ScrollTrigger: scroll.ScrollTrigger, MotionPathPlugin: path.MotionPathPlugin };
  });
  return modules;
}

export const motionPreference = "(prefers-reduced-motion: reduce)";
export const motionEvent = "softxprexx:motion";

export function setMotionPaused(paused: boolean) {
  document.documentElement.dataset.motionPaused = String(paused);
  window.dispatchEvent(new CustomEvent(motionEvent, { detail: { paused } }));
}
