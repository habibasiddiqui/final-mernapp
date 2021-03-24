import React, { useContext, useState, useEffect, createContext } from "react";

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {

  // const [loading, setLoading] = useState(true)

  const [role, setRole] = useState('');
  const [online, setOnline] = useState(false);

  const value = {
    role,
    setRole,
    online,
    setOnline
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}