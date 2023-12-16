import MainCard from './MainCard.js';
import FeatureCard from './FeatureCard.js';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';

const Home = () => {
    
    return (
        <>
            <MainCard />
            <div
                style= {{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    width: '100%',
                }}
            >
                <FeatureCard
                    title='All your healthcare needs'
                    description='We provide a wide range of healthcare services to meet your needs.'
                    icon={<HealthAndSafetyIcon color='secondary' fontSize='large' />}
                />

                <FeatureCard
                    title='Your booking is confirmed'
                    description='Your booking is automatically confirmed according to doctor available slots.'
                    icon={<EventAvailableIcon color='secondary' fontSize='large' />}
                />

                <FeatureCard
                    title='High quality healthcare service'
                    description='A high quality service is ensured by our team of experts and evidenced by patient testimonials.'
                    icon={<SpellcheckIcon color='secondary' fontSize='large' />}
                />
                
            </div>
        </>
    );
};

export default Home;