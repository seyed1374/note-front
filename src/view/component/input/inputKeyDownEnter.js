function inputKeyDownEnter({disableSubmit, onSubmit, onSubmitDisable, checkError})
{
    return function (e)
    {
        if (e.key === "Enter")
        {
            if (!disableSubmit)
            {
                onSubmit?.()
            }
            else
            {
                checkError?.()
                onSubmitDisable?.()
            }
        }
    }
}

export default inputKeyDownEnter