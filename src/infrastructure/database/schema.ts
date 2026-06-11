// SQL schema for local SQLite persistence (MVP tables)

export const CREATE_TABLES_SQL: string[] = [
  `CREATE TABLE IF NOT EXISTS families (
    id TEXT PRIMARY KEY,
    name TEXT,
    invitation_code TEXT,
    language TEXT,
    settings TEXT,
    created_at TEXT,
    updated_at TEXT,
    deleted_at TEXT,
    sync_status TEXT DEFAULT 'local'
  );`,

  `CREATE TABLE IF NOT EXISTS parents (
    id TEXT PRIMARY KEY,
    family_id TEXT,
    name TEXT,
    role TEXT,
    preferences TEXT,
    created_at TEXT,
    updated_at TEXT,
    deleted_at TEXT,
    sync_status TEXT DEFAULT 'local'
  );`,

  `CREATE TABLE IF NOT EXISTS teens (
    id TEXT PRIMARY KEY,
    family_id TEXT,
    name TEXT,
    age INTEGER,
    active INTEGER,
    created_at TEXT,
    updated_at TEXT,
    deleted_at TEXT,
    sync_status TEXT DEFAULT 'local'
  );`,

  `CREATE TABLE IF NOT EXISTS responsibilities (
    id TEXT PRIMARY KEY,
    family_id TEXT,
    title TEXT,
    description TEXT,
    frequency TEXT,
    need_validation INTEGER,
    points INTEGER,
    difficulty TEXT,
    active INTEGER,
    created_at TEXT,
    updated_at TEXT,
    deleted_at TEXT,
    sync_status TEXT DEFAULT 'local'
  );`,

  `CREATE TABLE IF NOT EXISTS responsibility_occurrences (
    id TEXT PRIMARY KEY,
    responsibility_id TEXT,
    teen_id TEXT,
    date TEXT,
    status TEXT,
    submission_text TEXT,
    created_at TEXT,
    updated_at TEXT,
    deleted_at TEXT,
    sync_status TEXT DEFAULT 'local'
  );`,

  `CREATE TABLE IF NOT EXISTS initiatives (
    id TEXT PRIMARY KEY,
    family_id TEXT,
    teen_id TEXT,
    title TEXT,
    description TEXT,
    status TEXT,
    parent_comment TEXT,
    created_at TEXT,
    updated_at TEXT,
    deleted_at TEXT,
    sync_status TEXT DEFAULT 'local'
  );`,

  `CREATE TABLE IF NOT EXISTS validations (
    id TEXT PRIMARY KEY,
    family_id TEXT,
    actor_parent_id TEXT,
    target_id TEXT,
    target_type TEXT,
    accepted INTEGER,
    comment TEXT,
    created_at TEXT,
    updated_at TEXT,
    deleted_at TEXT,
    sync_status TEXT DEFAULT 'local'
  );`,

  `CREATE TABLE IF NOT EXISTS rewards (
    id TEXT PRIMARY KEY,
    family_id TEXT,
    title TEXT,
    description TEXT,
    type TEXT,
    rarity TEXT,
    cost_points INTEGER,
    ceiling INTEGER,
    active INTEGER,
    created_at TEXT,
    updated_at TEXT,
    deleted_at TEXT,
    sync_status TEXT DEFAULT 'local'
  );`,

  `CREATE TABLE IF NOT EXISTS reward_requests (
    id TEXT PRIMARY KEY,
    reward_id TEXT,
    teen_id TEXT,
    family_id TEXT,
    status TEXT,
    requested_at TEXT,
    decided_at TEXT,
    parent_comment TEXT,
    created_at TEXT,
    updated_at TEXT,
    deleted_at TEXT,
    sync_status TEXT DEFAULT 'local'
  );`,

  `CREATE TABLE IF NOT EXISTS freedoms (
    id TEXT PRIMARY KEY,
    family_id TEXT,
    name TEXT,
    description TEXT,
    revocable INTEGER,
    created_at TEXT,
    updated_at TEXT,
    deleted_at TEXT,
    sync_status TEXT DEFAULT 'local'
  );`,

  `CREATE TABLE IF NOT EXISTS freedom_levels (
    id TEXT PRIMARY KEY,
    freedom_id TEXT,
    teen_id TEXT,
    family_id TEXT,
    level TEXT,
    start_at TEXT,
    end_at TEXT,
    active INTEGER,
    created_at TEXT,
    updated_at TEXT,
    deleted_at TEXT,
    sync_status TEXT DEFAULT 'local'
  );`,

  `CREATE TABLE IF NOT EXISTS trust_events (
    id TEXT PRIMARY KEY,
    family_id TEXT,
    teen_id TEXT,
    parent_id TEXT,
    type TEXT,
    source_id TEXT,
    meta TEXT,
    created_at TEXT,
    updated_at TEXT,
    deleted_at TEXT,
    sync_status TEXT DEFAULT 'local'
  );`,

  `CREATE TABLE IF NOT EXISTS presence_periods (
    id TEXT PRIMARY KEY,
    teen_id TEXT,
    family_id TEXT,
    start_at TEXT,
    end_at TEXT,
    type TEXT,
    note TEXT,
    created_at TEXT,
    updated_at TEXT,
    deleted_at TEXT,
    sync_status TEXT DEFAULT 'local'
  );`
]

// Indexes
export const CREATE_INDEXES_SQL: string[] = [
  `CREATE INDEX IF NOT EXISTS idx_families_created_at ON families(created_at);`,
  `CREATE INDEX IF NOT EXISTS idx_parents_family_id ON parents(family_id);`,
  `CREATE INDEX IF NOT EXISTS idx_teens_family_id ON teens(family_id);`,
  `CREATE INDEX IF NOT EXISTS idx_teens_created_at ON teens(created_at);`,
  `CREATE INDEX IF NOT EXISTS idx_responsibilities_family_id ON responsibilities(family_id);`,
  `CREATE INDEX IF NOT EXISTS idx_occurrences_teen_id ON responsibility_occurrences(teen_id);`,
  `CREATE INDEX IF NOT EXISTS idx_occurrences_date ON responsibility_occurrences(date);`,
  `CREATE INDEX IF NOT EXISTS idx_initiatives_family_id ON initiatives(family_id);`,
  `CREATE INDEX IF NOT EXISTS idx_validations_family_id ON validations(family_id);`,
  `CREATE INDEX IF NOT EXISTS idx_rewards_family_id ON rewards(family_id);`,
  `CREATE INDEX IF NOT EXISTS idx_reward_requests_reward_id ON reward_requests(reward_id);`,
  `CREATE INDEX IF NOT EXISTS idx_reward_requests_requested_at ON reward_requests(requested_at);`,
  `CREATE INDEX IF NOT EXISTS idx_freedom_levels_teen_id ON freedom_levels(teen_id);`,
  `CREATE INDEX IF NOT EXISTS idx_trust_events_family_id ON trust_events(family_id);`,
  `CREATE INDEX IF NOT EXISTS idx_presence_teen_id ON presence_periods(teen_id);`
]
