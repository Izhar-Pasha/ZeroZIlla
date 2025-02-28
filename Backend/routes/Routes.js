import express from "express";
import {
  CreateAgency,
  updateClient,
  getClient,
  getAllAgencies,
  getAllClients,
  getSingleClient,
} from "../controller/AgencyController.js";
import { authentication } from "../controller/AuthController.js";

const router = express.Router();

router.post("/CreateAgency", authentication, CreateAgency);
router.get("/AllAgency", authentication, getAllAgencies);
router.get("/AllClients", authentication, getAllClients);
router.get("/Clients/:clientId", authentication, getSingleClient);
router.put("/updateClient/:clientId", authentication, updateClient);
router.get("/topclient", authentication, getClient);

export default router;
