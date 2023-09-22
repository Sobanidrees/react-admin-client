export type InspectorServiceRequest = {
  date: string;
  id: number;
  packageType: string;
  time: string;
};

export type Inspectors = {
  id: number;
  serviceRequests: InspectorServiceRequest[];
  fullName: string;
  emiratesId: string;
  phoneNumber: string;
};

export type InspectorAssignedSr = {
  inspectorId: number;
  serviceRequestId: number;
};
