export type inquiry = {
  docId: string;
  name: string;
  email: string;
  phone: string;
  product: {
    docId: string;
    ModelNumber: string;
    name: string;
  };
  text: string;
  timestamp: string;
  status: string;
  staff: string;
};
