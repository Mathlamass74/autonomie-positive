export enum Role {
  Parent = 'parent',
  Teen = 'teen',
}

export enum ResponsibilityStatus {
  Pending = 'pending',
  Submitted = 'submitted',
  Validated = 'validated',
  Refused = 'refused'
}

export enum InitiativeStatus {
  Pending = 'pending',
  Validated = 'validated',
  Refused = 'refused'
}

export enum RewardRequestStatus {
  Pending = 'pending',
  Granted = 'granted',
  Refused = 'refused',
  Expired = 'expired'
}

export enum PresenceStatus {
  Present = 'present',
  Absent = 'absent'
}

export enum DomainCategory {
  Responsibility = 'responsibility',
  Initiative = 'initiative',
  Reward = 'reward'
}

export enum Difficulty {
  Low = 'low',
  Medium = 'medium',
  High = 'high'
}

export enum RewardType {
  Privilege = 'privilege',
  Material = 'material',
  Activity = 'activity'
}

export enum RewardRarity {
  Common = 'common',
  Rare = 'rare',
  Epic = 'epic'
}
