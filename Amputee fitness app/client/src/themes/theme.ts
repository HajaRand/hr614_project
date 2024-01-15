import { createTheme, alpha } from '@mui/material/styles';

const fadedColor = alpha('#ede7f6', 0.4);
const fadedColorGold = alpha('#A67C00', 0.1);


const FITNESSPROTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  
  palette: {
    primary: {
      main: '#4a4972', // Fresh Green
    },
    secondary: {
      main: '#69d84f', // Purple purple
    },
    // Add more colors as needed
  },

  shape: {
    borderRadius: 12, // Rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          // Add more button styles
        },
      },
    },
    MuiAppBar: {
        styleOverrides: {
          root: {
            // Round the corners of the AppBar
            borderRadius: 12,
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: fadedColor, // Set the background color for the table header
            '&:hover, &:hover th': {
              backgroundColor: fadedColor, // Maintain the same color on hover
            },
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            // Style for enabled rows
            '&:hover': {
              backgroundColor: fadedColorGold, // Light grey on hover for enabled rows
            },
            // Style for disabled rows
            '&.Mui-disabled': {
              backgroundColor: '#f5f5f5', // Lighter grey for disabled rows
              color: 'rgba(0, 0, 0, 0.38)', // Greyed out text
              pointerEvents: 'none', // Disables pointer events on disabled rows
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            borderRadius: 12, // Apply the desired border-radius
            backgroundColor: '#fff',
            // Apply any other styles you wish to the base input components
          },
          input: {
            fontFamily: "'Courier New', Courier, monospace", // Set monospaced font for input
            // Add any other styles you want to apply to the base input
          },
        },
      },
    // Customize other components as needed
  },
});

export default FITNESSPROTheme;