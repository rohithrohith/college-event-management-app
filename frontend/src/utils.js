import axios from "axios"

export function displayMsg( msg ) {
    const container = document.getElementById( 'msg-container' )
    const msgDiv = document.getElementById( 'toast-msg' )
    container.style.display = 'block'
    msgDiv.textContent = msg
    setTimeout( () => {
        container.style.display = 'none'
        msgDiv.textContent = ''
    }, 3000 )
}

export async function sendOtpMail( email ) {
    try {
        const res = await axios.post( 'http://localhost:5500/api/students/otp', { email } )
        console.log( res.data )
    } catch ( err ) {
        console.log( err.response.data.message )
    }
}