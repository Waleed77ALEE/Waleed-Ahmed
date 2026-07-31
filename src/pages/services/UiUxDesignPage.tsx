import React from 'react';
import { SingleServicePage } from './SingleServicePage';

interface UiUxDesignPageProps {
  onOpenContact: () => void;
}

export const UiUxDesignPage: React.FC<UiUxDesignPageProps> = ({ onOpenContact }) => {
  return <SingleServicePage slug="ui-ux-design" onOpenContact={onOpenContact} />;
};
