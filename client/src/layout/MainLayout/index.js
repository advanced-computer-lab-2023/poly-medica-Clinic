import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { DOCTOR_TYPE_ENUM } from 'utils/Constants';
import Swal from 'sweetalert2';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {
    AppBar,
    Box,
    CssBaseline,
    Toolbar,
    useMediaQuery,
} from '@mui/material';

// project imports

import Header from './Header';
import Sidebar from './Sidebar';
import Chat from '../../pages/chat/Chat';
// import Customization from '../Customization';

import { drawerWidth } from 'store/constant';
import { SET_MENU } from 'store/actions';
import { ChatContextProvider } from 'contexts/ChatContext';
import { SearchProvider } from 'contexts/SearchContext';
import { FilterProvider } from 'contexts/FilterContext';
import { useUserContext } from 'hooks/useUserContext';
import { useEffect } from 'react';
import { clinicAxios } from 'utils/AxiosConfig';
import { ContextProvider } from 'contexts/VideoChatContext';
// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        ...theme.typography.mainContent,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create(
            'margin',
            open
                ? {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }
                : {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }
        ),
        [theme.breakpoints.up('md')]: {
            marginLeft: open ? 0 : -(drawerWidth - 20),
            width: `calc(100% - ${drawerWidth}px)`,
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px',
        },
    })
);

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = ({ userType }) => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const leftDrawerOpened = useSelector((state) => state.customization.opened);

    const { user } = useUserContext();
    const id = user.id;
    const location = useLocation();
    useEffect(() => {
        const isDoctor = user.type === DOCTOR_TYPE_ENUM;
        if (!user || user.type != userType) {
            navigate(`/${user.type}/dashboard/home`);
        }
        if (isDoctor) {
            clinicAxios
                .get('/doctors/' + id + '/status')
                .then((res) => {
                    const status = res.data.status;
                    if (user && isDoctor && !status) {
                        navigate('/doctor/pages/profile');
                        Swal.fire({ title: 'Pending Offer', icon: 'info', text: 'Please Accept the offer first' });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [location.pathname]);
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    };

    return (
        <ChatContextProvider>
            <ContextProvider>
                <FilterProvider>
                    <SearchProvider>
                        <Box sx={{ display: 'flex' }}>
                            <CssBaseline />
                            {/* header */}
                            <AppBar
                                enableColorOnDark
                                position='fixed'
                                color='inherit'
                                elevation={0}
                                sx={{
                                    bgcolor: theme.palette.background.default,
                                    transition: leftDrawerOpened
                                        ? theme.transitions.create('width')
                                        : 'none',
                                }}>
                                <Toolbar>
                                    <Header
                                        handleLeftDrawerToggle={
                                            handleLeftDrawerToggle
                                        }
                                    />
                                </Toolbar>
                            </AppBar>

                            {/* drawer */}
                            {user && user.type == userType && (
                                <Sidebar
                                    drawerOpen={
                                        !matchDownMd
                                            ? leftDrawerOpened
                                            : !leftDrawerOpened
                                    }
                                    drawerToggle={handleLeftDrawerToggle}
                                />
                            )}

                        {/* main content */}
                        <Main theme={theme} open={leftDrawerOpened} sx={{ position: 'relative' }}>
                            {(!user || user.type != userType) && (
                                <h1>not autherized!!</h1>
                            )}
                            {user && user.type == userType && 
                            user.type === 'admin' || user.type === 'doctor' && user.status ? <Outlet /> : 
                            <Chat> 
                                <div>
                                    <Outlet />
                                </div>
                            </Chat>
                            }
                        </Main>

                            {/* <Customization /> */}
                        </Box>
                    </SearchProvider>
                </FilterProvider>
            </ContextProvider>
        </ChatContextProvider>
    );
};

export default MainLayout;
