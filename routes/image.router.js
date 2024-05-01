//importamos la clase routes para definir rutas
import { Router } from "express";
//importo el controlador para manejar las solicitudes http
import { imageController } from "../controller/image.controller.js";
//Se crea un objeto de enrutador utilizando la clase Router
const router = Router();

//definimos router post y get para manejar las solicitudes
router.post("/image", imageController.saveImage);
router.get("/", imageController.getInicio);
router.get("/email/send", imageController.sendEmail);

//exportamos router para ser importado y utilizado por otros archivos de la apps

export default router;
