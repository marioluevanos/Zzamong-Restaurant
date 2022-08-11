import { TweenMax, Expo } from 'gsap'

export default function scrollTo({
  yPos = 500,
  duration = 0.6,
  onComplete = () =>
    _plugins /* Not necessary, just wanted to use the un-used var */
}) {
  TweenMax.to(window, duration, {
    scrollTo: {
      y: yPos
    },
    ease: Expo.easeInOut,
    onComplete
  })
}
