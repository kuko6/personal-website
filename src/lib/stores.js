import { onDestroy } from 'svelte'
import { writable } from 'svelte/store'

// // Set up our MediaQueryList
// const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)')

// // Initial theme config from current state
// const theme = writable(prefersDarkMode.matches ? 'dark' : 'light')

const theme = writable('light')

export { theme }
