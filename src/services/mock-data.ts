export const parentDashboardMock = {
  score: 72,
  currentSeries: 8,
  pointsMonth: 120,
  initiativesMonth: 3,
  todayResponsibilities: [
    { id: 'r1', titleKey: 'mock.ranger_chambre', status: 'pending' },
    { id: 'r2', titleKey: 'mock.mettre_table', status: 'submitted' },
  ],
  pendingRewards: [
    { id: 'p1', titleKey: 'mock.ecran_30', points: 30 },
  ],
};

export const teenTodayMock = {
  levelKey: 'mock.level_responsable',
  score: 68,
  responsibilities: [
    { id: 't1', titleKey: 'mock.brosser_dents', done: false },
    { id: 't2', titleKey: 'mock.preparer_sac', done: true },
  ],
};

export const initiativesMock = [
  { id: 'i1', titleKey: 'mock.range_salon', date: '2026-06-10' },
];

export const rewardsMock = [
  { id: 'rw1', titleKey: 'mock.ecran_30', cost: 30 },
  { id: 'rw2', titleKey: 'mock.cinema', cost: 150 },
];
