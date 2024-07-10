import { useState } from "react";


export default function WarningDialog({ showWarning, message }) {
    return (<>
        <div className="overlay"></div>
        <div className="warning-dialog">{message}</div>
    </>)
}