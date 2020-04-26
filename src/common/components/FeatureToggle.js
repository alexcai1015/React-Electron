import React from 'react';
import PropTypes from 'prop-types';
import { FeatureFlag } from 'react-unleash-flags';
import { FlagsProvider } from 'react-unleash-flags';

export const serverEnv = process.env.REACT_APP_ENV || process.env.NODE_ENV;
export const flagConfig = {
  appName: serverEnv,
  url: 'https://gitlab.com/api/v4/feature_flags/unleash/17749136',
  instanceId: 'BguQBGpJ-zXxEZF3rbAe',
};

const isFeatureFlagUsable = (flagConfig.url && flagConfig.instanceId && serverEnv);

export const FeatureFlagsProvider = ({ children }) => {
  // disable feature flag checking if not configured? non-strict
  return (
    isFeatureFlagUsable ?
      (<FlagsProvider flagConfig={flagConfig}>
        {children}
      </FlagsProvider>)
      : <>{children}</>
  )
}

/**
 * Powered by Gitlab CI Feature Flags
 * Toggles two nodes (children, fallback) depending on the toggle
 * in Gitlab > Operations > Feature Flags
*/
export const FeatureToggle = ({ featureKey, environment: env, children, fallback }) => {
  const feature = featureKey + (env ? `-${env}` : ''); // naming convention
  // when env is not provided, this feature key will affect all servers at once.
  return (
    !isFeatureFlagUsable ?
      <>{children}</>
      : (
        <>
          <FeatureFlag name={feature}>
            {children}
          </FeatureFlag>

          {fallback && <FeatureFlag name={feature} invert={true}>
            {fallback}
          </FeatureFlag>}
        </>
      )
  );
}

FeatureToggle.propTypes = {
  featureKey: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
  environment: PropTypes.string,
}