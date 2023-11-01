import ResponsiveAppBar from "../../components/appBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function HomePage() {
  return (
    <div>
      <ResponsiveAppBar />
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" align="center">
          About
        </Typography>
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" align="center">
          Eligibility
        </Typography>
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" align="center">
          Apply now
        </Typography>
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" align="center">
          How to apply
        </Typography>
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" align="center">
          Our jury
        </Typography>
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" align="center">
          Past edition
        </Typography>
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" align="center">
          Contact us
        </Typography>
      </Box>
    </div>
  );
}

export default HomePage;
