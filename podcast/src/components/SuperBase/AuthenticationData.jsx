
// import { createContext, useEffect, useState } from 'react';
// import { supabase } from './SuperBase';

// export const AuthContext = createContext();

// export const AuthData = ({ children }) => {
//   const [session, setSession] = useState(null);

//   useEffect(() => {
//     const { data: authListener } = supabase.auth.onAuthStateChange(
//       (event, session) => {
//         setSession(session);
//       }
//     );

//     return () => {
//       authListener?.unsubscribe();
//     };
//   }, []);

//   return (
//     <AuthContext.Provider value={{ session }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
