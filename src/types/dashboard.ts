export type UsersKPI = {
  total: number;
  admin: number;
  users: number;
};

export type RecordsKPI = {
  total: number;
  daily: number;
};

export type DevicesKPI = {
  total: number;
  weekly: number;
};

export type ErrorsKPI = {
  total: number;
  weekly: number;
};

export type ConnMetrics = {
  timestamp: string;
  latency: {
    lateRecords: number;
    latePercentage: number;
    latePerDevice: number;
    futureRecords: number;
    futurePercentage: number;
    futurePerDevice: number;
  };

  connections: {
    active: number;
  };

  bandwidth: {
    used: number;
    average: number;
    series: Array<{
      timestamp: string;
      value: number;
    }>;
  };
};

export type MetricCardData = {
  users: {
    total: number;
    admin: number;
    users: number;
  };
  records: {
    total: number;
    daily: number;
  };
  devices: {
    total: number;
    weekly: number;
  };
  errors: {
    total: number;
    weekly: number;
  };
};

export type MetricEntry = {
  category: string;
  value: DevicesKPI | ErrorsKPI | UsersKPI | RecordsKPI;
};
