"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function AdminPanel({ page_id }) {
  const router = useRouter();
  const searchParams = new useSearchParams(router.query);

  const pages = [
    {
      title: "Add Jury",
      href: "/admin/AddJury?id=",
    },
    {
      title: "Assign Jury",
      href: "/admin/AssignJury?id=",
    },
    {
      title: "Applicants View",
      href: "/admin/ApplicantView?id=",
    },
    {
      title: "Jury Dashboard",
      href: "/admin/JuryDashboard?id=",
    },
  ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      <AppBar
        position="static"
        style={{
          backgroundColor: "#000000",
        }}
      >
        <Container maxWidth="xl" fixed style={{ backgroundColor: "#000000" }}>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />{" "}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, id) => (
                  <Link href={page.href + searchParams.get("id")} key={id}>
                    <MenuItem
                      key={page.title}
                      onClick={handleCloseNavMenu}
                      sx={{
                        backgroundColor: page_id === id ? "#000000" : "#ffffff",
                      }}
                    >
                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, idx) => (
                <Link href={page.href + searchParams.get("id")} key={idx}>
                  <Button
                    key={page.title}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: page_id === idx ? "black" : "white",
                      display: "block",
                      backgroundColor: page_id === idx ? "#ffffff" : "",
                      fontWeight: page_id === idx ? "bold" : "",
                    }}
                  >
                    {page.title}
                  </Button>
                </Link>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default AdminPanel;
