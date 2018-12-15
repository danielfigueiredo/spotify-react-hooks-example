import React, { useEffect } from 'react';

type ExternalRedirectProps = {
  to: string;
};
export const ExternalRedirect = ({ to }: ExternalRedirectProps) => {
  useEffect(() => {
    window.location.replace(to);
  });

  return <></>;
};
