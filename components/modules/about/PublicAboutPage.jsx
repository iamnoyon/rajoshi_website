import Link from "next/link";
import AboutBanner from "./components/AboutBanner";
import AboutStatsCard from "./components/AboutStatsCard";
import AboutStory from "./components/AboutStory";
import AboutValue from "./components/AboutValue";
import AboutTeam from "./components/AboutTeam";
import AboutCTA from "./components/AboutCTA";

export default function PublicAboutPage() {
    return (
        <div>
            {/* Banner */}
            <AboutBanner />

            {/* Stats */}
            <AboutStatsCard />

            {/* Story */}
            <AboutStory />

            {/* Values */}
            <AboutValue />

            {/* Team */}
            <AboutTeam />

            {/* CTA */}
            <AboutCTA />
        </div>
    );
}
