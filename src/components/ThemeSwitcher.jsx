import { useState } from 'react'
import { BsSun, BsFillMoonStarsFill } from 'react-icons/bs'

// TODO: Theme is out of sync with the toggle switch...fix

// Dark mode help from the folling URL
// https://www.youtube.com/watch?v=IiUg-2dAd4A&ab_channel=AleksPopovic
function ThemeSwitcher() {
  const body = document.body
  const lightTheme = 'light'
  const darkTheme = 'dark'
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ?? lightTheme
  )

  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', theme)
  }

  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme)
  } else {
    body.classList.add(lightTheme)
  }

  function switchTheme() {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme)
      localStorage.setItem('theme', 'light')
      setTheme(lightTheme)
    } else {
      body.classList.replace(lightTheme, darkTheme)
      localStorage.setItem('theme', 'dark')
      setTheme(darkTheme)
    }
  }

  return (
    <div className='theme-toggle'>
      <input
        type='checkbox'
        id='themeToggleSwitch'
        onClick={(e) => switchTheme(e)}
        defaultChecked={theme === darkTheme}
      />
      <label htmlFor='themeToggleSwitch'>
        <span className='sun'>
          <BsSun />
        </span>
        <div className='moon'>
          <BsFillMoonStarsFill />
        </div>
      </label>
    </div>
  )
}

export default ThemeSwitcher
