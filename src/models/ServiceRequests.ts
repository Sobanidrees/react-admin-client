import { Consumer } from './Consumer';
import { Service } from './Service';
import { Vehicle } from './Vehicle';

export type ServiceRequest = {
  id: number;
  createdAt: string;
  updatedAt: string;
  date: string;
  time: string;
  vehicle: Vehicle;
  service: Service;
  consumer: Consumer;
  status: string;
  packageType: string;
};

export type UpdateServiceRequestDto = {
  serviceRequestId: number;
  date: string;
  time: string;
};
