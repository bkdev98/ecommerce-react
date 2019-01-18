import React from 'react';

import Wrapper from '../components/Wrapper';
import logo from '../images/logo.png';

const About = () => (
  <Wrapper>
    <img src={logo} alt='logo' />
    <p>Chúng tôi là đội Tên lửa bảo vệ ngân hà</p>
    <p>Một tương lai tương sáng đang chờ đợi chúng tôi!</p>
  </Wrapper>
);

export default About;
