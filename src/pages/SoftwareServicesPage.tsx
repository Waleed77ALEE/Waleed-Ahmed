import React from 'react';
import { SoftwareServices } from '../components/SoftwareServices';
import { UserProfile } from '../lib/supabase';

interface SoftwareServicesPageProps {
  user: any;
  profile: UserProfile | null;
  onOpenAccount: () => void;
}

export const SoftwareServicesPage: React.FC<SoftwareServicesPageProps> = ({ user, profile, onOpenAccount }) => {
  return (
    <div className="pt-24 bg-[#0b0e14] min-h-screen">
      <SoftwareServices user={user} profile={profile} onOpenAccount={onOpenAccount} />
    </div>
  );
};
