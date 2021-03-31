const ContextSession = React.createContext({
    isSession: false,
    setIsSession: () => {},
    tokenSession: null,
    setTokenSession: () => {},
  });


export default ContextSession;