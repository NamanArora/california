import React from 'react';
import VideoHero from './VideoHero';
import TherapistsSection from './TherapistsSection';
import OutreachTeamSection from './OutreachTeamSection';
import TherapistsCarousel from './TherapistsCarousel';
import TherapistsFeaturedGrid from './TherapistsFeaturedGrid';
import CompactOutreachTeamSection from './CompactOutreachTeamSection';
import OceanCommitment from './Commitment';

const MeetOurTeamPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <VideoHero />
            <TherapistsFeaturedGrid />
            <OutreachTeamSection />
            <OceanCommitment />
            Old FAQS come here
        </div>
    );
};

export default MeetOurTeamPage;