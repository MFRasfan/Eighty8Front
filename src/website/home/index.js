import React, { useEffect, useState } from 'react';
import WebsiteLayout from '../../component/websiteLayout';
import Banner from './sections/banner';
import BrowseByCategory from './sections/browseByCategory';
import FanVideo from './sections/fanVideo';
import HowItWorks from './sections/howItWorks';
import Featured from './sections/featured';
import QualityCheckPoint from './sections/qualityCheckPoint';
import { useDispatch, useSelector } from 'react-redux';
import { getHome } from '../../store/features/webcontent/webContentService';
import { CategoryContainer } from './sections/browseByCategory';
const Home = () => {
  const [homeDetails, setHomeDetails] = useState({});
  const home = useSelector((state) => state.webContent.home);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(home).length === 0) {
      dispatch(getHome((data) => setHomeDetails(data[0])));
    } else {
      setHomeDetails(home);
    }
  }, [dispatch, home]);

  console.log('homeDetails-----------', homeDetails);

  return (
    <WebsiteLayout>
      <Banner data={homeDetails.section1_banner} />
      <HowItWorks data={homeDetails.section2} />
      <QualityCheckPoint data={homeDetails.section3} />
      <FanVideo data={homeDetails.section4} />
      <Featured data={homeDetails.section5} /> 
      <CategoryContainer />
      <BrowseByCategory />
    
    </WebsiteLayout>
  );
};

export default Home;
