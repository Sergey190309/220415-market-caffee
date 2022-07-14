import { useEffect } from 'react'

export const useOutsideClick = (ref, clickHandler) => {

  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        // console.log('Clicked outside')
        clickHandler()
      }
    }
    document.addEventListener('click', handleClickOutside, true)
      return () => {
        document.removeEventListener('click', handleClickOutside, true)
      }
  }, [ref, clickHandler])
}
