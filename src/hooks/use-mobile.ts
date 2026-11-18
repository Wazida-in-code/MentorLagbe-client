import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // useSyncExternalStore instead of useState + effect: no setState inside
  // an effect (which the strict react-hooks rules reject), and the
  // server snapshot keeps SSR and the first client render identical.
  return React.useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    },
    () => window.innerWidth < MOBILE_BREAKPOINT,
    () => false
  )
}
