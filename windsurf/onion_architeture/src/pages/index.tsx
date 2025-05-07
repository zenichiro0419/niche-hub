import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { theme } from '../interface/theme';
import { store } from '../interface/store';

export default function Home() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Typography variant="h3" gutterBottom>NicheHub MVP</Typography>
      <Link href="/register" passHref><Button variant="contained" color="primary">ユーザー登録</Button></Link>
      <Link href="/login" passHref><Button variant="outlined" color="secondary" sx={{ mt: 2 }}>ログイン</Button></Link>

    </Box>
  );
}
