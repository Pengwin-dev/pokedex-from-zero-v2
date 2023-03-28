import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';


export const NavBar = ({ drawerWidth = 160 }) => {
    
  return (
    
    <AppBar 
        position='fixed'
        sx={{ 
            width: { sm: `calc(80% - ${ drawerWidth }px)` },
            ml: { sm: `${ drawerWidth }px` }
         }}
    >
        <Toolbar>
            <IconButton
                color='red'
                edge="start"
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuOutlined />
            </IconButton>

            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' noWrap component='div'> POKEDEX APP </Typography>
                {/* <Typography variant='h8' noWrap component='div'> Login </Typography>     */}
                 <IconButton color='error'>
                    <LogoutOutlined />
                </IconButton> 
            </Grid>

        </Toolbar>
    </AppBar>
  )
}