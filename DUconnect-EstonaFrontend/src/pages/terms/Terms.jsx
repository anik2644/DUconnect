import React from 'react';
import './terms.scss'; // Import SCSS file for styling

const TermsAndConditionsPage = () => {
    return (
        <div className="terms-and-conditions-page">
            <div className="container">
                <h1 className="page-title">Terms and Conditions</h1>
                <div className="content">
                    <div className="section">
                        <h2 className="section-title">1. Acceptance of Terms</h2>
                        <p className="section-content">
                            By accessing or using University Social Media, you agree to comply with and be bound by these terms and conditions. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </div>
                    <div className="section">
                        <h2 className="section-title">2. User Conduct</h2>
                        <p className="section-content">
                            Users are solely responsible for their conduct and any content they post or upload on University Social Media. Users agree not to engage in any behavior that may be harmful, offensive, or illegal.
                        </p>
                    </div>
                    <div className="section">
                        <h2 className="section-title">3. Privacy Policy</h2>
                        <p className="section-content">
                            University Social Media respects the privacy of its users. Personal information collected is used only for the purpose of providing and improving the service. Users can review our Privacy Policy for more details.
                        </p>
                    </div>
                    <div className="section">
                        <h2 className="section-title">4. Intellectual Property</h2>
                        <p className="section-content">
                            All content and materials on University Social Media, including but not limited to text, images, logos, and graphics, are the property of the university and may not be used or reproduced without permission.
                        </p>
                    </div>
                    <div className="section">
                        <h2 className="section-title">5. Changes to Terms</h2>
                        <p className="section-content">
                            University Social Media reserves the right to modify or replace these terms at any time. Users are responsible for regularly reviewing these terms for any changes.
                        </p>
                    </div>
                    <div className="section">
                        <h2 className="section-title">6. Contact Information</h2>
                        <p className="section-content">
                            For questions or concerns regarding these terms and conditions, please contact the university administration at admin@university.edu.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TermsAndConditionsPage;
