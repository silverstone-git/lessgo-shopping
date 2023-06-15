
export function showSnackBar(message: string, setSnackBarMessage: any) {
    setSnackBarMessage(message)
    setTimeout(() => {
        setSnackBarMessage("");
    }, 3000)
}