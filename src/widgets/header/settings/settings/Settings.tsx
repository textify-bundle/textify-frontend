import type React from "react"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../../../store"
import { toggleTheme } from "../../../../store/slices/userSettingsSlice"
import SwitchButton from "../switch-button/SwitchButton"
import "./Settings.scss"

const Settings: React.FC = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.settings.theme)

  const handleToggleTheme = () => {
    dispatch(toggleTheme())
  }

  useEffect(() => {
    document.body.classList.toggle("dark-theme", theme === "dark")
    document.body.classList.toggle("light-theme", theme === "light")
  }, [theme])

  return (
    <div className={`settings-container ${theme}-theme`}>
      <div className="settings-item">
        <SwitchButton
          className="settings-case-theme-switch"
          checkedProp={theme === "dark"}
          onToggle={handleToggleTheme}
        />
      </div>
    </div>
  )
}

export default Settings

