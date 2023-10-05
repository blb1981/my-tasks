import { BsSun, BsMoonFill, BsFillMoonStarsFill } from 'react-icons/bs'
import { BiMoon } from 'react-icons/bi'

// TODO: Theme is out of sync with the toggle switch...fix

// Dark mode help from the folling URL
// https://www.youtube.com/watch?v=IiUg-2dAd4A&ab_channel=AleksPopovic
function ThemeSwitcher() {
  const body = document.body
  const lightTheme = 'light'
  const darkTheme = 'dark'
  let theme

  if (localStorage) {
    theme = localStorage.getItem('theme')
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
      theme = lightTheme
    } else {
      body.classList.replace(lightTheme, darkTheme)
      localStorage.setItem('theme', 'dark')
      theme = darkTheme
    }
  }

  return (
    <div
      style={{ marginLeft: 'auto', textAlign: 'right' }}
      className='theme-toggle'
    >
      {/* <button
        className={theme === 'dark' ? clickedClass : ''}
        id='themeSwitcher'
        onClick={(e) => switchTheme(e)}
      >
        Dark Mode
      </button> */}

      <input
        type='checkbox'
        id='themeToggleSwitch'
        onClick={(e) => switchTheme(e)}
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
