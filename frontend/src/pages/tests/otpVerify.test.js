import React from "react"
import { render, fireEvent, getByText } from '@testing-library/react'
import { Provider } from 'react-redux'
import { legacy_createStore as createStore, } from 'redux'
import OtpVerify from "../OtpVerify"
import { BrowserRouter as Router } from "react-router-dom"

const reducer = ( state = { user: { signedIn: true } }, action ) => state

const renderWithRedux = ( component, { initialState, store = createStore( reducer, initialState ) } = {} ) => {
    return { ...render( <Provider store={store}>{component}</Provider> ) }
}

test( "Render form and corrent form input field types", () => {
    const { getByTitle, getByRole } = renderWithRedux( <Router>
        <OtpVerify />
    </Router> )

    const otp1 = getByTitle( 'otpnumberone', { name: 'otp1' } )
    const otp2 = getByTitle( 'otpnumberone', { name: 'otp2' } )
    const otp3 = getByTitle( 'otpnumberone', { name: 'otp3' } )
    const otp4 = getByTitle( 'otpnumberone', { name: 'otp4' } )
    const submitBtn = getByRole( 'button', { type: "submit" } )

    expect( otp1 ).toHaveAttribute( 'type', 'text' )
    expect( otp2 ).toHaveAttribute( 'type', 'text' )
    expect( otp3 ).toHaveAttribute( 'type', 'text' )
    expect( otp4 ).toHaveAttribute( 'type', 'text' )

    expect( otp1 ).toHaveAttribute( 'pattern', '[0-9]' )
    expect( otp2 ).toHaveAttribute( 'pattern', '[0-9]' )
    expect( otp3 ).toHaveAttribute( 'pattern', '[0-9]' )
    expect( otp4 ).toHaveAttribute( 'pattern', '[0-9]' )

    expect( submitBtn ).toHaveAttribute( "value" )

    expect( otp1 ).toBeInTheDocument()
    expect( otp2 ).toBeInTheDocument()
    expect( otp3 ).toBeInTheDocument()
    expect( otp4 ).toBeInTheDocument()
    expect( submitBtn ).toBeInTheDocument()
} )