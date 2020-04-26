import React from 'react';
import PropTypes from 'prop-types';
import { FeatureFlag } from 'react-unleash-flags';

export const serverEnv = process.env.REACT_APP_ENV || process.env.NODE_ENV;
export const flagConfig = {
  appName: serverEnv,
  url: 'https://gitlab.com/api/v4/feature_flags/unleash/17749136',
  instanceId: 'ruL9XsszeoKcFRbAwz9S',
};

/**
 * Powered by Gitlab CI Feature Flags
 * Toggles two nodes (children, fallback) depending on the toggle
 * in Gitlab > Operations > Feature Flags
*/
export const FeatureToggle = ({ featureKey, environment: env, children, fallback }) => {
  const feature = featureKey + (env ? `-${env}` : ''); // naming convention
  // when env is not provided, this feature key will affect all servers at once.
  return (
    <>
      <FeatureFlag name={feature}>
        {children}
      </FeatureFlag>

      {fallback && <FeatureFlag name={feature} invert={true}>
        {fallback}
      </FeatureFlag>}
    </>
  );
}

FeatureToggle.propTypes = {
  featureKey: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
  environment: PropTypes.string,
}