import { Consumer } from './consumer';
import { Service } from './service';
import { Vehicle } from './vehicle';

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
