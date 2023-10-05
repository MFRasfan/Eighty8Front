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
  const [fetchDetails, setfetchDetails] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    if ( !!home) {
      if(Object.keys(home).length === 0 && !fetchDetails){
        dispatch(getHome((data) => {
          if(!!data && !!data[0]){
            setHomeDetails(data[0])
            setfetchDetails(true)
          }
        }));
        
      } else {
        setHomeDetails(home);
      }
      }
  }, [dispatch, home]);
  
  
 
  return (
    <WebsiteLayout>
    {!!homeDetails.section1_banner && <Banner data={homeDetails.section1_banner} />}
     {!!homeDetails.section2 && <HowItWorks data={homeDetails.section2} />}
     {!!homeDetails.section3 && <QualityCheckPoint data={homeDetails.section3} />}
    {!!homeDetails.section4 &&  <FanVideo data={homeDetails.section4} />}
     {!!homeDetails.section5 && <Featured data={homeDetails.section5} /> }
  
      <CategoryContainer />
      <BrowseByCategory />
      <div className='mt-24'/>
    </WebsiteLayout>
  );
};

export default Home;
