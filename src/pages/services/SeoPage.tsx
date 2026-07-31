import React from 'react';
import { SingleServicePage } from './SingleServicePage';

interface SeoPageProps {
  onOpenContact: () => void;
}

export const SeoPage: React.FC<SeoPageProps> = ({ onOpenContact }) => {
  return <SingleServicePage slug="seo" onOpenContact={onOpenContact} />;
};
