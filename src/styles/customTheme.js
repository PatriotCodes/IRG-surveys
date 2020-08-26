import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
  palette: {
    primary: { main: '#176c81' },
    secondary: { main: '#ffeeee' },
    text: { main: '#1c1c1c', red: '#960303' },
    success: { main: '#319d13' },
  },
  sizes: { headerHeight: 56 },
});
