import type { Visit } from "../Interfaces/visit.interface";
import { VISIT_STATE } from "../mockdata/estate.visit";

export const mockVisits: Visit[] = [
  {
    id: 1,
    patient: {
      id: 1,
      name: "Carlos",
      lastname: "Mendoza",
      idDocument: "1098765432",
    },
    time: "08:30 AM",
    state: VISIT_STATE.en_camino,
  },
  {
    id: 2,
    patient: {
      id: 2,
      name: "María",
      lastname: "García",
      idDocument: "1012345678",
    },
    time: "10:15 AM",
    state: VISIT_STATE.pendiente,
  },
  {
    id: 3,
    patient: {
      id: 3,
      name: "Javier",
      lastname: "Rodríguez",
      idDocument: "1143256789",
    },
    time: "02:00 PM",
    state: VISIT_STATE.finalizada,
  },
  {
    id: 4,
    patient: {
      id: 4,
      name: "Ana Sofía",
      lastname: "Martínez",
      idDocument: "1054321897",
    },
    time: "04:45 PM",
    state: VISIT_STATE.pendiente,
  },
  {
    id: 5,
    patient: {
      id: 5,
      name: "Arthur",
      lastname: "Morgan",
      idDocument: "1047651897",
    },
    time: "06:25 PM",
    state: VISIT_STATE.pendiente,
  },
];
