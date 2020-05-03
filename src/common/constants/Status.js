export const ApprovalStatus = {
  Pending: 'pending',
  Approved: 'approved',
  Declined: 'declined',
  Expired: 'expired',
  Suspended: 'suspended',
};

export const ApprovalStatusLabel = {
  [ApprovalStatus.Pending]: 'pending',
  [ApprovalStatus.Approved]: 'approved',
  [ApprovalStatus.Declined]: 'declined',
  [ApprovalStatus.Expired]: 'expired',
  [ApprovalStatus.Suspended]: 'revoked', // TODO: restore to suspended on rollout of Suspend.
};
