import React from "react"
import { render, fireEvent, getByText } from '@testing-library/react'
import Register from "../Register"
import { Provider } from 'react-redux'
import { legacy_createStore as createStore, applyMiddleware, legacy_createStore } from 'redux'

const reducer = ( state = {}, action ) => state

const renderWithRedux = ( component, { initialState, store = legacy_createStore( reducer, initialState ) } = {} ) => {
    return { ...render( <Provider store={store}>{component}</Provider> ) }
}


test( "Render form and corrent form input field types", () => {
    const { getByText, getByLabelText } = renderWithRedux( <Register /> )

    const nameLabel = getByText( "Name" )
    const emailLabel = getByText( "E-mail" )
    const passwordLabel = getByText( "Password" )
    const confirmPasswordLabel = getByText( "Confirm password" )
    const branchLabel = getByText( "Branch" )

    const nameInput = getByLabelText( "Name" )
    const emailInput = getByLabelText( "E-mail" )
    const passwordInput = getByLabelText( "Password" )
    const confirmPasswordInput = getByLabelText( "Confirm password" )
    const branchInput = getByLabelText( "Branch" )

    expect( nameInput ).toHaveAttribute( 'type', 'text' )
    expect( emailInput ).toHaveAttribute( 'type', 'email' )
    expect( passwordInput ).toHaveAttribute( 'type', 'password' )
    expect( confirmPasswordInput ).toHaveAttribute( 'type', 'password' )
    expect( branchInput ).toHaveAttribute( 'type', 'select' )

    expect( nameLabel ).toBeInTheDocument()
    expect( emailLabel ).toBeInTheDocument()
    expect( passwordLabel ).toBeInTheDocument()
    expect( confirmPasswordLabel ).toBeInTheDocument()
    expect( branchLabel ).toBeInTheDocument()
} )