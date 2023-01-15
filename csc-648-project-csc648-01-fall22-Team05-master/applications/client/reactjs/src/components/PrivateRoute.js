import React from "react"
import { Redirect } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import {BrowserRouter as  Routers, Route,Routes, Link } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  return (
      <Routers>
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Link to="/login" />
      }}
    ></Route>
    </Routers>
  )
}