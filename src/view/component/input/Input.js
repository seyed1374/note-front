import React, {forwardRef, memo, useEffect, useRef, useState} from "react"
import REGEX from "./REGEX"
import numberCorrection from "./numberCorrection"
import ShowValidation from "./ShowValidation"
import inputKeyDownEnter from "./inputKeyDownEnter"
import ShowPasswordSvg from "./ShowPasswordSvg"
import Material from "./Material"
import CloseCircleSvg from "./CloseCircleSvg"
import ShowPasswordOnSvg from "./ShowPasswordOnSvg"
import checkNationalCode from "./checkNationalCode"

const Input = forwardRef(({
                              className = "", name, label, Icon, showClear, validation, ltr, ltrPlaceholder, noSpaceForError, password, defaultValue, parentError, parentSuccess, onClick, onKeyDown,
                              onChange, focusOnMount, onSubmit, onSubmitDisable, disableSubmit, type = "text", disabled, disableChange, minLength, maxLength, btn, placeholder = " ", isSmall, autoComplete = "on",
                          }, ref) =>
{
    const [useType, setUseType] = useState(type)
    const tempRef = useRef(null)
    const inputRef = ref || tempRef
    const errorTimer = useRef(null)
    const [error, setError] = useState(null)
    const [value, setValue] = useState("")
    const isPassword = type === "password"
    const showError = parentError || error
    const showSuccess = parentSuccess

    useEffect(() =>
    {
        if (ref?.current)
        {
            ref.current.onChange = onInputChange
        }

        if (defaultValue)
        {
            onInputChange({target: {value: defaultValue}, isDefaultValue: true})
        }

        if (focusOnMount && window.innerWidth > 480)
        {
            setTimeout(() => inputRef?.current?.focus?.(), 400)
        }

        return () =>
        {
            clearTimeout(errorTimer.current)
        }
        // eslint-disable-next-line
    }, [])


    useEffect(() =>
    {
        if (validation === "confirm_password")
        {
            setError(null)
            clearTimeout(errorTimer.current)
            errorTimer.current = setTimeout(checkError, 1200)
        }

        // eslint-disable-next-line
    }, [password])

    function checkError()
    {
        clearTimeout(errorTimer.current)
        const value = inputRef.current.value
        if (value)
        {
            if (validation)
            {
                switch (validation)
                {
                    case "email":
                    {
                        if (!REGEX.EMAIL_REGEX.test(value)) setError("emailIsNotValid")
                        break
                    }
                    case "national_code":
                    {
                        if (!checkNationalCode(value)) setError("nationalIsNotValid")
                        break
                    }
                    case "password":
                    {
                        if (!REGEX.PASSWORD_REGEX.test(value)) setError("passwordIsNotValid")
                        break
                    }
                    case "confirm_password":
                    {
                        if (password && password !== value) setError("confirmPasswordIsNotValid")
                        break
                    }
                    default:
                    {
                        break
                    }
                }
            }
            else if (minLength)
            {
                if (value.length < minLength)
                {
                    if (label) setError("minlength error")
                }
            }
        }
    }

    function onInputChange({target: {value}, isDefaultValue})
    {
        setError(null)
        if (validation)
        {
            switch (validation)
            {
                case "email":
                {
                    const tempValue = numberCorrection(value.replace(/ /g, "").toLowerCase())
                    setValue(tempValue)
                    if (REGEX.EMAIL_REGEX.test(tempValue))
                    {
                        onChange({name, value: tempValue, isDefaultValue})
                    }
                    else
                    {
                        onChange({name, value: tempValue.length ? null : "", isDefaultValue})
                    }
                    break
                }
                case "national_code":
                {
                    const tempValue = numberCorrection(value.replace(/ /g, "").toLowerCase()).slice(0, 10)
                    if (!isNaN(tempValue) && tempValue.length <= 10) setValue(tempValue)
                    if (checkNationalCode(tempValue))
                    {
                        onChange({name, value: tempValue, isDefaultValue})
                    }
                    else
                    {
                        onChange({name, value: tempValue.length ? null : "", isDefaultValue})
                    }
                    break
                }
                case "confirm_password":
                case "password":
                {
                    const tempValue = numberCorrection(value).slice(0, 32)

                    if (REGEX.PERSIAN_CHARACTER_REGEX.test(tempValue))
                    {
                        // toast persian character error
                    }
                    else
                    {
                        setValue(tempValue)
                    }

                    if (REGEX.PASSWORD_REGEX.test(tempValue))
                    {
                        onChange({name, value: tempValue, isDefaultValue})
                    }
                    else
                    {
                        onChange({name, value: tempValue.length ? null : "", isDefaultValue})
                    }
                    break
                }
                default:
                {
                    break
                }
            }
        }
        else
        {
            const tempValue = numberCorrection(maxLength ? value.slice(0, maxLength) : value)
            setValue(tempValue)
            if (!minLength || tempValue.trim().length >= minLength) onChange({name, value: tempValue.trim(), isDefaultValue})
            else onChange({name, value: tempValue.length ? null : "", isDefaultValue})
        }

        clearTimeout(errorTimer.current)
        errorTimer.current = setTimeout(checkError, 1200)
    }

    function togglePassType()
    {
        setUseType(useType => useType === "password" ? "text" : "password")
        setTimeout(() =>
        {
            inputRef.current?.setSelectionRange?.(value.length, value.length)
            inputRef.current?.focus?.()
        }, 0)
    }

    function clear()
    {
        onInputChange({target: {value: ""}})
        inputRef?.current?.focus?.()
    }

    return (
        <label className={`input-label ${disabled ? "disabled" : ""} ${isSmall ? "small" : ""} ${className}`}>
            {btn && btn}

            <Material disable={!value} className={`input-label-clear ${showClear && value ? "" : "hide"} ${Icon ? "have-icon" : ""} ${ltr ? "ltr" : ""}`} onClick={clear}>
                <CloseCircleSvg className="input-label-clear-icon"/>
            </Material>

            <input className={`input-field ${!label ? "empty-label" : ""} ${showSuccess ? "success" : ""} ${showError ? "error" : ""} ${ltr ? "ltr" : ""} ${Icon ? "have-icon" : ""} ${btn ? "have-btn" : showClear && value ? "have-clear" : ""} ${isPassword ? "password" : ""}`}
                   name={name}
                   placeholder={placeholder}
                   value={value}
                   onChange={onInputChange}
                   onBlur={checkError}
                   ref={inputRef}
                   onKeyDown={onKeyDown ? onKeyDown : inputKeyDownEnter({onSubmit, onSubmitDisable, checkError, disableSubmit})}
                   type={useType}
                   disabled={disabled || disableChange}
                   onClick={onClick}
                   autoComplete={autoComplete}
            />
            <div className="input-icons">
                {
                    Icon &&
                    <Icon className={`input-label-icon ${showSuccess ? "success" : ""} ${showError ? "error" : ""}`}/>
                }
                {
                    isPassword &&
                    <Material className={`input-label-lock ${value ? "active" : ""}`} onClick={togglePassType}>
                        {
                            useType === "password" ?
                                <ShowPasswordSvg className="input-label-lock-icon"/>
                                :
                                <ShowPasswordOnSvg className="input-label-lock-icon"/>
                        }
                    </Material>
                }
                {
                    label &&
                    <div className={`input-label-title ${showSuccess ? "success" : ""} ${showError ? "error" : ""} ${Icon ? "have-icon" : ""}`}>{label}</div>
                }
            </div>
            <ShowValidation isError={true} text={showError} noSpace={noSpaceForError}/>
            <ShowValidation isError={false} text={showSuccess} noSpace={noSpaceForError}/>
        </label>
    )
})

export default memo(Input)