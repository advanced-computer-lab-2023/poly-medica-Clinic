import { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Button,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Stack,
    Typography,
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import UpgradePlanCard from './UpgradePlanCard';

// assets
import { IconLogout, IconSettings, IconUser } from '@tabler/icons';
import Swal from 'sweetalert2';
import { useUserContext } from 'hooks/useUserContext';
import { authenticationAxios } from 'utils/AxiosConfig';
// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const navigate = useNavigate();
    const [selectedIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    const { dispatch, user } = useUserContext();
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);
    const handleLogout = async () => {
        await authenticationAxios
            .get('/remove-cookie')
            .then(() => {
                dispatch({ auth: false, payload: null });
                navigate('/login/login3');
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'failed to logout',
                });
            });
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.primary.light,
                    backgroundColor: theme.palette.primary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}!important`,
                        color: theme.palette.primary.light,
                        '& svg': {
                            stroke: theme.palette.primary.light,
                        },
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0,
                    },
                }}
                icon={
                    <Avatar
                        // src={''}
                        // alt=
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer',
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup='true'
                        color='inherit'
                    >
                    {user.userName.charAt(0).toUpperCase()}
                    </Avatar>
                }
                label={
                    <IconSettings
                        stroke={1.5}
                        size='1.5rem'
                        color={theme.palette.primary.main}
                    />
                }
                variant='outlined'
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup='true'
                onClick={handleToggle}
                color='primary'
            />
            <Popper
                placement='bottom-end'
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14],
                            },
                        },
                    ],
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard
                                    border={false}
                                    elevation={16}
                                    content={false}
                                    boxShadow
                                    shadow={theme.shadows[16]}
                                >
                                    <Box sx={{ p: 2 }}>
                                        <Stack>
                                            <Stack
                                                direction='row'
                                                spacing={0.5}
                                                alignItems='center'
                                            >
                                                <Typography variant='h4'>
                                                    Good Morning,
                                                </Typography>
                                                <Typography
                                                    component='span'
                                                    variant='h4'
                                                    sx={{ fontWeight: 400 }}
                                                >
                                                    { user.userName }
                                                </Typography>
                                            </Stack>
                                            <Typography variant='subtitle2'>
                                                { user.type }
                                            </Typography>
                                        </Stack>
                                      
                                    </Box>
                                    <PerfectScrollbar
                                        style={{
                                            height: '100%',
                                            maxHeight: 'calc(100vh - 250px)',
                                            overflowX: 'hidden',
                                        }}
                                    >
                                        <Box sx={{ p: 2 }}>
                                            {
                                                user.type === 'patient' &&
                                                <UpgradePlanCard />
                                            }
                                         
                                            <Divider />
                                            <List
                                                component='nav'
                                                sx={{
                                                    width: '100%',
                                                    maxWidth: 350,
                                                    minWidth: 300,
                                                    backgroundColor:
                                                        theme.palette.background
                                                            .paper,
                                                    borderRadius: '10px',
                                                    [theme.breakpoints.down(
                                                        'md'
                                                    )]: {
                                                        minWidth: '100%',
                                                    },
                                                    '& .MuiListItemButton-root':
                                                    {
                                                        mt: 0.5,
                                                    },
                                                }}
                                            >
                                                
                                                <ListItemButton
                                                    sx={{
                                                        borderRadius: `${customization.borderRadius}px`,
                                                    }}
                                                    selected={
                                                        selectedIndex === 1
                                                    }
                                                    onClick={() => {
                                                        navigate('pages/profile');
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <IconUser
                                                            stroke={1.5}
                                                            size='1.3rem'
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Grid
                                                                container
                                                                spacing={1}
                                                                justifyContent='space-between'
                                                            >
                                                                <Grid item>
                                                                    <Typography variant='body2'>
                                                                        <Button variant='text'>
                                                                            Social
                                                                            Profile
                                                                        </Button>
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Chip
                                                                        label='02'
                                                                        size='small'
                                                                        sx={{
                                                                            bgcolor:
                                                                                theme
                                                                                    .palette
                                                                                    .warning
                                                                                    .dark,
                                                                            color: theme
                                                                                .palette
                                                                                .background
                                                                                .default,
                                                                        }}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        }
                                                    />
                                                </ListItemButton>
                                                <ListItemButton
                                                    sx={{
                                                        borderRadius: `${customization.borderRadius}px`,
                                                    }}
                                                    selected={
                                                        selectedIndex === 4
                                                    }
                                                    onClick={handleLogout}
                                                >
                                                    <ListItemIcon>
                                                        <IconLogout
                                                            stroke={1.5}
                                                            size='1.3rem'
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant='body2'>
                                                                Logout
                                                            </Typography>
                                                        }
                                                    />
                                                </ListItemButton>
                                            </List>
                                        </Box>
                                    </PerfectScrollbar>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default ProfileSection;
