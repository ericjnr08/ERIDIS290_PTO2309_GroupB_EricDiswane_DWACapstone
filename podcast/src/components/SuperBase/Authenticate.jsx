// import React, { useState } from 'react';
// import { supabase } from './SuperBase';
// import { Button, TextField, Typography } from '@mui/material';

// const Authenticate = () => {
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     const { error } = await supabase.auth.signInWithOtp({ email });
//     setLoading(false);

//     if (error) {
//       alert(error.message);
//     } else {
//       alert('Check your email for the login link!');
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <Typography>Sign in via magic link with your email below:</Typography>
//       <TextField
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Your email"
//         required
//         fullWidth
//       />
//       <Button type="submit" disabled={loading}>
//         {loading ? 'Loading...' : 'Send Magic Link'}
//       </Button>
//     </form>
//   );
// };

// export default Authenticate;
