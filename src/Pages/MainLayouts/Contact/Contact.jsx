import React from 'react';
import Navbar from '../../../Components/Navbar/Navbar';
import Banner from '../../../Components/Banner/Banner';

const Contact = () => {
    return (
        <div>
            <Navbar />
            <Banner title="Contact Us" subTitle="Get in Touch with Us" />
            {/* Additional content for Contact can be added here */}
        </div>
    );
};

export default Contact;