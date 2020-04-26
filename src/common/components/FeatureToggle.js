import React from 'react';
import PropTypes from 'prop-types';
import { FeatureFlag, FlagsProvider } from 'react-unleash-flags';

export const serverEnv = process.env.REACT_APP_ENV || '';
export const flagConfig = {
  appName: serverEnv,
  url: 'https://gitlab.com/api/v4/feature_flags/unleash/17749136',
  instanceId: 'swfN4v8HT29sNLj9Z2mK',
};

const isFeatureFlagUsable = flagConfig.url && flagConfig.instanceId && serverEnv;

export const FeatureFlagsProvider = ({ children }) => {
  // disable feature flag checking if not configured? non-strict
  return isFeatureFlagUsable ? (
    <FlagsProvider config={flagConfig}>{children}</FlagsProvider>
  ) : (
    <>{children}</>
  );
};

FeatureFlagsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/*
 * Powered by Gitlab CI Feature Flags
 * Toggles two nodes (children, fallback) depending on the toggle
 * in Gitlab > Operations > Feature Flags
 */
export const FeatureToggle = ({ featureKey, environment: env, children, fallback }) => {
  const feature = featureKey + (env ? `-${env}` : ''); // naming convention
  // when env is not provided, this feature key will affect all servers at once.
  return !isFeatureFlagUsable ? (
    <>{children}</>
  ) : (
    <>
      <FeatureFlag name={feature}>{children}</FeatureFlag>

      {fallback && (
        <FeatureFlag name={feature} invert>
          {fallback}
        </FeatureFlag>
      )}
    </>
  );
};

FeatureToggle.propTypes = {
  featureKey: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
  environment: PropTypes.string,
};
