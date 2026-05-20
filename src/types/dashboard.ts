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
