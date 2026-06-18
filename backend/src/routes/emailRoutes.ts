import { Router } from "express";
import { createEmail, listEmails, deleteEmail } from "../controllers/emailController";

const router = Router();

router.post("/", createEmail);

router.get("/", listEmails);

router.delete("/:id", deleteEmail);

export default router;